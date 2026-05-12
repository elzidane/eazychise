import FeaturedSection from "@/components/sections/Featured";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Franchise Unggulan & Terpopuler | EazyChise",
  description: "Lihat daftar brand franchise F&B yang paling banyak diminati dan memiliki performa terbaik di platform EazyChise saat ini.",
  openGraph: {
    title: "Franchise Unggulan Pekan Ini",
    description: "Pilihan terbaik untuk investasi bisnis kuliner Anda.",
  }
};

export default function UnggulanPage() {
  return (
    <main className="pt-20">
      <FeaturedSection />
    </main>
  );
}
