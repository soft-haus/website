import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NODE_ENV === "development" ? undefined : "/website"
};

export default nextConfig;
