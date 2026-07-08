import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/lumio",
  images: { unoptimized: true },
};

export default nextConfig;
