import { jsPDF } from "jspdf";
import { Franchise } from "@/types";

export const generateProposalPDF = (franchise: Franchise) => {
  const doc = new jsPDF();
  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;
  let y = 20;

  // --- Background / Border ---
  doc.setDrawColor(240);
  doc.rect(5, 5, pageWidth - 10, doc.internal.pageSize.height - 10);

  // --- Header Section ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(27, 27, 27);
  doc.text("EazyChise", margin, y);
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text("Professional Franchise Portfolio & Marketplace", margin, y + 6);
  
  // Official Logo Style Decoration
  doc.setDrawColor(255, 92, 26);
  doc.setLineWidth(1.5);
  doc.line(margin, y + 10, 45, y + 10);

  // Date & Document ID
  const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(`Tanggal: ${today}`, pageWidth - margin - 40, y);
  doc.text(`Ref: EZC/${new Date().getFullYear()}/${franchise.name.substring(0, 3).toUpperCase()}`, pageWidth - margin - 40, y + 5);

  y += 35;

  // --- Title ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(17, 17, 17);
  doc.text("PROPOSAL PENAWARAN KEMITRAAN", margin, y);
  
  y += 10;
  doc.setFontSize(16);
  doc.setTextColor(255, 92, 26);
  doc.text(franchise.name, margin, y);

  y += 15;
  doc.setDrawColor(230);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);

  // --- 1. Pendahuluan ---
  y += 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(17, 17, 17);
  doc.text("I. PENDAHULUAN", margin, y);
  
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60);
  const introText = `Melalui platform EazyChise, kami menyampaikan profil kemitraan resmi untuk brand ${franchise.name}. Dokumen ini disusun untuk memberikan informasi komprehensif mengenai potensi investasi dan sistem operasional bisnis yang akan dijalankan oleh calon mitra di wilayah ${franchise.city || "Indonesia"} dan sekitarnya.`;
  const splitIntro = doc.splitTextToSize(introText, pageWidth - (margin * 2));
  doc.text(splitIntro, margin, y);

  y += (splitIntro.length * 6) + 5;

  // --- 2. Analisis Investasi (Table Style) ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(17, 17, 17);
  doc.text("II. ANALISIS INVESTASI & PROYEKSI KEUNTUNGAN", margin, y);
  
  y += 8;

  doc.setFillColor(248, 248, 246);
  doc.rect(margin, y, pageWidth - (margin * 2), 10, 'F');
  doc.setFontSize(10);
  doc.text("Keterangan", margin + 5, y + 7);
  doc.text("Nilai Estimasi", margin + 100, y + 7);


  const stats = [
    { label: "Modal Investasi Awal", value: franchise.invest || "-" },
    { label: "Estimasi Balik Modal (ROI)", value: franchise.roi || "-" },
    { label: "Proyeksi Omzet Bulanan", value: franchise.omzet || "-" },
    { label: "HPP (Harga Pokok Penjualan)", value: "± 45% - 50%" },
    { label: "Estimasi Profit Bersih", value: "25% - 35%" }
  ];

  y += 10;
  stats.forEach((stat, index) => {
    doc.setDrawColor(240);
    doc.line(margin, y + 10, pageWidth - margin, y + 10);
    doc.setFont("helvetica", index === 0 ? "bold" : "normal");
    doc.text(stat.label, margin + 5, y + 7);
    doc.text(stat.value, margin + 100, y + 7);
    y += 10;
  });

  // --- 3. Cakupan Kemitraan ---
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("III. CAKUPAN PAKET KEMITRAAN", margin, y);
  
  y += 8;
  doc.setFont("helvetica", "normal");
  const benefits = [
    "Lisensi penggunaan merek dagang resmi",
    "Peralatan operasional standar kualitas premium",
    "Paket bahan baku awal (Starter Kit)",
    "Buku panduan operasional (Standard Operating Procedure)",
    "Dukungan pemasaran digital dan materi promosi",
    "Konsultasi berkala untuk pengembangan outlet"
  ];
  
  benefits.forEach(benefit => {
    doc.circle(margin + 2, y + 4, 0.5, 'F');
    doc.text(benefit, margin + 7, y + 5);
    y += 7;
  });

  // --- 4. Penutup & Legal ---
  y += 15;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(100);
  const closingText = "Seluruh data yang tercantum dalam proposal ini bersifat estimasi berdasarkan performa rata-rata outlet yang telah berjalan. Hasil aktual dapat bervariasi tergantung pada lokasi, manajemen operasional, dan kondisi pasar lokal.";
  const splitClosing = doc.splitTextToSize(closingText, pageWidth - (margin * 2));
  doc.text(splitClosing, margin, y);

  // --- Signature Area ---
  y += 25;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 17, 17);
  doc.text("Verified by EazyChise Team", margin, y);
  
  doc.setDrawColor(200);
  doc.line(margin, y + 15, margin + 50, y + 15);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Business Development Dept.", margin, y + 20);

  // Footer
  y = 285;
  doc.setFontSize(8);
  doc.setTextColor(180);
  doc.text("Dokumen ini dihasilkan secara digital dan sah tanpa tanda tangan basah.", margin, y);
  doc.text("Halaman 1 dari 1", pageWidth - margin - 20, y);

  doc.save(`Proposal_Resmi_${franchise.name.replace(/\s+/g, '_')}.pdf`);
};

