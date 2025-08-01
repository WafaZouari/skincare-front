
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Required for Render.com
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;

