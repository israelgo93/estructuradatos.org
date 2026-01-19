import type { NextConfig } from "next";
const withMDX = require('@next/mdx')()


const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
module.exports = withMDX(nextConfig) 
