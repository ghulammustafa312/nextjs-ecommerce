import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // next/image only loads remote hosts listed here. DummyJSON stores photos on its CDN.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "dummyjson.com",
      },
    ],
  },
};

export default nextConfig;
