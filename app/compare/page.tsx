"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Star, CheckCircle2, ArrowRight, X, TrendingUp, Sparkles, Brain } from "lucide-react";
import { MdBalance } from "react-icons/md";
import { Franchise } from "@/types";
import { FRANCHISE_DATA } from "@/lib/franchise-data";
import SpotlightCard from "@/components/SpotlightCard";
import Typewriter from "@/components/Typewriter";

export default function ComparePage() {
  const router = useRouter();
  const [items, setItems] = useState<Franchise[]>([]);
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateAnalysis = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysis("");

    const brandSummary = items.map(f => `- ${f.name}: Investasi ${f.invest}, ROI ${f.roi}, Omzet ${f.omzet}`).join("\n");
    const prompt = `Bandingkan brand franchise berikut secara profesional:\n${brandSummary}\n\nBerikan analisis singkat mengenai:\n1. Mana yang paling cocok untuk pemula modal minim.\n2. Mana yang memiliki potensi ekspansi tercepat.\n3. Rekomendasi utama berdasarkan efisiensi ROI.\nGaya bahasa: Expert Business Consultant.`;

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
        setAnalysis("Maaf, terjadi masalah saat memuat analisis. Silakan coba lagi.");
      }
    } catch (err) {
      setAnalysis("Maaf, koneksi bermasalah.");
    } finally {
      setIsAnalyzing(false);
    }
  };


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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          {!analysis && !isAnalyzing ? (
            <button
              onClick={generateAnalysis}
              className="w-full bg-[#111] text-white py-4 rounded-2xl font-bold hover:bg-[#FF5C1A] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 group"
            >
              <Brain className="w-5 h-5 text-[#FFCF40] group-hover:scale-110 transition-transform" />
              Dapatkan Analisis Strategis AI
            </button>
          ) : (
            <SpotlightCard className="bg-white rounded-3xl p-8 border border-[#FF5C1A]/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5C1A]/5 rounded-full blur-2xl -mr-16 -mt-16" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5C1A] to-[#FF8C1A] flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-syne font-bold text-lg text-[#111] leading-none mb-1.5">AI Comparison Insight</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[0.65rem] font-bold text-[#999] uppercase tracking-widest">Live Analysis</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-orange max-w-none">
                {isAnalyzing ? (
                  <div className="space-y-3">
                    <div className="h-3 w-full bg-gray-100 rounded-full animate-pulse" />
                    <div className="h-3 w-4/5 bg-gray-100 rounded-full animate-pulse" />
                    <div className="h-3 w-3/4 bg-gray-100 rounded-full animate-pulse" />
                  </div>
                ) : (
                  <div className="text-[#444] text-[0.95rem] leading-[1.8] whitespace-pre-wrap font-medium">
                    <Typewriter text={analysis} speed={8} />
                  </div>
                )}
              </div>
            </SpotlightCard>
          )}
        </motion.div>



        {/* Mobile scroll hint */}
        <p className="text-center text-xs text-[#ccc] mt-10 lg:hidden">← Geser untuk melihat semua kolom →</p>
      </div>
    </main>
  );
}
