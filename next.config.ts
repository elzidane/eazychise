import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "arengaindonesia.com",
      },
      {
        protocol: "https",
        hostname: "cdn1-production-images-kly.akamaized.net",
      },
      {
        protocol: "https",
        hostname: "asset.kompas.com",
      },
      {
        protocol: "https",
        hostname: "www.dapurkobe.co.id",
      },
      {
        protocol: "https",
        hostname: "richcreme.com",
      },
      // Tambahkan domain lain di sini kalau nambah gambar baru
    ],
  },
};

module.exports = nextConfig;

export default nextConfig