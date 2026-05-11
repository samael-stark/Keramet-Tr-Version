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

  experimental: {
    serverComponentsExternalPackages: [
      "iyzipay",
    ],
  },

  serverExternalPackages: [
    "iyzipay",
  ],
};

module.exports = nextConfig;
