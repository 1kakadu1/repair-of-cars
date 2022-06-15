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

    ]
  },
}

module.exports = nextConfig
