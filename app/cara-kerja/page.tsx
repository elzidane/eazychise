import HowItWorks from "@/components/sections/HowItWorks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cara Kerja & Alur Pendaftaran Franchise | EazyChise",
  description: "Pelajari langkah mudah bergabung dengan franchise impian Anda melalui EazyChise. Dari riset, analisis, hingga pendaftaran kemitraan secara digital.",
  openGraph: {
    title: "Alur Kemitraan EazyChise",
    description: "Proses transparan dan mudah untuk memulai bisnis F&B.",
  }
};

export default function CaraKerjaPage() {
  return (
    <main className="pt-20">
      <HowItWorks />
    </main>
  );
}
