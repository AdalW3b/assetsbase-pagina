/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* Hay package-lock.json en carpetas padre; sin esto Next infiere la raíz
     del workspace en C:\Users\... y el build traza archivos equivocados. */
  outputFileTracingRoot: import.meta.dirname,
  poweredByHeader: false,
};

export default nextConfig;
