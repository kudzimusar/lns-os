import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/lns-os' : '',
  assetPrefix: isProd ? '/lns-os' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
