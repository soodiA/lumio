import type { NextConfig } from "next";

// basePath is only needed when served from a sub-path (e.g. the old github.io/lumio); lumio.tichikids.ir serves from "/".
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: { unoptimized: true },
};

export default nextConfig;
