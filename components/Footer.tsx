import Link from "next/link";
import { Mark } from "./Mark";
import { Year } from "./Year";
import { contact, getContent } from "@/lib/content";
import { routes, type Lang } from "@/lib/i18n";

export function Footer({ lang }: { lang: Lang }) {
  const t = getContent(lang);
  const inicio = routes.home[lang];
  const anclaInicio = inicio === "/" ? "" : inicio;

  return (
    <>
      <hr className="rule-fade" />
      <footer className="pt-10 pb-9 sm:pt-15 sm:pb-13">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14">
          <div>
            <span className="font-heading flex items-center gap-2.5 text-[17px]">
              <Mark className="h-5.5 w-auto" />
              AssetBase
            </span>
            <p className="mt-3.5 max-w-[30ch] text-[13.5px] leading-[1.7] text-ink-muted">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] tracking-[0.09em] text-ink-muted uppercase">
              {t.footer.product}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {t.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`${anclaInicio}${item.href}`}
                    className="text-sm transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] tracking-[0.09em] text-ink-muted uppercase">
              {t.footer.contact}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-accent">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="transition-colors hover:text-accent">
                  {contact.phone}
                </a>
              </li>
              <li className="text-ink-muted">{t.contact.city}</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] tracking-[0.09em] text-ink-muted uppercase">
              {t.footer.legal}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href={routes.privacy[lang]} className="transition-colors hover:text-accent">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={routes.terms[lang]} className="transition-colors hover:text-accent">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-9 border-t border-hairline pt-5 text-[12.5px] leading-[1.68] text-ink-muted">
          © <Year fallback={new Date().getFullYear()} /> AssetBase ERP.{" "}
          {t.footer.rights}
        </p>
      </footer>
    </>
  );
}
