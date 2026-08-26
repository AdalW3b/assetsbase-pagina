import { NextResponse } from "next/server";

/* Recepción de solicitudes de demo — el único punto de conversión del sitio.

   Entrega: se intenta por todos los canales configurados y basta con que UNO
   llegue para confirmarle al visitante. Si no hay ninguno configurado la ruta
   responde 503 a propósito: preferimos que vea la salida por WhatsApp a que
   se vaya creyendo que ya agendó.

     DEMO_WEBHOOK_URL   POST JSON  (Zapier, Make, n8n, HubSpot, Apps Script…)
     RESEND_API_KEY     correo directo por la API REST de Resend
     + DEMO_EMAIL_TO / DEMO_EMAIL_FROM

   Resend se llama con fetch a pelo, sin SDK: es una sola petición HTTP y no
   vale la pena arrastrar otra dependencia por ella. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPCIONES_USUARIOS = ["1 a 5", "6 a 20", "21 a 50", "Más de 50"];
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TIEMPO_LIMITE_MS = 8000;

type Lead = {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  usuarios: string;
};

/* ── Límite por IP ───────────────────────────────────────────────────────
   Antes no había ninguno: un bucle de curl podía llenar el CRM de basura y
   quemar la cuota del webhook. Es best-effort a propósito — en serverless
   cada instancia tiene su propio Map, así que frena el bucle pero no un
   ataque distribuido. Si el volumen lo amerita, mover a Redis. */
const VENTANA_MS = 15 * 60 * 1000;
const MAX_POR_VENTANA = 5;
const MAX_IPS = 5000;
const golpes = new Map<string, number[]>();

function ipDe(request: Request) {
  const reenviada = request.headers.get("x-forwarded-for");
  return (
    reenviada?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "desconocida"
  );
}

function limiteExcedido(ip: string) {
  const ahora = Date.now();
  const recientes = (golpes.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);

  if (recientes.length >= MAX_POR_VENTANA) {
    golpes.set(ip, recientes);
    return true;
  }

  recientes.push(ahora);
  golpes.set(ip, recientes);

  // Barrido perezoso para que el Map no crezca sin techo.
  if (golpes.size > MAX_IPS) {
    for (const [clave, marcas] of golpes) {
      if (!marcas.some((t) => ahora - t < VENTANA_MS)) golpes.delete(clave);
    }
  }
  return false;
}

/* ── Forma de la respuesta ───────────────────────────────────────────────
   Con JS, DemoForm manda `accept: application/json` y pinta la confirmación
   sin recargar. Sin JS el navegador hace un POST nativo y antes recibía el
   JSON crudo en pantalla — {"ok":true} sobre fondo blanco. Ahora se le
   redirige (303) a /gracias. */
function quiereJson(request: Request) {
  return (request.headers.get("accept") ?? "").includes("application/json");
}

function responder(
  request: Request,
  cuerpo: Record<string, unknown>,
  status: number,
  cabeceras?: HeadersInit
) {
  if (quiereJson(request)) {
    return NextResponse.json(cuerpo, { status, headers: cabeceras });
  }
  const destino = status >= 400 ? "/gracias?estado=error" : "/gracias";
  return NextResponse.redirect(new URL(destino, request.url), {
    status: 303,
    headers: cabeceras,
  });
}

function limpiar(valor: FormDataEntryValue | null, max: number) {
  return typeof valor === "string" ? valor.trim().slice(0, max) : "";
}

/* ── Canales de entrega ─────────────────────────────────────────────── */

async function entregarWebhook(lead: Lead, url: string) {
  const respuesta = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...lead,
      origen: "landing",
      recibido: new Date().toISOString(),
      /* Secreto compartido, opcional. Lo pide sobre todo Apps Script: un
         web app de Google se publica como "cualquiera con la liga", así
         que sin esto quien descubra la URL puede escribir filas. */
      ...(process.env.DEMO_WEBHOOK_TOKEN
        ? { token: process.env.DEMO_WEBHOOK_TOKEN }
        : {}),
    }),
    signal: AbortSignal.timeout(TIEMPO_LIMITE_MS),
  });

  if (!respuesta.ok) {
    throw new Error(`webhook respondió ${respuesta.status}`);
  }

  /* Apps Script SIEMPRE contesta 200, incluso cuando su propio código
     truena o rechaza el token — el estado HTTP no basta para saber si la
     fila se escribió. Si el cuerpo es JSON y trae `ok: false`, es un fallo.
     Se mira solo ese caso explícito a propósito: Zapier y HubSpot
     responden con otras formas y no hay que confundirlas con un error. */
  if (respuesta.headers.get("content-type")?.includes("application/json")) {
    const cuerpo = await respuesta.json().catch(() => null);
    if (cuerpo && cuerpo.ok === false) {
      throw new Error(`webhook rechazó la solicitud: ${JSON.stringify(cuerpo)}`);
    }
  }
}

