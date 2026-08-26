"use client";

import { useEffect, useState } from "react";

/* El año del aviso de copyright.

   La página es estática: `new Date().getFullYear()` en el servidor se
   congela en el momento del build, así que el 1 de enero el pie seguiría
   diciendo el año anterior hasta que alguien redespliegue.

   El servidor pinta el año del build (`fallback`) y el cliente lo corrige
   al montar. Se arranca en null a propósito: leer la fecha durante el
   primer render del cliente produciría un texto distinto al del HTML y con
   eso un error de hidratación justo en el cambio de año. */
export function Year({ fallback }: { fallback: number }) {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => setYear(new Date().getFullYear()), []);

  return <>{year ?? fallback}</>;
}
