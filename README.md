# AssetBase ERP — Landing

Landing de conversión para AssetBase ERP. Next.js 15 (App Router) · Tailwind CSS 4 · lucide-react · Framer Motion.

```bash
npm install
npm run dev        # http://localhost:3000
```

---

## Estructura

```
app/
  layout.tsx          fuentes, metadata, dominio canónico
  page.tsx            orden de secciones
  globals.css         tokens de color, tipografía y keyframes
  not-found.tsx       404 con marca y salida a la demo
  gracias/            destino del formulario cuando no hay JS
  api/demo/route.ts   recepción y entrega de los leads
components/
  Mark.tsx            el imagotipo en SVG — servidor, sin framer-motion
  MarkAnimated.tsx    la variante que se arma por capas (solo la intro)
  MotionProvider.tsx  MotionConfig: reduced-motion para todo el árbol
  Intro.tsx           intro de marca, 1.8 s, descartable
  Header.tsx          header sticky + menú desplegable bajo lg
  Hero.tsx            promesa + captura del producto
  HeroBackdrop.tsx    fondo animado
  StatBand.tsx        la única franja saturada
  Sections.tsx        dolor · implementación · módulos
  Comparison.tsx      AssetBase vs Odoo vs Excel
  Pricing.tsx         planes
  Faq.tsx             objeciones (acordeón)
  DemoForm.tsx        la conversión
  Footer.tsx
  Year.tsx            el año del copyright, corregido en cliente
  Analytics.tsx       GA4 con Consent Mode v2
  CookieBanner.tsx    la banda de consentimiento
  LogoStrip.tsx       prueba social
  Reveal.tsx          animación de entrada + Kicker
lib/
  content.ts          TODO el texto y los datos
  mark.ts             los trazos del imagotipo, en un solo lugar
  site.ts             el dominio canónico
  analytics.ts        consentimiento y eventos
scripts/
  google-apps-script.gs   recibe los leads en una hoja de Google
```

**Para cambiar palabras, edita solo `lib/content.ts`.** Los componentes no llevan copy incrustado.

---

## Color

Los tokens salen del *Manual de identidad corporativa* (pág. 19). Están en `app/globals.css`:

| Rampa | Uso |
|---|---|
| **Boston Blue** (primario) | `300 #2290B5` es el azul del logotipo · `400 #45A0E6` es el acento · `800 #193B55` paneles · `950 #102A3C` fondo |
| **Cascade** (secundario) | `50 #F5FBF7` texto · `300 #96AFAA` texto atenuado |
| **Mercury** (neutros) | disponible, sin uso en esta página |

### La regla de contraste que hay que respetar

`boston-400` da **5.19:1** sobre el fondo (`boston-950`) pero solo **4.1:1** sobre los paneles (`boston-800`) — por debajo del mínimo AA.

Por eso cada panel redefine el acento localmente:

```tsx
className="bg-surface [--color-accent:var(--color-accent-on-surface)]"
```

Eso cambia el **texto** del acento a `boston-200` (6.49:1 sobre el panel) y mantiene `boston-400` para líneas y marcas de 1px. **Si agregas un panel nuevo sobre `bg-surface`, agrega también esa clase.**

La regla aplica igual cuando el panel aparece *en hover*. Las filas de Implementación y Módulos viven sobre `ground` y solo pasan a `surface` al pasar el cursor, así que llevan el override en la variante:

```tsx
className="hover:bg-surface hover:[--color-accent:var(--color-accent-on-surface)]"
```

---

## Tipografía

Reem Kufi (titulares) + Raleway (texto), vía `next/font`. El manual autoriza cinco tipografías; esta landing usa dos a propósito — con cinco, cada pieza se ve distinta y la marca no acumula reconocimiento.

Si prefieren Sulphur Point para titulares (la primaria del manual), cámbienlo en `app/layout.tsx`; es una línea.

---

## Pendientes antes de producción

