"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Star, CheckCircle2, ArrowRight, X, TrendingUp, Sparkles, Brain } from "lucide-react";
import { MdBalance } from "react-icons/md";
import { Franchise } from "@/types";
import { FRANCHISE_DATA } from "@/lib/franchise-data";
import Typewriter from "@/components/Typewriter";
import SpotlightCard from "@/components/SpotlightCard";

export default function ComparePage() {
  const router = useRouter();
  const [items, setItems] = useState<Franchise[]>([]);
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("eazychise_compare");
      if (stored) {
        const names: string[] = JSON.parse(stored);
        const found = names.map(n => FRANCHISE_DATA.find(f => f.name === n)).filter(Boolean) as Franchise[];
        setItems(found);
      }
    } catch {}
  }, []);

  const generateAnalysis = async () => {
    if (items.length < 2 || isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysis("");

    const prompt = `Saya sedang membandingkan beberapa franchise berikut:
${items.map(f => `- **${f.name}**: Modal ${f.invest}, ROI ${f.roi}, Omzet ${f.omzet}, Rating ${f.rating}, Kategori ${f.cat}`).join("\n")}

Berikan analisis mendalam (senior business consultant style) mengenai:
1. Perbandingan keunggulan masing-masing brand.
2. Analisis risiko untuk masing-masing.
3. Rekomendasi akhir: Mana yang paling cocok untuk investor pemula dengan budget terbatas vs investor berpengalaman yang mencari ROI stabil.
4. Gunakan gaya bahasa profesional, suportif, dan informatif.`;

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
        setAnalysis("Maaf, gagal menghasilkan analisis saat ini. Silakan coba lagi.");
      }
    } catch (err) {
      setAnalysis("Terjadi kesalahan koneksi. Pastikan API Key sudah terkonfigurasi.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (items.length < 2) {
    return (
      <main className="min-h-screen pt-28 pb-20 px-[5%] flex items-center justify-center">
        <div className="text-center">
          <MdBalance className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="font-syne font-extrabold text-2xl text-[#111] mb-3">Pilih Franchise untuk Dibandingkan</h1>
          <p className="text-[#888] text-sm mb-6">Pilih minimal 2 franchise dari halaman Franchise untuk memulai perbandingan.</p>
          <Link href="/franchise" className="inline-flex items-center gap-2 bg-[#FF5C1A] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-[0_6px_20px_rgba(255,92,26,0.3)] hover:bg-[#e04710] transition-all">
            Ke Halaman Franchise <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  const criteria = [
    { label: "Kategori", key: "cat" },
    { label: "Modal Awal", key: "invest" },
    { label: "ROI", key: "roi" },
    { label: "Omzet/Bulan", key: "omzet" },
    { label: "Mitra Aktif", key: "mitra" },
    { label: "Ketersediaan Kota", key: "city" },
    { label: "Rating", key: "rating" },
  ];

  return (
    <main className="min-h-screen pt-28 pb-20 px-[5%]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link href="/franchise" className="flex items-center gap-2 text-[#888] hover:text-[#FF5C1A] text-sm font-semibold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Franchise
          </Link>
          <p className="text-[#FF5C1A] text-[0.72rem] font-bold uppercase tracking-[4px] mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-[#FF5C1A]" />
            Perbandingan Franchise
          </p>
          <h1 className="font-fraunces font-black text-[clamp(2rem,4vw,3rem)] text-[#111] leading-[1.08]">
            Bandingkan <em className="text-[#FF5C1A] not-italic">{items.length} Franchise</em>
          </h1>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-black/5 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
        >
          {/* Header row with images */}
          <div className="grid border-b border-black/5" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
            <div className="p-6 bg-[#F8F8F6] flex items-center">
              <span className="font-syne font-extrabold text-sm text-[#999] uppercase tracking-wider">Kriteria</span>
            </div>
            {items.map((f) => (
              <div key={f.name} className="p-6 text-center border-l border-black/5">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-3 overflow-hidden shadow-sm">
                  <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-syne font-extrabold text-sm text-[#111] leading-tight">{f.name}</h3>
                {f.badge && (
                  <span className="inline-block mt-2 text-[0.6rem] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: f.badgeColor || "#FF5C1A" }}>
                    {f.badge}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {criteria.map((c, i) => (
            <div 
              key={c.key}
              className={`grid ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]"}`}
              style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}
            >
              <div className="p-5 flex items-center border-r border-black/5">
                <span className="text-sm font-semibold text-[#888]">{c.label}</span>
              </div>
              {items.map((f) => {
                const val = c.key === "rating" 
                  ? null 
                  : (f as Record<string, any>)[c.key];
                
                return (
                  <div key={f.name} className="p-5 text-center border-l border-black/[0.03] flex items-center justify-center">
                    {c.key === "rating" ? (
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-[#FFCF40] text-[#FFCF40]" />
                        <span className="font-bold text-[#111]">{f.rating}</span>
                      </div>
                    ) : c.key === "invest" ? (
                      <span className="font-bold text-[#1B8C5A] text-sm">{val}</span>
                    ) : (
                      <span className="text-sm text-[#555] font-medium">{val}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* CTA row */}
          <div className="grid border-t border-black/5" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
            <div className="p-5 bg-[#F8F8F6]" />
            {items.map((f) => (
              <div key={f.name} className="p-5 text-center border-l border-black/5">
                <Link
                  href={`/franchise/${f.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center gap-2 bg-[#FF5C1A] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_4px_16px_rgba(255,92,26,0.3)] hover:bg-[#e04710] hover:-translate-y-0.5 transition-all"
                >
                  Pilih <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Analysis Section */}
        <div className="mt-16">
          {!analysis && !isAnalyzing ? (
            <div className="text-center">
              <button
                onClick={generateAnalysis}
                className="group relative inline-flex items-center gap-3 bg-[#111] text-white px-8 py-4 rounded-2xl font-bold text-[0.95rem] overflow-hidden transition-all hover:bg-[#FF5C1A] hover:shadow-[0_20px_40px_rgba(255,92,26,0.2)] active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Sparkles className="w-5 h-5 text-[#FFCF40]" />
                Dapatkan Analisis Cerdas AI
              </button>
              <p className="text-[#888] text-xs mt-4 font-medium italic">Analisis mendalam keunggulan, risiko, dan rekomendasi strategis.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <SpotlightCard className="bg-white rounded-[40px] border border-[#FF5C1A]/10 p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.05)] relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5C1A]/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFCF40]/5 rounded-full blur-[80px] -ml-24 -mb-24" />

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF5C1A] to-[#FF8C1A] flex items-center justify-center shadow-lg shadow-[#FF5C1A]/20">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="font-syne font-extrabold text-2xl text-[#111] leading-none mb-2">Analisis Strategis AI</h2>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                      <span className="text-xs font-bold text-[#999] uppercase tracking-widest">EazyChise AI Advisor</span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-orange max-w-none">
                  {isAnalyzing ? (
                    <div className="flex flex-col gap-3 py-4">
                      <div className="h-4 w-full bg-gray-100 rounded-full animate-pulse" />
                      <div className="h-4 w-4/5 bg-gray-100 rounded-full animate-pulse" />
                      <div className="h-4 w-5/6 bg-gray-100 rounded-full animate-pulse" />
                      <div className="h-4 w-2/3 bg-gray-100 rounded-full animate-pulse" />
                      <p className="text-sm text-gray-400 font-medium italic mt-2">Menganalisis data pasar dan proyeksi keuangan...</p>
                    </div>
                  ) : (
                    <div className="text-[#333] leading-[1.8] text-[1.05rem] font-medium">
                      <Typewriter text={analysis} speed={8} className="whitespace-pre-wrap" />
                    </div>
                  )}
                </div>

                {!isAnalyzing && (
                  <div className="mt-12 pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-[#aaa] font-medium flex items-center gap-2">
                      <Sparkles className="w-3 h-3" />
                      Analisis ini bersifat rekomendasi berbasis data historis platform.
                    </p>
                    <button
                      onClick={generateAnalysis}
                      className="text-sm font-bold text-[#FF5C1A] hover:text-[#e04710] transition-colors flex items-center gap-2"
                    >
                      Perbarui Analisis <TrendingUp className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          )}
        </div>

        {/* Mobile scroll hint */}
        <p className="text-center text-xs text-[#ccc] mt-10 lg:hidden">← Geser untuk melihat semua kolom →</p>
      </div>
    </main>
  );
}
