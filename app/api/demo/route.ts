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

import { DEFAULT_LANG, LANGS, routes, type Lang } from "@/lib/i18n";

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

/* Los mensajes que ve el visitante, en su idioma. Viven aquí y no en
   lib/content porque esto corre en el servidor y no debe arrastrar el
   contenido entero de la landing a la ruta. */
const MENSAJES = {
  es: {
    limite: "Demasiados intentos. Espera unos minutos o escríbenos por WhatsApp.",
    invalida: "Solicitud inválida.",
    campos: "Revisa los campos marcados.",
    fallo: "No pudimos registrar tu solicitud.",
  },
  en: {
    limite: "Too many attempts. Wait a few minutes or message us on WhatsApp.",
    invalida: "Invalid request.",
    campos: "Check the fields marked below.",
    fallo: "We couldn't record your request.",
  },
} satisfies Record<Lang, Record<string, string>>;

/* En qué idioma estaba el visitante.

   El formulario manda un campo oculto `lang`. Cuando no llega —el límite de
   intentos responde antes de leer el formulario, y una petición malformada
   nunca lo produce— se cae al Referer, que en esos casos sí trae la ruta de
   origen. El español es el último recurso: es el mercado primario. */
function idiomaDe(request: Request, form?: FormData): Lang {
  const declarado = form?.get("lang");
  if (
    typeof declarado === "string" &&
    (LANGS as readonly string[]).includes(declarado)
  ) {
    return declarado as Lang;
  }
  try {
    const referer = request.headers.get("referer");
    if (referer && new URL(referer).pathname.startsWith(routes.home.en)) {
      return "en";
    }
  } catch {
    /* Referer ausente o no parseable: se queda con el idioma por defecto. */
  }
  return DEFAULT_LANG;
}

function responder(
  request: Request,
  lang: Lang,
  cuerpo: Record<string, unknown>,
  status: number,
  cabeceras?: HeadersInit
) {
  if (quiereJson(request)) {
    return NextResponse.json(cuerpo, { status, headers: cabeceras });
  }
  /* Sin JS: se redirige a la página de gracias DEL IDIOMA en que se llenó
     el formulario. Mandar a un anglohablante a /gracias es perderlo justo
     en el momento en que ya había convertido. */
  const base = routes.thanks[lang];
  const destino = status >= 400 ? `${base}?estado=error` : base;
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
    const lang = idiomaDe(request);
    return responder(
      request,
      lang,
      { error: MENSAJES[lang].limite },
      429,
      { "retry-after": String(Math.ceil(VENTANA_MS / 1000)) }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    const lang = idiomaDe(request);
    return responder(request, lang, { error: MENSAJES[lang].invalida }, 400);
  }

  /* Honeypot: los bots rellenan todos los campos, las personas no ven este.
     Se responde "ok" para que el bot no aprenda a esquivarlo. */
  const lang = idiomaDe(request, form);

  if (limpiar(form.get("empresa_extra"), 200)) {
    return responder(request, lang, { ok: true }, 202);
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
      lang,
      { error: MENSAJES[lang].campos, campos },
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
    return responder(request, lang, { error: MENSAJES[lang].fallo }, 503);
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
    return responder(request, lang, { error: MENSAJES[lang].fallo }, 502);
  }

  return responder(request, lang, { ok: true }, 200);
}
