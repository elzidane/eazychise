"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, ArrowRight } from "lucide-react";

const ARTICLES: Record<string, {
  title: string;
  category: string;
  readTime: string;
  date: string;
  content: string[];
}> = {
  "franchise-fb-modal-kecil-2025": {
    title: "5 Franchise F&B Modal Kecil Paling Menguntungkan 2025",
    category: "Tips Bisnis",
    readTime: "5 menit",
    date: "28 April 2025",
    content: [
      "Memulai bisnis franchise tidak harus mengeluarkan puluhan juta rupiah. Di tahun 2025, banyak brand F&B yang menawarkan paket franchise dengan modal terjangkau namun tetap menjanjikan keuntungan yang menarik.",
      "## 1. Kopi Studio 24 — Modal Rp 2,8 Juta",
      "Brand kopi kekinian ini menawarkan paket franchise paling terjangkau di kelasnya. Dengan modal hanya Rp 2,8 juta, kamu sudah mendapatkan booth, peralatan brewing dasar, bahan baku awal, dan pelatihan barista. ROI rata-rata 3-5 bulan dengan omzet Rp 8-18 juta per bulan.",
      "## 2. Aice Ice Cream — Modal Rp 3 Juta",
      "Franchise es krim yang sudah dikenal luas di seluruh Indonesia. Modal kecil tapi demand tinggi, terutama di daerah tropis. Konsep frozen point yang simpel membuatnya cocok untuk pemula tanpa pengalaman bisnis.",
      "## 3. XIBOBA — Modal Rp 3,5 Juta",
      "Brand boba drink yang sedang viral di kalangan anak muda. Dengan variasi menu yang banyak dan brand awareness yang kuat, XIBOBA menjadi pilihan favorit para franchisee pemula.",
      "## 4. Pisang Goreng Madu Bu Nanik — Modal Rp 4 Juta",
      "Snack klasik yang tidak pernah sepi peminat. Konsepnya sederhana — gerobak kecil di depan rumah pun bisa menghasilkan. Balik modal rata-rata 3-5 bulan.",
      "## 5. Es Teh Indonesia — Modal Rp 5 Juta",
      "Brand minuman teh yang viral sejak 2024. Dengan konsep booth minimalis dan menu yang simpel, Es Teh Indonesia berhasil menarik banyak franchisee baru di berbagai kota.",
      "## Tips Memilih Franchise Modal Kecil",
      "Sebelum memutuskan, pastikan kamu sudah mengecek: legalitas brand, support system yang diberikan, fee royalti bulanan, dan testimoni dari franchisee yang sudah berjalan. Gunakan fitur Analisis BEP di EazyChise untuk menghitung estimasi balik modal secara akurat.",
    ]
  },
  "cara-hitung-bep-franchise": {
    title: "Cara Hitung BEP Franchise untuk Pemula: Panduan Lengkap",
    category: "Edukasi",
    readTime: "8 menit",
    date: "22 April 2025",
    content: [
      "Break Even Point (BEP) adalah titik di mana total pendapatan sama dengan total biaya — artinya kamu tidak rugi dan tidak untung. Memahami BEP adalah langkah krusial sebelum investasi franchise.",
      "## Apa Itu BEP?",
      "BEP atau Break Even Point adalah kondisi di mana bisnis mulai impas. Semua biaya investasi awal sudah tertutupi oleh pendapatan yang masuk. Setelah melewati titik BEP, barulah kamu mulai mendapatkan keuntungan bersih.",
      "## Rumus Dasar BEP",
      "BEP (dalam bulan) = Total Investasi Awal ÷ Laba Bersih per Bulan",
      "Contoh: Jika investasi awal Rp 5 juta dan laba bersih per bulan Rp 1,5 juta, maka BEP = 5.000.000 ÷ 1.500.000 = 3,3 bulan (sekitar 3-4 bulan).",
      "## Komponen yang Harus Dihitung",
      "1. **Modal Awal**: Franchise fee, peralatan, renovasi, stok awal\n2. **Biaya Operasional Bulanan**: Sewa tempat, gaji karyawan, bahan baku, listrik\n3. **Estimasi Pendapatan**: Berdasarkan harga jual × volume penjualan harian\n4. **Laba Bersih**: Pendapatan dikurangi biaya operasional",
      "## Faktor yang Mempengaruhi BEP",
      "Lokasi usaha, jam operasional, musim/cuaca, kompetitor di sekitar, dan kemampuan marketing. Franchise dengan brand awareness tinggi biasanya memiliki BEP lebih cepat.",
      "## Gunakan EazyChise BEP Calculator",
      "Tidak perlu hitung manual! EazyChise menyediakan tool Analisis BEP yang bisa kamu custom sesuai data franchise yang kamu minati. Input modal, estimasi omzet, dan biaya operasional — hasilnya langsung terlihat.",
    ]
  },
  "panduan-memilih-franchise-fb": {
    title: "Panduan Lengkap Memilih Franchise F&B Pertamamu",
    category: "Panduan",
    readTime: "10 menit",
    date: "15 April 2025",
    content: [
      "Memilih franchise F&B pertama adalah keputusan besar yang membutuhkan riset mendalam. Panduan ini akan membantumu dari tahap awal hingga siap grand opening.",
      "## Step 1: Kenali Dirimu",
      "Sebelum memilih franchise, jawab pertanyaan ini: Berapa modal yang tersedia? Apakah ini bisnis utama atau sampingan? Sudah punya pengalaman di F&B? Jawaban-jawaban ini akan mempersempit pilihan franchise yang cocok untukmu.",
      "## Step 2: Riset Brand",
      "Jangan tergiur hanya karena viral. Periksa: berapa lama brand sudah beroperasi, ada berapa outlet yang aktif, bagaimana testimoni franchisee lain, dan apakah punya legalitas lengkap (BPOM, Halal MUI, NIB).",
      "## Step 3: Analisis Finansial",
      "Hitung BEP, estimasi ROI, dan biaya operasional bulanan. Bandingkan minimal 2-3 brand sebelum memutuskan. Fitur perbandingan di EazyChise sangat membantu untuk ini.",
      "## Step 4: Kunjungi Outlet yang Sudah Berjalan",
      "Datangi langsung outlet franchise yang sudah beroperasi. Amati traffic pengunjung, kualitas produk, kebersihan, dan proses operasionalnya. Jangan ragu bertanya ke pemilik outlet.",
      "## Step 5: Baca Kontrak dengan Teliti",
      "Perhatikan: durasi kontrak, fee royalti bulanan, territory protection, hak dan kewajiban masing-masing pihak, dan kondisi pemutusan kontrak. Jika perlu, konsultasikan dengan ahli hukum.",
      "## Step 6: Pilih Lokasi Strategis",
      "Lokasi menentukan 60% keberhasilan bisnis F&B. Pilih tempat dengan foot traffic tinggi, akses mudah, dan sesuai target market brand. Beberapa franchisor bahkan menyediakan analisis lokasi.",
      "## Step 7: Persiapan Grand Opening",
      "Setelah kontrak ditandatangani, ikuti pelatihan yang disediakan franchisor. Siapkan tim, stok bahan baku, dan strategi promosi grand opening. Hari pertama harus berkesan!",
    ]
  },
};

