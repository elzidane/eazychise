"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Search, Handshake, Rocket, Check, ArrowDown, Zap } from "lucide-react";
import { ScrollReveal, StaggerReveal, ParallaxScroll, fadeUp, slideUp } from "../effects/ScrollMotion";

const steps = [
  {
    n: "01",
    icon: Search,
    accent: "#FF5C1A",
    accentBg: "rgba(255,92,26,0.12)",
    tag: "Temukan",
    title: "Cari & Bandingkan Brand",
    desc: "Filter berdasarkan modal, kategori F&B, kota, dan estimasi keuntungan. Temukan franchise yang benar-benar pas buatmu.",
    detail: ["500+ filter pilihan", "Estimasi ROI akurat", "Perbandingan side-by-side"],
  },
  {
    n: "02",
    icon: Handshake,
    accent: "#FFCF40",
    accentBg: "rgba(255,207,64,0.15)",
    tag: "Negosiasi",
    title: "Hubungi & Negosiasi",
    desc: "Terhubung langsung dengan pemilik brand. Dapatkan proposal resmi, kunjungi gerai, dan tandatangani perjanjian.",
    detail: ["Chat langsung franchisor", "Kunjungan gerai gratis", "Kontrak transparan"],
  },
  {
    n: "03",
    icon: Rocket,
    accent: "#1B8C5A",
    accentBg: "rgba(27,140,90,0.12)",
    tag: "Mulai Cuan",
    title: "Buka & Raih Untung",
    desc: "Pelatihan masak, SOP operasional, dan dukungan penuh dari franchisor. Grand opening dengan percaya diri!",
    detail: ["Pelatihan langsung", "SOP siap pakai", "Support 24/7"],
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="px-[5%] py-24 relative overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,92,26,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,207,64,0.06) 0%, transparent 40%)" }} />

      <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <ScrollReveal variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-[#FFF3E5] text-[#FF5C1A] border border-[#FF5C1A]/20 px-4 py-1.5 rounded-full text-[0.72rem] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C1A]" />
              Cara Kerja
            </span>
            <h2 className="font-fraunces font-black text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.1] text-[#111111]">
              Dari Nol ke Grand Opening{" "}
              <em className="text-[#FF5C1A] not-italic">dalam 3 Langkah</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal variants={fadeUp} delay={0.15}>
            <p className="text-[#666] text-[0.97rem] leading-[1.75] max-w-sm lg:text-right">
              Proses yang kami rancang sesederhana mungkin — supaya kamu bisa fokus membangun bisnisnya.
            </p>
          </ScrollReveal>
        </div>

                <StaggerReveal className="grid md:grid-cols-3 gap-5 relative" threshold={0.1}>
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px z-0">
            <div className="w-full h-full bg-gradient-to-r from-[#FF5C1A]/30 via-[#FFCF40]/40 to-[#1B8C5A]/30" />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FF5C1A] shadow-[0_0_8px_rgba(255,92,26,0.6)]"
              animate={{ left: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            />
          </div>

          {steps.map((s, i) => (
            <motion.div key={s.n} variants={slideUp} className="relative z-10 group">
              <motion.div
                className="bg-white rounded-[24px] p-7 border border-black/6 h-full flex flex-col gap-5 overflow-hidden relative"
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
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: s.accentBg, color: s.accent }}
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <s.icon className="w-6 h-6" />
                  </motion.div>
                </div>

                {/* Tag + title */}
                <div>
                  <span className="text-[0.68rem] font-bold uppercase tracking-[2px]" style={{ color: s.accent }}>{s.tag}</span>
                  <h3 className="font-syne font-extrabold text-[1.12rem] text-[#111111] mt-1 leading-snug">{s.title}</h3>
                </div>

                {/* Desc */}
                <p className="text-[#666] text-[0.875rem] leading-[1.7] flex-1">{s.desc}</p>

                {/* Checklist */}
                <ul className="flex flex-col gap-1.5 pt-4 border-t border-black/5">
                  {s.detail.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-[0.8rem] text-[#555] font-medium">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: s.accentBg, color: s.accent }}>
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {i < steps.length - 1 && (
                <div className="flex md:hidden justify-center mt-3 mb-1">
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
                <p className="font-syne font-extrabold text-white text-[1rem]">Mulai sekarang, gratis!</p>
                <p className="text-white/45 text-[0.78rem] mt-0.5">Rata-rata mitra buka usaha dalam 30 hari</p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/franchise"
                className="flex-shrink-0 flex items-center gap-2 bg-[#FF5C1A] text-white px-6 py-3 rounded-full font-bold text-[0.88rem] shadow-[0_4px_20px_rgba(255,92,26,0.4)] hover:bg-[#e04710] transition-all">
                Cari Franchise Sekarang
                <ArrowRight className="w-4 h-4 text-[#FFCF40]" />
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}