"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2, TrendingUp, Users, Award, ShieldCheck, ArrowRight } from "lucide-react";
import ReviewsSection from "@/components/ReviewsSection";
import Link from "next/link";
import { STATS } from "@/lib/constants";

export default function UlasanPage() {
  return (
    <main className="bg-[#FFF9F0] min-h-screen pt-24 lg:pt-32 pb-20 overflow-hidden">
      {/* ── HERO SECTION ── */}
      <section className="px-[5%] mb-16 lg:mb-24 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF5C1A]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#FF5C1A]/10 text-[#FF5C1A] px-4 py-2 rounded-full text-[0.75rem] font-black uppercase tracking-[0.2em] mb-6"
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            Terpercaya & Terverifikasi
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-syne font-extrabold text-[clamp(2.5rem,6vw,5rem)] text-[#111] leading-[0.95] tracking-tighter mb-6"
          >
            Apa Kata <span className="text-[#FF5C1A] italic">Mitra Kami?</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10"
          >
            {STATS.totalMitra.toLocaleString("id-ID")}+ pengusaha F&B telah mempercayai EazyChise sebagai partner pertumbuhan bisnis mereka.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-3"
          >
            <div className="flex text-[#FFCF40] gap-1 scale-125 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            <div className="text-[#111] font-syne font-black text-2xl">
              4.9/5 <span className="text-gray-300 font-normal mx-2">|</span> <span className="text-gray-400 text-base font-bold uppercase tracking-wider">DARI {STATS.totalMitra.toLocaleString("id-ID")} ULASAN</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS SUMMARY (4 Cards) ── */}
      <section className="px-[5%] mb-20 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: "Total Ulasan", value: STATS.totalMitra.toLocaleString("id-ID"), icon: Users, color: "#FF5C1A", bg: "bg-[#FF5C1A]/5" },
            { label: "Rating Rata-rata", value: "4.9/5", icon: Star, color: "#FFCF40", bg: "bg-[#FFCF40]/10" },
            { label: "Merekomendasikan", value: "97%", icon: CheckCircle2, color: "#1B8C5A", bg: "bg-green-50" },
            { label: "Rata-rata BEP", value: "6 Bulan", icon: TrendingUp, color: "#7C3AED", bg: "bg-purple-50" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 md:p-8 rounded-[32px] border border-black/[0.03] shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div className="font-syne font-black text-2xl md:text-3xl text-[#111] mb-1">{stat.value}</div>
              <div className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── REVIEWS GRID ── */}
      <section className="px-[5%] mb-24">
        <div className="max-w-7xl mx-auto">
          <ReviewsSection hideHeader />
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="px-[5%]">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#111] rounded-[48px] p-10 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FF5C1A]/20 to-transparent pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#FF5C1A]/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="font-syne font-extrabold text-3xl md:text-5xl text-white mb-6 leading-tight">
                Siap Jadi Mitra <br className="hidden md:block" /> <span className="text-[#FF5C1A] italic">EazyChise</span> Berikutnya?
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
                Jangan lewatkan peluang bisnis F&B terbaik dengan pendampingan penuh dari tim ahli kami.
              </p>
              
              <Link
                href="/daftar"
                className="inline-flex items-center gap-3 bg-[#FF5C1A] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_20px_40px_rgba(255,92,26,0.3)] hover:bg-[#e04710] hover:-translate-y-1 transition-all group"
              >
                Mulai Gratis Sekarang
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
