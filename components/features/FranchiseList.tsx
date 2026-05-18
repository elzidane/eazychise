"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GitCompareArrows, X, ChevronDown, Sparkles } from "lucide-react";
import { MdRestaurant } from "react-icons/md";

import { Franchise } from "@/types";
import { FRANCHISE_DATA } from "@/lib/franchise-data";
import { FRANCHISE_FILTERS } from "@/lib/constants";
import { TiltCard } from "../effects/Reactbitseffects";
import { createClient } from "@/utils/supabase/client";

const INITIAL_COUNT = 9;

function applyFilter(list: Franchise[], key: string, query: string) {
  let result = list;
  if (key !== "all") {
    if (key === "under5") result = result.filter((f) => (f.investNum || 0) < 5_000_000);
    else if (key === "5to20") result = result.filter((f) => (f.investNum || 0) >= 5_000_000 && (f.investNum || 0) <= 20_000_000);
    else result = result.filter((f) => f.catKey === key);
  }
  if (query.trim() !== "") {
    result = result.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));
  }
  return result;
}

export default function FranchiseListings({ initialData = FRANCHISE_DATA }: { initialData?: Franchise[] }) {
  const data = initialData;
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  // Read initial filter from URL if present
  const initialFilter = searchParams.get("filter");
  const defaultActive = (initialFilter && FRANCHISE_FILTERS.some(f => f.key === initialFilter)) ? initialFilter : "all";

  const [active, setActive] = useState(defaultActive);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [compareList, setCompareList] = useState<string[]>([]);

  // Sync filter state when URL search parameters change
  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam && FRANCHISE_FILTERS.some(f => f.key === filterParam)) {
      setActive(filterParam);
    } else if (!filterParam) {
      setActive("all");
    }
  }, [searchParams]);

  const handleFilterClick = (key: string) => {
    setActive(key);
    setVisibleCount(INITIAL_COUNT);
    if (key === "all") {
      router.push("/franchise", { scroll: false });
    } else {
      router.push(`/franchise?filter=${key}`, { scroll: false });
    }
  };

  // Debounce search query to save to database
  useEffect(() => {
    const saveSearch = async () => {
      if (searchQuery.trim().length > 2) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          // Hanya simpan pencarian jika user login
          await supabase.from('search_history').insert({
            user_id: session.user.id,
            keyword: searchQuery.trim()
          });
        }
      }
    };

    const timeoutId = setTimeout(() => {
      if (searchQuery) saveSearch();
    }, 2000); // 2 second debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, supabase]);

  const filtered = useMemo(() => applyFilter(data, active, searchQuery), [active, searchQuery]);
  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const toggleCompare = (name: string) => {
    setCompareList(prev => {
      if (prev.includes(name)) return prev.filter(n => n !== name);
      if (prev.length >= 3) return prev; 
      return [...prev, name];
    });
  };

  const handleCompare = () => {
    sessionStorage.setItem("eazychise_compare", JSON.stringify(compareList));
    router.push("/compare");
  };

  const showMore = () => setVisibleCount(prev => prev + 6);

  return (
    <section id="franchise" className="section-padding bg-white/30">

      
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <p className="label-caps mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-[#FF5C1A]" />
            Katalog Franchise
          </p>
          <h2 className="h2-responsive text-[#111111]">
            Temukan Brand Yang Sesuai dengan 
            <em className="text-[#FF5C1A] not-italic"> Visi &amp; Budgetmu</em>
          </h2>
        </div>
        <Link
          href="/franchise"
          className="group flex items-center gap-2.5 text-[#777] hover:text-[#FF5C1A] text-[0.9rem] font-bold transition-all px-5 py-2.5 rounded-full bg-white border border-black/[0.05] hover:border-[#FF5C1A]/20"
        >
          Lihat Semua
          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </Link>
      </div>

      
      <div className="mb-6 max-w-xl">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Cari nama franchise..." 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(INITIAL_COUNT); }}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-black/10 focus:border-[#FF5C1A] outline-none shadow-sm transition-all font-medium text-sm"
          />
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      
      <div className="flex flex-wrap gap-2.5 mb-10">
        {FRANCHISE_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => handleFilterClick(f.key)}
            className={`px-5 py-2.5 rounded-full text-[0.85rem] font-bold transition-all duration-300 cursor-pointer ${
              active === f.key
                ? "bg-[#111] text-white shadow-[0_10px_25px_rgba(0,0,0,0.15)] scale-[1.02]"
                : "bg-white text-[#555] border border-black/[0.08] hover:border-[#FF5C1A]/30 hover:bg-white/50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <AnimatePresence>
          {visibleItems.map((f, i) => {
            const isCompared = compareList.includes(f.name);
            return (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i % 9 * 0.05 }}
              >
                <TiltCard
                  className={`group bg-white rounded-[28px] overflow-hidden border transition-all duration-500 flex flex-col h-full ${
                    isCompared 
                      ? "border-[#FF5C1A] shadow-[0_0_0_2px_rgba(255,92,26,0.15),0_25px_60px_rgba(0,0,0,0.12)]" 
                      : "border-black/[0.06] hover:border-[#FF5C1A]/30 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  {/* Image */}
                  <div className="h-[210px] relative overflow-hidden flex-shrink-0">
                    <Image
                      src={f.img || ""}
                      alt={f.alt || f.name}
                      fill
                      sizes="450px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                    {/* Category pill */}
                    <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md text-white text-[0.65rem] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {f.cat}
                    </div>

                    {/* Badge */}
                    {f.badge && (
                      <div
                        className="absolute top-4 right-4 text-white text-[0.65rem] font-black px-3 py-1.5 rounded-full shadow-lg"
                        style={{ background: f.badgeColor ?? "#FF5C1A" }}
                      >
                        {f.badge}
                      </div>
                    )}

                    {/* Compare checkbox */}
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleCompare(f.name); }}
                      className={`absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer z-10 ${
                        isCompared 
                          ? "bg-[#FF5C1A] text-white shadow-[0_8px_20px_rgba(255,92,26,0.4)]" 
                          : "bg-black/30 backdrop-blur-md text-white/80 hover:bg-[#FF5C1A] hover:text-white"
                      }`}
                      title={isCompared ? "Hapus dari perbandingan" : "Bandingkan"}
                    >
                      <GitCompareArrows className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-syne font-black text-[1.15rem] text-[#111] leading-tight group-hover:text-[#FF5C1A] transition-colors">
                        {f.name}
                      </h3>
                      <div className="flex items-center gap-1.5 flex-shrink-0 bg-[#FFFBEB] px-2.5 py-1 rounded-full border border-[#FEF3C7]">
                        <span className="text-[#FFCF40] text-[0.7rem] font-black">★</span>
                        <span className="text-[#111] text-[0.75rem] font-black">{f.rating}</span>
                      </div>
                    </div>

                    <p className="text-[#999] text-[0.8rem] mb-5 flex items-center gap-1.5 font-bold">
                      <svg width="12" height="14" viewBox="0 0 10 12" fill="none" className="opacity-40">
                        <path d="M5 0C2.79 0 1 1.79 1 4c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 5 2.5a1.5 1.5 0 0 1 0 3z" fill="currentColor"/>
                      </svg>
                      {f.city}
                    </p>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3 mb-7">
                      {([
                        { label: "Investasi", value: f.invest, highlight: false },
                        { label: "ROI", value: f.roi, highlight: true },
                        { label: "Omzet", value: f.omzet, highlight: false },
                        { label: "Mitra", value: f.mitra, highlight: false },
                      ]).map((stat) => (
                        <div key={stat.label} className="bg-[#F9F9F7] rounded-2xl px-3.5 py-3 border border-black/[0.02]">
                          <p className="text-[0.6rem] text-[#aaa] uppercase tracking-widest font-black mb-1">
                            {stat.label}
                          </p>
                          <p
                            className="text-[0.9rem] font-black leading-none"
                            style={{ color: stat.highlight ? "#1B8C5A" : "#111" }}
                          >
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/franchise/${f.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="mt-auto block text-center bg-[#111] text-white py-4 rounded-2xl font-black text-[0.9rem] hover:bg-[#FF5C1A] transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#FF5C1A]/20 active:scale-[0.98]"
                    >
                      Detail Franchise
                    </Link>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Show More Button */}
      {hasMore && (
        <div className="mt-16 text-center">
          <button
            onClick={showMore}
            className="group inline-flex items-center gap-3 bg-white border-2 border-[#111]/5 text-[#111] px-10 py-4 rounded-2xl font-black text-[0.95rem] hover:border-[#FF5C1A]/30 hover:text-[#FF5C1A] transition-all duration-300 shadow-sm hover:shadow-xl active:scale-95"
          >
            Tampilkan Lebih Banyak
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
          <p className="text-[#999] text-[0.75rem] font-bold mt-5 uppercase tracking-widest flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Menampilkan {visibleCount} dari {filtered.length} brand unggulan
          </p>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 bg-white/50 rounded-[40px] border border-dashed border-black/10"
        >
          <div className="w-20 h-20 mx-auto bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border border-black/[0.03]">
            <MdRestaurant className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-[#111] font-black text-xl mb-2">Ops! Brand Tidak Ditemukan</h3>
          <p className="text-[#777] font-bold text-sm">Coba gunakan filter atau kata kunci lain.</p>
          <button 
            onClick={() => handleFilterClick("all")}
            className="mt-6 text-[#FF5C1A] font-black text-sm hover:underline"
          >
            Reset Filter
          </button>
        </motion.div>
      )}

      
      <AnimatePresence>
        {compareList.length >= 1 && (
          <motion.div 
            initial={{ y: 100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 100, x: "-50%", opacity: 0 }}
            className="fixed bottom-8 left-1/2 z-40 w-[90%] max-w-[500px]"
          >
            <div className="bg-[#111] text-white px-5 py-4 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.5)] border border-white/10 flex items-center justify-between gap-4 backdrop-blur-2xl">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2.5 mr-1">
                  {compareList.map(name => {
                    const f = data.find(d => d.name === name);
                    return (
                      <div key={name} className="relative group/chip">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#FF5C1A] bg-white relative">
                          <Image src={f?.img || ""} alt={name} fill className="object-cover" />
                        </div>
                        <button
                          onClick={() => toggleCompare(name)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-[#FF5C1A] text-white rounded-full flex items-center justify-center text-[0.6rem] opacity-0 group-hover/chip:opacity-100 transition-all cursor-pointer z-10 border-2 border-[#111]"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="hidden sm:block">
                  <p className="text-[0.7rem] font-black text-[#888] uppercase tracking-widest leading-none mb-1">Status</p>
                  <p className="text-[0.85rem] font-black text-white">{compareList.length} terpilih</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCompare}
                  disabled={compareList.length < 2}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[0.85rem] font-black transition-all ${
                    compareList.length >= 2 
                      ? "bg-[#FF5C1A] text-white shadow-[0_10px_25px_rgba(255,92,26,0.3)] hover:bg-[#e04710] active:scale-95" 
                      : "bg-white/5 text-white/20 cursor-not-allowed"
                  }`}
                >
                  <GitCompareArrows className="w-4 h-4" />
                  Bandingkan
                </button>
                <button
                  onClick={() => setCompareList([])}
                  className="text-white/20 hover:text-white transition-colors p-2 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}