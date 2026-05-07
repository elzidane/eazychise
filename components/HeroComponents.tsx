"use client";
import Image from "next/image";
import { CountUp } from "./Reactbitseffects";
import { Stat } from "../types";
import { MdRestaurant, MdLocalCafe, MdWhatshot, MdCheckCircle } from "react-icons/md";

export function HeroStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="animate-fade-up-4 flex gap-6 flex-wrap">
      {stats.map((s) => (
        <div
          key={s.label}
          className="group flex flex-col gap-0.5 px-4 py-3 rounded-2xl bg-white border border-black/6 hover:border-[#FF5C1A]/30 hover:shadow-[0_4px_20px_rgba(255,92,26,0.1)] transition-all duration-200"
        >
          <div className="font-syne font-extrabold text-[1.85rem] leading-none text-[#111111]">
            <CountUp end={parseInt(s.value)} duration={2000} suffix={s.suffix} />
          </div>
          <p className="text-[0.72rem] text-[#888] font-semibold uppercase tracking-widest">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function HeroVisual({ images }: { images: any[] }) {
  return (
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
            <div className="absolute top-3 left-3 bg-[#FF5C1A] text-white text-[0.65rem] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <MdRestaurant className="w-3 h-3" /> Kuliner
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-bold text-sm leading-tight">{images[0].name}</p>
              <p className="text-white/60 text-[0.68rem] mt-0.5">{images[0].meta}</p>
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
            <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-sm text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <MdLocalCafe className="w-3 h-3" /> Minuman
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
            <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-sm text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <MdRestaurant className="w-3 h-3" /> Kuliner
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-white font-bold text-xs">{images[2].name}</p>
              <p className="text-white/55 text-[0.65rem]">{images[2].meta}</p>
            </div>
          </div>
        </div>

        {/* Floating badges */}
        <div className="absolute -top-6 -right-6 bg-[#FFCF40] rounded-2xl px-4 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.14)] flex items-center gap-3 z-20 animate-float" style={{ minWidth: 170 }}>
          <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center text-xl flex-shrink-0"><MdWhatshot className="w-6 h-6 text-[#111]" /></div>
          <div>
            <p className="font-extrabold text-[0.88rem] text-[#111] leading-none">Terlaris Bulan Ini</p>
            <p className="text-[0.7rem] text-black/55 mt-0.5">Kopi Susu Kekinian</p>
          </div>
        </div>

        <div className="absolute -bottom-5 -left-7 bg-white rounded-2xl px-4 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.1)] flex items-center gap-3 z-20 animate-float-delay" style={{ minWidth: 190 }}>
          <div className="w-10 h-10 rounded-xl bg-[#1B8C5A]/10 flex items-center justify-center text-xl flex-shrink-0"><MdCheckCircle className="w-6 h-6 text-[#1B8C5A]" /></div>
          <div>
            <p className="font-extrabold text-[0.88rem] text-[#1B8C5A] leading-none">Semua Terverifikasi</p>
            <p className="text-[0.7rem] text-[#888] mt-0.5">BPOM & Halal MUI</p>
          </div>
        </div>

        <div className="absolute top-[45%] -right-8 bg-[#111111] rounded-xl px-3.5 py-2.5 shadow-[0_8px_28px_rgba(0,0,0,0.2)] z-20 animate-float" style={{ animationDelay: "1.2s" }}>
          <p className="text-[#FFCF40] font-syne font-extrabold text-lg leading-none">6 bln</p>
          <p className="text-white/60 text-[0.65rem] mt-0.5 font-medium">Rata-rata ROI</p>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-[32px] border border-[#FF5C1A]/8 -z-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-[40px] border border-[#FF5C1A]/5 -z-10 pointer-events-none" />
      </div>
    </div>
  );
}
