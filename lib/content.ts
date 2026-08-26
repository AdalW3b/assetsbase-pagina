import { Layers, ShieldCheck, Users, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   All page copy lives here so the marketing team can edit words
   without touching layout. Voice: directo y comercial, tú.
   ───────────────────────────────────────────────────────────── */

export const contact = {
  phone: "56 6601 0033",
  phoneHref: "tel:+525666010033",
  email: "hola@assetbase.com.mx",
  whatsapp: "https://wa.me/525666010033",
  city: "Ciudad de México",
};

export const nav = [
  { label: "Módulos", href: "/#modulos" },
  { label: "Implementación", href: "/#implementacion" },
  { label: "Comparativa", href: "/#comparativa" },
  { label: "Precio", href: "/#precio" },
  { label: "Preguntas", href: "/#preguntas" },
];

/* Three positioning wedges. The audit's finding #1: the brand has no
   articulated differentiator, so the headline depends on this choice.
   Flip ACTIVE_WEDGE to preview another one. */
export type WedgeKey = "fiscal+plazo" | "fiscal" | "plazo";

export const ACTIVE_WEDGE: WedgeKey = "fiscal+plazo";

export const wedges: Record<WedgeKey, { headline: string; sub: string }> = {
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
};

export const heroChips = [
  "Timbrado CFDI 4.0 incluido",
  "Migración de datos hecha por nosotros",
  "Soporte en español, con nombre",
];

export const stats = [
  { figure: "3 semanas", label: "De la firma a la operación" },
  { figure: "CFDI 4.0", label: "Timbrado nativo, sin terceros" },
  { figure: "1 sistema", label: "En lugar de cinco hojas de cálculo" },
  { figure: "20 min", label: "Lo que tarda la demo" },
];

export const painPoints: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Layers,
    title: "El inventario y las ventas nunca coinciden",
    body: "Dos reportes, dos cifras, y nadie sabe cuál creer. Se decide sobre el que llegó primero.",
  },
  {
    icon: TrendingUp,
    title: "El cierre de mes se lleva tres semanas",
    body: "Cuando por fin tienes el número, ya es historia. Corriges el mes pasado en lugar de dirigir el actual.",
  },
  {
    icon: Users,
    title: "Cinco herramientas que no se hablan",
    body: "Un sistema para facturar, otro para nómina, y el resto en hojas que solo una persona entiende.",
  },
  {
    icon: ShieldCheck,
    title: "Crecer duele más de lo que debería",
    body: "Cada sucursal, almacén o empleado nuevo agrega trabajo manual en vez de absorberse solo.",
  },
];

export const implementation = [
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
];

export const modules = [
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
];

export const comparison = {
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
};

/* TODO — precios reales. Publicar precio es uno de los cambios de mayor
   impacto en conversión para compradores de PyME: el competidor lo publica.
   Sustituir `price` por el valor real antes de salir a producción. */
export const plans = [
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
];

export const faqs = [
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
];

export const demoSteps = [
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
];
