"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Users, Activity, Zap } from "lucide-react";

const TRACKER_DATA = [
  { area: "Jakarta Selatan", growth: "+12.5%", demand: "Sangat Tinggi", category: "Coffee Shop", traffic: "15k/day" },
  { area: "Bandung Utara", growth: "+8.2%", demand: "Tinggi", category: "Snack / Pastry", traffic: "8k/day" },
  { area: "Surabaya Pusat", growth: "+15.1%", demand: "Ekstrim", category: "Fast Food", traffic: "22k/day" },
  { area: "Tangerang", growth: "+6.4%", demand: "Sedang", category: "Health & Beauty", traffic: "5k/day" },
];

export default function LocalBusinessTracker() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-white rounded-3xl p-7 border border-black/5 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-500 text-[0.6rem] font-bold uppercase tracking-widest animate-pulse">
          <Activity className="w-3 h-3" /> Live Data
        </div>
      </div>

      <h3 className="font-syne font-extrabold text-lg text-[#111] mb-6 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-[#FF5C1A]" />
        Local Business Tracker
      </h3>

      <div className="space-y-4">
        {TRACKER_DATA.map((item, index) => (
          <motion.div
            key={item.area}
            onMouseEnter={() => setActiveIndex(index)}
            animate={{ 
              opacity: activeIndex === index ? 1 : 0.4,
              scale: activeIndex === index ? 1.02 : 1,
              x: activeIndex === index ? 4 : 0
            }}
            className={`p-4 rounded-2xl border transition-all cursor-default ${
              activeIndex === index 
                ? "bg-gradient-to-r from-[#FFF3E5] to-white border-[#FF5C1A]/20 shadow-md" 
                : "bg-gray-50 border-transparent"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-sm text-[#111]">{item.area}</p>
                <p className="text-[0.65rem] text-[#888] font-medium">{item.category}</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-bold text-xs flex items-center justify-end gap-1">
                  <TrendingUp className="w-3 h-3" /> {item.growth}
                </p>
                <p className="text-[0.6rem] text-[#999] uppercase tracking-tighter">Growth</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-black/[0.03]">
              <div className="flex items-center gap-1.5">
                <Users className="w-3 h-3 text-[#FF5C1A]" />
                <span className="text-[0.65rem] font-bold text-[#555]">{item.traffic}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-[#FFCF40]" />
                <span className="text-[0.65rem] font-bold text-[#555]">{item.demand} Demand</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-2xl bg-[#111] text-white">
        <p className="text-[0.65rem] text-white/50 font-bold uppercase tracking-widest mb-2">Hot Insight</p>
        <p className="text-xs leading-relaxed font-medium">
          Area <span className="text-[#FFCF40]">Surabaya Pusat</span> mengalami lonjakan permintaan franchise F&B sebesar 25% minggu ini.
        </p>
      </div>
    </div>
  );
}
