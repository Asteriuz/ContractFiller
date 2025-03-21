import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/ContractMaker",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
