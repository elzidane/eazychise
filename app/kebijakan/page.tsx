import { Metadata } from "next";
import KebijakanContent from "./KebijakanContent";

export const metadata: Metadata = {
  title: "Syarat & Kebijakan | EazyChise",
  description: "Pelajari syarat penggunaan layanan, kebijakan privasi, dan komitmen keamanan data EazyChise dalam melindungi interaksi antara franchisor dan mitra.",
  openGraph: {
    title: "Legal & Privasi - EazyChise",
    description: "Transparansi dan keamanan adalah prioritas kami.",
  }
};

export default function KebijakanPage() {
  return <KebijakanContent />;
}
