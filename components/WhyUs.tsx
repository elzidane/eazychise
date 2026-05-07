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
    <section ref={sectionRef} id="mengapa" className="px-[5%] py-24 relative overflow-hidden bg-[#111111]">

      {/* Subtle orange glow top-right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 10%, rgba(255,92,26,0.12) 0%, transparent 60%)" }}
      />
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

        {/* ── LEFT ── */}
        <div>
          <div className="reveal">
            <p className="text-[#FF5C1A] text-[0.72rem] font-bold uppercase tracking-[3px] mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-[#FF5C1A]" />
              Mengapa EazyChise
            </p>
            <h2 className="font-fraunces font-black text-[clamp(2rem,3.5vw,3.2rem)] text-white leading-[1.08] mb-4">
              Platform F&amp;B Paling{" "}
              <em className="text-[#FFCF40] not-italic">Mudah &amp; Aman</em>
            </h2>
            <p className="text-white/45 text-[0.95rem] leading-[1.75] max-w-md">
              Kami hadir supaya siapapun bisa mulai bisnis kuliner dan minuman — tanpa ribet, tanpa takut ditipu.
            </p>
          </div>

          {/* Feature list */}
          <ul className="flex flex-col mt-10 divide-y divide-white/[0.06]">
            {features.map((f, i) => (
              <li
                key={f.title}
                className="reveal flex items-start gap-5 py-5 group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Icon box */}
                <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-[#FF5C1A] flex-shrink-0 group-hover:bg-[#FF5C1A]/20 group-hover:border-[#FF5C1A]/30 transition-colors duration-300">
                  {(() => { const Icon = f.icon; return <Icon className="w-5 h-5" />; })()}
                </div>
                <div>
                  <h4 className="text-white font-bold text-[0.95rem] mb-1 group-hover:text-[#FF5C1A] transition-colors duration-300">
                    {f.title}
                  </h4>
                  <p className="text-white/40 text-[0.82rem] leading-[1.65]">{f.desc}</p>
                </div>
                {/* Right arrow — appears on hover */}
                <div className="ml-auto pl-2 text-white/15 group-hover:text-[#FF5C1A]/60 transition-colors duration-300 flex-shrink-0 self-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </li>
            ))}
          </ul>

          {/* Bottom trust strip */}
          <div className="reveal mt-8 flex items-center gap-4 pt-6 border-t border-white/[0.06]">
            {[
              { num: "20+", label: "Brand dikurasi" },
              { num: "100%", label: "Terverifikasi" },
              { num: "34", label: "Provinsi" },
            ].map((s) => (
              <div key={s.label} className="flex-1 text-center">
                <p className="font-syne font-extrabold text-white text-[1.2rem] leading-none">
                  {s.num}
                </p>
                <p className="text-white/35 text-[0.68rem] mt-1 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: image collage ── */}
        <div className="reveal hidden lg:grid grid-cols-2 grid-rows-[230px_180px] gap-3">
          {/* Tall */}
          <div className="row-span-2 rounded-[20px] overflow-hidden relative group">
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              sizes="320px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {/* Overlay label */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-2 bg-[#FF5C1A] text-white text-[0.65rem] font-bold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                Street Food Jakarta
              </div>
            </div>
          </div>

          {/* Top right */}
          <div className="rounded-[20px] overflow-hidden relative group">
            <Image
              src={images[1].src}
              alt={images[1].alt}
              fill
              sizes="240px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Bottom right — with stat overlay */}
          <div className="rounded-[20px] overflow-hidden relative group">
            <Image
              src={images[2].src}
              alt={images[2].alt}
              fill
              sizes="240px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <p className="text-white font-bold text-[0.8rem] leading-tight">Mie Ayam</p>
                <p className="text-white/50 text-[0.65rem]">Rp 7 Juta • Kuliner</p>
              </div>
              <div className="bg-[#FFCF40] text-[#111] text-[0.65rem] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-current" /> 4.8
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}