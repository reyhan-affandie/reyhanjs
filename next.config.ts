// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "drive.google.com", pathname: "/thumbnail" },
      { protocol: "https", hostname: "drive.google.com", pathname: "/uc" },
      { protocol: "https", hostname: "cdn.simpleicons.org", pathname: "/**" },
      { protocol: "https", hostname: "cdn.jsdelivr.net", pathname: "/npm/simple-icons@**/icons/**" },
    ],
  },
};

export default nextConfig;
