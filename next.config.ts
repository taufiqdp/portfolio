import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // A photo never changes under the same name and the bucket sends no Cache-Control, so keep
    // resized copies a month instead of Next's 4-hour default, which redid them all day long.
    // Replaced a photo but kept its name? `vercel cache invalidate --srcimg <photo url>`.
    minimumCacheTTL: 2678400, // 31 days
    // The default list minus 3840: caps the lightbox at 2048px wide.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
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
