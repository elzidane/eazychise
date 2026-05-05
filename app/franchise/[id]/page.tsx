import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, TrendingUp, Users } from "lucide-react";

export default async function FranchiseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.id;
  
  // Convert slug back to a readable name format for demonstration
  const name = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="pt-24 pb-20 min-h-screen bg-[#FFF9F0]">
      <div className="max-w-5xl mx-auto px-5">
        
        {/* Back Button */}
        <Link 
          href="/franchise" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF5C1A] mb-8 transition-colors font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Franchise
        </Link>

        {/* Hero Section */}
        <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 flex flex-col md:flex-row gap-10 mb-8 relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5C1A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="md:w-1/3 flex flex-col gap-4">
            <div className="w-full aspect-square relative rounded-2xl overflow-hidden bg-gray-100">
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1280px-A_small_cup_of_coffee.JPG"
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <button className="w-full bg-[#111] text-white py-4 rounded-xl font-bold hover:bg-[#FF5C1A] transition-colors shadow-lg hover:shadow-[#FF5C1A]/20">
              Ajukan Kemitraan
            </button>
            <button className="w-full bg-white border-2 border-gray-200 text-[#111] py-4 rounded-xl font-bold hover:border-[#111] transition-colors">
              Unduh Proposal
            </button>
          </div>

          <div className="md:w-2/3 flex flex-col justify-center">
            <div className="inline-block bg-[#FF5C1A]/10 text-[#FF5C1A] font-bold text-xs px-3 py-1.5 rounded-full mb-4 w-fit">
              Franchise Terverifikasi
            </div>
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl text-[#111] leading-tight mb-4">
              {name}
            </h1>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Bergabunglah dengan jaringan kemitraan {name} yang telah sukses di puluhan kota. Kami menawarkan sistem yang teruji, bahan baku berkualitas, dan dukungan pemasaran berkelanjutan.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Modal Awal</p>
                <p className="text-xl font-bold text-[#111]">Mulai Rp 5 Juta</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Estimasi BEP</p>
                <p className="text-xl font-bold text-[#1B8C5A]">3 - 5 Bulan</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Jumlah Mitra</p>
                <p className="text-xl font-bold text-[#111]">100+ Cabang</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
            <h3 className="font-syne font-bold text-2xl mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-[#FF5C1A]" />
              Potensi Keuntungan
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Omset Rata-rata/Bulan", value: "Rp 15.000.000" },
                { label: "HPP (Harga Pokok Penjualan)", value: "45%" },
                { label: "Estimasi Laba Kotor", value: "Rp 8.250.000" },
                { label: "Net Profit Margin", value: "30% - 40%" }
              ].map((item, i) => (
                <li key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600 font-medium">{item.label}</span>
                  <span className="font-bold text-[#111]">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
            <h3 className="font-syne font-bold text-2xl mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-[#FF5C1A]" />
              Fasilitas Mitra
            </h3>
            <ul className="space-y-4">
              {[
                "Gerobak / Booth Premium",
                "Peralatan Masak Lengkap",
                "Bahan Baku Awal (50 Porsi)",
                "Seragam Karyawan",
                "Materi Promosi Digital",
                "Buku SOP & Pelatihan"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1B8C5A] shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </main>
  );
}
