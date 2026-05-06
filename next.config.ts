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
      { protocol: "https", hostname: "www.alfacart.com" },
      { protocol: "https", hostname: "www.blibli.com" },
      { protocol: "https", hostname: "www.tokopedia.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "franchiseindo.co.id" },
      { protocol: "https", hostname: "i.gojekapi.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "awsimages.detik.net.id" },
      { protocol: "https", hostname: "cdn.idntimes.com" },
      { protocol: "https", hostname: "akcdn.detik.net.id" },
      { protocol: "https", hostname: "images.glints.com" },
      { protocol: "https", hostname: "pacificplace.b-cdn.net" },
      { protocol: "https", hostname: "blue.kumparan.com"},
      { protocol: "https", hostname: "digital-bucket-v3.prod.bfi.co.id"},
      { protocol: "https", hostname: "hybrid.co.id"},
      { protocol: "https", hostname: "bake.co.id"},
      { protocol: "https", hostname: "www.waralabaku.com"},
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com"},
      { protocol: "https", hostname: "cdn-jpr.jawapos.com"},
      { protocol: "https", hostname: "disparekrafbudpora.gresikkab.go.id"},
      { protocol: "https", hostname: "sitespirit.co"},
      { protocol: "https", hostname: "sitespirit.co"},


    ],
  },
}

export default nextConfig