/* El correo va en texto plano y con el dato accionable arriba: quien lo abre
   en el teléfono tiene que poder responder sin hacer scroll. `reply_to` es el
   prospecto, así que contestar el correo es contestarle a él. */
async function entregarCorreo(lead: Lead, apiKey: string) {
  const para = process.env.DEMO_EMAIL_TO;
  const de = process.env.DEMO_EMAIL_FROM;
  if (!para || !de) {
    throw new Error("RESEND_API_KEY sin DEMO_EMAIL_TO / DEMO_EMAIL_FROM");
  }

  const cuerpo = [
    `Empresa:   ${lead.empresa}`,
    `Nombre:    ${lead.nombre}`,
    `Correo:    ${lead.correo}`,
    `Teléfono:  ${lead.telefono || "(no lo dejó)"}`,
    `Usuarios:  ${lead.usuarios}`,
    "",
    `Recibido:  ${new Date().toLocaleString("es-MX", {
      timeZone: "America/Mexico_City",
    })}`,
  ].join("\n");

  const respuesta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: de,
      to: para.split(",").map((destino) => destino.trim()),
      reply_to: lead.correo,
      subject: `Demo solicitada — ${lead.empresa} (${lead.usuarios} usuarios)`,
      text: cuerpo,
    }),
    signal: AbortSignal.timeout(TIEMPO_LIMITE_MS),
  });

  if (!respuesta.ok) {
    throw new Error(
      `resend respondió ${respuesta.status}: ${await respuesta.text()}`
    );
  }
}

/* ── Handler ────────────────────────────────────────────────────────── */

export async function POST(request: Request) {
  if (limiteExcedido(ipDe(request))) {
    return responder(
      request,
      {
        error:
          "Demasiados intentos. Espera unos minutos o escríbenos por WhatsApp.",
      },
      429,
      { "retry-after": String(Math.ceil(VENTANA_MS / 1000)) }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return responder(request, { error: "Solicitud inválida." }, 400);
  }

  /* Honeypot: los bots rellenan todos los campos, las personas no ven este.
     Se responde "ok" para que el bot no aprenda a esquivarlo. */
  if (limpiar(form.get("empresa_extra"), 200)) {
    return responder(request, { ok: true }, 202);
  }

  const lead: Lead = {
    nombre: limpiar(form.get("nombre"), 120),
    empresa: limpiar(form.get("empresa"), 160),
    correo: limpiar(form.get("correo"), 160).toLowerCase(),
    telefono: limpiar(form.get("telefono"), 40),
    usuarios: limpiar(form.get("usuarios"), 40),
  };

  const campos: string[] = [];
  if (lead.nombre.length < 2) campos.push("nombre");
  if (lead.empresa.length < 2) campos.push("empresa");
  if (!CORREO.test(lead.correo)) campos.push("correo");
  if (lead.telefono && lead.telefono.replace(/\D/g, "").length < 10) {
    campos.push("telefono");
  }
  if (!OPCIONES_USUARIOS.includes(lead.usuarios)) campos.push("usuarios");

  if (campos.length) {
    return responder(
      request,
      { error: "Revisa los campos marcados.", campos },
      422
    );
  }

  const webhook = process.env.DEMO_WEBHOOK_URL;
  const resend = process.env.RESEND_API_KEY;

  if (!webhook && !resend) {
    console.error(
      "[demo] sin DEMO_WEBHOOK_URL ni RESEND_API_KEY: la solicitud NO se entregó.",
      JSON.stringify(lead)
    );
    return responder(
      request,
      { error: "No pudimos registrar tu solicitud." },
      503
    );
  }

  const intentos = await Promise.allSettled([
    ...(webhook ? [entregarWebhook(lead, webhook)] : []),
    ...(resend ? [entregarCorreo(lead, resend)] : []),
  ]);

  for (const intento of intentos) {
    if (intento.status === "rejected") {
      console.error("[demo] falló un canal de entrega:", intento.reason);
    }
  }

  if (!intentos.some((intento) => intento.status === "fulfilled")) {
    /* Último recurso: que el lead quede al menos en los logs del servidor,
       que son recuperables, en vez de perderse del todo. */
    console.error("[demo] NINGÚN canal entregó. Lead:", JSON.stringify(lead));
    return responder(
      request,
      { error: "No pudimos registrar tu solicitud." },
      502
    );
  }

  return responder(request, { ok: true }, 200);
}
