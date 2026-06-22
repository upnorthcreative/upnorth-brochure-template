import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Behold.so CDN — used for Instagram feed images (free + paid plans)
      { protocol: "https", hostname: "behold.pictures" },
      { protocol: "https", hostname: "hop.behold.pictures" },
      { protocol: "https", hostname: "cdn2.behold.pictures" },
    ],
  },
};

export default nextConfig;
