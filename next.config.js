/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "i.ibb.co",
      "lh3.googleusercontent.com",
      "cdn.pixabay.com",
      "media.istockphoto.com",
    ],
  },
}

module.exports = nextConfig
