import BEPCalculator from "@/components/features/BEPCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Analisis BEP & ROI Franchise | EazyChise",
  description: "Hitung estimasi balik modal (BEP) dan ROI bisnis franchise Anda secara akurat dengan alat analisis cerdas EazyChise.",
  openGraph: {
    title: "Analisis BEP Bisnis F&B | EazyChise",
    description: "Alat bantu hitung profitabilitas bisnis kemitraan Anda.",
  }
};

export default function AnalisisBEPPage() {
  return (
    <main className="pt-32 pb-20 bg-[#FFF9F0]">
      <BEPCalculator />
    </main>
  );
}
