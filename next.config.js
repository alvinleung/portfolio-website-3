/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { images: { allowFutureImage: true } },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|woff|woff2)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
