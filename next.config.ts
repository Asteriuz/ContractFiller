import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // <=== enables static exports
  basePath: "/ContractMaker",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
