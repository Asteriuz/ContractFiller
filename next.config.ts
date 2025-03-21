import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/ContractFiller",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
