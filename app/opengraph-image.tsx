import { ImageResponse } from "next/og";
import { ACTIVE_WEDGE, wedges } from "@/lib/content";
import { MARK_LAYERS, MARK_STROKE, MARK_VIEWBOX } from "@/lib/mark";

/* La tarjeta que se ve al compartir el enlace en WhatsApp, LinkedIn o Slack.
   Antes no existía ninguna: el enlace salía como un rectángulo gris. */

export const alt = "AssetBase ERP — el ERP para PyME en México";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { headline } = wedges[ACTIVE_WEDGE];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(900px 600px at 78% 12%, #245377, #102a3c 62%)",
          color: "#f5fbf7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="52" height="63" viewBox={MARK_VIEWBOX}>
            {MARK_LAYERS.map((capa, i) => (
              <path
                key={i}
                d={capa.d}
                fill={capa.fill}
                stroke={capa.stroke ? MARK_STROKE : undefined}
                strokeWidth={capa.stroke ? 4 : undefined}
              />
            ))}
          </svg>
          <span style={{ fontSize: 38, letterSpacing: "0.01em" }}>AssetBase</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ fontSize: 66, lineHeight: 1.1, maxWidth: 940 }}>
            {headline}
          </div>
          <div style={{ fontSize: 30, color: "#96afaa", maxWidth: 900 }}>
            Finanzas, inventario y nómina de tu PyME en un solo sistema.
          </div>
        </div>

        {/* Pastillas con borde en vez de separadores "·": satori colapsa los
            spans de un solo caracter y el texto se pega. */}
        <div style={{ display: "flex", gap: 14, fontSize: 22 }}>
          {[
            "Timbrado CFDI 4.0 incluido",
            "Migración hecha por nosotros",
            "En operación en 3 semanas",
          ].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid #3882bb",
                color: "#b1e2f0",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
