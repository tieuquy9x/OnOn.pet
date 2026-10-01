import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false, // ẩn nút "N" của Next.js khi chạy dev
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
