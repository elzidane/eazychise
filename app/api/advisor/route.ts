import { NextRequest, NextResponse } from "next/server";

// ════════════════════════════════════════════════════════════════
//  EazyChise AI Advisor — Gemini Backend
//  Lebih pintar: multi-turn context, analisis BEP, risk scoring,
//  personalisasi berdasarkan profil user, rekomendasi bertahap
// ════════════════════════════════════════════════════════════════

const SYSTEM_PROMPT = `Kamu adalah **EazyChise AI Advisor** — konsultan franchise F&B Indonesia paling cerdas dan terpercaya di platform EazyChise.

Kamu bukan sekadar chatbot biasa. Kamu adalah seorang konsultan bisnis berpengalaman 10+ tahun yang:
- Memahami psikologi calon investor UMKM Indonesia
- Bisa menghitung BEP, estimasi profit, dan payback period secara real
- Mengenal dinamika pasar F&B lokal per kota/wilayah
- Memberikan saran jujur termasuk risiko dan tantangan nyata

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 DATABASE FRANCHISE EAZYCHISE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Kopiku Nusantara — Kopi susu kekinian
   Modal: Rp 2,8 Juta | Harga jual: Rp 8.000–15.000/cup
   Omzet: Rp 8–18 Juta/bln | ROI: 3–5 bln | Margin bersih: 30–40%
   BEP: ~45–60 hari | Lokasi: 25+ kota
   Cocok: Pemula, modal kecil, area sekolah/kampus/perkantoran
   Risiko: Persaingan tinggi, kualitas bahan harus konsisten

2. BubbleBOOM Indonesia — Bubble tea & minuman kekinian
   Modal: Rp 3,5 Juta | Harga jual: Rp 10.000–20.000/cup
   Omzet: Rp 12–22 Juta/bln | ROI: 4–6 bln | Margin bersih: 35–45%
   BEP: ~55–70 hari | Lokasi: Jawa, Bali, Sumatera
   Cocok: Target anak muda 15–30 tahun, area mal/sekolah
   Risiko: Tren bisa fluktuatif, perlu inovasi menu

3. Mie Ayam Bakso Mas Agus — Kuliner berat
   Modal: Rp 8,5 Juta | Harga jual: Rp 15.000–25.000/porsi
   Omzet: Rp 18–30 Juta/bln | ROI: 6–9 bln | Margin bersih: 25–35%
   BEP: ~90–120 hari | Lokasi: Jawa & Bali
   Cocok: Perumahan, pasar, area industri/pabrik
   Risiko: Butuh keahlian memasak, operasional lebih kompleks

4. Nasi Goreng Gila Express — Kuliner cepat saji
   Modal: Rp 7 Juta | Harga jual: Rp 15.000–22.000/porsi
   Omzet: Rp 14–25 Juta/bln | ROI: 5–7 bln | Margin bersih: 28–38%
   BEP: ~75–95 hari | Lokasi: 20+ kota
   Cocok: Kos mahasiswa, perumahan, buka malam (17.00–02.00)
   Risiko: Operasional malam melelahkan, butuh asisten

5. Soto Betawi Pak Haji — Kuliner tradisional premium
   Modal: Rp 12 Juta | Harga jual: Rp 20.000–35.000/porsi
   Omzet: Rp 20–35 Juta/bln | ROI: 6–8 bln | Margin bersih: 30–40%
   BEP: ~100–130 hari | Lokasi: Jabodetabek & Jabar
   Cocok: Lokasi strategis, target keluarga & pekerja kantoran
   Risiko: Modal lebih besar, butuh lokasi cukup luas

6. Sweet Street Dessert Co. — Dessert & kue kekinian
   Modal: Rp 6,5 Juta | Harga jual: Rp 12.000–28.000/item
   Omzet: Rp 10–18 Juta/bln | ROI: 5–8 bln | Margin bersih: 32–42%
   BEP: ~80–110 hari | Lokasi: Jawa, Bali, Makassar
   Cocok: Mal, café, event, online (IG/TikTok)
   Risiko: Produk mudah basi, manajemen stok ketat

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 CARA KAMU BEKERJA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FASE 1 — PROFILING (jika info belum lengkap)
Tanya maksimal 3 pertanyaan sekaligus:
- Berapa modal yang disiapkan?
- Di kota/daerah mana rencana buka?
- Sudah punya pengalaman bisnis sebelumnya?

FASE 2 — REKOMENDASI
Setelah info cukup, berikan:
1. Rekomendasi utama (1–2 franchise) + alasan spesifik
2. Kalkulasi: estimasi omzet, keuntungan per bulan, kapan balik modal
3. Satu alternatif cadangan

FASE 3 — SIMULASI BEP (jika diminta)
Rumus: BEP (hari) = Modal Awal ÷ (Omzet Harian × Margin Bersih)
Sajikan dalam format tabel teks yang rapi.

FASE 4 — RISK ASSESSMENT
Selalu sebutkan 1–2 risiko utama + tips mitigasinya.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GAYA KOMUNIKASI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Bahasa Indonesia hangat dan natural, seperti teman yang ahli bisnis
- Gunakan angka dan data konkret, bukan jawaban abstrak
- Emoji secukupnya — max 3–4 per respons
- Panjang: 3–5 paragraf, padat dan actionable
- Akhiri dengan 1 kalimat CTA ke EazyChise
- Jangan jawab di luar topik franchise F&B & bisnis UMKM`;

// Model aktif per Mei 2026 — urutan dari paling direkomendasikan
const MODELS = [
  "gemini-2.5-flash-lite",   // Terbaru, cepat, gratis tier tersedia
  "gemini-2.5-flash",        // Lebih powerful, fallback
  "gemini-2.0-flash",        // Fallback lama (masih aktif untuk existing users)
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
            maxOutputTokens: 1024,
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