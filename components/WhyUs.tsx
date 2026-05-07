"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { 
  CheckCircle2, 
  ShieldCheck, 
  UserRound, 
  BarChart3, 
  ArrowRight, 
  Star 
} from "lucide-react";
import { STATS } from "@/lib/constants";

const features = [
  {
    icon: CheckCircle2,
    title: "Terverifikasi BPOM & Halal MUI",
    desc: "Setiap brand melewati cek dokumen legal dan sertifikasi resmi sebelum tayang di platform.",
  },
  {
    icon: ShieldCheck,
    title: "Dana Investasi 100% Aman",
    desc: "Uang tersimpan di rekening escrow. Dicairkan ke franchisor hanya setelah perjanjian sah.",
  },
  {
    icon: UserRound,
    title: "Pelatihan & SOP Gratis",
    desc: "Pelatihan langsung dari dapur brand, SOP operasional, dan panduan promosi siap pakai.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Bisnis Real-Time",
    desc: "Monitor omzet, stok, dan performa gerai langsung dari HP via aplikasi EazyChise.",
  },
];

const images = [
  {
    src: "https://assets.unileversolutions.com/recipes-v2/242794.jpg",
    alt: "Warung Makan",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1280px-A_small_cup_of_coffee.JPG",
    alt: "Kopi",
  },
  {
    src: "https://assets.unileversolutions.com/recipes-v2/257958.jpg",
    alt: "Mie Ayam Bakso",
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("revealed")),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="mengapa" className="section-padding relative overflow-hidden bg-[#111111]">

      {/* Subtle orange glow top-right */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 10%, rgba(255,92,26,0.1) 0%, transparent 60%)" }}
      />
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 xl:gap-32 items-center">

        {/* ── LEFT ── */}
        <div>
          <div className="reveal">
            <p className="label-caps mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[#FF5C1A]" />
              Mengapa EazyChise
            </p>
            <h2 className="h2-responsive text-white mb-6">
              Platform F&amp;B Paling{" "}
              <em className="text-[#FFCF40] not-italic">Mudah &amp; Aman</em>
            </h2>
            <p className="text-white/60 text-[1.05rem] leading-[1.8] max-w-lg font-medium">
              Kami hadir supaya siapapun bisa mulai bisnis kuliner dan minuman — tanpa ribet, tanpa takut ditipu. Didukung oleh ekosistem F&amp;B terbesar di Indonesia.
            </p>
          </div>

          {/* Feature list */}
          <ul className="flex flex-col mt-12 divide-y divide-white/[0.08]">
            {features.map((f, i) => (
              <li
                key={f.title}
                className="reveal flex items-start gap-6 py-7 group cursor-pointer"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Icon box */}
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF5C1A] flex-shrink-0 group-hover:bg-[#FF5C1A] group-hover:text-white group-hover:border-[#FF5C1A] group-hover:shadow-[0_10px_25px_rgba(255,92,26,0.25)] transition-all duration-400">
                  {(() => { const Icon = f.icon; return <Icon className="w-6 h-6" />; })()}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-[1.05rem] mb-2 group-hover:text-[#FFCF40] transition-colors duration-300">
                    {f.title}
                  </h4>
                  <p className="text-white/45 text-[0.88rem] leading-[1.7] group-hover:text-white/70 transition-colors">{f.desc}</p>
                </div>
                {/* Right arrow — appears on hover */}
                <div className="text-white/10 group-hover:text-[#FFCF40] transition-all duration-400 flex-shrink-0 self-center group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </li>
            ))}
          </ul>

          {/* Bottom trust strip */}
          <div className="reveal mt-10 flex items-center gap-8 pt-10 border-t border-white/[0.08]">
            {[
              { num: `${STATS.totalBrand}+`, label: "Brand Dikurasi" },
              { num: "100%", label: "Terverifikasi" },
              { num: String(STATS.totalProvinsi), label: "Provinsi" },
            ].map((s) => (
              <div key={s.label} className="flex-1">
                <p className="font-syne font-black text-white text-[1.6rem] leading-none mb-2">
                  {s.num}
                </p>
                <p className="text-white/30 text-[0.7rem] font-black uppercase tracking-[0.2em]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: image collage ── */}
        <div className="reveal hidden lg:grid grid-cols-2 grid-rows-[300px_220px] gap-4">
          {/* Tall */}
          <div className="row-span-2 rounded-[32px] overflow-hidden relative group shadow-2xl border border-white/5">
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              sizes="450px"
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {/* Overlay label */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2.5 bg-[#FF5C1A] text-white text-[0.7rem] font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                Street Food Jakarta
              </div>
            </div>
          </div>

          {/* Top right */}
          <div className="rounded-[28px] overflow-hidden relative group shadow-xl border border-white/5">
            <Image
              src={images[1].src}
              alt={images[1].alt}
              fill
              sizes="350px"
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[0.6rem] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest border border-white/10">
              Premium Coffee
            </div>
          </div>

          {/* Bottom right — with stat overlay */}
          <div className="rounded-[28px] overflow-hidden relative group shadow-xl border border-white/5">
            <Image
              src={images[2].src}
              alt={images[2].alt}
              fill
              sizes="350px"
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="text-white font-black text-[1rem] leading-tight mb-1">Mie Ayam Solo</p>
                <p className="text-white/50 text-[0.7rem] font-bold">Investasi: 7 Juta</p>
              </div>
              <div className="bg-[#FFCF40] text-[#111] text-[0.75rem] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3 fill-current" /> 4.8
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}