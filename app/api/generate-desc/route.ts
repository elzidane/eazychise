import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { name, cat } = await req.json();

    if (!name || !cat) {
      return NextResponse.json(
        { error: "Nama dan Kategori brand diperlukan" },
        { status: 400 }
      );
    }

    const prompt = `Buatkan deskripsi menarik dan profesional (maksimal 3 kalimat) untuk sebuah franchise bernama "${name}" yang bergerak di kategori "${cat}". Deskripsi ini akan ditampilkan di katalog franchise untuk menarik calon mitra. Gunakan bahasa Indonesia yang persuasif namun tetap ringkas.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({ description: response.text });
  } catch (error: any) {
    console.error("AI Generate Error:", error);
    return NextResponse.json(
      { error: "Gagal membuat deskripsi dengan AI" },
      { status: 500 }
    );
  }
}
