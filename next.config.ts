import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ['example.com'], // agrega los dominios que usas
  },
};

export default nextConfig;
