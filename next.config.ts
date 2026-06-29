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
  // Baseline security headers. Conservative set that does not interfere with
  // embeds (e.g. Google Maps), Cloudflare Turnstile, or analytics (no strict CSP).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
