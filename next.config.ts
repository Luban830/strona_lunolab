import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.in',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-7713d4f0b3634fa085d0153341a85fef.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '7713d4f0b3634fa085d0153341a85fef.r2.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
