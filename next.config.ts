import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // @ts-ignore
  allowedDevOrigins: ['192.168.0.191'],
};

export default nextConfig;
