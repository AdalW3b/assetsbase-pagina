import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/LegalShell";
import { contact } from "@/lib/content";
import { routes } from "@/lib/i18n";
import { alternatesFor } from "@/lib/metadata";

/* TEMPLATE — have a lawyer review before publishing.
   The availability, support and timeline commitments must match what the
   landing promises (three weeks, free export, no lock-in) or the page is
   promising something the contract doesn't back.

   Como en el aviso de privacidad: el contrato se firma en México y en
   español, así que la versión española es la que prevalece. */

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "Terms of use and of subscription for the AssetBase ERP system.",
  alternates: alternatesFor("terms", "en"),
  robots: { index: true, follow: false },
};

export default function Terms() {
  return (
    <LegalShell
      lang="en"
      routeKey="terms"
      title="Terms of service"
      updated="August 21, 2026"
    >
      <p>
        <strong>
          This is a courtesy translation. The binding terms are the Spanish
          ones
        </strong>{" "}
        — in case of any discrepancy, the Spanish version prevails. You can
        read it at <Link href={routes.terms.es}>Términos de servicio</Link>.
      </p>

      <p>
        These terms govern the use of this site and the subscription to the
        AssetBase ERP system. By requesting a demonstration or subscribing to
        the service, you accept what is described here.
      </p>

      <h2>The service</h2>
      <p>
        AssetBase ERP is a business management system delivered as a cloud
        service. It includes the modules contracted under the corresponding
        plan, the rollout described in the proposal, and the plan&apos;s
        support.
      </p>

      <h2>Rollout</h2>
      <p>
        The three-week timeline described on the site applies to a
        single-line business that delivers its information on time and
        assigns someone from its team to the project. Scope, dates and
        dependencies are fixed in writing during the week-one assessment. If
        your operation requires a broader scope, you are told before signing.
      </p>

      <h2>Subscription, pricing and billing</h2>
      <p>
        Published prices are stated in Mexican pesos and do not include VAT
        unless otherwise indicated. The subscription is billed in advance
        according to the contracted billing period. Price changes are
        notified at least thirty days in advance and take effect at the next
        renewal.
      </p>

      <h2>Cancellation</h2>
      <p>
        There is no lock-in. You may cancel the subscription with thirty
        calendar days&apos; notice. The period already invoiced is
        non-refundable, and the service stays active until the end of that
        period.
      </p>

      <h2>Your data</h2>
      <p>
        The information you load into or generate in the system is yours. You
        can export it in full, in open formats, at any time and at no cost.
        After the service ends we keep a copy for thirty calendar days so you
        can export it, and then we delete it. The processing of personal data
        is governed by the{" "}
        <Link href={routes.privacy.en}>privacy notice</Link>.
      </p>

      <h2>Availability and support</h2>
      <p>
        We work to keep the service continuously available, except for
        scheduled maintenance windows, which are announced in advance.
        Committed support response times are those of the contracted plan.
      </p>

      <h2>Use obligations</h2>
      <p>
        You agree to use the system in accordance with the law, to safeguard
        your team&apos;s credentials, and not to attempt to breach the
        security of the service or access other customers&apos; data.
      </p>

      <h2>Liability</h2>
      <p>
        AssetBase ERP is a management tool: it does not replace accounting,
        tax or legal advice. The accuracy of the information entered and your
        company&apos;s compliance with its tax obligations are your
        responsibility. Our liability is limited to the amount paid for the
        service in the twelve months preceding the event giving rise to it.
      </p>

      <h2>Contact</h2>
      <p>
        For any question about these terms, write to us at{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </LegalShell>
  );
}
