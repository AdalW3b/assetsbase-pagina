"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Mark } from "./Mark";
import { LanguageToggle } from "./LanguageToggle";
import { getContent } from "@/lib/content";
import { routes, type Lang, type RouteKey } from "@/lib/i18n";

/* Header sticky.

   Antes era una sola fila con flex-wrap a cualquier ancho, y en móvil no
   cabía: logo (~130px) + CTA (~150px) dejaban unos 55px para cinco enlaces,
   que se apilaban en tres o cuatro renglones. El header sticky terminaba
   midiendo más de 150px de alto sobre un viewport de 667 — y encima el
   scroll-padding-top de 5rem quedaba corto y las anclas caían debajo de él.

   A partir de `lg` cabe la fila completa; por debajo va menú desplegable y
   el header conserva su altura fija de 64px.

   El botón de idioma queda FUERA del menú desplegable a propósito: cambiar
   de idioma no debería costar dos toques ni obligar a descubrir un menú. */
export function Header({
  lang,
  routeKey,
}: {
  lang: Lang;
  routeKey: RouteKey;
}) {
  const t = getContent(lang);
  const [lifted, setLifted] = useState(false);
  const [abierto, setAbierto] = useState(false);

  /* Las anclas del menú son ids de sección compartidos entre idiomas, así
     que hay que anteponerles la raíz del idioma: desde /en/privacy, un
     "#modulos" pelado apuntaría a esa misma página legal. */
  const inicio = routes.home[lang];
  const anclaInicio = inicio === "/" ? "" : inicio;

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto]);

  /* Con el menú abierto el fondo tiene que ser opaco aunque no se haya
     hecho scroll: si no, el panel se lee encima del hero. */
  const solido = lifted || abierto;

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md transition-colors duration-300 ${
        solido
          ? "border-b border-white/12 bg-ground/85"
          : "border-b border-transparent bg-ground/60"
      }`}
    >
      <nav className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-16">
        <div className="flex min-h-16 items-center gap-x-3 py-2.5 lg:gap-x-6">
          <Link
            href={inicio}
            aria-label={t.header.home}
            onClick={() => setAbierto(false)}
            className="font-heading mr-auto flex flex-none items-center gap-2.5 text-lg lg:mr-5"
          >
            <Mark className="h-6.5 w-auto transition-transform duration-300 hover:-translate-y-0.5 hover:scale-107" />
            AssetBase
          </Link>

          <div className="mr-auto hidden min-w-0 shrink items-center gap-x-6 lg:flex">
            {t.nav.map((item) => (
              <Link
                key={item.href}
                href={`${anclaInicio}${item.href}`}
                className="text-[14.5px] whitespace-nowrap text-ink-muted transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <LanguageToggle lang={lang} routeKey={routeKey} />

          <Link
            href={`${anclaInicio}#demo`}
            className="hidden flex-none rounded-lg border border-accent px-4 py-2 text-[14.5px] whitespace-nowrap text-accent transition-colors hover:bg-accent/12 active:bg-accent/22 lg:block"
          >
            {t.header.cta}
          </Link>

          <button
            type="button"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            onClick={() => setAbierto((v) => !v)}
            className="grid size-10 flex-none place-items-center rounded-lg border border-white/16 text-ink transition-colors hover:border-white/40 lg:hidden"
          >
            <span className="sr-only">
              {abierto ? t.header.closeMenu : t.header.openMenu}
            </span>
            {abierto ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>

        {/* Se renderiza siempre, se oculta con clases: si el panel saliera del
            DOM al cerrarse, el aria-controls del botón apuntaría a nada. */}
        <div
          id="menu-movil"
          className={`overflow-hidden border-t border-white/10 lg:hidden ${
            abierto ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col py-2">
            {t.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={`${anclaInicio}${item.href}`}
                  onClick={() => setAbierto(false)}
                  className="block py-3 text-[15px] text-ink-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`${anclaInicio}#demo`}
            onClick={() => setAbierto(false)}
            className="mt-1 mb-4 block rounded-lg border border-accent px-4 py-2.5 text-center text-[15px] text-accent transition-colors hover:bg-accent/12 active:bg-accent/22"
          >
            {t.header.cta}
          </Link>
        </div>
      </nav>
    </header>
  );
}
