"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, TrendingUp, BookOpen, Calculator, ChevronRight } from "lucide-react";

const articles = [
  {
    slug: "franchise-fb-modal-kecil-2025",
    title: "5 Franchise F&B Modal Kecil Paling Menguntungkan 2025",
    excerpt: "Memulai bisnis franchise tidak harus mahal. Berikut 5 brand franchise makanan dan minuman dengan modal di bawah Rp 5 juta yang sudah terbukti menguntungkan.",
    category: "Tips Bisnis",
    readTime: "5 menit",
    date: "28 April 2025",
    icon: TrendingUp,
    color: "#FF5C1A",
  },
  {
    slug: "cara-hitung-bep-franchise",
    title: "Cara Hitung BEP Franchise untuk Pemula: Panduan Lengkap",
    excerpt: "Break Even Point (BEP) adalah indikator kunci sebelum investasi franchise. Pelajari cara menghitung BEP yang benar, lengkap dengan rumus dan contoh kasus nyata.",
    category: "Edukasi",
    readTime: "8 menit",
    date: "22 April 2025",
    icon: Calculator,
    color: "#1B8C5A",
  },
  {
    slug: "panduan-memilih-franchise-fb",
    title: "Panduan Lengkap Memilih Franchise F&B Pertamamu",
    excerpt: "Dari riset pasar, cek legalitas, hingga negosiasi kontrak — panduan step-by-step untuk kamu yang baru pertama kali ingin bergabung dengan franchise kuliner.",
    category: "Panduan",
    readTime: "10 menit",
    date: "15 April 2025",
    icon: BookOpen,
    color: "#7C3AED",
  },
];

export default function BlogContent() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-[5%]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="text-[#FF5C1A] text-[0.72rem] font-bold uppercase tracking-[4px] mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-[#FF5C1A]" />
            Blog & Tips Bisnis
          </p>
          <h1 className="font-syne font-black text-[clamp(2.2rem,4vw,3.5rem)] text-[#111] leading-[1.08] mb-4">
            Insight untuk Calon <em className="text-[#FF5C1A] not-italic">Pengusaha F&B</em>
          </h1>
          <p className="text-[#777] text-lg max-w-xl leading-[1.7]">
            Artikel, panduan, dan tips praktis untuk membantu kamu memulai dan mengembangkan bisnis franchise kuliner.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {articles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/blog/${article.slug}`} className="group block">
                <div className="bg-white rounded-2xl border border-black/5 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all h-full flex flex-col">
                  <div 
                    className="h-40 relative overflow-hidden flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${article.color}15, ${article.color}08)` }}
                  >
                    <article.icon className="w-16 h-16 transition-transform group-hover:scale-110 group-hover:rotate-6" style={{ color: `${article.color}40` }} />
                    <div className="absolute top-4 left-4">
                      <span 
                        className="text-[0.65rem] font-bold px-3 py-1.5 rounded-full text-white"
                        style={{ background: article.color }}
                      >
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-bold text-[#111] text-[1.05rem] leading-snug mb-3 group-hover:text-[#FF5C1A] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-[#888] text-[0.85rem] leading-[1.7] mb-5 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#bbb] font-medium">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                        <span>{article.date}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#FF5C1A] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-[#111] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(255,92,26,0.15) 0%, transparent 70%)"
          }} />
          <div className="relative z-10">
            <h3 className="font-syne font-black text-2xl md:text-3xl text-white mb-4">
              Dapatkan Tips Bisnis Terbaru
            </h3>
            <p className="text-white/40 text-sm max-w-md mx-auto mb-8">
              Artikel dan insight eksklusif langsung ke inbox kamu. Gratis, tanpa spam.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="nama@email.com"
                className="flex-1 bg-white/8 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#FF5C1A]/50 focus:border-[#FF5C1A]"
              />
              <button className="bg-[#FF5C1A] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-[0_6px_20px_rgba(255,92,26,0.35)] hover:bg-[#e04710] transition-all flex items-center justify-center gap-2">
                Langganan <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
