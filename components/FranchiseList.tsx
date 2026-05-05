"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { FRANCHISE_DATA, Franchise } from "@/lib/franchise-data";

const data = FRANCHISE_DATA;

const FILTERS = [
  { label: "Semua", key: "all" },
  { label: "< Rp 5 Juta", key: "under5" },
  { label: "Rp 5–20 Juta", key: "5to20" },
  { label: "Minuman", key: "minuman" },
  { label: "Kuliner", key: "kuliner" },
  { label: "Dessert", key: "dessert" },
  { label: "Snack", key: "snack" },
];

function applyFilter(list: Franchise[], key: string) {
  if (key === "all") return list;
  if (key === "under5") return list.filter((f) => f.investNum < 5_000_000);
  if (key === "5to20") return list.filter((f) => f.investNum >= 5_000_000 && f.investNum <= 20_000_000);
  return list.filter((f) => f.catKey === key);
}

export default function FranchiseListings() {
  const [active, setActive] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = applyFilter(data, active);

  // Re-animate cards on filter change
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".f-card");
    cards?.forEach((c, i) => {
      const el = c as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.35s ease, transform 0.35s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, i * 55);
    });
  }, [active]);

  return (
    <section id="franchise" className="px-[5%] py-24">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <p className="text-[#FF5C1A] text-[0.72rem] font-bold uppercase tracking-[3px] mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-[#FF5C1A]" />
            Semua Franchise F&B
          </p>
          <h2 className="font-fraunces font-black text-[clamp(1.9rem,3vw,3rem)] text-[#111111] leading-[1.08]">
            Pilih Brand Sesuai
            <em className="text-[#FF5C1A] not-italic">Budgetmu</em>
          </h2>
        </div>
        <Link
          href="/franchise"
          className="group hidden sm:flex items-center gap-2 text-[#777] hover:text-[#FF5C1A] text-sm transition-colors"
        >
          Lihat 320+ franchise
          <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
        </Link>
      </div>

      {/* ── Filter bar ── */}
      <div className="flex flex-wrap gap-2 mb-9">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className="px-4 py-2 rounded-full text-[0.82rem] font-semibold transition-all duration-200 cursor-pointer"
            style={
              active === f.key
                ? { background: "#FF5C1A", color: "#fff", boxShadow: "0 4px 14px rgba(255,92,26,0.3)" }
                : { background: "transparent", color: "#555", border: "1.5px solid rgba(0,0,0,0.12)" }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <div
        ref={gridRef}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {filtered.map((f) => (
          <div
            key={f.name}
            className="f-card group bg-white rounded-[20px] overflow-hidden border border-black/5 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)] transition-all duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="h-[190px] relative overflow-hidden flex-shrink-0">
              <Image
                src={f.img}
                alt={f.alt}
                fill
                sizes="400px"
                className="object-cover transition-transform duration-600 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Category pill */}
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[0.65rem] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                {f.cat}
              </div>

              {/* Badge */}
              {f.badge && (
                <div
                  className="absolute top-3 right-3 text-white text-[0.65rem] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: f.badgeColor ?? "#FF5C1A" }}
                >
                  {f.badge}
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">

              {/* Name + rating */}
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-syne font-extrabold text-[1rem] text-[#111111] leading-snug">
                  {f.name}
                </h3>
                <div className="flex items-center gap-1 flex-shrink-0 bg-[#FFFBEB] px-2 py-0.5 rounded-full">
                  <span className="text-[#FFCF40] text-[0.6rem]">★</span>
                  <span className="text-[#111111] text-[0.75rem] font-bold">{f.rating}</span>
                </div>
              </div>

              {/* City */}
              <p className="text-[#999] text-[0.75rem] mb-4 flex items-center gap-1">
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="flex-shrink-0">
                  <path d="M5 0C2.79 0 1 1.79 1 4c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 5 2.5a1.5 1.5 0 0 1 0 3z" fill="#bbb"/>
                </svg>
                {f.city}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {([
                  { label: "Investasi", value: f.invest, highlight: false },
                  { label: "ROI", value: f.roi, highlight: true },
                  { label: "Omzet/Bulan", value: f.omzet, highlight: false },
                  { label: "Mitra Aktif", value: f.mitra, highlight: false },
                ]).map((stat) => (
                  <div key={stat.label} className="bg-[#F8F8F6] rounded-xl px-3 py-2.5">
                    <p className="text-[0.62rem] text-[#999] uppercase tracking-wider font-semibold mb-0.5">
                      {stat.label}
                    </p>
                    <p
                      className="text-[0.88rem] font-bold leading-tight"
                      style={{ color: stat.highlight ? "#1B8C5A" : "#111111" }}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/franchise/${f.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="mt-auto block text-center bg-[#111111] text-white py-3 rounded-[12px] font-bold text-[0.85rem] hover:bg-[#FF5C1A] transition-all duration-200 hover:-translate-y-px"
              >
                Lihat Detail & Daftar
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[2.5rem] mb-3">🍽️</p>
          <p className="text-[#777] font-semibold">Tidak ada franchise untuk filter ini</p>
        </div>
      )}
    </section>
  );
}