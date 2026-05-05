"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const steps = [
  {
    n: "01",
    icon: "🔍",
    accent: "#FF5C1A",
    accentBg: "rgba(255,92,26,0.12)",
    tag: "Temukan",
    title: "Cari & Bandingkan Brand",
    desc: "Filter berdasarkan modal, kategori F&B, kota, dan estimasi keuntungan. Temukan franchise yang benar-benar pas buatmu.",
    detail: ["500+ filter pilihan", "Estimasi ROI akurat", "Perbandingan side-by-side"],
  },
  {
    n: "02",
    icon: "🤝",
    accent: "#FFCF40",
    accentBg: "rgba(255,207,64,0.15)",
    tag: "Negosiasi",
    title: "Hubungi & Negosiasi",
    desc: "Terhubung langsung dengan pemilik brand. Dapatkan proposal resmi, kunjungi gerai, dan tandatangani perjanjian.",
    detail: ["Chat langsung franchisor", "Kunjungan gerai gratis", "Kontrak transparan"],
  },
  {
    n: "03",
    icon: "🚀",
    accent: "#1B8C5A",
    accentBg: "rgba(27,140,90,0.12)",
    tag: "Mulai Cuan",
    title: "Buka & Raih Untung",
    desc: "Pelatihan masak, SOP operasional, dan dukungan penuh dari franchisor. Grand opening dengan percaya diri!",
    detail: ["Pelatihan langsung", "SOP siap pakai", "Support 24/7"],
  },
];

export default function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".step-reveal").forEach((el) => observer.observe(el));

    // Animate progress line
    if (lineRef.current) {
      observer.observe(lineRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cara-kerja" className="px-[5%] py-24 relative overflow-hidden">
      {/* Subtle bg texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,92,26,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,207,64,0.06) 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <span className="inline-flex items-center gap-2 bg-[#FFF3E5] text-[#FF5C1A] border border-[#FF5C1A]/20 px-4 py-1.5 rounded-full text-[0.72rem] font-bold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C1A]" />
              Cara Kerja
            </span>
            <h2 className="font-fraunces font-black text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.1] text-[#111111]">
              Dari Nol ke Grand Opening{" "}
              <em className="text-[#FF5C1A] not-italic">dalam 3 Langkah</em>
            </h2>
          </div>
          <p className="text-[#666] text-[0.97rem] leading-[1.75] max-w-sm lg:text-right">
            Proses yang kami rancang sesederhana mungkin — supaya kamu bisa fokus membangun bisnisnya.
          </p>
        </div>

        {/* ── Steps ── */}
        <div className="grid md:grid-cols-3 gap-5 relative">

          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px z-0">
            <div className="w-full h-full bg-gradient-to-r from-[#FF5C1A]/30 via-[#FFCF40]/40 to-[#1B8C5A]/30" />
            {/* Animated dot on line */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FF5C1A] shadow-[0_0_8px_rgba(255,92,26,0.6)]"
              style={{ animation: "slideAlongLine 3s ease-in-out infinite", left: 0 }}
            />
          </div>

          {steps.map((s, i) => (
            <div
              key={s.n}
              className="step-reveal reveal relative z-10 group"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="bg-white rounded-[24px] p-7 border border-black/6 h-full flex flex-col gap-5 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden relative">

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[24px]"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${s.accent}08 0%, transparent 60%)` }}
                />

                {/* Top row — number + icon */}
                <div className="flex items-start justify-between">
                  {/* Step number pill */}
                  <div
                    className="font-syne font-extrabold text-[0.72rem] tracking-[3px] px-3 py-1.5 rounded-full border"
                    style={{ color: s.accent, borderColor: `${s.accent}30`, background: s.accentBg }}
                  >
                    STEP {s.n}
                  </div>
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-[1.4rem] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: s.accentBg }}
                  >
                    {s.icon}
                  </div>
                </div>

                {/* Tag */}
                <div>
                  <span
                    className="text-[0.68rem] font-bold uppercase tracking-[2px]"
                    style={{ color: s.accent }}
                  >
                    {s.tag}
                  </span>
                  <h3 className="font-syne font-extrabold text-[1.12rem] text-[#111111] mt-1 leading-snug">
                    {s.title}
                  </h3>
                </div>

                {/* Desc */}
                <p className="text-[#666] text-[0.875rem] leading-[1.7] flex-1">
                  {s.desc}
                </p>

                {/* Detail checklist */}
                <ul className="flex flex-col gap-1.5 pt-4 border-t border-black/5">
                  {s.detail.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-[0.8rem] text-[#555] font-medium">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[0.6rem] font-bold flex-shrink-0"
                        style={{ background: s.accentBg, color: s.accent }}
                      >
                        ✓
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>

                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }}
                />
              </div>

              {/* Arrow between cards (mobile) */}
              {i < steps.length - 1 && (
                <div className="flex md:hidden justify-center mt-3 mb-1">
                  <div
                    className="flex flex-col items-center gap-1"
                    style={{ color: s.accent }}
                  >
                    <div className="w-px h-5 bg-current opacity-30" />
                    <span className="text-sm opacity-60">↓</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Bottom CTA bar ── */}
        <div className="mt-14 bg-[#111111] rounded-[24px] px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#FF5C1A]/15 flex items-center justify-center text-xl">⚡</div>
            <div>
              <p className="font-syne font-extrabold text-white text-[1rem]">Mulai sekarang, gratis!</p>
              <p className="text-white/45 text-[0.78rem] mt-0.5">Rata-rata mitra buka usaha dalam 30 hari</p>
            </div>
          </div>
          <Link
            href="/franchise"
            className="flex-shrink-0 flex items-center gap-2 bg-[#FF5C1A] text-white px-6 py-3 rounded-full font-bold text-[0.88rem] shadow-[0_4px_20px_rgba(255,92,26,0.4)] hover:bg-[#e04710] hover:-translate-y-0.5 transition-all"
          >
            Cari Franchise Sekarang
            <span className="text-[#FFCF40] font-black">→</span>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes slideAlongLine {
          0%   { left: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}