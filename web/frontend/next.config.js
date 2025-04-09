/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = {
  transpilePackages: ['@react-sigma/core', 'sigma'],
  ...nextConfig
};