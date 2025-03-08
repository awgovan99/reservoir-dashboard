import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    forceSwcTransforms: true, // Force SWC instead of Babel
  },
};

export default nextConfig;
