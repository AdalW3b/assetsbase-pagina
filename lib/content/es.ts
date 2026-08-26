/* ─────────────────────────────────────────────────────────────
   TODO el texto en español de la página vive aquí.

   Este archivo define además la FORMA del contenido: `en.ts` se declara
   como `Content`, que es `typeof es`. Si agregas una llave aquí y no allá,
   el build falla — es la manera de que no se quede media traducción a la
   mitad sin que nadie se entere.

   Voz: directa y comercial, de tú.
   ───────────────────────────────────────────────────────────── */

export const es = {
  /* ── Metadatos ───────────────────────────────────────────── */
  meta: {
    title: "AssetBase ERP — Cierra el mes en un día, no en tres semanas",
    titleTemplate: "%s · AssetBase ERP",
    description:
      "Sistema ERP para PyME en México. Finanzas, inventario y nómina en un solo sistema, con timbrado CFDI 4.0 nativo. Lo dejamos operando en tres semanas, con tus datos ya dentro.",
    keywords: [
      "ERP para PyME",
      "sistema ERP México",
      "software administrativo PyME",
      "CFDI 4.0",
      "control de inventarios",
      "nómina IMSS",
    ],
    ogTitle: "AssetBase ERP — Cierra el mes en un día, no en tres semanas",
    ogDescription:
      "Finanzas, inventario y nómina de tu PyME en un solo sistema, con facturación al día con el SAT. En operación en tres semanas.",
    organizationDescription:
      "Sistema ERP para PyME en México: finanzas, inventario, nómina y activos fijos en un solo sistema, con timbrado CFDI 4.0 nativo.",
    areaServed: "México",
    ogImageAlt: "AssetBase ERP — el ERP para PyME en México",
    ogImageSub: "Finanzas, inventario y nómina de tu PyME en un solo sistema.",
    ogImageChips: [
      "Timbrado CFDI 4.0 incluido",
      "Migración hecha por nosotros",
      "En operación en 3 semanas",
    ],
  },

  /* ── Chrome: header, navegación, footer ──────────────────── */
  nav: [
    { label: "Módulos", href: "#modulos" },
    { label: "Implementación", href: "#implementacion" },
    { label: "Comparativa", href: "#comparativa" },
    { label: "Precio", href: "#precio" },
    { label: "Preguntas", href: "#preguntas" },
  ],

  header: {
    home: "AssetBase — inicio",
    cta: "Agenda una demo",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },

  /* El botón de idioma. `switchTo` es lo que se lee en pantalla: siempre
     nombra el idioma AL QUE se va, no el actual — un botón que dice
     "Español" mientras estás en español no le dice nada a nadie. */
  language: {
    switchTo: "EN",
    aria: "Ver esta página en inglés",
  },

  footer: {
    tagline: "Maximizando el valor de tus activos desde la base.",
    product: "Producto",
    contact: "Contacto",
    legal: "Legal",
    privacy: "Aviso de privacidad",
    terms: "Términos de servicio",
    rights: "Todos los derechos reservados.",
  },

  contact: {
    city: "Ciudad de México",
  },

  /* ── Hero ────────────────────────────────────────────────── */
  hero: {
    ctaPrimary: "Agenda una demo de 20 minutos",
    ctaWhatsapp: "O escríbenos por WhatsApp",
    chips: [
      "Timbrado CFDI 4.0 incluido",
      "Migración de datos hecha por nosotros",
      "Soporte en español, con nombre",
    ],
    panelLabel: "Panel de dirección · Agosto",
    panelLive: "En vivo",
    panelAlt: "Panel principal de AssetBase con los indicadores del mes",
    caption:
      "Cifras reales, actualizadas en el momento en que se registra el movimiento.",
  },

  /* Tres cuñas de posicionamiento. El hallazgo #1 de la auditoría: la marca
     no tenía diferenciador articulado, así que el titular depende de esta
     elección. Cambia ACTIVE_WEDGE en index.ts para probar otra. */
  wedges: {
    "fiscal+plazo": {
      headline: "Cierra el mes en un día, no en tres semanas.",
      sub: "AssetBase reúne finanzas, inventario y nómina de tu PyME en un solo sistema, con facturación al día con el SAT. Lo dejamos operando en tres semanas — con tus datos ya dentro.",
    },
    fiscal: {
      headline: "El ERP que ya habla con el SAT.",
      sub: "Timbrado CFDI 4.0, complemento de pago, DIOT y nómina con IMSS de fábrica — no como módulo de terceros. Finanzas, inventario y nómina en un solo sistema hecho para México.",
    },
    plazo: {
      headline: "En operación en tres semanas.",
      sub: "Sin proyecto de seis meses y sin consultor externo. Nosotros migramos tus datos, configuramos tus procesos y acompañamos a tu equipo hasta que el sistema es el que manda.",
    },
  },

  /* ── Prueba social y cifras ──────────────────────────────── */
  logoStrip: {
    label: "Ya operan con AssetBase",
  },

  stats: {
    aria: "AssetBase en números",
    items: [
      { figure: "3 semanas", label: "De la firma a la operación" },
      { figure: "CFDI 4.0", label: "Timbrado nativo, sin terceros" },
      { figure: "1 sistema", label: "En lugar de cinco hojas de cálculo" },
      { figure: "20 min", label: "Lo que tarda la demo" },
    ],
  },

  /* ── El costo de no cambiar ──────────────────────────────── */
  pain: {
    kicker: "El costo de no cambiar",
    heading: "Nadie compra un ERP. Se compra dejar de perder dinero en lo mismo.",
    items: [
      {
        title: "El inventario y las ventas nunca coinciden",
        body: "Dos reportes, dos cifras, y nadie sabe cuál creer. Se decide sobre el que llegó primero.",
      },
      {
        title: "El cierre de mes se lleva tres semanas",
        body: "Cuando por fin tienes el número, ya es historia. Corriges el mes pasado en lugar de dirigir el actual.",
      },
      {
        title: "Cinco herramientas que no se hablan",
        body: "Un sistema para facturar, otro para nómina, y el resto en hojas que solo una persona entiende.",
      },
      {
        title: "Crecer duele más de lo que debería",
        body: "Cada sucursal, almacén o empleado nuevo agrega trabajo manual en vez de absorberse solo.",
      },
    ],
  },

  /* ── Implementación ──────────────────────────────────────── */
  implementation: {
    kicker: "Implementación",
    heading: "Tres semanas, tres pasos, un responsable con nombre.",
    lead: "El riesgo de un ERP no es el precio, es quedarse a medias. Por eso la implementación no se cotiza aparte: es el producto. Firmas un plan con fechas, no una promesa.",
    steps: [
      {
        week: "Semana 01",
        title: "Diagnóstico",
        body: "Recorremos tu operación real —no un cuestionario— y definimos qué se configura, qué se migra y qué se deja fuera. Sales de esta semana con un plan escrito y una fecha de arranque.",
      },
      {
        week: "Semana 02",
        title: "Migración de tus datos",
        body: "Nosotros cargamos catálogo, inventario, clientes, proveedores y saldos. Tú validas. Aquí es donde la mayoría de las implementaciones se detienen — y es la parte que no te dejamos hacer solo.",
      },
      {
        week: "Semana 03",
        title: "Operación acompañada",
        body: "Tu equipo trabaja en el sistema con nosotros al lado, todos los días, hasta que el primer cierre sale de AssetBase y no de la hoja de cálculo.",
      },
    ],
  },

  /* ── Módulos ─────────────────────────────────────────────── */
  modules: {
    kicker: "Módulos",
    heading: "Un solo lugar donde el número es el número.",
    lead: "Los módulos comparten la misma base de datos, así que una venta descuenta inventario, genera la factura timbrada y aparece en el estado de resultados sin que nadie capture nada dos veces.",
    cta: "Ver el sistema en una demo →",
    figureAlt: "Reporte de inventario y ventas generado por AssetBase",
    items: [
      {
        n: "01",
        title: "Finanzas y facturación",
        body: "Ingresos, egresos, cuentas por cobrar y estado de resultados en tiempo real. Timbrado CFDI 4.0 y complemento de pago desde el mismo lugar donde registras la venta.",
      },
      {
        n: "02",
        title: "Inventarios y almacenes",
        body: "Existencias por almacén, costeo, mínimos y traspasos. Cada movimiento queda amarrado al documento que lo generó, así que el faltante siempre tiene explicación.",
      },
      {
        n: "03",
        title: "Nómina y personal",
        body: "Cálculo con IMSS e ISR, recibos timbrados y expediente del colaborador. La nómina deja de ser un archivo que vive en la computadora de una sola persona.",
      },
      {
        n: "04",
        title: "Activos fijos",
        body: "Altas, depreciación, mantenimiento y bajas. Dónde está cada activo, cuánto vale hoy y cuánto ha costado mantenerlo desde que entró.",
      },
    ],
  },

  /* ── Comparativa ─────────────────────────────────────────── */
  comparison: {
    kicker: "Comparativa",
    heading: "Ya estás comparando. Te ahorramos la tarde.",
    lead: "Odoo es un buen producto y a veces es la respuesta correcta. Esto es lo que cambia para una PyME mexicana que necesita operar el mes que entra.",
    tableAria: "Tabla comparativa",
    tableCaption: "AssetBase comparado con Odoo y con llevar la operación en Excel",
    criterion: "Criterio",
    note: "Si tu operación necesita manufactura por lotes, comercio exterior o varias monedas, te lo decimos en el diagnóstico y te sugerimos la alternativa. Preferimos no venderte que dejarte a medias.",
    columns: ["AssetBase", "Odoo", "Excel + contador"],
    rows: [
      {
        feature: "Timbrado CFDI 4.0",
        values: ["Nativo, incluido", "Vía módulo de localización o socio", "Se factura aparte, a mano"],
      },
      {
        feature: "Nómina con IMSS e ISR",
        values: ["Módulo propio", "Según el socio que la implemente", "Despacho externo"],
      },
      {
        feature: "Migración de tus datos",
        values: ["La hacemos nosotros, incluida", "Se cotiza como proyecto", "No aplica — los datos se quedan"],
      },
      {
        feature: "Tiempo hasta operar",
        values: ["Tres semanas, por escrito", "Depende del alcance y del socio", "Inmediato, y ahí está el problema"],
      },
      {
        feature: "Con quién hablas cuando algo falla",
        values: ["La persona que implementó tu cuenta", "Tu socio implementador", "Con quien hizo el archivo"],
      },
      {
        feature: "Precio publicado",
        values: ["Sí, en esta página", "Sí, más el costo del socio", "Aparentemente cero"],
      },
    ],
  },

  /* ── Precio ──────────────────────────────────────────────── */
  pricing: {
    kicker: "Precio",
    heading: "Precio publicado. Sin «solicitar cotización».",
    lead: "Si tienes que llamar para saber cuánto cuesta, ya perdiste una tarde. La implementación de tres semanas va incluida en los dos primeros planes.",
    note: "Tus datos son tuyos. Exportación completa en cualquier momento, sin costo y sin plazo forzoso.",
    plans: [
      {
        kicker: "Operación",
        name: "Esencial",
        price: "$X,XXX",
        unit: "MXN / mes",
        seats: "Hasta 5 usuarios",
        body: "Finanzas, facturación e inventario. Un almacén. Implementación de tres semanas incluida.",
        cta: "Ver en demo",
        featured: false,
      },
      {
        kicker: "Recomendado",
        name: "Completo",
        price: "$X,XXX",
        unit: "MXN / mes",
        seats: "Hasta 20 usuarios",
        body: "Todos los módulos, incluidos nómina y activos fijos. Múltiples almacenes y sucursales. Soporte con tiempo de respuesta comprometido.",
        cta: "Agenda una demo",
        featured: true,
      },
      {
        kicker: "Grupo",
        name: "A medida",
        price: "Hablemos",
        unit: "",
        seats: "Más de 20 usuarios o varias empresas",
        body: "Consolidación entre empresas, integraciones a tu medida y acompañamiento dedicado.",
        cta: "Contactar",
        featured: false,
      },
    ],
  },

  /* ── Preguntas ───────────────────────────────────────────── */
  faq: {
    kicker: "Preguntas",
    heading: "Lo que se pregunta antes de firmar",
    items: [
      {
        q: "¿Qué pasa con todo lo que tengo en Excel y en mi sistema actual?",
        a: "Lo migramos nosotros en la semana 2: catálogo, inventario, clientes, proveedores y saldos iniciales. Tú validas que los números cuadren antes de arrancar. No se captura de nuevo a mano.",
      },
      {
        q: "¿De verdad tres semanas?",
        a: "Para una PyME de un solo giro, sí, y lo ponemos por escrito con fechas. Si tu operación necesita más —varias empresas, manufactura por lotes, integraciones— te lo decimos en el diagnóstico, antes de que firmes.",
      },
      {
        q: "¿Necesito alguien de sistemas en mi empresa?",
        a: "No. Es en la nube, no hay servidor que mantener, y la configuración la hacemos nosotros. Lo que sí necesitas es una persona de tu equipo que conozca la operación y pueda dedicarle unas horas por semana.",
      },
      {
        q: "¿Y si quiero irme? ¿Mis datos son míos?",
        a: "Son tuyos. Exportación completa en formatos abiertos, cuando quieras, sin costo y sin tener que pedirla por escrito. No hay plazo forzoso.",
      },
      {
        q: "Son una empresa nueva. ¿Por qué debería confiar?",
        a: "Es la pregunta correcta. Somos nuevos, y eso significa que tu cuenta importa: te atiende gente con nombre, no un número de ticket. Habla con nuestros clientes actuales antes de decidir — te los presentamos.",
      },
    ],
  },

  /* ── El formulario, único punto de conversión ────────────── */
  demo: {
    heading: "Veinte minutos y sales sabiendo si te sirve.",
    lead: "Te atiende un especialista en operación, no un vendedor con un guion, y te mostramos el sistema con datos parecidos a los tuyos.",
    steps: [
      {
        title: "Eliges el horario",
        body: "Confirmación inmediata, sin esperar a que alguien te llame.",
      },
      {
        title: "Vemos tu operación, no una presentación",
        body: "Nos cuentas cómo trabajas hoy y te mostramos ese flujo dentro del sistema.",
      },
      {
        title: "Sales con un plan y un precio",
        body: "Y si no eres nuestro cliente ideal, te lo decimos en la llamada.",
      },
    ],
    form: {
      title: "Agenda tu demo",
      sub: "Cinco campos. Te confirmamos el mismo día.",
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      company: "Empresa",
      companyPlaceholder: "Razón social o marca",
      email: "Correo",
      emailPlaceholder: "tu@empresa.com",
      phone: "Teléfono o WhatsApp",
      phoneOptional: "(opcional)",
      phonePlaceholder: "55 0000 0000",
      phoneHelp: "A diez dígitos, con lada.",
      users: "¿Cuántas personas usarían el sistema?",
      /* Solo etiquetas. El valor que se envía sale de USER_RANGES en
         index.ts y es el mismo en los dos idiomas: la ruta lo valida
         contra esa lista y es lo que queda escrito en la hoja de Google.
         Van por posición, así que el orden importa. */
      userRanges: ["1 a 5", "6 a 20", "21 a 50", "Más de 50"],
      honeypot: "No llenar",
      submit: "Agendar mi demo de 20 minutos",
      sending: "Enviando…",
      successTitle: "Listo, te confirmamos hoy mismo.",
      successBody:
        "Revisa tu correo. Si prefieres adelantar, escríbenos por WhatsApp y lo agendamos ahora.",
      successCta: "Escribir por WhatsApp",
      errorGeneric: "No pudimos registrar tu solicitud.",
      /* El 422 nombra los campos en rojo Y en el texto. `review` abre la
         frase y `and` es el conector de la última coma — en inglés no es
         " y ", así que no puede quedar incrustado en el componente. */
      review: "Revisa",
      and: "y",
      fieldNames: {
        nombre: "el nombre",
        empresa: "la empresa",
        correo: "el correo",
        telefono: "el teléfono",
        usuarios: "el número de usuarios",
      },
      errorReachUs: "Escríbenos por",
      errorOr: "o a",
      errorClose: "y lo agendamos ahora.",
      preferWrite: "¿Prefieres escribir primero?",
      preferWriteCta: "Mándanos un WhatsApp",
      privacyNote: "Sin tarjeta y sin compromiso. Usamos tus datos solo para contactarte —",
      privacyLink: "aviso de privacidad",
    },
  },

  /* ── Consentimiento de analítica ─────────────────────────── */
  cookies: {
    aria: "Consentimiento de analítica",
    body: "Usamos cookies de analítica para saber qué partes de esta página sirven y cuáles no. Nada de publicidad ni de seguimiento entre sitios. Puedes rechazarlas y la página funciona igual —",
    privacyLink: "aviso de privacidad",
    reject: "Rechazar",
    accept: "Aceptar",
  },

  /* ── Envoltura de las páginas legales ────────────────────── */
  legal: {
    updated: "Última actualización:",
  },

  /* ── 404 ─────────────────────────────────────────────────── */
  notFound: {
    title: "Página no encontrada",
    eyebrow: "Error 404",
    heading: "Esta página no existe.",
    body: "Puede que el enlace esté viejo o que la dirección tenga un error de dedo. Lo que buscas probablemente esté en la página principal — y si venías a ver el sistema, ese camino sigue abierto.",
    ctaDemo: "Agenda una demo de 20 minutos",
    ctaHome: "Ir al inicio",
    contactNote: "¿Buscabas algo en concreto? Escríbenos a",
  },

  /* ── /gracias, la salida del formulario sin JavaScript ───── */
  thanks: {
    title: "Gracias",
    okEyebrow: "Solicitud recibida",
    okHeading: "Listo, te confirmamos hoy mismo.",
    okBody:
      "Revisa tu correo en las próximas horas: ahí llega el horario y la liga de la sesión. Si prefieres adelantarlo, escríbenos por WhatsApp y lo agendamos ahora mismo.",
    errorEyebrow: "No se registró",
    errorHeading: "No pudimos registrar tu solicitud.",
    /* Parte en tres porque el "no" va en negritas: es la palabra que evita
       que alguien se vaya creyendo que su demo quedó agendada. */
    errorBodyStart: "Algo falló de nuestro lado, así que tu demo",
    errorBodyStrong: "no",
    errorBodyEnd:
      "quedó agendada. No queremos que te vayas creyendo que sí: escríbenos y lo resolvemos en el momento.",
    ctaWhatsapp: "Escribir por WhatsApp",
    back: "Volver al inicio",
  },
};

export type Content = typeof es;
