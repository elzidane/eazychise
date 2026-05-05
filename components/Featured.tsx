"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const items = [
  {
    src: "https://jendelapuspita.com/wp-content/uploads/2025/08/Hotel-Vibes-Street-Food-Price-Nikmati-Promo-Cita-Rasa-Nusantara-di-Swiss-Belexpress-Cideng.jpg",
    alt: "Street Food Jakarta",
    cat: "Kuliner",
    title: "Jajanan Street Food Nusantara",
    price: "Rp 4 Juta",
    rating: "4.9",
    badge: "Terlaris",
  },
  {
    src: "https://www.julo.co.id/sites/default/files/2024-10/Franchise%20XI%20BOBA.webp",
    alt: "Bubble Tea",
    cat: "Minuman",
    title: "Bubble Tea Kekinian",
    price: "Rp 3,5 Juta",
    rating: "4.8",
  },
  {
    src: "https://assets.unileversolutions.com/recipes-v2/257958.jpg",
    alt: "Mie Ayam Bakso",
    cat: "Kuliner",
    title: "Mie Ayam & Bakso",
    price: "Rp 8,5 Juta",
    rating: "4.7",
  },
];

export default function FeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("revealed")),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [main, ...rest] = items;

  return (
    <section ref={sectionRef} id="unggulan" className="bg-[#111111] px-[5%] py-24">

      {/* ── Header ── */}
      <div className="reveal flex items-center justify-between mb-12">
        <div>
          <p className="text-[#FF5C1A] text-[0.72rem] font-bold uppercase tracking-[3px] mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-[#FF5C1A]" /> Pilihan Unggulan
          </p>
          <h2 className="font-fraunces font-black text-[clamp(1.9rem,3vw,3rem)] text-white leading-[1.08]">
            Franchise F&amp;B{" "}
            <em className="text-[#FF5C1A] not-italic">Paling Diminati</em>
          </h2>
        </div>
        <Link
          href="/franchise"
          className="hidden sm:flex items-center gap-2 text-white/30 hover:text-white/70 text-sm transition-colors group"
        >
          Lihat semua
          <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
        </Link>
      </div>

      {/* ── Layout ── */}
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-3">

        {/* Main card — tall */}
        <Link href={`/franchise/${main.title.toLowerCase().replace(/\s+/g, '-')}`} className="reveal relative rounded-[18px] overflow-hidden group cursor-pointer h-[440px] lg:h-auto block">
          <Image
            src={main.src}
            alt={main.alt}
            fill
            sizes="700px"
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient: heavy at bottom, clear at top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          {/* Badge */}
          {main.badge && (
            <div className="absolute top-4 left-4 bg-[#FF5C1A] text-white text-[0.68rem] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {main.badge}
            </div>
          )}

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-7">
            <p className="text-white/40 text-[0.7rem] uppercase tracking-[2px] mb-2">{main.cat}</p>
            <h3 className="font-syne font-extrabold text-white text-[1.4rem] leading-tight mb-4">
              {main.title}
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/35 text-[0.65rem] uppercase tracking-widest">Mulai dari</p>
                <p className="font-syne font-extrabold text-[#FFCF40] text-[1.5rem] leading-none mt-0.5">
                  {main.price}
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-white/8 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="text-[#FFCF40] text-xs">★</span>
                <span className="text-white font-semibold text-sm">{main.rating}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Side cards */}
        <div className="flex flex-col gap-3">
          {rest.map((item, i) => (
            <Link
              href={`/franchise/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              key={item.title}
              className="reveal relative rounded-[18px] overflow-hidden group cursor-pointer flex-1 block"
              style={{ minHeight: 190, transitionDelay: `${(i + 1) * 80}ms` }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="450px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <p className="text-white/35 text-[0.65rem] uppercase tracking-[2px] mb-1.5">{item.cat}</p>
                  <h3 className="font-syne font-bold text-white text-[1rem] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#FFCF40] font-bold text-[0.9rem] mt-1.5">{item.price}</p>
                </div>
                <div className="flex items-center gap-1 bg-white/8 backdrop-blur-sm px-2.5 py-1 rounded-full flex-shrink-0 ml-3">
                  <span className="text-[#FFCF40] text-[0.65rem]">★</span>
                  <span className="text-white font-semibold text-[0.78rem]">{item.rating}</span>
                </div>
              </div>
            </Link>
          ))}

          <Link
            href="/franchise"
            className="reveal flex items-center justify-between px-6 py-4 rounded-[18px] border border-white/7 hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 group"
          >
            <span className="text-white/35 group-hover:text-white/60 text-[0.85rem] transition-colors">
              Lihat 320+ franchise lainnya
            </span>
            <div className="w-7 h-7 rounded-full border border-white/10 group-hover:border-[#FF5C1A]/50 flex items-center justify-center text-white/30 group-hover:text-[#FF5C1A] group-hover:translate-x-0.5 transition-all text-xs">
              →
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}