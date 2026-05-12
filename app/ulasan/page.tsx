import { Metadata } from "next";
import UlasanContent from "./UlasanContent";

export const metadata: Metadata = {
  title: "Ulasan & Testimoni Mitra Franchise | EazyChise",
  description: "Dengarkan pengalaman langsung dari ribuan mitra yang telah sukses membangun bisnis F&B bersama EazyChise. Bukti nyata kualitas dan dukungan kami.",
  openGraph: {
    title: "Testimoni Kesuksesan Mitra EazyChise",
    description: "Kisah sukses para pengusaha F&B Indonesia bersama EazyChise.",
  }
};

export default function UlasanPage() {
  return <UlasanContent />;
}
