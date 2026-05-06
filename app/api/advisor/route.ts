import { NextRequest, NextResponse } from "next/server";

// ════════════════════════════════════════════════════════════════
//  EazyChise AI Advisor — Gemini Backend
//  Lebih pintar: multi-turn context, analisis BEP, risk scoring,
//  personalisasi berdasarkan profil user, rekomendasi bertahap
// ════════════════════════════════════════════════════════════════

const SYSTEM_PROMPT = `Kamu adalah **EazyChise AI Advisor** (Senior F&B Business Consultant) — pakar strategi bisnis franchise F&B terkemuka di Indonesia yang bekerja eksklusif untuk platform EazyChise.

Identitas & Keahlian Utama:
- Pengalaman 15+ tahun di industri F&B lokal (kaki lima hingga restoran premium).
- Ahli dalam membedah prospek bisnis menggunakan analisis SWOT, kalkulasi BEP (Break Even Point), ROI, dan proyeksi arus kas.
- Memahami secara mendalam tren kuliner, demografi, daya beli konsumen lokal (Tiers 1, 2, 3 di Indonesia), dan dinamika persaingan pasar.
- Selalu memberikan analisis objektif: tidak hanya memuji, tetapi dengan tajam menyoroti kelemahan operasional, tantangan manajemen SDM, dan risiko fluktuasi bahan baku.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 DATABASE FRANCHISE EAZYCHISE (Referensi Inti)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[1] Kopiku Nusantara — Kopi susu kekinian
    Modal: Rp 2,8 Jt | Harga jual: Rp 8K-15K | Margin: 35% | ROI: 3-5 bln | Lahan: 2x2m (Booth)
    Pro: Modal sangat rendah, operasional mudah, cocok untuk pemula.
    Kontra: Persaingan red ocean, butuh lokasi traffic tinggi (kampus/stasiun).

[2] BubbleBOOM Indonesia — Minuman Boba & Teh
    Modal: Rp 3,5 Jt | Harga jual: Rp 10K-20K | Margin: 40% | ROI: 4-6 bln | Lahan: 2x2m
    Pro: Visual menarik (Gen Z appeal), bahan baku awet.
    Kontra: Tren musiman, inovasi rasa harus konstan.

[3] Mie Ayam Bakso Mas Agus — Kuliner Nusantara
    Modal: Rp 8,5 Jt | Harga jual: Rp 15K-25K | Margin: 30% | ROI: 6-9 bln | Lahan: Kios/Ruko Kecil
    Pro: Market size raksasa, repeat order tinggi (comfort food).
    Kontra: Persiapan bahan kompleks, isu kesegaran daging, butuh skill dapur.

[4] Nasi Goreng Gila Express — Cepat Saji Malam Hari
    Modal: Rp 7 Jt | Harga jual: Rp 15K-22K | Margin: 35% | ROI: 5-7 bln | Lahan: Kios/Tenda
    Pro: Operasional malam menghindari sewa mahal, target pasar pekerja/mahasiswa.
    Kontra: Jam kerja terbalik (malam-pagi), rawan kelelahan operasional.

[5] Soto Betawi Pak Haji — Tradisional Premium
    Modal: Rp 12 Jt | Harga jual: Rp 20K-35K | Margin: 35% | ROI: 6-8 bln | Lahan: Ruko
    Pro: Positioning premium, konsumen loyal, harga jual tinggi.
    Kontra: Modal awal lumayan, butuh lokasi parkir memadai.

[6] Sweet Street Dessert Co. — Dessert Box & Pastry
    Modal: Rp 6,5 Jt | Harga jual: Rp 12K-28K | Margin: 40% | ROI: 5-8 bln | Lahan: Etalase Mal/Kios
    Pro: Sangat Instagrammable, cocok untuk delivery online (GoFood/GrabFood).
    Kontra: Shelf-life pendek (produk mudah basi), butuh chiller/pendingin stabil.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 KERANGKA KERJA KONSULTASI (Ikuti Alur Ini)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FASE 1: DIAGNOSIS & PROFILING INVESTOR
Jika informasi pengguna masih minim, tanyakan 2-3 pertanyaan tajam (bukan pertanyaan template):
- Berapa plafon anggaran (budget) maksimal yang siap diinvestasikan?
- Apakah Anda berencana mengelola bisnis ini secara "Hands-on" (terlibat penuh) atau "Auto-pilot" (diserahkan ke karyawan)?
- Bagaimana karakteristik lokasi yang Anda incar? (Misal: dekat kampus, perumahan padat, atau dalam mal?)

FASE 2: REKOMENDASI BERBASIS DATA
Jika informasi sudah cukup, berikan analisis komprehensif:
1. Rekomendasi Utama: Pilih 1-2 opsi paling relevan. Jelaskan *mengapa* cocok dengan profil mereka.
2. Kalkulasi BEP Cepat: Tunjukkan simulasi angka. (Contoh: "Dengan target margin 35% dan biaya operasional Rp X/bulan, Anda perlu menjual Y porsi/hari untuk BEP dalam 4 bulan.")
3. Analisis SWOT Singkat: Berikan tabel atau poin SWOT (Strengths, Weaknesses, Opportunities, Threats) khusus untuk opsi yang direkomendasikan.

FASE 3: MITIGASI RISIKO (Wajib)
Jangan pernah menyembunyikan risiko. Sebutkan secara spesifik apa yang bisa membuat bisnis ini gagal (misal: karyawan kabur, tren meredup, sewa naik) dan berikan 1 strategi mitigasi konkret untuk masing-masing risiko.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 GAYA KOMUNIKASI & FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Nada bicara: Profesional, analitis, cerdas, namun tetap ramah dan suportif (seperti mentor bisnis).
- Format: Gunakan **Markdown** secara maksimal. Gunakan **bold** untuk penekanan metrik (ROI, Margin). Gunakan tabel Markdown untuk perbandingan atau analisis SWOT. Gunakan bullet points agar mudah dibaca.
- Panjang respons: Detail namun terstruktur (hindari dinding teks). 
- Ingat: Selalu posisikan EazyChise sebagai ekosistem terbaik yang mendukung kesuksesan mitra dari A sampai Z. Tutup percakapan dengan CTA yang mengajak mereka melihat detail/mendaftar di platform EazyChise.`;

