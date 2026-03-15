import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'upload.wikimedia.org',
      'images.unsplash.com',
      'i.gojekapi.com',
      'franchiseindo.co.id',
      'cdn.sanity.io'
    ],

    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "i.gojekapi.com", pathname: "/**" },
      { protocol: "https", hostname: "franchiseindo.co.id", pathname: "/**" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optional: Add experimental features if needed
  experimental: {
    // typedRoutes: true, // Enable if you want type-safe links
  },
  // Optional: Configure redirects if needed
  // async redirects() {
  //   return [
  //     {
  //       source: '/old-path',
  //       destination: '/new-path',
  //       permanent: true,
  //     },
  //   ]
  // },
}

export default nextConfig