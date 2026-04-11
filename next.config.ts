import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/lns-os',
  assetPrefix: '/lns-os',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
