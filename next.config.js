/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "172.30.2.237",
        port: "7520",
        pathname: "/media/**",
      },
    ],
  },
};

module.exports = nextConfig;