export default function BlogArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <main className="min-h-screen pt-28 pb-20 px-[5%] flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">📄</p>
          <h1 className="font-syne font-extrabold text-2xl text-[#111] mb-3">Artikel Tidak Ditemukan</h1>
          <Link href="/blog" className="text-[#FF5C1A] font-bold hover:underline flex items-center gap-2 justify-center mt-4">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-[5%]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* Back */}
        <Link href="/blog" className="flex items-center gap-2 text-[#888] hover:text-[#FF5C1A] text-sm font-semibold mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Blog
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-4 flex-wrap mb-6">
          <span className="bg-[#FF5C1A]/10 text-[#FF5C1A] text-xs font-bold px-3 py-1.5 rounded-full">{article.category}</span>
          <span className="text-[#bbb] text-sm flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
          <span className="text-[#bbb] text-sm">{article.date}</span>
        </div>

        {/* Title */}
        <h1 className="font-fraunces font-black text-[clamp(2rem,4vw,3rem)] text-[#111] leading-[1.12] mb-10">
          {article.title}
        </h1>

        {/* Content */}
        <div className="prose-custom space-y-5">
          {article.content.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="font-syne font-extrabold text-xl text-[#111] mt-10 mb-3">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p key={i} className="text-[#555] text-[0.95rem] leading-[1.85]" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#111] font-semibold">$1</strong>').replace(/\n/g, '<br/>') }} />
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-[#FFF3E5] rounded-2xl p-8 border border-[#FF5C1A]/10">
          <h3 className="font-syne font-extrabold text-lg text-[#111] mb-2">Siap mulai bisnis franchise?</h3>
          <p className="text-[#888] text-sm mb-5">Jelajahi franchise F&B terpercaya dan gunakan AI Advisor gratis.</p>
          <Link 
            href="/franchise" 
            className="inline-flex items-center gap-2 bg-[#FF5C1A] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-[0_6px_20px_rgba(255,92,26,0.3)] hover:bg-[#e04710] transition-all"
          >
            Cari Franchise <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
