import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "arengaindonesia.com" },
      { protocol: "https", hostname: "cdn1-production-images-kly.akamaized.net" },
      { protocol: "https", hostname: "asset.kompas.com" },
      { protocol: "https", hostname: "www.dapurkobe.co.id" },
      { protocol: "https", hostname: "richcreme.com" },
      { protocol: "https", hostname: "jendelapuspita.com" },
      { protocol: "https", hostname: "www.julo.co.id" },
      { protocol: "https", hostname: "assets.unileversolutions.com" },
      
    ],
  },
}

export default nextConfig