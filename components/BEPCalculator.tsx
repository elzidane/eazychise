"use client";
import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, Clock, Pencil } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

// ─── KOMPONEN ANIMASI ANGKA REAL-TIME ──────────────────────────────────────
function AnimatedNumber({ value, formatRupiah = false, prefix = "", suffix = "", isFloat = false }: { value: number, formatRupiah?: boolean, prefix?: string, suffix?: string, isFloat?: boolean }) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  const display = useTransform(spring, (current) => {
    if (formatRupiah) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(current);
    }
    return prefix + (isFloat ? current.toFixed(1) : Math.round(current).toString()) + suffix;
  });

  return <motion.span className="tabular-nums inline-block tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>{display}</motion.span>;
}

export default function BEPCalculator() {
  const [modalAwal, setModalAwal] = useState<number>(50000000);
  const [omsetBulan, setOmsetBulan] = useState<number>(30000000);
  const [hppPercent, setHppPercent] = useState<number>(45);
  const [biayaOperasional, setBiayaOperasional] = useState<number>(8000000);
  const [editingField, setEditingField] = useState<string | null>(null);

  // Calculations
  const hppValue = (omsetBulan * hppPercent) / 100;
  const labaKotor = omsetBulan - hppValue;
  const labaBersih = labaKotor - biayaOperasional;

  // Prevent Infinity/NaN if losing money
  const bepBulanNum = labaBersih > 0 ? (modalAwal / labaBersih) : 0;
  const roiTahunanNum = labaBersih > 0 ? (((labaBersih * 12) / modalAwal) * 100) : 0;

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5C1A]/10 text-[#FF5C1A] font-bold text-sm mb-6"
          >
            <Calculator className="w-4 h-4" />
            <span>Kalkulator Cerdas</span>
          </motion.div>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight text-[#111] mb-5">
            Analisis <span className="text-[#FF5C1A]">BEP & ROI</span>
          </h2>
          <p className="text-[#555] max-w-2xl mx-auto text-lg">
            Hitung estimasi kapan balik modal dan potensi keuntungan dari bisnis franchise F&B impianmu.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <SpotlightCard className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 h-full">
              <h3 className="font-syne font-bold text-2xl mb-8 flex items-center gap-3">
                Parameter Bisnis
              </h3>

              <div className="space-y-6">
                {/* Modal Awal */}
                <div className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-[#FF5C1A]/20 transition-colors">
                  <div className="flex justify-between mb-3 items-center">
                    <label className="font-semibold text-[#333] text-sm md:text-base">Modal Awal (Investasi)</label>
                    {editingField === 'modalAwal' ? (
                      <motion.input
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        type="number"
                        value={modalAwal}
                        onChange={(e) => setModalAwal(Number(e.target.value))}
                        onBlur={() => setEditingField(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                        autoFocus
                        className="font-bold text-[#FF5C1A] bg-white border-b-2 border-[#FF5C1A] shadow-sm rounded-t-md outline-none text-right w-36 focus:ring-0 px-2 py-1 m-0 text-sm md:text-base transition-all"
                      />
                    ) : (
                      <div
                        className="flex items-center gap-2 cursor-pointer group bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-[#FF5C1A]/30 transition-all hover:shadow-md"
                        onClick={() => setEditingField('modalAwal')}
                        title="Klik untuk mengubah nilai"
                      >
                        <span className="font-bold text-[#FF5C1A] text-sm md:text-base">
                          {formatRupiah(modalAwal)}
                        </span>
                        <Pencil className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FF5C1A] transition-colors" />
                      </div>
                    )}
                  </div>
                  <input
                    type="range"
                    min="5000000"
                    max="500000000"
                    step="1000000"
                    value={modalAwal}
                    onChange={(e) => setModalAwal(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF5C1A] hover:accent-[#E04710] transition-all"
                  />
                </div>

                {/* Omset Bulanan */}
                <div className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-[#FF5C1A]/20 transition-colors">
                  <div className="flex justify-between mb-3 items-center">
                    <label className="font-semibold text-[#333] text-sm md:text-base">Estimasi Omset / Bulan</label>
                    {editingField === 'omsetBulan' ? (
                      <motion.input
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        type="number"
                        value={omsetBulan}
                        onChange={(e) => setOmsetBulan(Number(e.target.value))}
                        onBlur={() => setEditingField(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                        autoFocus
                        className="font-bold text-[#FF5C1A] bg-white border-b-2 border-[#FF5C1A] shadow-sm rounded-t-md outline-none text-right w-36 focus:ring-0 px-2 py-1 m-0 text-sm md:text-base transition-all"
                      />
                    ) : (
                      <div
                        className="flex items-center gap-2 cursor-pointer group bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-[#FF5C1A]/30 transition-all hover:shadow-md"
                        onClick={() => setEditingField('omsetBulan')}
                        title="Klik untuk mengubah nilai"
                      >
                        <span className="font-bold text-[#FF5C1A] text-sm md:text-base">
                          {formatRupiah(omsetBulan)}
                        </span>
                        <Pencil className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FF5C1A] transition-colors" />
                      </div>
                    )}
                  </div>
                  <input
                    type="range"
                    min="5000000"
                    max="200000000"
                    step="1000000"
                    value={omsetBulan}
                    onChange={(e) => setOmsetBulan(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF5C1A] hover:accent-[#E04710] transition-all"
                  />
                </div>

                {/* HPP */}
                <div className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-[#FF5C1A]/20 transition-colors">
                  <div className="flex justify-between mb-3 items-center">
                    <label className="font-semibold text-[#333] text-sm md:text-base">Harga Pokok Penjualan (HPP)</label>
                    {editingField === 'hppPercent' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center text-[#FF5C1A] bg-white border-b-2 border-[#FF5C1A] shadow-sm rounded-t-md px-2 py-1"
                      >
                        <input
                          type="number"
                          value={hppPercent}
                          onChange={(e) => setHppPercent(Number(e.target.value))}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                          autoFocus
                          className="font-bold bg-transparent outline-none text-right w-16 focus:ring-0 p-0 m-0 text-sm md:text-base"
                        />
                        <span className="font-bold ml-1 text-sm md:text-base">%</span>
                      </motion.div>
                    ) : (
                      <div
                        className="flex items-center gap-2 cursor-pointer group bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-[#FF5C1A]/30 transition-all hover:shadow-md"
                        onClick={() => setEditingField('hppPercent')}
                        title="Klik untuk mengubah nilai"
                      >
                        <span className="font-bold text-[#FF5C1A] text-sm md:text-base">
                          {hppPercent}%
                        </span>
                        <Pencil className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FF5C1A] transition-colors" />
                      </div>
                    )}
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    step="1"
                    value={hppPercent}
                    onChange={(e) => setHppPercent(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF5C1A] hover:accent-[#E04710] transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2">Bahan baku, kemasan, dll (<AnimatedNumber value={hppValue} formatRupiah={true} />/bln)</p>
                </div>

                {/* Biaya Operasional */}
                <div className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-[#FF5C1A]/20 transition-colors">
                  <div className="flex justify-between mb-3 items-center">
                    <label className="font-semibold text-[#333] text-sm md:text-base">Biaya Operasional / Bulan</label>
                    {editingField === 'biayaOperasional' ? (
                      <motion.input
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        type="number"
                        value={biayaOperasional}
                        onChange={(e) => setBiayaOperasional(Number(e.target.value))}
                        onBlur={() => setEditingField(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingField(null)}
                        autoFocus
                        className="font-bold text-[#FF5C1A] bg-white border-b-2 border-[#FF5C1A] shadow-sm rounded-t-md outline-none text-right w-36 focus:ring-0 px-2 py-1 m-0 text-sm md:text-base transition-all"
                      />
                    ) : (
                      <div
                        className="flex items-center gap-2 cursor-pointer group bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-[#FF5C1A]/30 transition-all hover:shadow-md"
                        onClick={() => setEditingField('biayaOperasional')}
                        title="Klik untuk mengubah nilai"
                      >
                        <span className="font-bold text-[#FF5C1A] text-sm md:text-base">
                          {formatRupiah(biayaOperasional)}
                        </span>
                        <Pencil className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FF5C1A] transition-colors" />
                      </div>
                    )}
                  </div>
                  <input
                    type="range"
                    min="1000000"
                    max="50000000"
                    step="500000"
                    value={biayaOperasional}
                    onChange={(e) => setBiayaOperasional(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF5C1A] hover:accent-[#E04710] transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2">Sewa tempat, gaji karyawan, listrik, air, dll.</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            {/* Unified Results Panel */}
            <SpotlightCard
              spotlightColor="rgba(255,255,255,0.2)"
              className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_50px_rgb(0,0,0,0.05)] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_20px_50px_rgb(255,92,26,0.1)]"
            >
              {/* Laba Bersih Section */}
              <motion.div 
                animate={{ backgroundColor: labaBersih > 0 ? '#FF5C1A' : '#ef4444' }}
                className="p-4 sm:p-8 md:p-10 relative overflow-hidden"
              >
                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 opacity-90 text-white">
                      <DollarSign className="w-5 h-5" />
                      <h4 className="font-medium text-lg">Laba Bersih / Bulan</h4>
                    </div>
                    <div className="text-xs md:text-sm font-medium bg-white/20 text-white px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10 shadow-sm">
                      {labaBersih > 0 ? '🚀 Menguntungkan' : '⚠️ Rugi'}
                    </div>
                  </div>

                  <p className="text-base sm:text-xl md:text-3xl lg:text-4xl font-extrabold font-syne text-white tracking-tight drop-shadow-sm whitespace-nowrap">
                    {labaBersih > 0 ? (
                      <AnimatedNumber value={labaBersih} formatRupiah={true} />
                    ) : (
                      formatRupiah(labaBersih)
                    )}
                  </p>
                </div>
              </motion.div>

              {/* BEP & ROI Section (Stacked for better readability) */}
              <div className="flex flex-col divide-y divide-gray-100 bg-white flex-1 relative z-10">
                {/* BEP */}
                <div className="p-8 md:p-10 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300 shadow-sm border border-blue-100/50 shrink-0">
                      <Clock className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm md:text-base text-gray-500 font-semibold mb-1 uppercase tracking-wider">Break Even Point</p>
                      <p className="text-xs text-gray-400 font-medium">Estimasi pengembalian modal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <p className="text-3xl md:text-4xl font-bold font-syne text-[#111]">
                        {labaBersih > 0 ? <AnimatedNumber value={bepBulanNum} isFloat={true} /> : '-'}
                      </p>
                      {labaBersih > 0 && <span className="text-lg text-gray-400 font-medium font-syne">Bln</span>}
                    </div>
                  </div>
                </div>

                {/* ROI */}
                <div className="p-8 md:p-10 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 group-hover:bg-green-100 transition-all duration-300 shadow-sm border border-green-100/50 shrink-0">
                      <TrendingUp className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm md:text-base text-gray-500 font-semibold mb-1 uppercase tracking-wider">ROI Tahunan</p>
                      <p className="text-xs text-gray-400 font-medium">Return on Investment</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <p className="text-3xl md:text-4xl font-bold font-syne text-[#111]">
                        {labaBersih > 0 ? <AnimatedNumber value={roiTahunanNum} isFloat={true} /> : '-'}
                      </p>
                      {labaBersih > 0 && <span className="text-lg text-gray-400 font-medium font-syne">%</span>}
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Disclaimer */}
            <div className="bg-[#FFCF40]/20 p-5 rounded-2xl border border-[#FFCF40]/30">
              <p className="text-sm text-[#8A6A1C] flex items-start gap-2">
                <span className="text-lg mt-0.5">💡</span>
                Angka di atas adalah estimasi kasar. Performa asli dapat bervariasi tergantung pada lokasi, marketing, dan manajemen operasional.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
