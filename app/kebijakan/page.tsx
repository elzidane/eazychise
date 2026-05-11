"use client";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Lock, Eye, Bell, Info, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import SpotlightCard from "@/components/cards/SpotlightCard";

export default function KebijakanPage() {
  const sections = [
    { id: "syarat", label: "Syarat & Ketentuan", icon: FileText },
    { id: "privasi", label: "Kebijakan Privasi", icon: Lock },
    { id: "keamanan", label: "Keamanan Data", icon: ShieldCheck },
    { id: "kontak", label: "Hubungi Kami", icon: Info },
  ];

  return (
    <main className="bg-[#FFF9F0] min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="px-[5%] max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-[#FF5C1A] font-bold text-sm mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
          <h1 className="font-syne font-extrabold text-[clamp(2.5rem,5vw,4.5rem)] text-[#111] leading-[1] mb-6">
            Syarat & <span className="text-[#FF5C1A] italic">Kebijakan.</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl">
            Transparansi adalah inti dari kepercayaan. Pelajari bagaimana kami bekerja dan melindungi data Anda.
          </p>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Bell className="w-4 h-4 text-[#FF5C1A]" /> Terakhir Diperbarui: 15 Januari 2025
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 h-fit sticky top-32">
            <div className="bg-white/60 backdrop-blur-xl border border-black/[0.03] rounded-3xl p-6 shadow-sm">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-2">Daftar Isi</h4>
              <nav className="flex flex-col gap-2">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-[#FF5C1A]/5 hover:text-[#FF5C1A] transition-all text-left group"
                  >
                    <s.icon className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    {s.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-16">
            
            {/* Section: Syarat & Ketentuan */}
            <section id="syarat" className="scroll-mt-32">
              <SpotlightCard className="bg-white border border-black/[0.03] rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#FF5C1A]" />
                  </div>
                  <h2 className="font-syne font-bold text-3xl text-[#111]">Syarat & Ketentuan</h2>
                </div>

                <div className="prose prose-orange max-w-none text-gray-600 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#111] mb-3">1. Penggunaan Layanan</h3>
                    <p>
                      EazyChise adalah platform digital yang menghubungkan pemilik brand franchise (Franchisor) dengan calon investor (Mitra). Dengan menggunakan platform kami, Anda setuju untuk memberikan informasi yang akurat dan benar.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111] mb-3">2. Pendaftaran Akun</h3>
                    <p>
                      Setiap pengguna wajib mendaftarkan diri menggunakan data asli. Kami berhak melakukan verifikasi terhadap data brand franchise yang didaftarkan untuk menjamin keamanan komunitas.
                    </p>
                  </div>
                  <div className="bg-[#F8F8F6] p-6 rounded-2xl border-l-4 border-[#FF5C1A]">
                    <h4 className="font-bold text-[#111] mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5C1A]" /> Penting untuk Franchisor
                    </h4>
                    <p className="text-sm">
                      Brand yang didaftarkan harus memiliki izin usaha yang sah di Indonesia dan mematuhi aturan perdagangan franchise yang berlaku.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111] mb-3">3. Tanggung Jawab Keuangan</h3>
                    <p>
                      EazyChise berfungsi sebagai fasilitator informasi. Transaksi keuangan antara Franchisor dan Mitra dilakukan secara langsung atau sesuai kesepakatan tertulis di luar tanggung jawab platform, kecuali untuk biaya layanan yang kami tetapkan secara eksplisit.
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </section>

            {/* Section: Kebijakan Privasi */}
            <section id="privasi" className="scroll-mt-32">
              <SpotlightCard className="bg-white border border-black/[0.03] rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-blue-500" />
                  </div>
                  <h2 className="font-syne font-bold text-3xl text-[#111]">Kebijakan Privasi</h2>
                </div>

                <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#111] mb-3">Data yang Kami Kumpulkan</h3>
                    <p>
                      Kami mengumpulkan data personal seperti Nama, Alamat Email, Nomor WhatsApp, dan Informasi Brand untuk tujuan operasional dan pendampingan bisnis.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                    <div className="p-5 border border-black/5 rounded-2xl bg-gray-50">
                      <div className="flex items-center gap-3 mb-2 font-bold text-[#111]">
                        <Eye className="w-4 h-4 text-blue-500" /> Penggunaan Data
                      </div>
                      <p className="text-xs">Data Anda digunakan untuk mempersonalisasi rekomendasi franchise dan memberikan update terkait peluang bisnis terbaru.</p>
                    </div>
                    <div className="p-5 border border-black/5 rounded-2xl bg-gray-50">
                      <div className="flex items-center gap-3 mb-2 font-bold text-[#111]">
                        <ShieldCheck className="w-4 h-4 text-green-500" /> Perlindungan
                      </div>
                      <p className="text-xs">Kami tidak akan pernah menjual data Anda kepada pihak ketiga. Semua data disimpan secara terenkripsi di server kami.</p>
                    </div>
                  </div>
                  <p>
                    Kami menggunakan cookies untuk meningkatkan pengalaman pengguna di platform kami. Anda dapat mengatur preferensi cookies melalui pengaturan browser Anda.
                  </p>
                </div>
              </SpotlightCard>
            </section>

            {/* Section: Keamanan Data */}
            <section id="keamanan" className="scroll-mt-32">
              <div className="bg-[#111] text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5C1A]/10 rounded-full blur-[100px]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-[#FF5C1A]" />
                    </div>
                    <h2 className="font-syne font-bold text-3xl">Komitmen Keamanan</h2>
                  </div>
                  <p className="text-white/60 mb-8 leading-relaxed">
                    EazyChise menggunakan standar keamanan industri tingkat tinggi untuk melindungi setiap interaksi di platform kami. Kami terus memantau ancaman siber untuk memastikan investasi dan data Anda tetap aman.
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Enkripsi End-to-End", "Verifikasi 2-Langkah", "Pemantauan 24/7", "Firewall Lanjutan"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm font-bold">
                        <div className="w-5 h-5 rounded-full bg-[#FF5C1A]/20 flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-[#FF5C1A]" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section: Kontak */}
            <section id="kontak" className="scroll-mt-32">
              <div className="text-center bg-[#FF5C1A]/5 rounded-[2.5rem] p-12 border-2 border-dashed border-[#FF5C1A]/20">
                <h3 className="font-syne font-bold text-2xl text-[#111] mb-4">Punya Pertanyaan Lain?</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm">
                  Jika Anda memerlukan klarifikasi lebih lanjut mengenai syarat dan kebijakan kami, tim legal kami siap membantu.
                </p>
                <Link 
                  href="https://wa.me/6287792735999"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-[#111] text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-[#FF5C1A] transition-all shadow-lg"
                >
                  Hubungi Legal Team <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
