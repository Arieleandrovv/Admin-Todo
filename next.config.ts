import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: [
      'example.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
    ], // agrega los dominios que usas
  },
};

export default nextConfig;
