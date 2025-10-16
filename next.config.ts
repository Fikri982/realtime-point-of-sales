import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  devIndicators: false,
  images: {
    domains: ["lpifqlnzgamkxrnefolv.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lpifqlnzgamkxrnefolv.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
