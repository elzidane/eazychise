"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BlurText, CountUp, ShinyText, TiltCard } from "./Reactbitseffects";
import MagneticButton from "./MagneticButton";
import { STATS, HERO_IMAGES } from "@/lib/constants";
import { 
  Search, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  Utensils, 
  Coffee, 
  User, 
  Star,
  Pizza,
  Shield,
  Phone,
  Award
} from "lucide-react";

const stats = [
  { num: STATS.totalBrand, suffix: "+", label: "Brand F&B Terkurasi" },
  { num: STATS.totalProvinsi, suffix: "", label: "Provinsi Terjangkau" },
  { num: 4, suffix: "", label: "Kategori F&B" },
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
      className="relative min-h-screen overflow-hidden section-padding flex items-center"
    >
      {/* ── Background ── */}
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Orbs - hidden on mobile for performance */}
      <div
        className="hero-orb absolute top-[-120px] right-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none transition-transform duration-700 ease-out hidden md:block"
        style={{ background: "radial-gradient(circle, rgba(255,92,26,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="hero-orb absolute bottom-[-80px] left-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none transition-transform duration-700 ease-out hidden md:block"
        style={{ background: "radial-gradient(circle, rgba(255,207,64,0.1) 0%, transparent 65%)" }}
      />

      {/* ── Main grid ── */}
      <div className="relative z-10 w-full grid lg:grid-cols-[1fr_1.05fr] gap-12 xl:gap-24 items-center">

        {/* ── LEFT CONTENT ── */}
        <div>

          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2.5 bg-[#111111] border border-white/10 px-4 py-2 rounded-full text-[0.7rem] font-bold text-white mb-8 shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C1A] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5C1A]" />
            </span>
            <div className="flex items-center gap-2">
              <ShinyText text="Platform F&B Franchise #1 Indonesia" speed={8} />
              <span className="w-4 h-2.5 bg-red-500 relative flex flex-col rounded-[1px] overflow-hidden opacity-80">
                <span className="h-1/2 bg-[#FF0000] w-full" />
                <span className="h-1/2 bg-white w-full" />
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-1 h1-responsive mb-6">
            {/* Line 1 — Syne tegas */}
            <span className="block text-[#111111]">
              <BlurText text="Bisnis" delay={120} animateBy="chars" />
            </span>
            {/* Line 2 — Fraunces italic hangat, dengan underline dekoratif */}
            <span className="relative block font-fraunces italic text-[#FF5C1A] py-1">
              Kuliner &amp;
              {/* Underline squiggle */}
              <svg
                className="absolute -bottom-1 left-0 w-48 md:w-64"
                viewBox="0 0 320 12" fill="none"
                preserveAspectRatio="none"
                style={{ height: "8px" }}
              >
                <path
                  d="M2 7 C40 2, 80 11, 120 6 S200 1, 240 7 S290 11, 318 6"
                  stroke="#FF5C1A" strokeWidth="3" strokeLinecap="round"
                  fill="none" opacity="0.35"
                />
              </svg>
            </span>
            {/* Line 3 — outline */}
            <span
              className="block mt-1"
              style={{ WebkitTextStroke: "2px #111111", color: "transparent" }}
            >
              <BlurText text="Minuman" delay={100} animateBy="chars" />
            </span>
          </h1>

          {/* Desc */}
          <p className="animate-fade-up-2 text-[#444] leading-[1.8] text-[1.05rem] max-w-[460px] mb-10 font-medium">
            EazyChise menyatukan calon pemilik usaha F&amp;B dengan ratusan brand franchise makanan dan minuman terpercaya. Modal mulai{" "}
            <strong className="text-[#111111] font-bold">Rp 2 juta</strong>,
            pendampingan dari nol sampai buka.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up-3 flex flex-wrap gap-4 mb-12 items-center">
            <MagneticButton strength={0.2}>
              <Link
                href="/franchise"
                className="group relative flex items-center gap-2 bg-[#FF5C1A] text-white pl-7 pr-6 py-4 rounded-full font-bold text-[0.95rem] shadow-[0_10px_30px_rgba(255,92,26,0.3)] hover:shadow-[0_15px_40px_rgba(255,92,26,0.45)] transition-all duration-300 overflow-hidden"
              >
                {/* Shimmer */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <span className="relative flex items-center gap-2">
                  <Search className="w-4.5 h-4.5" /> Cari Franchise
                </span>
                <span className="relative text-[#FFCF40] font-black"><ArrowRight className="w-4.5 h-4.5" /></span>
              </Link>
            </MagneticButton>
            
            <Link
              href="/daftar"
              className="flex items-center gap-2 border-2 border-[#111111]/15 text-[#333] bg-white px-7 py-4 rounded-full font-bold text-[0.95rem] hover:border-[#111111] hover:text-[#111111] hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
            >
              Daftarkan Brand
              <ArrowRight className="w-4.5 h-4.5 text-[#FF5C1A]" />
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="animate-fade-up-3 flex flex-wrap gap-2.5 mb-10">
            {[
              { icon: Shield, text: "SSL Terenkripsi" },
              { icon: CheckCircle2, text: "BPOM & Halal MUI" },
              { icon: Phone, text: "Support 24/7" },
              { icon: Award, text: "#1 Platform Franchise" },
            ].map((b) => (
              <span key={b.text} className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-black/[0.04] text-[0.68rem] font-bold text-[#555] px-3.5 py-1.5 rounded-full shadow-sm">
                <b.icon className="w-3.5 h-3.5 text-[#FF5C1A]" />
                {b.text}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="animate-fade-up-4 flex gap-6 flex-wrap">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group flex flex-col gap-0.5 px-5 py-4 rounded-2xl bg-white border border-black/[0.04] hover:border-[#FF5C1A]/20 hover:shadow-[0_8px_30px_rgba(255,92,26,0.08)] transition-all duration-300"
              >
                <div className="font-syne font-extrabold text-[2rem] leading-none text-[#111111]">
                  <CountUp end={s.num} duration={2000} suffix={s.suffix} />
                </div>
                <p className="text-[0.7rem] text-[#888] font-bold uppercase tracking-[0.15em] mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Social proof avatars */}
          <div className="animate-fade-up-5 hidden lg:flex items-center gap-4 mt-10">
            <div className="flex -space-x-2.5">
              {[
                "https://i.pravatar.cc/100?u=11",
                "https://i.pravatar.cc/100?u=12",
                "https://i.pravatar.cc/100?u=13",
                "https://i.pravatar.cc/100?u=14",
                "https://i.pravatar.cc/100?u=15"
              ].map((url, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[#FFF9F0] overflow-hidden shadow-sm relative bg-[#FFF3E5]"
                >
                  <img src={url} alt="Mitra" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-[0.82rem] font-bold text-[#111]">
                Bergabung dengan <span className="text-[#FF5C1A]">3,100+</span> mitra sukses
              </p>
              <div className="flex gap-0.5 mt-0.5 items-center">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-[#FFCF40] text-[#FFCF40]" />
                  ))}
                </div>
                <span className="text-[0.7rem] text-[#999] font-bold ml-1.5 uppercase tracking-wider">Trusted by SMEs</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT VISUAL ── */}
        <div className="hidden lg:block animate-fade-left">
          <div className="relative">

            {/* Image grid */}
            <div className="grid grid-cols-[1.15fr_0.85fr] grid-rows-[280px_220px] gap-4">
              {/* Tall */}
              <div className="row-span-2 rounded-[32px] overflow-hidden relative group shadow-[0_30px_70px_rgba(0,0,0,0.1)] border border-black/5">
                <Image
                  src={HERO_IMAGES[0].src}
                  alt={HERO_IMAGES[0].alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="450px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Category chip top */}
                <div className="absolute top-4 left-4 bg-[#FF5C1A] text-white text-[0.65rem] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm">
                  <Utensils className="w-3.5 h-3.5" /> Kuliner
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-black text-lg leading-tight mb-1">{HERO_IMAGES[0].name}</p>
                  <p className="text-white/70 text-[0.75rem] font-medium">{HERO_IMAGES[0].meta}</p>
                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#FFCF40] text-[#FFCF40]" />
                      ))}
                    </div>
                    <span className="text-white/60 text-[0.7rem] font-bold">4.9 / 5.0</span>
                  </div>
                </div>
              </div>

              {/* Small top */}
              <div className="rounded-[24px] overflow-hidden relative group shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-black/5">
                <Image
                  src={HERO_IMAGES[1].src}
                  alt={HERO_IMAGES[1].alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="300px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-3.5 left-3.5 bg-black/40 backdrop-blur-md text-white text-[0.6rem] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Coffee className="w-3 h-3" /> Minuman
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">{HERO_IMAGES[1].name}</p>
                  <p className="text-white/60 text-[0.68rem]">{HERO_IMAGES[1].meta}</p>
                </div>
              </div>

              {/* Small bottom */}
              <div className="rounded-[24px] overflow-hidden relative group shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-black/5">
                <Image
                  src={HERO_IMAGES[2].src}
                  alt={HERO_IMAGES[2].alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="300px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-3.5 left-3.5 bg-black/40 backdrop-blur-md text-white text-[0.6rem] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Pizza className="w-3 h-3" /> Kuliner
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">{HERO_IMAGES[2].name}</p>
                  <p className="text-white/60 text-[0.68rem]">{HERO_IMAGES[2].meta}</p>
                </div>
              </div>
            </div>

            {/* ── Floating badges ── */}
            {/* Top right — Terlaris */}
            <div
              className="absolute -top-4 -right-4 bg-[#FFCF40] rounded-2xl px-5 py-4 shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-white/20 flex items-center gap-3.5 z-20 animate-float"
              style={{ minWidth: 180 }}
            >
              <div className="w-11 h-11 rounded-xl bg-white/30 flex items-center justify-center text-[#111] flex-shrink-0">
                <Flame className="w-6.5 h-6.5 fill-[#FF5C1A] text-[#FF5C1A]" />
              </div>
              <div>
                <p className="font-black text-[0.95rem] text-[#111] leading-none">Terlaris</p>
                <p className="text-[0.7rem] text-black/60 mt-1 font-bold">Bulan Ini</p>
              </div>
            </div>

            {/* Bottom left — Verified */}
            <div
              className="absolute -bottom-6 -left-8 bg-white rounded-2xl px-5 py-4 shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-black/[0.03] flex items-center gap-3.5 z-20 animate-float-delay"
              style={{ minWidth: 200 }}
            >
              <div className="w-11 h-11 rounded-xl bg-[#1B8C5A]/10 flex items-center justify-center text-[#1B8C5A] flex-shrink-0">
                <CheckCircle2 className="w-6.5 h-6.5" />
              </div>
              <div>
                <p className="font-black text-[0.95rem] text-[#1B8C5A] leading-none">Terverifikasi</p>
                <p className="text-[0.7rem] text-[#888] mt-1 font-bold">BPOM &amp; Halal</p>
              </div>
            </div>

            {/* Mid right — ROI badge */}
            <div
              className="absolute top-[45%] -right-10 bg-[#111111] rounded-2xl px-4.5 py-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.25)] z-20 animate-float"
              style={{ animationDelay: "1.2s" }}
            >
              <p className="text-[#FFCF40] font-syne font-black text-xl leading-none">6 bln</p>
              <p className="text-white/50 text-[0.65rem] mt-1 font-bold tracking-wider uppercase">Avg. ROI</p>
            </div>

            {/* Decorative rings behind grid */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-[40px] border border-[#FF5C1A]/8 -z-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[125%] rounded-[50px] border border-[#FF5C1A]/4 -z-10 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── Bottom scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-fade-up-6 z-10 opacity-50">
        <span className="text-[0.65rem] font-bold text-[#aaa] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#FF5C1A]/60 to-transparent" />
      </div>
    </section>
  );
}