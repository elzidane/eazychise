"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Star, CheckCircle2, ArrowRight, X, TrendingUp, Sparkles, Brain } from "lucide-react";
import { MdBalance } from "react-icons/md";
import { Franchise } from "@/types";
import { createClient } from "@/utils/supabase/client";
import SpotlightCard from "@/components/cards/SpotlightCard";
import Typewriter from "@/components/effects/Typewriter";
import AIConsultantCard from "@/components/features/AIConsultantCard";

export default function ComparePage() {
  const router = useRouter();
  const [items, setItems] = useState<Franchise[]>([]);
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const generateAnalysis = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysis("");

    const brandSummary = items.map(f => `- ${f.name}: Investasi ${f.invest}, ROI ${f.roi}, Omzet ${f.omzet}`).join("\n");
    const prompt = `Anda adalah Expert Business Consultant. Bandingkan brand franchise berikut secara profesional dan berikan output terstruktur:

${brandSummary}

Berikan analisis dalam format berikut (Gunakan Bahasa Indonesia yang elegan):
1. RINGKASAN EKSEKUTIF: (Ringkasan singkat perbandingan)
2. ANALISIS FINANSIAL: (Bandingkan ROI dan efisiensi modal)
3. POTENSI PASAR & EKSPANSI: (Mana yang paling cepat berkembang)
4. REKOMENDASI STRATEGIS: (Rekomendasi utama berdasarkan profil investor yang berbeda)`;

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
    const fetchCompareData = async () => {
      try {
        const stored = sessionStorage.getItem("eazychise_compare");
        if (stored) {
          const names: string[] = JSON.parse(stored);
          const supabase = createClient();
          const { data } = await supabase.from('franchises').select('*').in('name', names);
          if (data) {
             const mappedData = data.map(f => ({
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
             setItems(mappedData);
          }
        }
      } catch {}
    };
    fetchCompareData();
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
          className="bg-white rounded-[2rem] border border-black/5 overflow-x-auto shadow-[0_20px_60px_rgba(0,0,0,0.06)] custom-scrollbar"
        >
          <div className="min-w-[800px] lg:min-w-full">
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
              onMouseEnter={() => setHoveredRow(c.key)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`grid transition-all duration-300 ${
                hoveredRow === c.key 
                  ? "bg-[#FF5C1A]/[0.03] scale-[1.01] z-10 shadow-sm" 
                  : i % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]"
              }`}
              style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}
            >
              <div className={`p-5 flex items-center border-r border-black/5 transition-colors ${hoveredRow === c.key ? "bg-[#FF5C1A]/5" : ""}`}>
                <span className={`text-sm font-semibold transition-colors ${hoveredRow === c.key ? "text-[#FF5C1A]" : "text-[#888]"}`}>{c.label}</span>
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
          </div>
        </motion.div>

        {/* AI Analysis Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-8">
             <div className="h-px flex-1 bg-gradient-to-r from-transparent to-black/5" />
             <h2 className="font-syne font-extrabold text-xs uppercase tracking-[0.3em] text-[#999]">AI Diagnostic Tool</h2>
             <div className="h-px flex-1 bg-gradient-to-l from-transparent to-black/5" />
          </div>

          <AIConsultantCard 
            isAnalyzing={isAnalyzing}
            analysis={analysis}
            onGenerate={generateAnalysis}
          />
        </motion.div>



        {/* Mobile scroll hint */}
        <div className="flex flex-col items-center gap-2 mt-8 lg:hidden">
          <motion.div 
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex items-center gap-2 bg-[#FF5C1A]/10 text-[#FF5C1A] px-4 py-2 rounded-full border border-[#FF5C1A]/20 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[0.65rem] font-black uppercase tracking-widest">Geser untuk membandingkan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
          <p className="text-[0.6rem] text-gray-400 font-bold uppercase tracking-tighter">Tabel mendukung scroll horizontal</p>
        </div>
      </div>
    </main>
  );
}
