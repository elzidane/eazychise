"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const testimonials = [
  {
    id: "1",
    name: "Rina Kusuma",
    location: "Depok, Jawa Barat",
    text: "Buka franchise kopi modal Rp 2,8 juta, 4 bulan langsung balik modal! Sekarang sudah punya 3 gerai di Depok. Prosesnya mudah banget.",
    avatar: "RK",
    avatarColor: "#FF5C1A",
    type: "Franchise Kopi",
    result: "3 gerai dalam 1 tahun",
  },
  {
    id: "2",
    name: "Budi Santoso",
    location: "Semarang, Jawa Tengah",
    text: "Resign dari kerja dan langsung buka franchise mie ayam. Dalam 8 bulan penghasilan sudah 4x lipat gaji lama. Tim EazyChise selalu responsif.",
    avatar: "BS",
    avatarColor: "#1B8C5A",
    type: "Franchise Mie Ayam",
    result: "Omzet 4x dalam 8 bulan",
  },
  {
    id: "3",
    name: "Dewi Anggraini",
    location: "Makassar, Sulawesi Selatan",
    text: "Daftar hari Senin, minggu depan sudah ketemu franchisor, bulan berikutnya grand opening! Cepat, transparan, dan benar-benar amanah.",
    avatar: "DA",
    avatarColor: "#7C3AED",
    type: "Franchise Minuman",
    result: "Grand opening dalam 30 hari",
  },
];

export default function Testimonials() {
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
    <section ref={sectionRef} id="ulasan" className="px-[5%] py-24 relative overflow-hidden">
      {/* Soft bg wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,92,26,0.04) 0%, transparent 60%)" }}
      />

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-[#FF5C1A] text-[0.72rem] font-bold uppercase tracking-[3px] mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-[#FF5C1A]" />
              Kisah Sukses Mitra
            </p>
            <h2 className="font-fraunces font-black text-[clamp(1.9rem,3vw,3rem)] text-[#111111] leading-[1.08]">
              Ribuan Mitra Sudah{" "}
              <em className="text-[#FF5C1A] not-italic">Merasakan Hasilnya</em>
            </h2>
          </div>
          {/* Overall rating */}
          <div className="flex-shrink-0 flex items-center gap-3 bg-white border border-black/7 px-5 py-3 rounded-2xl shadow-sm">
            <div>
              <p className="font-syne font-extrabold text-[1.6rem] text-[#111] leading-none">4.9</p>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#FFCF40] text-[0.7rem]">★</span>
                ))}
              </div>
            </div>
            <div className="w-px h-10 bg-black/8" />
            <div>
              <p className="text-[#111] font-bold text-[0.85rem]">9.000+</p>
              <p className="text-[#999] text-[0.68rem] mt-0.5">ulasan mitra</p>
            </div>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="reveal group bg-white rounded-[22px] p-7 border border-black/5 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col gap-5 relative overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Top accent line — color per person */}
              <div
                className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: t.avatarColor }}
              />

              {/* Quote mark */}
              <div
                className="font-fraunces font-black text-[4rem] leading-none select-none -mb-3"
                style={{ color: `${t.avatarColor}18` }}
              >
                "
              </div>

              {/* Text */}
              <p className="text-[#555] text-[0.88rem] leading-[1.75] flex-1">
                {t.text}
              </p>

              {/* Result pill */}
              <div
                className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full text-[0.7rem] font-bold"
                style={{ background: `${t.avatarColor}12`, color: t.avatarColor }}
              >
                <span className="text-[0.6rem]">✦</span>
                {t.result}
              </div>

              {/* Divider */}
              <div className="h-px bg-black/5" />

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Initials avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[0.75rem] font-bold flex-shrink-0"
                  style={{ background: t.avatarColor }}
                >
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[0.88rem] text-[#111]">{t.name}</p>
                  <p className="text-[#999] text-[0.72rem] truncate">{t.location}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#999] text-[0.65rem] uppercase tracking-wide">{t.type}</p>
                  <div className="flex gap-0.5 justify-end mt-0.5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: "#FFCF40", fontSize: "0.6rem" }}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="reveal mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFF3E5] rounded-[20px] px-8 py-5 border border-[#FF5C1A]/10">
          <p className="text-[#555] text-[0.88rem]">
            Bergabung bersama <strong className="text-[#111]">9.000+ mitra aktif</strong> yang sudah membuktikan sendiri.
          </p>
          <Link
            href="/franchise"
            className="flex-shrink-0 flex items-center gap-2 bg-[#FF5C1A] text-white px-6 py-2.5 rounded-full font-bold text-[0.85rem] hover:bg-[#e04710] hover:-translate-y-px transition-all shadow-[0_4px_16px_rgba(255,92,26,0.3)]"
          >
            Mulai Sekarang
            <span className="text-[#FFCF40]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}