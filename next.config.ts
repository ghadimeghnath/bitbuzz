import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100],
    deviceSizes: [640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [256, 384, 512, 768, 1024],
  },
};

export default nextConfig;
