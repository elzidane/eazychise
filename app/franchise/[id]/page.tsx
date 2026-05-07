"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, TrendingUp, Users, MapPin, Star, Download } from "lucide-react";
import { generateProposalPDF } from "@/lib/pdf-generator";
import { FRANCHISE_DATA } from "@/lib/franchise-data";
import PartnershipModal from "@/components/PartnershipModal";
import LocationRecommender from "@/components/LocationRecommender";
import SpotlightCard from "@/components/SpotlightCard";
import Typewriter from "@/components/Typewriter";
import { Brain, Sparkles, Zap } from "lucide-react";

export default function FranchiseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = React.use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Find the franchise in our data
  const franchise = FRANCHISE_DATA.find(f => 
    f.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  const generateAnalysis = async () => {
    if (!franchise || isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysis("");

    const prompt = `Berikan analisis strategis untuk franchise berikut:
Nama: ${franchise.name}
Modal: ${franchise.invest}
ROI: ${franchise.roi}
Omzet: ${franchise.omzet}
Kategori: ${franchise.cat}

Tugas Anda:
1. Berikan analisis SWOT singkat (Strengths, Weaknesses, Opportunities, Threats).
2. Siapa target pasar yang paling cocok untuk lokasi franchise ini?
3. Berikan 1 saran strategis untuk meningkatkan penjualan jika saya baru memulai.
4. Gaya bahasa: Profesional, tajam, dan edukatif (senior business consultant).`;

    try {
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      if (data.reply) {
        setAnalysis(data.reply);
      } else {
        setAnalysis("Gagal memuat analisis. Coba lagi nanti.");
      }
    } catch (err) {
      setAnalysis("Masalah koneksi. Periksa internet Anda.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!franchise) {
    return (
      <main className="pt-32 pb-20 min-h-screen bg-[#FFF9F0] flex flex-col items-center justify-center text-center px-5">
        <h1 className="text-4xl font-extrabold mb-4 font-syne text-[#111]">Franchise Tidak Ditemukan</h1>
        <p className="text-gray-500 mb-8">Maaf, kami tidak dapat menemukan data untuk franchise yang Anda cari.</p>
        <Link href="/franchise" className="bg-[#111] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#FF5C1A] transition-colors">
          Kembali ke Daftar
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20 min-h-screen bg-[#FFF9F0]">
      <div className="max-w-5xl mx-auto px-5">
        
        {/* Back Button */}
        <Link 
          href="/franchise" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF5C1A] mb-8 transition-colors font-medium text-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar Franchise
        </Link>

        {/* Hero Section */}
        <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 flex flex-col md:flex-row gap-10 mb-8 relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5C1A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="md:w-1/3 flex flex-col gap-4">
            <div className="w-full aspect-square relative rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
              <Image 
                src={franchise.img}
                alt={franchise.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#111] text-white py-4 rounded-xl font-bold hover:bg-[#FF5C1A] transition-all shadow-lg hover:shadow-[#FF5C1A]/20 active:scale-95"
            >
              Ajukan Kemitraan
            </button>
            <button 
              onClick={() => generateProposalPDF(franchise)}
              className="w-full bg-white border-2 border-gray-200 text-[#111] py-4 rounded-xl font-bold hover:border-[#111] transition-colors flex items-center justify-center gap-2 active:scale-95"
            >
              <Download className="w-5 h-5" />
              Unduh Proposal PDF
            </button>
          </div>

          <div className="md:w-2/3 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="bg-[#FF5C1A]/10 text-[#FF5C1A] font-bold text-xs px-3 py-1.5 rounded-full">
                Franchise Terverifikasi
              </div>
              <div className="bg-gray-100 text-gray-600 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                {franchise.rating}
              </div>
              <div className="bg-gray-100 text-gray-600 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {franchise.city}
              </div>
            </div>
            
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl text-[#111] leading-tight mb-4">
              {franchise.name}
            </h1>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Bergabunglah dengan jaringan kemitraan {franchise.name} yang telah sukses di {franchise.city}. Kami menawarkan sistem yang teruji, bahan baku berkualitas, dan dukungan pemasaran berkelanjutan untuk memastikan kesuksesan bisnis Anda.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Modal Investasi</p>
                <p className="text-xl font-extrabold text-[#111]">{franchise.invest}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Estimasi ROI</p>
                <p className="text-xl font-extrabold text-[#1B8C5A]">{franchise.roi}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Jumlah Mitra</p>
                <p className="text-xl font-extrabold text-[#111]">{franchise.mitra}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-syne font-bold text-2xl mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-[#FF5C1A]" />
              Potensi Bisnis
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Estimasi Omzet / Bulan", value: franchise.omzet },
                { label: "HPP (Harga Pokok Penjualan)", value: "± 40-50%" },
                { label: "Estimasi Laba Bersih", value: "25% - 35%" },
                { label: "Bimbingan Operasional", value: "Tersedia" }
              ].map((item, i) => (
                <li key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600 font-medium">{item.label}</span>
                  <span className="font-bold text-[#111]">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-syne font-bold text-2xl mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-[#FF5C1A]" />
              Paket Kemitraan
            </h3>
            <ul className="space-y-4">
              {[
                "Lisensi Brand Selamanya",
                "Booth / Gerobak Design Premium",
                "Starter Kit & Peralatan Lengkap",
                "Bahan Baku Awal 100 Porsi",
                "Pelatihan Karyawan (Offline/Online)",
                "Support Promosi Digital & Materi Ads"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-0.5 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1B8C5A]" />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Location Recommender Integration */}
        <LocationRecommender category={franchise.cat} />

        {/* AI Strategic Analysis Section */}
        <div className="mt-12">
          {!analysis && !isAnalyzing ? (
            <div className="bg-[#111] rounded-[32px] p-8 text-center border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF5C1A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-xl">
                  <Brain className="w-8 h-8 text-[#FF5C1A]" />
                </div>
                <h3 className="font-syne font-bold text-2xl text-white mb-3">Dapatkan Analisis Strategis AI</h3>
                <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
                  Gunakan kecerdasan buatan untuk membedah potensi profit, risiko, dan strategi khusus untuk {franchise.name}.
                </p>
                <button
                  onClick={generateAnalysis}
                  className="bg-[#FF5C1A] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white hover:text-[#111] transition-all flex items-center gap-2 mx-auto shadow-lg shadow-[#FF5C1A]/20 active:scale-95"
                >
                  <Zap className="w-4 h-4" /> Mulai Analisis
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SpotlightCard className="bg-white rounded-[40px] border border-[#FF5C1A]/10 p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5C1A]/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF5C1A] to-[#FF8C1A] flex items-center justify-center shadow-lg shadow-[#FF5C1A]/20">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="font-syne font-extrabold text-2xl text-[#111] leading-none mb-2">EazyChise AI Analysis</h2>
                    <div className="flex items-center gap-2 text-[#FF5C1A]">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-widest">Business Intelligence Active</span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-orange max-w-none">
                  {isAnalyzing ? (
                    <div className="space-y-4">
                      <div className="h-4 w-full bg-gray-100 rounded-full animate-pulse" />
                      <div className="h-4 w-5/6 bg-gray-100 rounded-full animate-pulse" />
                      <div className="h-4 w-4/6 bg-gray-100 rounded-full animate-pulse" />
                      <p className="text-sm text-gray-400 font-bold italic pt-2">AI sedang memproses data historis dan tren pasar...</p>
                    </div>
                  ) : (
                    <div className="text-[#333] leading-[1.8] text-[1.05rem] font-medium whitespace-pre-wrap">
                      <Typewriter text={analysis} speed={10} />
                    </div>
                  )}
                </div>

                {!isAnalyzing && (
                  <div className="mt-10 pt-8 border-t border-black/5 flex justify-end">
                    <button
                      onClick={generateAnalysis}
                      className="text-sm font-bold text-[#FF5C1A] hover:underline flex items-center gap-2"
                    >
                      <TrendingUp className="w-4 h-4" /> Perbarui Analisis
                    </button>
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          )}
        </div>

        {/* Call to Action Bottom */}
        <div className="mt-12 bg-[#111] rounded-[32px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 text-center md:text-left">
            <h2 className="font-syne font-extrabold text-3xl mb-2 text-white">Siap Mulai Bisnis {franchise.name}?</h2>
            <p className="text-white/60 font-medium">Jadilah bagian dari jaringan sukses kami sekarang.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="relative z-10 bg-[#FF5C1A] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#111] transition-all shadow-xl active:scale-95"
          >
            Daftar Sekarang
          </button>
        </div>
      </div>

      <PartnershipModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        franchiseName={franchise.name} 
      />
    </main>
  );
}
