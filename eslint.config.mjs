import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

/* `next lint` esta deprecado y quedaba interactivo: `npm run lint` abria un
   prompt y no terminaba nunca en CI. Ahora corre el ESLint CLI directo. */
const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default config;