1. **Precios reales.** `lib/content.ts` → `plans[].price` trae `$X,XXX`. Publicar precio es de los cambios de mayor impacto en conversión para compradores de PyME; el competidor lo publica.
2. **Capturas del producto.** `public/producto-panel.png` y `public/producto-reporte.png` son marcadores. Un ERP se vende mostrando el software.
3. **Logos de clientes** en `public/clientes/`. Si aún no hay volumen, cambien la franja por **un caso con nombre y una cifra verificable** — es más creíble y es honesto.
4. **Llenar las variables de entorno.** El circuito del formulario y el de analítica están hechos y probados; falta pegar las credenciales (ver `.env.example`). Sin ellas `/api/demo` responde 503 a propósito y GA4 ni se carga. Cuando haya volumen, enchufar además un calendario (Cal.com, Calendly) para que el visitante elija horario sin esperar respuesta.
5. **Un solo dominio.** `SITE` en `app/layout.tsx`. El sitio anterior servía desde `erp.assetbase.org` con `og:url` apuntando a `erp.assetbase.com.mx` — elijan uno, 301 al resto.
6. **Teléfono y WhatsApp reales** en `lib/content.ts` → `contact`.
7. **Decidir el posicionamiento.** `ACTIVE_WEDGE` en `lib/content.ts` alterna tres titulares: cumplimiento fiscal, plazo de implementación, o ambos. Es una decisión de negocio, no de diseño.

---

## El formulario

Es el único punto de conversión de la página, así que el circuito completo está probado de punta a punta.

**Entrega.** `app/api/demo/route.ts` intenta por todos los canales configurados y basta con que **uno** llegue:

| Variable | Qué hace |
|---|---|
| `RESEND_API_KEY` + `DEMO_EMAIL_FROM` + `DEMO_EMAIL_TO` | Correo directo por la API REST de Resend. El `reply-to` es el prospecto: responder el correo es responderle a él. |
| `DEMO_WEBHOOK_URL` (+ `DEMO_WEBHOOK_TOKEN`) | POST JSON. Aquí va la hoja de Google — el script y sus instrucciones están en `scripts/google-apps-script.gs`. Sirve igual para Zapier, Make, n8n, HubSpot o un CRM propio. |

Están configurados los dos: **el correo avisa al momento y la hoja queda como registro consultable.**

### La hoja de Google

`scripts/google-apps-script.gs` lleva las instrucciones completas en su encabezado. Tres cosas que cuestan una tarde si no se saben:

- El script tiene que crearse **desde la hoja** (Extensiones → Apps Script), no desde `script.google.com`. Si no, `getActiveSpreadsheet()` no encuentra nada.
- Al publicarlo hay que elegir **«Cualquier usuario»**, porque no hay forma de autenticar por OAuth desde un servidor externo. Por eso `DEMO_WEBHOOK_TOKEN` no es opcional en la práctica: sin él, quien descubra la URL puede escribir filas.
- Cada cambio al código necesita una **implementación nueva**. Si solo guardas, la URL sigue sirviendo la versión vieja — es el error más común con Apps Script.

Apps Script siempre responde `200`, incluso cuando su código truena o rechaza el token, así que `entregarWebhook()` además lee el cuerpo y trata `{"ok": false}` como fallo. Solo ese caso explícito: Zapier y HubSpot contestan con otras formas y no hay que confundirlas con un error.

Si no hay ninguna configurada la ruta responde **503 a propósito** y el visitante ve la salida por WhatsApp. Nunca se confirma una demo que no se registró — y el lead queda escrito en los logs del servidor, que son recuperables.

**Sin JavaScript también funciona.** El `<form>` conserva `method="post"` y `action="/api/demo"`. El envío con JS manda `accept: application/json` y pinta la confirmación sin recargar; el POST nativo no lo manda y la ruta lo redirige (303) a `/gracias`. Antes esa ruta contestaba JSON siempre, así que sin JS el visitante terminaba viendo `{"ok":true}` sobre fondo blanco.

**Defensas.** Honeypot (`empresa_extra`, fuera de pantalla y del orden de tabulación) que responde «ok» para no enseñarle al bot a esquivarlo, y límite de 5 envíos por IP cada 15 minutos. El límite vive en memoria a propósito: frena un bucle de `curl` pero no un ataque distribuido, porque en serverless cada instancia tiene su propio contador. Si el volumen lo amerita, mover a Redis.

