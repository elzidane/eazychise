"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ScrollReveal, StaggerReveal, fadeUp, slideUp } from "../effects/ScrollMotion";

export default function CTASection() {
  return (
    <section id="daftar" className="section-padding bg-[#111111] relative overflow-hidden">

            {/* Animated warm glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,92,26,0.12) 0%, transparent 70%)" }}
      />
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      {/* Top fade line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Label */}
        <ScrollReveal variants={fadeUp}>
          <div className="label-caps mb-8 text-[#FFCF40] flex justify-center items-center gap-4">
            <span className="w-8 h-px bg-[#FFCF40]/40" />
            Mulai Perjalananmu
            <span className="w-8 h-px bg-[#FFCF40]/40" />
          </div>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal variants={fadeUp} delay={0.1}>
          <h2 className="h2-responsive text-white mb-6">
            Wujudkan Bisnis F&amp;B{" "}
            <em
              className="not-italic relative inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, #FFCF40 0%, #FF8C42 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Impianmu
            </em>{" "}
            Menjadi Nyata
          </h2>
        </ScrollReveal>

        <ScrollReveal variants={fadeUp} delay={0.2}>
          <p className="text-white/50 text-[1.05rem] leading-[1.8] max-w-lg mx-auto mb-12 font-medium">
            Daftar gratis sekarang, jelajahi ratusan brand franchise F&amp;B terpercaya, dan mulai
            perjalananmu menjadi pengusaha kuliner sukses.
          </p>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal variants={fadeUp} delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/daftar"
                className="group relative flex items-center gap-2 bg-[#FF5C1A] text-white pl-8 pr-7 py-4 rounded-full font-black text-[1rem] shadow-[0_12px_36px_rgba(255,92,26,0.4)] hover:shadow-[0_18px_45px_rgba(255,92,26,0.55)] transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative">Daftar Akun Gratis</span>
                <ArrowRight className="w-5 h-5 text-[#FFCF40]" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <a
                href="https://wa.me/6287792735999?text=Halo%20EazyChise%2C%20saya%20mau%20konsultasi%20franchise%20F%26B"
                className="flex items-center gap-2 border-2 border-white/10 text-white/70 hover:text-white hover:border-white/30 px-8 py-4 rounded-full font-bold text-[1rem] transition-all duration-300 bg-white/5 backdrop-blur-sm"
              >
                Konsultasi Bisnis
              </a>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Trust signals */}
        <StaggerReveal className="flex items-center justify-center gap-10 flex-wrap" fast>
          {[
            { text: "Pendaftaran Gratis" },
            { text: "Tanpa Biaya Admin" },
            { text: "Bantuan Konsultasi" },
          ].map((s) => (
            <motion.div key={s.text} variants={slideUp} className="flex items-center gap-2 text-white/35 text-[0.82rem] font-bold uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-[#1B8C5A]" />
              {s.text}
            </motion.div>
          ))}
        </StaggerReveal>
      </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5C1A]/30 to-transparent" />
    </section>
  );
}