import { Metadata } from "next";
import TentangContent from "./TentangContent";

export const metadata: Metadata = {
  title: "Tentang EazyChise | Revolusi Franchise F&B Indonesia",
  description: "EazyChise adalah platform kurasi franchise F&B yang membantu UMKM Indonesia menemukan peluang bisnis terpercaya dengan transparansi data dan dukungan teknologi AI.",
  openGraph: {
    title: "Tentang Kami - EazyChise",
    description: "Misi kami adalah memberdayakan wirausaha kuliner Indonesia.",
  }
};

export default function TentangPage() {
  return <TentangContent />;
}
