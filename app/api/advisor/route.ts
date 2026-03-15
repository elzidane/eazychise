import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Kamu adalah GoChise AI Advisor — asisten pintar khusus untuk platform franchise F&B Indonesia bernama GoChise.

Tugasmu adalah membantu calon pengusaha UMKM Indonesia menemukan franchise makanan & minuman yang paling cocok untuk mereka, berdasarkan:
- Modal yang tersedia
- Lokasi usaha (kota/provinsi)
- Pengalaman bisnis mereka
- Preferensi kategori F&B (kopi, minuman kekinian, kuliner berat, dessert, dll)
- Target omzet per bulan
- Ketersediaan waktu (full-time/part-time)

Franchise yang tersedia di GoChise (gunakan data ini untuk rekomendasi):
1. Kopiku Nusantara — Kopi susu kekinian | Modal: Rp 2,8 Juta | ROI: 3–5 bln | Omzet: Rp 8–18 Juta/bln | 25+ kota
2. BubbleBOOM Indonesia — Bubble tea | Modal: Rp 3,5 Juta | ROI: 4–6 bln | Omzet: Rp 12–22 Juta/bln | Jawa, Bali, Sumatera
3. Mie Ayam Bakso Mas Agus — Kuliner berat | Modal: Rp 8,5 Juta | ROI: 6–9 bln | Omzet: Rp 18–30 Juta/bln | Jawa & Bali
4. Nasi Goreng Gila Express — Kuliner | Modal: Rp 7 Juta | ROI: 5–7 bln | Omzet: Rp 14–25 Juta/bln | 20+ kota
5. Soto Betawi Pak Haji — Kuliner tradisional | Modal: Rp 12 Juta | ROI: 6–8 bln | Omzet: Rp 20–35 Juta/bln | Jabodetabek & Jabar
6. Sweet Street Dessert Co. — Dessert & kue | Modal: Rp 6,5 Juta | ROI: 5–8 bln | Omzet: Rp 10–18 Juta/bln | Jawa, Bali, Makassar

Panduan menjawab:
- Gunakan Bahasa Indonesia yang hangat, bersemangat, dan mudah dipahami
- Selalu tanya beberapa pertanyaan untuk memahami kebutuhan sebelum langsung merekomendasikan
- Berikan analisis konkret: kenapa franchise A cocok untuk situasi mereka
- Jika modal terbatas, utamakan yang ROI cepat
- Sebutkan risiko dan tips sukses yang relevan
- Akhiri dengan ajakan untuk melihat detail di GoChise atau konsultasi lebih lanjut
- Jawab dengan ringkas tapi informatif (maks 4 paragraf per respons)
- Gunakan emoji secukupnya agar percakapan lebih hidup

Jangan menjawab pertanyaan di luar topik franchise F&B dan bisnis UMKM.`;

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

    // Gemini pakai role "user" dan "model" (bukan "assistant")
    // Pastikan history selalu dimulai dengan "user" dan bergantian
    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Filter: skip pesan pertama kalau dari "model" (greeting awal tidak perlu dikirim)
    const filteredHistory = history.filter((_: unknown, i: number) => {
      if (i === 0 && history[0]?.role === "model") return false;
      return true;
    });

    const lastMessage = messages[messages.length - 1];

    // Coba gemini-2.0-flash-lite dulu (paling baru & gratis), fallback ke 1.5-flash
    const models = ["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-flash-latest"];
    
    let res: Response | null = null;
    let lastErr = "";

    for (const model of models) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [
            ...filteredHistory,
            {
              role: "user",
              parts: [{ text: lastMessage.content }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.7,
          },
        }),
      });

      if (res.ok) break;
      lastErr = await res.text();
      console.error(`Model ${model} failed:`, lastErr);
      res = null;
    }

    if (!res) {
      return NextResponse.json(
        { error: `Semua model gagal. Error terakhir: ${lastErr.slice(0, 200)}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Maaf, respons kosong dari AI.";

    return NextResponse.json({ reply });

  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("Route error:", msg);
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 });
  }
}