/* Analítica — Google Analytics 4 con Consent Mode v2.

   GA4 usa cookies, así que en México cae bajo la LFPDPPP: hay que
   declararlo en el aviso de privacidad y ofrecer forma de rechazarlo. Por
   eso el consentimiento arranca en `denied` y solo pasa a `granted` cuando
   el visitante lo acepta en la banda.

   Con `denied`, GA4 NO escribe cookies ni identificadores persistentes,
   pero sí manda pings sin cookie que Google usa para modelar. Es lo que
   Google recomienda y lo que hace la mayoría; si su abogado prefiere que
   no salga ni un ping antes del "acepto", hay que mover el <Script src>
   de Analytics.tsx detrás del estado de consentimiento — es un `if`.

   Sin NEXT_PUBLIC_GA_ID no se carga nada: en local y en preview la página
   queda limpia sin tener que tocar código. */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const CLAVE_CONSENTIMIENTO = "assetbase-consentimiento";

export type Consentimiento = "otorgado" | "rechazado";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/* localStorage truena en modo privado de algunos navegadores y cuando el
   sitio va embebido en un iframe con cookies bloqueadas. Un fallo aquí no
   puede tumbar la página: sin dato guardado se vuelve a preguntar. */
export function leerConsentimiento(): Consentimiento | null {
  try {
    const valor = window.localStorage.getItem(CLAVE_CONSENTIMIENTO);
    return valor === "otorgado" || valor === "rechazado" ? valor : null;
  } catch {
    return null;
  }
}

export function guardarConsentimiento(valor: Consentimiento) {
  try {
    window.localStorage.setItem(CLAVE_CONSENTIMIENTO, valor);
  } catch {
    /* sin persistencia se vuelve a preguntar en la próxima visita */
  }

  window.gtag?.("consent", "update", {
    analytics_storage: valor === "otorgado" ? "granted" : "denied",
  });
}

export function evento(nombre: string, parametros?: Record<string, unknown>) {
  if (!GA_ID) return;
  window.gtag?.("event", nombre, parametros);
}

/* La conversión de la página. `generate_lead` es un evento reconocido por
   GA4, así que se puede marcar como conversión en la interfaz sin
   configurar nada más. */
export function registrarLead(usuarios: string) {
  evento("generate_lead", { metodo: "formulario_demo", rango_usuarios: usuarios });
}
