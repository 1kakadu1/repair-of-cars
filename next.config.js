const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles'), path.join(__dirname, 'client','components')],
  },
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/products/1',
        permanent: false,
      },
      {
        source: '/news',
        destination: '/news/1',
        permanent: false,
      },

    ]
  },
  async headers() {
    return [
      {
        source: "/fonts/Montserrat/Montserrat-Regular.ttf",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/Montserrat/Montserrat-SemiBold.ttf",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
