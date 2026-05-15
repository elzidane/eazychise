"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Calculator, MapPin, Download, Check, ArrowDown, Zap } from "lucide-react";
import { ScrollReveal, StaggerReveal, fadeUp, slideUp } from "../effects/ScrollMotion";

const steps = [
  {
    n: "01",
    icon: Sparkles,
    accent: "#FF5C1A",
    accentBg: "rgba(255,92,26,0.12)",
    tag: "Konsultasi",
    title: "Tanya AI Advisor",
    desc: "Jawab 4 pertanyaan singkat, dan AI akan menganalisis profilmu untuk memberikan rekomendasi franchise yang cocok.",
    detail: ["Analisis instan", "Rekomendasi personal", "Identifikasi SWOT"],
  },
  {
    n: "02",
    icon: Calculator,
    accent: "#FFCF40",
    accentBg: "rgba(255,207,64,0.15)",
    tag: "Simulasi",
    title: "Hitung BEP & ROI",
    desc: "Gunakan kalkulator pintar kami untuk menyimulasikan arus kas, balik modal, dan mengukur risiko finansial.",
    detail: ["Proyeksi bulanan", "Penyesuaian OPEX", "Analisis margin"],
  },
  {
    n: "03",
    icon: MapPin,
    accent: "#1B8C5A",
    accentBg: "rgba(27,140,90,0.12)",
    tag: "Validasi",
    title: "Peta & Bandingkan",
    desc: "Lihat hotspot lokasi strategis di peta, dan bandingkan 2-3 franchise incaranmu secara side-by-side.",
    detail: ["AI Location mapper", "Perbandingan data", "Area kompetitor"],
  },
  {
    n: "04",
    icon: Download,
    accent: "#3B82F6",
    accentBg: "rgba(59,130,246,0.12)",
    tag: "Eksekusi",
    title: "Unduh Proposal",
    desc: "Dapatkan proposal resmi dalam format PDF otomatis, pelajari rinciannya, dan hubungi pihak franchisor langsung.",
    detail: ["Generate PDF", "Kontak franchisor", "Sistem transparan"],
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="px-[5%] py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,92,26,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,207,64,0.06) 0%, transparent 40%)" }} />

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <ScrollReveal variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-[#FFF3E5] text-[#FF5C1A] border border-[#FF5C1A]/20 px-4 py-1.5 rounded-full text-[0.72rem] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C1A]" />
              Panduan Web
            </span>
            <h2 className="font-fraunces font-black text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.1] text-[#111111]">
              Cara Pakai EazyChise{" "}
              <em className="text-[#FF5C1A] not-italic">dalam 4 Langkah</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal variants={fadeUp} delay={0.15}>
            <p className="text-[#666] text-[0.97rem] leading-[1.75] max-w-sm lg:text-right">
              Gunakan semua fitur canggih kami untuk memastikan pilihan franchisemu tepat, aman, dan menguntungkan.
            </p>
          </ScrollReveal>
        </div>

        <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative" threshold={0.1}>
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px z-0">
            <div className="w-full h-full bg-gradient-to-r from-[#FF5C1A]/30 via-[#FFCF40]/40 to-[#3B82F6]/30" />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FF5C1A] shadow-[0_0_8px_rgba(255,92,26,0.6)]"
              animate={{ left: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            />
          </div>

          {steps.map((s, i) => (
            <motion.div key={s.n} variants={slideUp} className="relative z-10 group h-full">
              <motion.div
                className="bg-white rounded-[24px] p-6 lg:p-7 border border-black/6 h-full flex flex-col gap-5 overflow-hidden relative"
                whileHover={{ y: -8, boxShadow: "0 28px 60px rgba(0,0,0,0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[24px]"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${s.accent}08 0%, transparent 60%)` }} />
                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }} />

                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="font-syne font-extrabold text-[0.72rem] tracking-[3px] px-3 py-1.5 rounded-full border"
                    style={{ color: s.accent, borderColor: `${s.accent}30`, background: s.accentBg }}>
                    STEP {s.n}
                  </div>
                  <motion.div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: s.accentBg, color: s.accent }}
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <s.icon className="w-5 h-5" />
                  </motion.div>
                </div>

                {/* Tag + title */}
                <div>
                  <span className="text-[0.68rem] font-bold uppercase tracking-[2px]" style={{ color: s.accent }}>{s.tag}</span>
                  <h3 className="font-syne font-extrabold text-[1.05rem] text-[#111111] mt-1 leading-snug">{s.title}</h3>
                </div>

                {/* Desc */}
                <p className="text-[#666] text-[0.82rem] leading-[1.65] flex-1">{s.desc}</p>

                {/* Checklist */}
                <ul className="flex flex-col gap-1.5 pt-4 border-t border-black/5 mt-auto">
                  {s.detail.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-[0.75rem] text-[#555] font-medium">
                      <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: s.accentBg, color: s.accent }}>
                        <Check className="w-2 h-2" />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {i < steps.length - 1 && (
                <div className="flex lg:hidden justify-center mt-3 mb-1">
                  <div className="flex flex-col items-center gap-1" style={{ color: s.accent }}>
                    <div className="w-px h-5 bg-current opacity-30" />
                    <ArrowDown className="w-4 h-4 opacity-60" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </StaggerReveal>

        <ScrollReveal variants={fadeUp} delay={0.2} className="mt-14">
          <div className="bg-[#111111] rounded-[24px] px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#FF5C1A]/15 flex items-center justify-center text-[#FF5C1A]">
                <Zap className="w-5 h-5 fill-[#FF5C1A]" />
              </div>
              <div>
                <p className="font-syne font-extrabold text-white text-[1rem]">Mulai analisis gratismu sekarang!</p>
                <p className="text-white/45 text-[0.78rem] mt-0.5">Tidak perlu daftar akun untuk menggunakan kalkulator.</p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/analisis-bep"
                className="flex-shrink-0 flex items-center gap-2 bg-[#FF5C1A] text-white px-6 py-3 rounded-full font-bold text-[0.88rem] shadow-[0_4px_20px_rgba(255,92,26,0.4)] hover:bg-[#e04710] transition-all">
                Coba Hitung BEP
                <ArrowRight className="w-4 h-4 text-[#FFCF40]" />
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}