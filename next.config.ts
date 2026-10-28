import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // A package-lock.json exists in the user's home folder; pin the root to this project.
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
