/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ["i.ibb.co", "lh3.googleusercontent.com"],
  },
}

module.exports = nextConfig
