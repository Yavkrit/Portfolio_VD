import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/biography",
        destination: "/career-journey",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