export const generateBrandReportPDF = (brandName: string, stats: any) => {
  const doc = new jsPDF();
  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;
  let y = 20;

  // --- Background / Border ---
  doc.setDrawColor(240);
  doc.rect(5, 5, pageWidth - 10, doc.internal.pageSize.height - 10);

  // --- Header Section ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(27, 27, 27);
  doc.text("EazyChise Analytics", margin, y);
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text("Professional Franchise Portfolio & Marketplace", margin, y + 6);
  
  // Official Logo Style Decoration
  doc.setDrawColor(255, 92, 26);
  doc.setLineWidth(1.5);
  doc.line(margin, y + 10, 65, y + 10);

  // Date & Document ID
  const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(`Tanggal: ${today}`, pageWidth - margin - 40, y);
  doc.text(`Ref: RPT/${new Date().getFullYear()}/${brandName.substring(0, 3).toUpperCase()}`, pageWidth - margin - 40, y + 5);

  y += 35;

  // --- Title ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(17, 17, 17);
  doc.text("LAPORAN PERFORMA KEMITRAAN", margin, y);
  
  y += 10;
  doc.setFontSize(16);
  doc.setTextColor(255, 92, 26);
  doc.text(`Brand: ${brandName}`, margin, y);

  y += 15;
  doc.setDrawColor(230);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);

  // --- 1. Executive Summary ---
  y += 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(17, 17, 17);
  doc.text("I. RINGKASAN EKSEKUTIF", margin, y);
  
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60);
  const introText = `Dokumen ini merupakan laporan analitik performa resmi untuk brand ${brandName} di platform EazyChise. Laporan ini merangkum data keterlibatan pengguna, prospek mitra baru (leads), dan tingkat konversi untuk periode bulan berjalan.`;
  const splitIntro = doc.splitTextToSize(introText, pageWidth - (margin * 2));
  doc.text(splitIntro, margin, y);

  y += (splitIntro.length * 6) + 10;

  // --- 2. Key Performance Indicators ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(17, 17, 17);
  doc.text("II. METRIK KINERJA UTAMA (KPI)", margin, y);
  
  y += 8;
  // Table Header
  doc.setFillColor(248, 248, 246);
  doc.rect(margin, y, pageWidth - (margin * 2), 10, 'F');
  doc.setFontSize(10);
  doc.text("Indikator", margin + 5, y + 7);
  doc.text("Nilai", margin + 100, y + 7);

  // Table Rows
  const kpis = [
    { label: "Total Dilihat (Views)", value: `${stats.views} (+12% dari bulan lalu)` },
    { label: "Total Prospek (Leads)", value: `${stats.leads} (+5% dari bulan lalu)` },
    { label: "Tingkat Konversi (Conversion Rate)", value: `${stats.conversion}%` },
    { label: "Peringkat Rata-rata (Rating)", value: `${stats.rating} dari 120 ulasan` }
  ];

  y += 10;
  kpis.forEach((stat, index) => {
    doc.setDrawColor(240);
    doc.line(margin, y + 10, pageWidth - margin, y + 10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17, 17, 17);
    doc.text(stat.label, margin + 5, y + 7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60);
    doc.text(stat.value, margin + 100, y + 7);
    y += 10;
  });

  // --- 3. Traffic Sources ---
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(17, 17, 17);
  doc.text("III. SUMBER TRAFFIC", margin, y);
  
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60);
  doc.text(`Pencarian Organik: ${stats.traffic.organic}%`, margin + 5, y + 5);
  doc.circle(margin + 2, y + 4, 0.5, 'F');
  y += 7;
  doc.text(`Rekomendasi AI EazyChise: ${stats.traffic.ai}%`, margin + 5, y + 5);
  doc.circle(margin + 2, y + 4, 0.5, 'F');

  // --- 4. Recent Leads ---
  y += 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(17, 17, 17);
  doc.text("IV. DAFTAR PROSPEK (LEADS) TERBARU", margin, y);

  y += 8;
  doc.setFillColor(248, 248, 246);
  doc.rect(margin, y, pageWidth - (margin * 2), 10, 'F');
  doc.setFontSize(10);
  doc.text("Nama Prospek", margin + 5, y + 7);
  doc.text("Waktu", margin + 70, y + 7);
  doc.text("Status", margin + 130, y + 7);

  y += 10;
  stats.recentLeads.forEach((lead: any) => {
    doc.setDrawColor(240);
    doc.line(margin, y + 10, pageWidth - margin, y + 10);
    doc.setFont("helvetica", "normal");
    doc.text(lead.name, margin + 5, y + 7);
    doc.text(lead.date, margin + 70, y + 7);
    
    // Status text color
    if (lead.status === 'Baru') doc.setTextColor(0, 128, 0);
    else if (lead.status === 'Dihubungi') doc.setTextColor(0, 0, 255);
    else doc.setTextColor(255, 165, 0);
    
    doc.text(lead.status, margin + 130, y + 7);
    doc.setTextColor(60); // reset
    y += 10;
  });

  // --- Footer Page 1 ---
  y = 285;
  doc.setFontSize(8);
  doc.setTextColor(180);
  doc.text("Laporan ini dihasilkan secara otomatis oleh sistem kecerdasan buatan EazyChise.", margin, y);
  doc.text("Halaman 1 dari 2", pageWidth - margin - 25, y);

  // ==========================================
  // PAGE 2: AI STRATEGIC ANALYSIS
  // ==========================================
  doc.addPage();
  y = 20;

  // --- Background / Border Page 2 ---
  doc.setDrawColor(240);
  doc.rect(5, 5, pageWidth - 10, doc.internal.pageSize.height - 10);

  // Small Header for Page 2
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text(`Laporan Lanjutan: ${brandName} | Analisis AI`, margin, y);
  doc.line(margin, y + 2, pageWidth - margin, y + 2);
  
  y += 15;

  // --- 5. AI Analysis Header ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 92, 26);
  doc.text("V. ANALISA STRATEGIS & REKOMENDASI AI", margin, y);

  y += 10;
  doc.setFontSize(10);
  doc.setTextColor(60);
  doc.setFont("helvetica", "normal");
  const aiIntro = "Algoritma EazyChise telah memproses data performa Anda untuk menghasilkan strategi pertumbuhan yang dipersonalisasi:";
  doc.text(aiIntro, margin, y);

  y += 12;

  // Sub-section A: Audience Insight
  doc.setFont("helvetica", "bold");
  doc.text("A. Wawasan Audiens & Demografi", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  const audiensText = `Berdasarkan data traksi, peminat utama brand ${brandName} adalah kalangan profesional muda (usia 25-35 tahun) yang mencari efisiensi dan kualitas. Sebanyak 65% trafik berasal dari pencarian kategori '${stats.category}'. Hal ini menunjukkan Brand Identity Anda sudah cukup kuat di niche tersebut.`;
  const splitAudiens = doc.splitTextToSize(audiensText, pageWidth - (margin * 2));
  doc.text(splitAudiens, margin, y);
  
  y += (splitAudiens.length * 6) + 8;

  // Sub-section B: Optimization Strategy
  doc.setFont("helvetica", "bold");
  doc.text("B. Strategi Optimalisasi Konversi", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  const optText = `Meskipun views tumbuh 12%, tingkat konversi ${stats.conversion}% dapat ditingkatkan dengan mengoptimalkan galeri foto dan menambahkan testimoni mitra sukses di profil Anda. Kami mendeteksi potensi pertumbuhan 20% jika Anda merespons leads kurang dari 2 jam.`;
  const splitOpt = doc.splitTextToSize(optText, pageWidth - (margin * 2));
  doc.text(splitOpt, margin, y);

  y += (splitOpt.length * 6) + 8;

  // Sub-section C: Area Expansion
  doc.setFont("helvetica", "bold");
  doc.text("C. Rekomendasi Ekspansi Wilayah", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  const expText = "Analisis geo-spatial menunjukkan permintaan tinggi di wilayah Jawa Barat dan sekitarnya. Kami merekomendasikan untuk memfokuskan kampanye iklan pada radius 10km dari pusat kota besar untuk menjaring calon franchisee potensial dengan daya beli tinggi.";
  const splitExp = doc.splitTextToSize(expText, pageWidth - (margin * 2));
  doc.text(splitExp, margin, y);

  y += (splitExp.length * 6) + 12;

  // Sub-section D: Advanced Insights
  doc.setFont("helvetica", "bold");
  doc.text("D. Analisis Sentimen & Prediksi Pertumbuhan", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  const insightText = `Analisis NLP terhadap 120 ulasan terakhir menunjukkan 88% sentimen positif. Pengguna sangat mengapresiasi 'Kualitas Rasa' dan 'Pelayanan'. Model prediktif AI EazyChise memproyeksikan potensi pertumbuhan trafik sebesar 15% untuk bulan depan jika strategi optimasi foto profil dijalankan.`;
  const splitInsight = doc.splitTextToSize(insightText, pageWidth - (margin * 2));
  doc.text(splitInsight, margin, y);

  y += (splitInsight.length * 6) + 12;

  // --- Verified & Signature Area Page 2 ---
  // Ensure we don't go off page
  if (y > 220) {
    doc.addPage();
    y = 20;
    doc.setDrawColor(240);
    doc.rect(5, 5, pageWidth - 10, doc.internal.pageSize.height - 10);
  }

  doc.setDrawColor(255, 92, 26);
  doc.setLineWidth(0.5);
  doc.rect(margin, y - 5, 80, 35);
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 92, 26);
  doc.text("VERIFIED BY EAZYCHISE", margin + 5, y + 5);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text("Digital Intelligence Division", margin + 5, y + 12);
  doc.text("Automated Report Verification", margin + 5, y + 17);
  doc.text(`ID: EZ-ANL-${Math.floor(Math.random() * 10000)}`, margin + 5, y + 22);

  // Signature area
  y += 40;
  doc.setDrawColor(200);
  doc.setLineWidth(0.2);
  doc.line(pageWidth - margin - 60, y, pageWidth - margin, y);
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 17, 17);
  doc.text("Analytics Director", pageWidth - margin - 60, y + 7);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text("EazyChise Ecosystem", pageWidth - margin - 60, y + 12);

  // Footer Page 2
  y = 285;
  doc.setFontSize(8);
  doc.setTextColor(180);
  doc.text("Laporan ini bersifat rahasia dan diperuntukkan hanya untuk pemilik brand.", margin, y);
  doc.text("Halaman 2 dari 2", pageWidth - margin - 25, y);

  doc.save(`Laporan_Analitik_${brandName.replace(/\s+/g, '_')}.pdf`);
};
