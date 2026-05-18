import FranchiseListings from "@/components/features/FranchiseList";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Daftar Franchise & Kemitraan F&B Terbaik | EazyChise",
  description: "Temukan ratusan peluang bisnis franchise kuliner dan minuman terbaik di Indonesia. Bandingkan modal, ROI, dan potensi keuntungan secara transparan.",
  openGraph: {
    title: "Katalog Franchise F&B Terlengkap | EazyChise",
    description: "Cari bisnis franchise impian Anda di EazyChise. Analisis ROI dan BEP secara instan.",
  }
};

async function getFranchises() {
  const supabase = await createClient();
  const { data } = await supabase.from('franchises').select('*');
  
  if (!data) return undefined;
  
  return data.map(f => ({
    id: f.id,
    name: f.name,
    cat: f.cat,
    catKey: f.cat_key,
    city: f.city,
    rating: f.rating,
    invest: f.invest_text,
    investNum: f.invest_num,
    roi: f.roi,
    omzet: f.omzet,
    mitra: f.mitra_count,
    badge: f.badge,
    badgeColor: f.badge_color,
    img: f.img
  }));
}

export default async function FranchisePage() {
  const franchises = await getFranchises();
  const safeData = franchises && franchises.length > 0 ? franchises : undefined;

  return (
    <main className="pt-20">
      <Suspense fallback={
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
          <span className="w-10 h-10 border-4 border-[#FF5C1A]/30 border-t-[#FF5C1A] rounded-full animate-spin mb-4" />
          <p className="text-sm text-gray-500 font-medium font-syne">Memuat katalog franchise...</p>
        </div>
      }>
        <FranchiseListings initialData={safeData} />
      </Suspense>
    </main>
  );
}
