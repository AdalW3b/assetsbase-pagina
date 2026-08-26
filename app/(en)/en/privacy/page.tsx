import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/LegalShell";
import { contact, getContent } from "@/lib/content";
import { routes } from "@/lib/i18n";
import { alternatesFor } from "@/lib/metadata";

/* TEMPLATE — have a lawyer review before publishing.
   Traducción de cortesía del aviso en español. El aviso que obliga la
   LFPDPPP es el español y es el que prevalece: así se declara al inicio
   del documento, con enlace a la versión vinculante. No es un detalle
   formal — presentar una traducción como si fuera el aviso legal sería
   afirmar algo que no es cierto. */

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How AssetBase ERP collects, uses and protects your personal data under Mexico's LFPDPPP.",
  alternates: alternatesFor("privacy", "en"),
  robots: { index: true, follow: false },
};

export default function Privacy() {
  const t = getContent("en");

  return (
    <LegalShell
      lang="en"
      routeKey="privacy"
      title="Privacy notice"
      updated="August 21, 2026"
    >
      <p>
        <strong>
          This is a courtesy translation. The binding privacy notice is the
          Spanish one
        </strong>{" "}
        — Mexican data protection law requires it in Spanish, and in case of
        any discrepancy the Spanish version prevails. You can read it at{" "}
        <Link href={routes.privacy.es}>Aviso de privacidad</Link>.
      </p>

      <p>
        In compliance with Mexico&apos;s Federal Law on the Protection of
        Personal Data Held by Private Parties (LFPDPPP), its Regulations and
        the Privacy Notice Guidelines, AssetBase ERP provides you with this
        notice.
      </p>

      <h2>Data controller</h2>
      <p>
        AssetBase ERP, with offices in {t.contact.city}, is responsible for
        processing the personal data you provide. For anything related to this
        notice you can write to{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>

      <h2>Data we collect</h2>
      <p>
        Through the demo request form we collect identification and contact
        details only:
      </p>
      <ul>
        <li>Name</li>
        <li>Company or legal name</li>
        <li>Email address</li>
        <li>Phone or WhatsApp number (optional)</li>
        <li>Approximate number of people who would use the system</li>
      </ul>
      <p>
        We do not collect sensitive personal data, nor financial or asset
        information, through this site.
      </p>

      <h2>Purposes of processing</h2>
      <p>Primary purposes, necessary to handle your request:</p>
      <ul>
        <li>Contacting you to schedule and run the system demonstration.</li>
        <li>Preparing and sending you a commercial proposal.</li>
        <li>Following up on your questions about the product.</li>
      </ul>
      <p>
        Secondary purposes, which you may decline without affecting the above:
      </p>
      <ul>
        <li>Sending you updates about new product features.</li>
        <li>Inviting you to webinars or informational material.</li>
      </ul>
      <p>
        To decline the secondary purposes, write to us at{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> at any time.
      </p>

      <h2>Transfers</h2>
      <p>
        We do not sell or trade your personal data. We may share it with
        vendors that provide us with infrastructure, email and customer
        relationship management services, exclusively for the purposes
        described here and under contractual confidentiality obligations.
      </p>

      <h2>ARCO rights</h2>
      <p>
        You may exercise your rights of Access, Rectification, Cancellation
        and Opposition at any time, as well as withdraw your consent, by
        sending your request to{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>. The request
        must include your name, a means of communicating our reply to you,
        documents proving your identity, and a clear description of the data
        the right concerns. We will respond within a maximum of twenty
        business days.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep your data for as long as there is a commercial relationship or
        an active opportunity, and for up to twenty-four months after the last
        contact, unless a legal obligation requires us to keep it longer.
      </p>

      <h2>Cookies and similar technologies</h2>
      <p>
        This site uses <strong>Google Analytics 4</strong> to understand how
        the page is browsed: which sections get read, where people arrive
        from, and how much the demo form is used. We do not use advertising or
        cross-site tracking cookies, and we do not build individual profiles.
      </p>
      <p>
        Analytics cookies <strong>are not installed until you accept
        them</strong> in the banner that appears on arrival. If you decline,
        the page works exactly the same and no measurement cookie is stored.
        You can change your mind at any time by clearing this site&apos;s data
        in your browser: the banner will ask you again.
      </p>
      <p>
        We also use your browser&apos;s local storage to remember that
        decision. That value never leaves your device and we do not associate
        it with you.
      </p>
      <p>
        Google acts as a data processor and may process the information
        outside Mexico. You can review its practices in{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google&apos;s privacy policy
        </a>{" "}
        and install its{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
        >
          opt-out add-on
        </a>{" "}
        if you prefer to block it across all sites.
      </p>

      <h2>Changes to this notice</h2>
      <p>
        Any change to this notice will be published on this same page, stating
        the date it was last updated.
      </p>
    </LegalShell>
  );
}
