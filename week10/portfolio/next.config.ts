import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static HTML export for GitHub Pages
  basePath: "/webpro/week10/portfolio", // Matches your GitHub subfolder path
  assetPrefix: "/webpro/week10/portfolio/",
  images: {
    unoptimized: true, // Required for static export images
  },
};

export default nextConfig;