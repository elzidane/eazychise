"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BlurText, CountUp, ShinyText, TiltCard } from "./Reactbitseffects";
import MagneticButton from "./MagneticButton";

const stats = [
  { num: 320, suffix: "+", label: "Brand F&B Aktif" },
  { num: 34, suffix: "", label: "Provinsi" },
  { num: 9000, suffix: "+", label: "Mitra Bergabung" },
];

const images = [
  {
    src: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/b5c9d124-ac38-4461-ad28-6b847b0dc223_Combo-Jiwa-Toast.jpg",
    alt: "Jiwa Toast",
    name: "Janji Jiwa",
    meta: "Modal Rp 5 Juta • Kuliner",
    tall: true,
  },
  {
    src: "https://franchiseindo.co.id/wp-content/uploads/2025/12/image-7-1024x538.webp",
    alt: "Nescafe",
    name: "Nescafe",
    meta: "Modal Rp 3,5 Juta • Minuman",
    tall: false,
  },
  {
    src: "https://cdn.sanity.io/images/kbqq3e0r/production/d19beba03d5c400bb058dfe803e8994e653a5516-2400x1334.png",
    alt: "KFC",
    name: "KFC",
    meta: "Modal Rp 7 Juta • Kuliner",
    tall: false,
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax subtle on mouse move
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const el = currentTarget as HTMLElement;
      const { width, height } = el.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 12;
      const y = (clientY / height - 0.5) * 8;
      const orbs = section.querySelectorAll<HTMLElement>(".hero-orb");
      orbs.forEach((orb, i) => {
        const factor = i % 2 === 0 ? 1 : -0.6;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };
    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-[5%] pt-28 pb-16 flex items-center"
    >
      {/* ── Background ── */}
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Orbs */}
      <div
        className="hero-orb absolute top-[-120px] right-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{ background: "radial-gradient(circle, rgba(255,92,26,0.1) 0%, transparent 70%)" }}
      />
      <div
        className="hero-orb absolute bottom-[-80px] left-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{ background: "radial-gradient(circle, rgba(255,207,64,0.13) 0%, transparent 65%)" }}
      />
      <div
        className="hero-orb absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{ background: "radial-gradient(circle, rgba(255,92,26,0.05) 0%, transparent 70%)" }}
      />

      {/* ── Main grid ── */}
      <div className="relative z-10 w-full grid lg:grid-cols-[1fr_1.05fr] gap-10 xl:gap-20 items-center">

        {/* ── LEFT CONTENT ── */}
        <div>

          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2.5 bg-[#111111] border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-white mb-7 shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C1A] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5C1A]" />
            </span>
            <ShinyText text="Platform F&B Franchise #1 Indonesia 🇮🇩" speed={10} />
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-1 text-[clamp(3rem,5.5vw,5.5rem)] leading-[0.98] mb-6">
            {/* Line 1 — Syne tegas */}
            <span className="block font-syne font-extrabold tracking-[-3px] text-[#111111]">
              <BlurText text="Bisnis" delay={120} animateBy="chars" />
            </span>
            {/* Line 2 — Fraunces italic hangat, dengan underline dekoratif */}
            <span className="relative block font-fraunces font-black italic text-[#FF5C1A] leading-[1.1]">
              Kuliner &amp;
              {/* Underline squiggle */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 320 12" fill="none"
                preserveAspectRatio="none"
                style={{ height: "10px" }}
              >
                <path
                  d="M2 7 C40 2, 80 11, 120 6 S200 1, 240 7 S290 11, 318 6"
                  stroke="#FF5C1A" strokeWidth="2.5" strokeLinecap="round"
                  fill="none" opacity="0.45"
                />
              </svg>
            </span>
            {/* Line 3 — outline */}
            <span
              className="block font-syne font-extrabold tracking-[-3px] mt-1"
              style={{ WebkitTextStroke: "2.5px #111111", color: "transparent" }}
            >
              <BlurText text="Minuman" delay={100} animateBy="chars" />
            </span>
          </h1>

          {/* Desc */}
          <p className="animate-fade-up-2 text-[#666] leading-[1.8] text-[1rem] max-w-[440px] mb-8">
            EazyChise menyatukan calon pemilik usaha F&amp;B dengan ratusan brand franchise makanan dan minuman terpercaya. Modal mulai{" "}
            <strong className="text-[#111111] font-semibold">Rp 2 juta</strong>,
            pendampingan dari nol sampai buka.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up-3 flex flex-wrap gap-3 mb-10 items-center">
            <MagneticButton strength={0.2}>
              <Link
                href="/franchise"
                className="group relative flex items-center gap-2 bg-[#FF5C1A] text-white pl-6 pr-5 py-3.5 rounded-full font-bold text-[0.93rem] shadow-[0_6px_28px_rgba(255,92,26,0.38)] hover:shadow-[0_12px_36px_rgba(255,92,26,0.5)] transition-all duration-200 overflow-hidden"
              >
                {/* Shimmer */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative">🔍 Cari Franchise F&amp;B</span>
                <span className="relative text-[#FFCF40] font-black">→</span>
              </Link>
            </MagneticButton>
            
            <Link
              href="/daftar"
              className="flex items-center gap-2 border-2 border-[#111111]/20 text-[#333] bg-white px-6 py-3.5 rounded-full font-bold text-[0.93rem] hover:border-[#111111] hover:text-[#111111] hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
            >
              Daftarkan Brand
              <span className="text-[#FF5C1A]">→</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-up-4 flex gap-6 flex-wrap">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group flex flex-col gap-0.5 px-4 py-3 rounded-2xl bg-white border border-black/6 hover:border-[#FF5C1A]/30 hover:shadow-[0_4px_20px_rgba(255,92,26,0.1)] transition-all duration-200"
              >
                <div className="font-syne font-extrabold text-[1.85rem] leading-none text-[#111111]">
                  <CountUp end={s.num} duration={2000} suffix={s.suffix} />
                </div>
                <p className="text-[0.72rem] text-[#888] font-semibold uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Social proof avatars */}
          <div className="animate-fade-up-5 hidden lg:flex items-center gap-3 mt-7">
            <div className="flex -space-x-2">
              {["🧑🏽", "👩🏻", "👨🏾", "👩🏼", "🧑🏻"].map((emoji, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-[#FFF3E5] border-2 border-[#FFF9F0] flex items-center justify-center text-sm shadow-sm"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <div>
              <p className="text-[0.78rem] font-semibold text-[#333]">
                <span className="text-[#FF5C1A] font-bold">9.000+</span> mitra aktif
              </p>
              <div className="flex gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#FFCF40] text-[0.65rem]">★</span>
                ))}
                <span className="text-[0.68rem] text-[#888] ml-1">4.9/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT VISUAL ── */}
        <div className="hidden lg:block animate-fade-left">
          <div className="relative">

            {/* Image grid */}
            <div className="grid grid-cols-[1.15fr_0.85fr] grid-rows-[270px_210px] gap-3">
              {/* Tall */}
              <div className="row-span-2 rounded-[24px] overflow-hidden relative group shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="320px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {/* Category chip top */}
                <div className="absolute top-3 left-3 bg-[#FF5C1A] text-white text-[0.65rem] font-bold px-2.5 py-1 rounded-full">
                  🍜 Kuliner
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm leading-tight">{images[0].name}</p>
                  <p className="text-white/60 text-[0.68rem] mt-0.5">{images[0].meta}</p>
                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="text-[#FFCF40] text-[0.7rem]">★★★★★</span>
                    <span className="text-white/50 text-[0.65rem]">4.9</span>
                  </div>
                </div>
              </div>

              {/* Small top */}
              <div className="rounded-[20px] overflow-hidden relative group shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="240px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-sm text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-full">
                  ☕ Minuman
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-bold text-xs">{images[1].name}</p>
                  <p className="text-white/55 text-[0.65rem]">{images[1].meta}</p>
                </div>
              </div>

              {/* Small bottom */}
              <div className="rounded-[20px] overflow-hidden relative group shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="240px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-sm text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-full">
                  🍗 Kuliner
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-bold text-xs">{images[2].name}</p>
                  <p className="text-white/55 text-[0.65rem]">{images[2].meta}</p>
                </div>
              </div>
            </div>

            {/* ── Floating badges ── */}
            {/* Top right — Terlaris */}
            <div
              className="absolute -top-6 -right-6 bg-[#FFCF40] rounded-2xl px-4 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.14)] flex items-center gap-3 z-20 animate-float"
              style={{ minWidth: 170 }}
            >
              <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center text-xl flex-shrink-0">🔥</div>
              <div>
                <p className="font-extrabold text-[0.88rem] text-[#111] leading-none">Terlaris Bulan Ini</p>
                <p className="text-[0.7rem] text-black/55 mt-0.5">Kopi Susu Kekinian</p>
              </div>
            </div>

            {/* Bottom left — Verified */}
            <div
              className="absolute -bottom-5 -left-7 bg-white rounded-2xl px-4 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.1)] flex items-center gap-3 z-20 animate-float-delay"
              style={{ minWidth: 190 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#1B8C5A]/10 flex items-center justify-center text-xl flex-shrink-0">✅</div>
              <div>
                <p className="font-extrabold text-[0.88rem] text-[#1B8C5A] leading-none">Semua Terverifikasi</p>
                <p className="text-[0.7rem] text-[#888] mt-0.5">BPOM &amp; Halal MUI</p>
              </div>
            </div>

            {/* Mid right — ROI badge */}
            <div
              className="absolute top-[45%] -right-8 bg-[#111111] rounded-xl px-3.5 py-2.5 shadow-[0_8px_28px_rgba(0,0,0,0.2)] z-20 animate-float"
              style={{ animationDelay: "1.2s" }}
            >
              <p className="text-[#FFCF40] font-syne font-extrabold text-lg leading-none">6 bln</p>
              <p className="text-white/60 text-[0.65rem] mt-0.5 font-medium">Rata-rata ROI</p>
            </div>

            {/* Decorative ring behind grid */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-[32px] border border-[#FF5C1A]/8 -z-10 pointer-events-none"
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-[40px] border border-[#FF5C1A]/5 -z-10 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* ── Bottom scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5 animate-fade-up-6 z-10">
        <span className="text-[0.7rem] font-semibold text-[#aaa] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#FF5C1A]/60 to-transparent" />
      </div>
    </section>
  );
}