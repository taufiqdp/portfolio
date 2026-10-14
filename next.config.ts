import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Original photos in the bucket's public photos/ folder; next/image compresses them.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kencana.basic.box.cloudeka.id",
        pathname: "/portfolio-taufiqdp-pcw5em/photos/**",
      },
    ],
  },
};

export default nextConfig;