**Errores.** La ruta devuelve `campos` en los 422 y el formulario marca esos campos en rojo con `aria-invalid` y los nombra en el mensaje. Al confirmar, el foco se mueve al encabezado de la confirmación: el panel entero se reemplaza y antes el foco quedaba huérfano en un botón que ya no existía.

---

## Analítica

Google Analytics 4, con **Consent Mode v2**. Vive en `Analytics.tsx`, `CookieBanner.tsx` y `lib/analytics.ts`.

**Sin `NEXT_PUBLIC_GA_ID` no se carga nada.** En local y en preview la página queda limpia y las métricas no se ensucian con tráfico de desarrollo. La banda de consentimiento tampoco aparece.

**El consentimiento arranca denegado.** Un script inline declara `analytics_storage: 'denied'` antes de que gtag.js se ejecute, así que no se escribe ninguna cookie hasta que el visitante acepta. «Rechazar» tiene el mismo peso visual que «Aceptar»: un rechazo escondido no es consentimiento, y la LFPDPPP pide una vía real de oposición.

> **Lo que hay que decidir con su abogado:** con `denied`, GA4 no pone cookies pero **sí manda pings sin cookie** que Google usa para modelar. Es lo que Google recomienda y lo que hace la mayoría. Si prefieren que no salga ni un ping antes del «acepto», hay que mover el `<Script src>` de `Analytics.tsx` detrás del estado de consentimiento — es un `if`. El aviso de privacidad ya declara el uso de GA4 y ofrece cómo rechazarlo.

**La conversión se mide en `DemoForm`, no en `/gracias`.** Con JS el visitante nunca navega a esa página, así que medirla allá dejaría fuera a casi todos. El evento es `generate_lead`, que GA4 reconoce y se puede marcar como conversión en la interfaz sin configurar nada más; lleva el rango de usuarios como parámetro, que es lo que separa un lead de cinco personas de uno de cincuenta.

**Las vistas se mandan a mano** (`send_page_view: false`). Con el App Router, navegar entre la landing, `/gracias` y las páginas legales no recarga nada y GA4 no se enteraría.

Un detalle que parece un bug y no lo es: en el HTML servido, un `<link rel="preload">` de gtag.js aparece en el `<head>`, o sea antes del script inline de consentimiento. Un preload descarga pero **no ejecuta**, así que el orden real es el correcto. Está comentado en el archivo para que nadie lo «arregle».

---

## Notas de decisiones

- **La intro nunca bloquea.** `pointer-events: none` todo el tiempo y cualquier interacción la descarta. Un interstitial que no se puede saltar frente al CTA principal es justo la fricción que esta página existe para quitar.
- **Un solo CTA.** La versión anterior competía entre demo, prueba gratis, cotización y WhatsApp. Aquí el primario es la demo agendada y WhatsApp es el secundario. La prueba gratis vuelve cuando exista un onboarding que cargue datos reales.
- **La comparativa es honesta.** La columna de Odoo no está inflada a la baja. Exagerarla es la forma más rápida de perder el trato que acabas de ganar.
- **Todo respeta `prefers-reduced-motion`.** El bloque `@media` de `globals.css` apaga las animaciones de CSS, pero framer-motion anima por JS y no se entera: por eso el árbol va envuelto en `<MotionConfig reducedMotion="user">` (`MotionProvider.tsx`), que descarta transformadas y layout y deja pasar opacidad y color. Lo que no es una transformada — el `letterSpacing` de la intro — se apaga a mano con `useReducedMotion()`. **Si agregas un `motion.*` nuevo, ya queda cubierto; si animas una propiedad que no sea transformada, revísala a mano.**
- **El header cambia de forma bajo `lg`.** Antes era una sola fila con `flex-wrap` a cualquier ancho y en móvil no cabía: los cinco enlaces se apilaban y el header sticky se comía el viewport. Debajo de `lg` va menú desplegable y el header conserva sus 64px, que es lo que asume el `scroll-padding-top`.
- **SEO.** El sitio anterior servía HTML vacío: sin `h1`, sin texto, sin enlaces internos. Este proyecto renderiza en servidor por defecto — solo `Intro`, `Header`, `HeroBackdrop`, `Faq`, `DemoForm` y `Reveal` son cliente. No los conviertas a `dynamic(..., { ssr: false })`.
