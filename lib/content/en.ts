import type { Content } from "./es";

/* ─────────────────────────────────────────────────────────────
   English copy.

   Tipado como `Content`, que es `typeof es`: si falta una llave o sobra
   una, el build falla. Es a propósito — una traducción a medias que sale
   a producción es peor que un error de compilación.

   Criterio de traducción: SAT, CFDI, IMSS, ISR y DIOT NO se traducen.
   Son el diferenciador del producto y quien compra un ERP en México los
   conoce por su nombre; traducirlos los volvería genéricos. Se glosan la
   primera vez que aparecen para quien llega de fuera.

   Voz: la misma que en español — directa, comercial, de tú.
   ───────────────────────────────────────────────────────────── */

export const en: Content = {
  /* ── Metadata ────────────────────────────────────────────── */
  meta: {
    title: "AssetBase ERP — Close the month in a day, not three weeks",
    titleTemplate: "%s · AssetBase ERP",
    description:
      "ERP software for small and midsize businesses in Mexico. Finance, inventory and payroll in one system, with native CFDI 4.0 e-invoicing. Live in three weeks, with your data already in it.",
    keywords: [
      "ERP for SMBs",
      "ERP software Mexico",
      "business management software SMB",
      "CFDI 4.0",
      "inventory management",
      "IMSS payroll",
    ],
    ogTitle: "AssetBase ERP — Close the month in a day, not three weeks",
    ogDescription:
      "Finance, inventory and payroll for your business in one system, invoicing compliant with the SAT. Live in three weeks.",
    organizationDescription:
      "ERP software for small and midsize businesses in Mexico: finance, inventory, payroll and fixed assets in one system, with native CFDI 4.0 e-invoicing.",
    areaServed: "Mexico",
    ogImageAlt: "AssetBase ERP — the ERP for small and midsize businesses in Mexico",
    ogImageSub: "Finance, inventory and payroll for your business in one system.",
    ogImageChips: [
      "CFDI 4.0 stamping included",
      "We migrate your data",
      "Live in 3 weeks",
    ],
  },

  /* ── Chrome ──────────────────────────────────────────────── */
  /* Los anchors NO se traducen: son los mismos ids de sección en las dos
     versiones, así que un enlace profundo sirve en cualquiera de las dos. */
  nav: [
    { label: "Modules", href: "#modulos" },
    { label: "Rollout", href: "#implementacion" },
    { label: "Comparison", href: "#comparativa" },
    { label: "Pricing", href: "#precio" },
    { label: "FAQ", href: "#preguntas" },
  ],

  header: {
    home: "AssetBase — home",
    cta: "Book a demo",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  language: {
    switchTo: "ES",
    aria: "Ver esta página en español",
  },

  footer: {
    tagline: "Getting the most out of your assets, from the ground up.",
    product: "Product",
    contact: "Contact",
    legal: "Legal",
    privacy: "Privacy notice",
    terms: "Terms of service",
    rights: "All rights reserved.",
  },

  contact: {
    city: "Mexico City",
  },

  /* ── Hero ────────────────────────────────────────────────── */
  hero: {
    ctaPrimary: "Book a 20-minute demo",
    ctaWhatsapp: "Or message us on WhatsApp",
    chips: [
      "CFDI 4.0 e-invoicing included",
      "We migrate your data for you",
      "Support with a name, not a ticket number",
    ],
    panelLabel: "Executive dashboard · August",
    panelLive: "Live",
    panelAlt: "AssetBase main dashboard showing this month's indicators",
    caption:
      "Real figures, updated the moment the transaction is recorded.",
  },

  wedges: {
    "fiscal+plazo": {
      headline: "Close the month in a day, not three weeks.",
      sub: "AssetBase brings your finance, inventory and payroll into a single system, with invoicing that stays compliant with the SAT, Mexico's tax authority. We get it running in three weeks — with your data already in it.",
    },
    fiscal: {
      headline: "The ERP that already speaks to the SAT.",
      sub: "CFDI 4.0 stamping, payment complements, DIOT and IMSS payroll built in — not bolted on by a third party. Finance, inventory and payroll in one system, built for Mexico.",
    },
    plazo: {
      headline: "Up and running in three weeks.",
      sub: "No six-month project and no outside consultant. We migrate your data, configure your processes and stay with your team until the system is the one calling the shots.",
    },
  },

  /* ── Social proof and figures ────────────────────────────── */
  logoStrip: {
    label: "Already running on AssetBase",
  },

  stats: {
    aria: "AssetBase by the numbers",
    items: [
      { figure: "3 weeks", label: "From signing to running" },
      { figure: "CFDI 4.0", label: "Native stamping, no third party" },
      { figure: "1 system", label: "Instead of five spreadsheets" },
      { figure: "20 min", label: "How long the demo takes" },
    ],
  },

  /* ── The cost of not changing ────────────────────────────── */
  pain: {
    kicker: "The cost of not changing",
    heading: "Nobody buys an ERP. They buy an end to losing money the same way every month.",
    items: [
      {
        title: "Inventory and sales never match",
        body: "Two reports, two numbers, and nobody knows which to believe. The decision goes to whichever landed first.",
      },
      {
        title: "Month-end close takes three weeks",
        body: "By the time you have the number, it's history. You're correcting last month instead of running this one.",
      },
      {
        title: "Five tools that don't talk to each other",
        body: "One system for invoicing, another for payroll, and the rest in spreadsheets only one person understands.",
      },
      {
        title: "Growing hurts more than it should",
        body: "Every new branch, warehouse or employee adds manual work instead of absorbing itself.",
      },
    ],
  },

  /* ── Rollout ─────────────────────────────────────────────── */
  implementation: {
    kicker: "Rollout",
    heading: "Three weeks, three steps, one person accountable by name.",
    lead: "The risk with an ERP isn't the price, it's ending up halfway. That's why the rollout isn't quoted separately: it is the product. You sign a plan with dates, not a promise.",
    steps: [
      {
        week: "Week 01",
        title: "Assessment",
        body: "We walk your actual operation — not a questionnaire — and define what gets configured, what gets migrated and what stays out. You leave the week with a written plan and a start date.",
      },
      {
        week: "Week 02",
        title: "Migrating your data",
        body: "We load your catalog, inventory, customers, vendors and balances. You verify them. This is where most rollouts stall — and it's the part we don't leave you to do alone.",
      },
      {
        week: "Week 03",
        title: "Running, with us alongside",
        body: "Your team works in the system with us next to them, every day, until the first close comes out of AssetBase and not out of the spreadsheet.",
      },
    ],
  },

  /* ── Modules ─────────────────────────────────────────────── */
  modules: {
    kicker: "Modules",
    heading: "One place where the number is the number.",
    lead: "The modules share one database, so a sale draws down inventory, generates the stamped invoice and shows up in the income statement without anyone keying anything twice.",
    cta: "See the system in a demo →",
    figureAlt: "Inventory and sales report generated by AssetBase",
    items: [
      {
        n: "01",
        title: "Finance and invoicing",
        body: "Income, expenses, receivables and a live income statement. CFDI 4.0 stamping and payment complements from the same place you record the sale.",
      },
      {
        n: "02",
        title: "Inventory and warehouses",
        body: "Stock by warehouse, costing, reorder points and transfers. Every movement is tied to the document that caused it, so a shortfall always has an explanation.",
      },
      {
        n: "03",
        title: "Payroll and people",
        body: "IMSS and ISR calculations, stamped payslips and employee records. Payroll stops being a file that lives on one person's computer.",
      },
      {
        n: "04",
        title: "Fixed assets",
        body: "Acquisitions, depreciation, maintenance and disposals. Where each asset is, what it's worth today and what it has cost to keep since it arrived.",
      },
    ],
  },

  /* ── Comparison ──────────────────────────────────────────── */
  comparison: {
    kicker: "Comparison",
    heading: "You're already comparing. We'll save you the afternoon.",
    lead: "Odoo is a good product and sometimes it's the right answer. Here's what changes for a Mexican SMB that needs to be running next month.",
    tableAria: "Comparison table",
    tableCaption: "AssetBase compared with Odoo and with running the business in Excel",
    criterion: "Criterion",
    note: "If your operation needs batch manufacturing, foreign trade or multiple currencies, we'll tell you in the assessment and point you to the alternative. We'd rather not sell to you than leave you halfway.",
    columns: ["AssetBase", "Odoo", "Excel + your accountant"],
    rows: [
      {
        feature: "CFDI 4.0 stamping",
        values: ["Native, included", "Via localization module or partner", "Invoiced separately, by hand"],
      },
      {
        feature: "Payroll with IMSS and ISR",
        values: ["Our own module", "Depends on the implementing partner", "Outside firm"],
      },
      {
        feature: "Migrating your data",
        values: ["We do it, included", "Quoted as a project", "Not applicable — the data stays put"],
      },
      {
        feature: "Time to go live",
        values: ["Three weeks, in writing", "Depends on scope and partner", "Immediate, and that's the problem"],
      },
      {
        feature: "Who you talk to when something breaks",
        values: ["The person who set up your account", "Your implementation partner", "Whoever built the file"],
      },
      {
        feature: "Published pricing",
        values: ["Yes, on this page", "Yes, plus the partner's fee", "Apparently zero"],
      },
    ],
  },

  /* ── Pricing ─────────────────────────────────────────────── */
  pricing: {
    kicker: "Pricing",
    heading: "Pricing is published. No «request a quote».",
    lead: "If you have to call to find out what it costs, you've already lost an afternoon. The three-week rollout is included in the first two plans.",
    note: "Your data is yours. Full export at any time, at no cost and with no lock-in.",
    plans: [
      {
        kicker: "Operations",
        name: "Essential",
        price: "$X,XXX",
        unit: "MXN / month",
        seats: "Up to 5 users",
        body: "Finance, invoicing and inventory. One warehouse. Three-week rollout included.",
        cta: "See it in a demo",
        featured: false,
      },
      {
        kicker: "Recommended",
        name: "Complete",
        price: "$X,XXX",
        unit: "MXN / month",
        seats: "Up to 20 users",
        body: "Every module, payroll and fixed assets included. Multiple warehouses and branches. Support with a committed response time.",
        cta: "Book a demo",
        featured: true,
      },
      {
        kicker: "Group",
        name: "Custom",
        price: "Let's talk",
        unit: "",
        seats: "More than 20 users or multiple companies",
        body: "Cross-company consolidation, integrations built to fit, and a dedicated point of contact.",
        cta: "Get in touch",
        featured: false,
      },
    ],
  },

  /* ── FAQ ─────────────────────────────────────────────────── */
  faq: {
    kicker: "FAQ",
    heading: "What people ask before signing",
    items: [
      {
        q: "What happens to everything I have in Excel and in my current system?",
        a: "We migrate it in week 2: catalog, inventory, customers, vendors and opening balances. You verify the numbers add up before we go live. Nothing gets re-keyed by hand.",
      },
      {
        q: "Three weeks, really?",
        a: "For a single-line SMB, yes, and we put it in writing with dates. If your operation needs more — multiple companies, batch manufacturing, integrations — we tell you in the assessment, before you sign.",
      },
      {
        q: "Do I need someone in IT?",
        a: "No. It's cloud-based, there's no server to maintain, and we handle the configuration. What you do need is someone on your team who knows the operation and can give it a few hours a week.",
      },
      {
        q: "What if I want to leave? Is my data mine?",
        a: "It's yours. Full export in open formats, whenever you want, at no cost and without having to request it in writing. There's no lock-in.",
      },
      {
        q: "You're a new company. Why should I trust you?",
        a: "That's the right question. We're new, and that means your account matters: you get people with names, not a ticket number. Talk to our current customers before you decide — we'll introduce you.",
      },
    ],
  },

  /* ── The form, the page's one conversion ─────────────────── */
  demo: {
    heading: "Twenty minutes, and you'll know whether it fits.",
    lead: "You'll talk to an operations specialist, not a salesperson with a script, and we'll show you the system with data that looks like yours.",
    steps: [
      {
        title: "You pick the time",
        body: "Confirmed on the spot, no waiting for someone to call you back.",
      },
      {
        title: "We look at your operation, not a slide deck",
        body: "You tell us how you work today and we show you that flow inside the system.",
      },
      {
        title: "You leave with a plan and a price",
        body: "And if you're not a good fit for us, we'll tell you on the call.",
      },
    ],
    form: {
      title: "Book your demo",
      sub: "Five fields. We confirm the same day.",
      name: "Name",
      namePlaceholder: "Your name",
      company: "Company",
      companyPlaceholder: "Legal or trade name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      phone: "Phone or WhatsApp",
      phoneOptional: "(optional)",
      phonePlaceholder: "55 0000 0000",
      phoneHelp: "Ten digits, including area code.",
      users: "How many people would use the system?",
      userRanges: ["1 to 5", "6 to 20", "21 to 50", "More than 50"],
      honeypot: "Do not fill in",
      submit: "Book my 20-minute demo",
      sending: "Sending…",
      successTitle: "Done — we'll confirm today.",
      successBody:
        "Check your email. If you'd rather move faster, message us on WhatsApp and we'll book it now.",
      successCta: "Message us on WhatsApp",
      errorGeneric: "We couldn't record your request.",
      review: "Check",
      and: "and",
      fieldNames: {
        nombre: "your name",
        empresa: "your company",
        correo: "your email",
        telefono: "your phone number",
        usuarios: "the number of users",
      },
      errorReachUs: "Message us on",
      errorOr: "or at",
      errorClose: "and we'll book it now.",
      preferWrite: "Rather write first?",
      preferWriteCta: "Send us a WhatsApp",
      privacyNote: "No card, no commitment. We only use your details to get in touch —",
      privacyLink: "privacy notice",
    },
  },

  /* ── Analytics consent ───────────────────────────────────── */
  cookies: {
    aria: "Analytics consent",
    body: "We use analytics cookies to learn which parts of this page work and which don't. No advertising and no cross-site tracking. You can decline and the page works just the same —",
    privacyLink: "privacy notice",
    reject: "Decline",
    accept: "Accept",
  },

  /* ── Legal page wrapper ──────────────────────────────────── */
  legal: {
    updated: "Last updated:",
  },

  /* ── 404 ─────────────────────────────────────────────────── */
  notFound: {
    title: "Page not found",
    eyebrow: "Error 404",
    heading: "This page doesn't exist.",
    body: "The link may be old, or the address may have a typo. What you're looking for is probably on the home page — and if you came to see the system, that way is still open.",
    ctaDemo: "Book a 20-minute demo",
    ctaHome: "Go to the home page",
    contactNote: "Looking for something specific? Write to us at",
  },

  /* ── /en/thank-you, the no-JavaScript form destination ───── */
  thanks: {
    title: "Thank you",
    okEyebrow: "Request received",
    okHeading: "Done — we'll confirm today.",
    okBody:
      "Check your email over the next few hours: the time and the session link arrive there. If you'd rather move it up, message us on WhatsApp and we'll book it right now.",
    errorEyebrow: "Not recorded",
    errorHeading: "We couldn't record your request.",
    errorBodyStart: "Something failed on our end, so your demo was",
    errorBodyStrong: "not",
    errorBodyEnd:
      "booked. We don't want you leaving here thinking it was: write to us and we'll sort it out right away.",
    ctaWhatsapp: "Message us on WhatsApp",
    back: "Back to the home page",
  },
};
