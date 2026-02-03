import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gourmandiseries.fr',
        pathname: '/wp-content/uploads/**', 
      },
       {
        protocol: 'https',
        hostname: 'res.cloudinary.com', 
        pathname: '/**', //autoriser tous les path du serveur 
      },
    ],
  },
};

export default nextConfig;
