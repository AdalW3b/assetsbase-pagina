import { ImageResponse } from "next/og";
import { MARK_LAYERS, MARK_STROKE, MARK_VIEWBOX } from "@/lib/mark";

/* iOS ignora los favicon SVG: sin esto, "Agregar a inicio" pone una
   miniatura de la página en lugar del imagotipo. */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#102a3c",
        }}
      >
        <svg width="118" height="142" viewBox={MARK_VIEWBOX}>
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
      </div>
    ),
    size
  );
}
