import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CTASection() {
  return (
    <section id="daftar" className="px-[5%] py-28 bg-[#111111] relative overflow-hidden">

      {/* ── Background layers ── */}
      {/* Warm glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,92,26,0.15) 0%, transparent 70%)",
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Top fade line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">

        {/* Label */}
        <div className="inline-flex items-center gap-2 text-[#FFCF40] text-[0.72rem] font-bold uppercase tracking-[3px] mb-7">
          <span className="w-6 h-px bg-[#FFCF40]/60" />
          Mulai Hari Ini
          <span className="w-6 h-px bg-[#FFCF40]/60" />
        </div>

        {/* Headline */}
        <h2 className="font-fraunces font-black text-[clamp(2.2rem,5vw,4rem)] text-white leading-[1.05] mb-5">
          Wujudkan Bisnis F&amp;B{" "}
          <em
            className="not-italic relative inline-block"
            style={{
              background: "linear-gradient(135deg, #FFCF40 0%, #FF8C42 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Impianmu
          </em>{" "}
          Sekarang
        </h2>

        <p className="text-white/40 text-[0.95rem] leading-[1.75] max-w-md mx-auto mb-10">
          Daftar gratis, jelajahi 320+ franchise F&amp;B, dan mulai perjalananmu jadi pengusaha kuliner sukses.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link
            href="/daftar"
            className="group relative flex items-center gap-2 bg-[#FF5C1A] text-white pl-7 pr-6 py-4 rounded-full font-bold text-[0.95rem] shadow-[0_8px_32px_rgba(255,92,26,0.4)] hover:shadow-[0_14px_40px_rgba(255,92,26,0.55)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="relative">Daftar Gratis Sekarang</span>
            <ArrowRight className="w-4 h-4 text-[#FFCF40]" />
          </Link>
          <a
            href="https://wa.me/6281234567890?text=Halo%20GoChise%2C%20saya%20mau%20konsultasi%20franchise%20F%26B"
            className="flex items-center gap-2 border border-white/15 text-white/70 hover:text-white hover:border-white/30 px-7 py-4 rounded-full font-semibold text-[0.95rem] transition-all duration-200 hover:-translate-y-0.5"
          >
            Konsultasi Gratis
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {[
            { text: "Gratis daftar" },
            { text: "Tanpa biaya tersembunyi" },
            { text: "Dukungan 24/7" },
          ].map((s) => (
            <div key={s.text} className="flex items-center gap-1.5 text-white/30 text-[0.78rem]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1B8C5A]" />
              {s.text}
            </div>
          ))}
        </div>
      </div>

      {/* ── Decorative bottom strip ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5C1A]/20 to-transparent" />
    </section>
  );
}