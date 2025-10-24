/** @type {import("next").NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? "/aerospace-portfolio" : "",
  assetPrefix: isProd ? "/aerospace-portfolio/" : "",
  trailingSlash: true,
};

module.exports = nextConfig;