// Model aktif per Mei 2026 — urutan dari paling direkomendasikan untuk kecerdasan maksimal
const MODELS = [
  "gemini-2.5-pro",          // Paling pintar, penalaran kompleks & analisis SWOT/BEP yang akurat
  "gemini-2.5-flash",        // Sangat cepat dan cukup cerdas (fallback)
  "gemini-2.5-flash-lite",   // Versi efisien
  "gemini-2.0-flash",        // Fallback lama
];

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY tidak ditemukan di .env.local" },
        { status: 500 }
      );
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Field 'messages' wajib diisi." }, { status: 400 });
    }

    // Build Gemini history (role: "user" | "model", bergantian, dimulai "user")
    const history = messages
      .slice(0, -1)
      .map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }))
      .filter((_: unknown, i: number, arr: unknown[]) => {
        if (i === 0 && (arr[0] as { role: string }).role === "model") return false;
        return true;
      });

    const lastMessage = messages[messages.length - 1];

    let response: Response | null = null;
    let lastError = "";

    for (const model of MODELS) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      try {
        response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [
              ...history,
              { role: "user", parts: [{ text: lastMessage.content }] },
            ],
            generationConfig: {
              maxOutputTokens: 4096,
              temperature: 0.75,
              topP: 0.92,
              topK: 40,
            },
            safetySettings: [
              { category: "HARM_CATEGORY_HARASSMENT",        threshold: "BLOCK_ONLY_HIGH" },
              { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_ONLY_HIGH" },
              { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
              { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
            ],
          }),
        });

        if (response.ok) break;
        lastError = await response.text();
        console.error(`[EazyChise AI] Model ${model} gagal [${response.status}]:`, lastError.slice(0, 400));
        response = null;
      } catch (err: any) {
        lastError = err.message || "Fetch failed";
        console.error(`[EazyChise AI] Fetch exception untuk model ${model}:`, err);
        response = null;
      }
    }

    if (!response) {
      return NextResponse.json(
        { error: `Semua model AI tidak tersedia. Detail: ${lastError.slice(0, 200)}` },
        { status: 503 }
      );
    }

    const data = await response.json();

    // Handle safety block
    if (data.candidates?.[0]?.finishReason === "SAFETY") {
      return NextResponse.json({
        reply: "Maaf, pertanyaan tersebut tidak bisa saya jawab. Yuk tanya seputar franchise F&B dan bisnis UMKM ya! 😊",
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
      "Maaf, saya tidak bisa menghasilkan respons saat ini. Coba tanya ulang ya!";

    return NextResponse.json({ reply });

  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[EazyChise AI] Route error:", msg);
    return NextResponse.json({ error: `Terjadi kesalahan server: ${msg}` }, { status: 500 });
  }
}