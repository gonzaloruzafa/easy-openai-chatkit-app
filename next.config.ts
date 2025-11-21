import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
    };
    return config;
  },
  async headers() {
    return [
      {
        // Permitir que la app sea embebida en iframes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL', // Permitir embedding en cualquier dominio
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *", // Permitir ser embebido desde cualquier origen
          },
        ],
      },
    ];
  },
};

export default nextConfig;
