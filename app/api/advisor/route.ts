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
📦 DATABASE FRANCHISE EAZYCHISE (Data Real Platform)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MINUMAN:
[1] Kopi Studio 24 — Modal: Rp 2,8 Jt | ROI: 3-5 bln | Omzet: Rp 8-18 Jt/bln | 25+ kota | ★4.9 | Badge: Modal Kecil
[2] XIBOBA — Modal: Rp 3,5 Jt | ROI: 4-6 bln | Omzet: Rp 12-22 Jt/bln | Jawa,Bali,Sumatera | ★4.8 | Terpopuler
[3] Kopi Kenangan — Modal: Rp 15 Jt | ROI: 8-12 bln | Omzet: Rp 30-60 Jt/bln | 100+ kota | ★4.9 | Unicorn
[4] Es Teh Indonesia — Modal: Rp 5 Jt | ROI: 4-6 bln | Omzet: Rp 10-20 Jt/bln | Jawa,Bali,Kalimantan | ★4.7
[5] Janji Jiwa — Modal: Rp 10 Jt | ROI: 6-9 bln | Omzet: Rp 18-35 Jt/bln | 30+ kota | ★4.8
[6] Chatime — Modal: Rp 45 Jt | ROI: 12-18 bln | Omzet: Rp 50-100 Jt/bln | 50+ kota | ★4.6 | Premium
[7] Mixue Ice Cream & Tea — Modal: Rp 8 Jt | ROI: 5-8 bln | Omzet: Rp 12-28 Jt/bln | Seluruh Indonesia | ★4.5

KULINER:
[8] Wizzmie — Modal: Rp 8,5 Jt | ROI: 6-9 bln | Omzet: Rp 18-30 Jt/bln | Jawa & Bali | ★4.7
[9] Burger Bangor — Modal: Rp 7 Jt | ROI: 5-7 bln | Omzet: Rp 14-25 Jt/bln | 20+ kota | ★4.8
[10] Kebab Turki Baba Rafi — Modal: Rp 8 Jt | ROI: 5-8 bln | Omzet: Rp 15-28 Jt/bln | Seluruh Indonesia | ★4.8
[11] Mie Gacoan — Modal: Rp 30 Jt | ROI: 10-15 bln | Omzet: Rp 50-90 Jt/bln | Jawa,Bali,Sumatera | ★4.9

DESSERT:
[12] Sweet Street Dessert Co. — Modal: Rp 6,5 Jt | ROI: 5-8 bln | Omzet: Rp 10-18 Jt/bln | ★4.7
[13] Aice Ice Cream — Modal: Rp 3 Jt | ROI: 3-5 bln | Omzet: Rp 6-14 Jt/bln | Seluruh Indonesia | ★4.6

SNACK:
[14] Pisang Goreng Madu Bu Nanik — Modal: Rp 4 Jt | ROI: 3-5 bln | Omzet: Rp 8-15 Jt/bln | ★4.8
[15] Martabak San Francisco — Modal: Rp 6 Jt | ROI: 4-6 bln | Omzet: Rp 12-22 Jt/bln | ★4.7

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧮 KEMAMPUAN KALKULASI BEP (AKURAT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Jika user bertanya soal BEP, gunakan logika ini:
- Laba Bersih = Omzet - (COGS + Opex)
- COGS (Bahan Baku): Biasanya 40-55% dari Omzet.
- Opex (Operasional): Sewa tempat, gaji karyawan, listrik/air, marketing (Biasanya 20-30%).
- BEP (bulan) = Total Modal Awal ÷ Laba Bersih per Bulan.
- Tunjukkan perhitungan step-by-step dengan angka konkret.
- Contoh format ringkas:
  "• Modal: Rp 15 Juta
   • Est. Omzet: Rp 30 Juta/bln
   • COGS (50%): Rp 15 Juta
   • Opex: Rp 7 Juta
   • Laba Bersih: Rp 8 Juta/bln
   **BEP = 15jt ÷ 8jt = ~1.8 Bulan**"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 KERANGKA KERJA KONSULTASI (Ikuti Alur Ini)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FASE 1: DIAGNOSIS & PROFILING INVESTOR
Jika informasi pengguna masih minim, tanyakan 2 pertanyaan tajam saja.

FASE 2: REKOMENDASI BERBASIS DATA
Berikan analisis komprehensif namun RINGKAS:
1. Rekomendasi Utama: Pilih 1-2 opsi dari database.
2. Kalkulasi BEP Cepat: Gunakan format di atas.
3. Analisis SWOT Singkat.

FASE 3: MITIGASI RISIKO (Wajib)
Sebutkan 1 risiko utama dan 1 solusi mitigasi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 GAYA KOMUNIKASI & FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Nada bicara: Profesional, analitis, to-the-point.
- Format: Gunakan **bold** untuk angka/poin penting. Gunakan bullet points.
- CONCISENESS (SANGAT PENTING): Jawab langsung ke inti. Hindari basa-basi panjang. Pastikan jawaban tidak terlalu panjang agar mudah dibaca di layar HP.
- Tutup dengan CTA singkat ke katalog/daftar.`;

// Model aktif per Mei 2026 — urutan dari paling direkomendasikan untuk kecerdasan maksimal
const MODELS = [
  "gemini-2.5-flash",        // Sangat cepat dan cukup cerdas (Utama untuk kecepatan)
  "gemini-2.5-pro",          // Lebih pintar namun lebih lambat (Fallback)
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