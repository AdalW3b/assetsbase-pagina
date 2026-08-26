import { MARK_LAYERS, MARK_VIEWBOX } from "@/lib/mark";

/* El imagotipo, estático y SIN "use client": lo renderizan Hero y Footer,
   que son componentes de servidor, y antes esta marca los arrastraba a
   ambos al bundle del cliente junto con framer-motion solo porque tenía
   una variante animada. La animada vive ahora en MarkAnimated.tsx y la usa
   únicamente la cortinilla de entrada. */
export function Mark({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      fill="none"
      role="img"
      aria-label="AssetBase"
      className={className}
    >
      {MARK_LAYERS.map((layer, i) => (
        <path
          key={i}
          d={layer.d}
          fill={layer.fill}
          stroke={layer.stroke ? "var(--color-accent)" : undefined}
          strokeWidth={layer.stroke ? 2.5 : undefined}
        />
      ))}
    </svg>
  );
}
