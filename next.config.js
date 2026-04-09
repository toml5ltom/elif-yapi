/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n/config.ts");

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/", destination: "/ar", permanent: false },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
