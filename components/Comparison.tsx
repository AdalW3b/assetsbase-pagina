import { comparison } from "@/lib/content";
import { Kicker, Reveal } from "./Reveal";

/* Comparison is doing the buyer's homework for them — the strongest move
   available to an unknown brand. Keep the competitor column HONEST:
   overstating it is the fastest way to lose the deal you just won. */
export function Comparison() {
  return (
    <section id="comparativa" className="pt-16 pb-5 sm:pt-24">
      <Reveal>
        <Kicker>Comparativa</Kicker>
        <h2 className="max-w-[24ch] text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.15]">
          Ya estás comparando. Te ahorramos la tarde.
        </h2>
        <p className="mt-5.5 max-w-[56ch] text-[16.5px] leading-[1.7] text-ink/80">
          Odoo es un buen producto y a veces es la respuesta correcta. Esto es
          lo que cambia para una PyME mexicana que necesita operar el mes que
          entra.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          tabIndex={0}
          role="region"
          aria-label="Tabla comparativa"
          className="mt-10 overflow-x-auto rounded-lg bg-surface p-3 ring-1 ring-hairline sm:p-6"
        >
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <caption className="sr-only">
              AssetBase comparado con Odoo y con llevar la operación en Excel
            </caption>
            <thead>
              <tr className="border-b border-hairline">
                <th scope="col" className="w-[26%] p-2 text-left text-[11px] font-normal tracking-[0.08em] text-ink-muted uppercase">
                  <span className="sr-only">Criterio</span>
                </th>
                {comparison.columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={`p-2 text-left text-[11px] font-normal tracking-[0.08em] uppercase ${
                      i === 0 ? "text-accent-on-surface" : "text-ink-muted"
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.feature} className="border-b border-white/8 last:border-0">
                  <th scope="row" className="p-2 text-left align-top font-semibold">
                    {row.feature}
                  </th>
                  {row.values.map((value, i) => (
                    <td
                      key={i}
                      className={`p-2 align-top ${i === 0 ? "text-ink" : "text-ink/75"}`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[13px] leading-[1.7] text-ink-muted">
          Si tu operación necesita manufactura por lotes, comercio exterior o
          varias monedas, te lo decimos en el diagnóstico y te sugerimos la
          alternativa. Preferimos no venderte que dejarte a medias.
        </p>
      </Reveal>
    </section>
  );
}
