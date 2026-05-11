/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  serverExternalPackages: [
    "iyzipay",
    "postman-request",
  ],

  outputFileTracingIncludes: {
    "/api/iyzico/initialize": [
      "./node_modules/iyzipay/**/*",
      "./node_modules/postman-request/**/*",
    ],

    "/api/iyzico/callback": [
      "./node_modules/iyzipay/**/*",
      "./node_modules/postman-request/**/*",
    ],
  },
};

module.exports = nextConfig;
