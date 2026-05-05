"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, Clock } from "lucide-react";

export default function BEPCalculator() {
  const [modalAwal, setModalAwal] = useState<number>(50000000);
  const [omsetBulan, setOmsetBulan] = useState<number>(30000000);
  const [hppPercent, setHppPercent] = useState<number>(45);
  const [biayaOperasional, setBiayaOperasional] = useState<number>(8000000);

  // Calculations
  const hppValue = (omsetBulan * hppPercent) / 100;
  const labaKotor = omsetBulan - hppValue;
  const labaBersih = labaKotor - biayaOperasional;
  
  // Prevent Infinity/NaN if losing money
  const bepBulan = labaBersih > 0 ? (modalAwal / labaBersih).toFixed(1) : "Tidak BEP (Rugi)";
  const roiTahunan = labaBersih > 0 ? (((labaBersih * 12) / modalAwal) * 100).toFixed(1) : "0";

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
            className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5"
          >
            <h3 className="font-syne font-bold text-2xl mb-8 flex items-center gap-3">
              Parameter Bisnis
            </h3>
            
            <div className="space-y-6">
              {/* Modal Awal */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-[#333]">Modal Awal (Investasi)</label>
                  <span className="font-bold text-[#FF5C1A]">{formatRupiah(modalAwal)}</span>
                </div>
                <input
                  type="range"
                  min="5000000"
                  max="500000000"
                  step="1000000"
                  value={modalAwal}
                  onChange={(e) => setModalAwal(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF5C1A]"
                />
              </div>

              {/* Omset Bulanan */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-[#333]">Estimasi Omset / Bulan</label>
                  <span className="font-bold text-[#FF5C1A]">{formatRupiah(omsetBulan)}</span>
                </div>
                <input
                  type="range"
                  min="5000000"
                  max="200000000"
                  step="1000000"
                  value={omsetBulan}
                  onChange={(e) => setOmsetBulan(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF5C1A]"
                />
              </div>

              {/* HPP */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-[#333]">Harga Pokok Penjualan (HPP)</label>
                  <span className="font-bold text-[#FF5C1A]">{hppPercent}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="1"
                  value={hppPercent}
                  onChange={(e) => setHppPercent(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF5C1A]"
                />
                <p className="text-xs text-gray-500 mt-2">Bahan baku, kemasan, dll ({formatRupiah(hppValue)}/bln)</p>
              </div>

              {/* Biaya Operasional */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-[#333]">Biaya Operasional / Bulan</label>
                  <span className="font-bold text-[#FF5C1A]">{formatRupiah(biayaOperasional)}</span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="50000000"
                  step="500000"
                  value={biayaOperasional}
                  onChange={(e) => setBiayaOperasional(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF5C1A]"
                />
                <p className="text-xs text-gray-500 mt-2">Sewa tempat, gaji karyawan, listrik, air, dll.</p>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            {/* Laba Bersih Card */}
            <div className={`p-8 rounded-3xl text-white shadow-xl ${labaBersih > 0 ? 'bg-gradient-to-br from-[#FF5C1A] to-[#E04710]' : 'bg-red-500'}`}>
              <div className="flex items-center gap-3 mb-4 opacity-90">
                <DollarSign className="w-6 h-6" />
                <h4 className="font-syne font-bold text-xl">Laba Bersih / Bulan</h4>
              </div>
              <p className="text-4xl font-extrabold font-syne mb-2">
                {formatRupiah(labaBersih)}
              </p>
              <p className="text-sm opacity-80">
                {labaBersih > 0 ? 'Bisnis menguntungkan! 🚀' : 'Perlu evaluasi biaya atau tingkatkan target penjualan.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 flex-1">
              {/* BEP Card */}
              <div className="bg-white p-6 rounded-3xl border border-black/5 flex flex-col justify-center shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <p className="text-gray-500 text-sm font-medium mb-1">Break Even Point</p>
                <p className="text-2xl font-bold text-[#111]">
                  {labaBersih > 0 ? <>{bepBulan} <span className="text-lg text-gray-500 font-medium">Bulan</span></> : '-'}
                </p>
              </div>

              {/* ROI Card */}
              <div className="bg-white p-6 rounded-3xl border border-black/5 flex flex-col justify-center shadow-sm">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <p className="text-gray-500 text-sm font-medium mb-1">ROI Tahunan</p>
                <p className="text-2xl font-bold text-[#111]">
                  {labaBersih > 0 ? <>{roiTahunan} <span className="text-lg text-gray-500 font-medium">%</span></> : '-'}
                </p>
              </div>
            </div>
            
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
