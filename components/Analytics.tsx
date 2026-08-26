"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { CLAVE_CONSENTIMIENTO, GA_ID } from "@/lib/analytics";

/* El arranque de gtag va en un script que corre ANTES que gtag.js: el
   `consent default` tiene que estar en la cola cuando la librería se
   inicializa, o la primera medición se hace sin restricción.

   `send_page_view: false` porque la vista la mandamos a mano — con el
   App Router la navegación entre /gracias, /terminos y la landing no
   recarga la página y GA4 no se enteraría. */
function arranque(gaId: string) {
  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
try {
  if (localStorage.getItem('${CLAVE_CONSENTIMIENTO}') === 'otorgado') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', '${gaId}', { send_page_view: false, anonymize_ip: true });
`.trim();
}

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;
    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  /* Sin la variable de entorno no se carga nada: local y preview quedan
     limpios sin tener que comentar código. */
  if (!GA_ID) return null;

  return (
    <>
      {/* Script plano y no <Script strategy="beforeInteractive">: esa
          estrategia es del Pages Router y aquí solo produce un warning.
          Un <script> inline sin `src` es síncrono y corre en cuanto el
          parser lo encuentra — que es exactamente lo que hace falta, y
          pasa mucho antes de que `afterInteractive` cargue gtag.js. */}
      <script dangerouslySetInnerHTML={{ __html: arranque(GA_ID) }} />
      {/* En el HTML servido aparece un <link rel="preload"> de gtag.js
          dentro del <head>, o sea ANTES de este script inline. No es un
          problema y no hay que "arreglarlo": un preload descarga el
          archivo pero no lo ejecuta. gtag.js corre después de la
          hidratación, cuando el consentimiento por defecto lleva rato
          en la cola de dataLayer. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
