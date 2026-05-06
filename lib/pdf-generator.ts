import { jsPDF } from "jspdf";
import { Franchise } from "./franchise-data";

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
  const introText = `Melalui platform EazyChise, kami menyampaikan profil kemitraan resmi untuk brand ${franchise.name}. Dokumen ini disusun untuk memberikan informasi komprehensif mengenai potensi investasi dan sistem operasional bisnis yang akan dijalankan oleh calon mitra di wilayah ${franchise.city} dan sekitarnya.`;
  const splitIntro = doc.splitTextToSize(introText, pageWidth - (margin * 2));
  doc.text(splitIntro, margin, y);

  y += (splitIntro.length * 6) + 5;

  // --- 2. Analisis Investasi (Table Style) ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(17, 17, 17);
  doc.text("II. ANALISIS INVESTASI & PROYEKSI KEUNTUNGAN", margin, y);
  
  y += 8;
  // Table Header
  doc.setFillColor(248, 248, 246);
  doc.rect(margin, y, pageWidth - (margin * 2), 10, 'F');
  doc.setFontSize(10);
  doc.text("Keterangan", margin + 5, y + 7);
  doc.text("Nilai Estimasi", margin + 100, y + 7);

  // Table Rows
  const stats = [
    { label: "Modal Investasi Awal", value: franchise.invest },
    { label: "Estimasi Balik Modal (ROI)", value: franchise.roi },
    { label: "Proyeksi Omzet Bulanan", value: franchise.omzet },
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
