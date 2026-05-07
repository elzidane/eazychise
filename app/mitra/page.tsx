"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, MapPin, Coffee, TrendingUp, Users, Award, Calendar, ChevronRight } from "lucide-react";
import { MdLocalCafe, MdEmojiFoodBeverage, MdFastfood, MdBakeryDining } from "react-icons/md";
import { FRANCHISE_DATA } from "@/lib/franchise-data";

const FEATURED_PARTNERS = [
  {
    slug: "kopi-studio-24-malang",
    name: "Budi Santoso",
    franchise: "Kopi Studio 24",
    city: "Malang, Jawa Timur",
    investment: "Rp 2,8 Juta",
    monthlyRevenue: "Rp 15 Juta/bln",
    bepMonths: "3 bulan",
    joinedDate: "Januari 2025",
    rating: 5,
    quote: "Dari karyawan swasta jadi bos sendiri. EazyChise bantu saya dari nol sampai grand opening!",
    icon: MdLocalCafe,
    color: "#FF5C1A",
  },
  {
    slug: "xiboba-surabaya",
    name: "Rina Kartika",
    franchise: "XIBOBA",
    city: "Surabaya, Jawa Timur",
    investment: "Rp 3,5 Juta",
    monthlyRevenue: "Rp 18 Juta/bln",
    bepMonths: "4 bulan",
    joinedDate: "Maret 2025",
    rating: 5,
    quote: "AI Advisor EazyChise sangat membantu saya pilih franchise yang pas dengan budget dan lokasi.",
    icon: MdEmojiFoodBeverage,
    color: "#7C3AED",
  },
  {
    slug: "burger-bangor-bandung",
    name: "Dedi Kurniawan",
    franchise: "Burger Bangor",
    city: "Bandung, Jawa Barat",
    investment: "Rp 7 Juta",
    monthlyRevenue: "Rp 22 Juta/bln",
    bepMonths: "5 bulan",
    joinedDate: "Februari 2025",
    rating: 4,
    quote: "Sekarang punya 2 outlet! BEP Calculator EazyChise bantu saya planning ekspansi.",
    icon: MdFastfood,
    color: "#1B8C5A",
  },
  {
    slug: "pisang-goreng-semarang",
    name: "Siti Aminah",
    franchise: "Pisang Goreng Madu Bu Nanik",
    city: "Semarang, Jawa Tengah",
    investment: "Rp 4 Juta",
    monthlyRevenue: "Rp 12 Juta/bln",
    bepMonths: "3 bulan",
    joinedDate: "Desember 2024",
    rating: 5,
    quote: "Ibu rumah tangga bisa punya bisnis sendiri! Modal kecil, untung besar. Alhamdulillah.",
    icon: MdBakeryDining,
    color: "#FFCF40",
  },
];

export default function MitraPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-[5%]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-[#FF5C1A] text-[0.72rem] font-bold uppercase tracking-[4px] mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#FF5C1A]" />
            Showcase Mitra
            <span className="w-8 h-px bg-[#FF5C1A]" />
          </p>
          <h1 className="font-fraunces font-black text-[clamp(2.2rem,4vw,3.5rem)] text-[#111] leading-[1.08] mb-5">
            Cerita <em className="text-[#FF5C1A] not-italic">Sukses</em> Para Mitra EazyChise
          </h1>
          <p className="text-[#777] text-lg max-w-xl mx-auto leading-[1.7]">
            Mereka memulai dari nol, kini menjalankan bisnis franchise F&B impian mereka. 
            Ini adalah kisah nyata para wirausaha Indonesia.
          </p>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { icon: Users, num: "20+", label: "Brand Terkurasi", color: "#FF5C1A" },
            { icon: MapPin, num: "34", label: "Provinsi", color: "#7C3AED" },
            { icon: TrendingUp, num: "4", label: "Kategori F&B", color: "#1B8C5A" },
            { icon: Award, num: "100%", label: "Terverifikasi", color: "#FFCF40" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-black/5 text-center hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all">
              <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <p className="font-syne font-extrabold text-2xl text-[#111]">{s.num}</p>
              <p className="text-[0.7rem] text-[#999] font-semibold uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Partner Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {FEATURED_PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white rounded-2xl p-7 border border-black/5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] transition-all group"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-5">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: `${partner.color}15`, color: partner.color }}
                >
                  <partner.icon />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#111] text-lg group-hover:text-[#FF5C1A] transition-colors">{partner.name}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-[#FF5C1A] font-semibold flex items-center gap-1">
                      <Coffee className="w-3 h-3" /> {partner.franchise}
                    </span>
                    <span className="text-xs text-[#999] flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {partner.city}
                    </span>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(partner.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FFCF40] text-[#FFCF40]" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <p className="text-[#555] text-sm leading-[1.7] italic mb-5 bg-[#F8F8F6] rounded-xl p-4 border-l-3" style={{ borderLeftColor: partner.color }}>
                &ldquo;{partner.quote}&rdquo;
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-[0.62rem] text-[#bbb] uppercase tracking-wider font-semibold mb-1">Investasi</p>
                  <p className="text-sm font-bold text-[#1B8C5A]">{partner.investment}</p>
                </div>
                <div className="text-center">
                  <p className="text-[0.62rem] text-[#bbb] uppercase tracking-wider font-semibold mb-1">Omzet</p>
                  <p className="text-sm font-bold text-[#111]">{partner.monthlyRevenue}</p>
                </div>
                <div className="text-center">
                  <p className="text-[0.62rem] text-[#bbb] uppercase tracking-wider font-semibold mb-1">BEP</p>
                  <p className="text-sm font-bold text-[#FF5C1A]">{partner.bepMonths}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
                <span className="text-xs text-[#ccc] flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Bergabung {partner.joinedDate}
                </span>
                <Link
                  href={`/franchise`}
                  className="text-xs text-[#FF5C1A] font-bold flex items-center gap-1 hover:underline"
                >
                  Lihat franchise <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(255,92,26,0.15) 0%, transparent 70%)"
          }} />
          <div className="relative z-10">
            <h3 className="font-fraunces font-black text-2xl md:text-3xl text-white mb-4">
              Jadilah Mitra Sukses Berikutnya
            </h3>
            <p className="text-white/40 text-sm max-w-md mx-auto mb-8">
              Mulai perjalanan bisnis F&B-mu hari ini. Modal kecil, pendampingan penuh, peluang besar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/daftar"
                className="group flex items-center gap-2 bg-[#FF5C1A] text-white px-8 py-4 rounded-full font-bold shadow-[0_8px_28px_rgba(255,92,26,0.4)] hover:shadow-[0_12px_36px_rgba(255,92,26,0.5)] hover:-translate-y-0.5 transition-all"
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/franchise"
                className="flex items-center gap-2 border border-white/15 text-white/70 hover:text-white hover:border-white/30 px-8 py-4 rounded-full font-bold transition-all"
              >
                Jelajahi Franchise
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
