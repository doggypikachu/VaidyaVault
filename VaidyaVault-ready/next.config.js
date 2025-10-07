
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: process.env.NEXT_BASE_PATH || '/VaidyaVault',
  assetPrefix: process.env.NEXT_ASSET_PREFIX || '/VaidyaVault',
};
export default nextConfig;
