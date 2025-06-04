import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/**'), new URL('https://uploadthing.com/**'), new URL('https://utfs.io/**')],

  },
  

  
  
};

export default nextConfig;
