/** @type {import('next').NextConfig} */
const nextConfig = {};

// next.config.mjs

export default {
    env: {
      NEXT_PUBLIC_CLERK_FRONTEND_API: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API, // replace with your Clerk frontend API
    },
    experimental: {
      appDir: true,
    },
  }
  
