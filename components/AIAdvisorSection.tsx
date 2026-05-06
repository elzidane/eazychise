"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Message = { role: "user" | "assistant"; content: string };

const STEPS = [
  { id: "modal", q: "Berapa modal yang kamu siapkan?", icon: "💰", options: ["< Rp 3 Juta", "Rp 3–7 Juta", "Rp 7–15 Juta", "> Rp 15 Juta"] },
  { id: "lokasi", q: "Di mana kamu akan buka usaha?", icon: "📍", options: ["Jabodetabek", "Jawa Tengah/DIY", "Jawa Timur", "Luar Jawa"] },
  { id: "pengalaman", q: "Pengalaman bisnismu sejauh ini?", icon: "🧩", options: ["Belum pernah", "Pernah, tapi gagal", "Punya bisnis sampingan", "Sudah berpengalaman"] },
  { id: "kategori", q: "Kategori F&B yang paling menarik?", icon: "🍽️", options: ["Kopi & Minuman", "Makanan Berat", "Dessert & Snack", "Semua cocok"] },
];

function OrbitRing({ size, duration, delay, opacity }: { size: number; duration: number; delay: number; opacity: number }) {
  return (
    <div
      style={{
        position: "absolute",
        width: size, height: size,
        borderRadius: "50%",
        border: `1px solid rgba(255,92,26,${opacity})`,
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        animation: `orbitSpin ${duration}s linear ${delay}s infinite`,
        pointerEvents: "none",
      }}
    />
  );
}

function AnalysisCard({ content, onReset }: { content: string; onReset: () => void }) {
  const lines = content.split("\n").filter(Boolean);
  return (
    <div style={{ animation: "fadeUp .5s ease both" }}>
      {/* Result header */}
      <div className="flex items-center gap-3 mb-5">
        <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg,#FF5C1A,#FF8C42)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(255,92,26,.4)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="white"/></svg>
        </div>
        <div>
          <p className="font-bold text-white text-[1rem]" style={{ fontFamily: "var(--font-syne,sans-serif)", letterSpacing: "-0.02em" }}>Hasil Analisis AI</p>
          <p className="text-[0.72rem]" style={{ color: "rgba(255,255,255,.4)" }}>Rekomendasi personal berdasarkan profilmu</p>
        </div>
        <div className="ml-auto">
          <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: "rgba(34,197,94,.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,.25)" }}>
            ✓ Selesai
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className="text-[0.85rem] leading-[1.8]"
        style={{
          color: "rgba(255,255,255,.82)",
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 16, padding: "20px 22px",
          maxHeight: 280, overflowY: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        {lines.map((line, i) => (
          <p key={i} style={{ marginBottom: line === "" ? 8 : 0, animation: `fadeUp .4s ease ${i * 0.04}s both` }}>
            {line}
          </p>
        ))}
      </div>

      {/* CTA */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={onReset}
          style={{ flex: 1, padding: "11px", borderRadius: 12, cursor: "pointer", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.7)", fontSize: "0.82rem", fontWeight: 600, transition: "all .2s" }}
          onMouseEnter={e => { const b = e.currentTarget; b.style.background="rgba(255,255,255,.1)"; b.style.color="white"; }}
          onMouseLeave={e => { const b = e.currentTarget; b.style.background="rgba(255,255,255,.06)"; b.style.color="rgba(255,255,255,.7)"; }}
        >
          ↺ Ulangi Analisis
        </button>
        <Link
          href="/franchise"
          style={{ flex: 2, padding: "11px", borderRadius: 12, cursor: "pointer", background: "linear-gradient(135deg,#FF5C1A,#FF8C42)", border: "none", color: "white", fontSize: "0.82rem", fontWeight: 700, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: "0 6px 20px rgba(255,92,26,.35)", transition: "transform .2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform="translateY(-1px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform="translateY(0)"; }}
        >
          Lihat Franchise Cocok →
        </Link>
      </div>
    </div>
  );
}

export default function AIAdvisorSection() {
  const [step, setStep] = useState(0); // 0=intro, 1-4=questions, 5=freeform, 6=result
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [freeInput, setFreeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Progress: 0..4 steps + freeform
  const totalSteps = STEPS.length + 1;
  const progress = step === 0 ? 0 : step === 6 ? 100 : Math.round(((step - 1) / totalSteps) * 100);

  function selectOption(stepId: string, value: string) {
    const newAnswers = { ...answers, [stepId]: value };
    setAnswers(newAnswers);
    if (currentQ < STEPS.length - 1) {
      setTimeout(() => setCurrentQ(q => q + 1), 280);
    } else {
      // All step questions answered, go to freeform
      setTimeout(() => setStep(5), 280);
    }
  }

  async function submitAnalysis() {
    setStep(6);
    setLoading(true);

    const prompt = `Tolong analisis kecocokan franchise F&B untuk seseorang dengan profil berikut:
- Modal: ${answers.modal}
- Lokasi: ${answers.lokasi}
- Pengalaman bisnis: ${answers.pengalaman}
- Preferensi kategori: ${answers.kategori}
- Informasi tambahan: ${freeInput || "Tidak ada"}

Berikan rekomendasi franchise yang paling cocok dari daftar EazyChise (Kopiku Nusantara, BubbleBOOM Indonesia, Mie Ayam Bakso Mas Agus, Nasi Goreng Gila Express, Soto Betawi Pak Haji, Sweet Street Dessert Co.), beserta alasan konkret, estimasi ROI, dan 2-3 tips sukses untuk profil ini. Tulis dalam Bahasa Indonesia yang hangat dan profesional.`;

    try {
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user" as const, content: prompt }] }),
      });
      const data = await res.json();
      setResult(data.reply ?? "Maaf, terjadi kesalahan. Coba lagi ya!");
    } catch {
      setResult("Maaf, terjadi kesalahan koneksi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep(0);
    setCurrentQ(0);
    setAnswers({});
    setFreeInput("");
    setResult("");
    setLoading(false);
  }

  return (
    <section
      id="ai-advisor"
      style={{
        background: "#0a0a0c",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes orbitSpin { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes progressFill { from{width:0} to{width:var(--target-w)} }
        @keyframes optionIn { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes pulse2 { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(255,92,26,.4)} 50%{opacity:.8;box-shadow:0 0 0 8px rgba(255,92,26,0)} }
        .option-btn:hover { transform:translateX(4px) !important; }
        .ai-scroll::-webkit-scrollbar{width:3px}
        .ai-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:99px}
      `}</style>

      {/* BG orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,92,26,.08) 0%,transparent 70%)", top: "50%", left: "60%", transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,92,26,.05) 0%,transparent 70%)", top: "20%", left: "10%" }} />
        {/* Grid lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03 }}>
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 64, animation: "fadeUp .6s ease both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 99, background: "rgba(255,92,26,.12)", border: "1px solid rgba(255,92,26,.25)", marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF5C1A", animation: "pulse2 2s ease-in-out infinite", display: "inline-block" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#FF8C42", letterSpacing: "0.1em", textTransform: "uppercase" }}>AI-Powered</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-syne,sans-serif)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 16px" }}>
            Temukan Franchise<br />
            <span style={{ background: "linear-gradient(90deg,#FF5C1A,#FF8C42,#FFCF40)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", backgroundSize: "200% auto", animation: "shimmer 4s linear infinite" }}>
              Paling Cocok
            </span>
            {" "}Untukmu
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.45)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Jawab 4 pertanyaan singkat, AI kami analisis ratusan data franchise dan rekomendasikan yang terbaik untuk situasimu.
          </p>
        </div>

        {/* Main card — 2 col layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: 2,
          borderRadius: 28,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow: "0 40px 100px rgba(0,0,0,.5)",
        }}>

          {/* LEFT — Visual side */}
          <div style={{
            background: "linear-gradient(160deg,#1a0d06 0%,#0f0f12 60%,#0a0a0c 100%)",
            padding: "52px 44px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
            {/* Orbit rings */}
            <div style={{ position: "absolute", top: "50%", right: -80, width: 400, height: 400, transform: "translateY(-50%)" }}>
              <OrbitRing size={400} duration={25} delay={0} opacity={0.06} />
              <OrbitRing size={300} duration={18} delay={-5} opacity={0.08} />
              <OrbitRing size={200} duration={12} delay={-2} opacity={0.12} />
              <OrbitRing size={100} duration={8} delay={0} opacity={0.2} />
              {/* Center orb */}
              <div style={{ position: "absolute", width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#FF5C1A,#FF8C42)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", boxShadow: "0 0 40px rgba(255,92,26,.6)", animation: "float 3s ease-in-out infinite" }}>
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="white"/>
                    <path d="M19 2L19.75 5.25L23 6L19.75 6.75L19 10L18.25 6.75L15 6L18.25 5.25L19 2Z" fill="white" opacity=".6"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF5C1A", marginBottom: 16 }}>EazyChise AI Advisor</p>
              <h3 style={{ fontFamily: "var(--font-syne,sans-serif)", fontSize: "1.6rem", fontWeight: 800, color: "white", lineHeight: 1.2, letterSpacing: "-0.03em", marginBottom: 20 }}>
                Analisis Cerdas<br />dalam 2 Menit
              </h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,.45)", lineHeight: 1.8, marginBottom: 36 }}>
                Sistem AI kami memproses ratusan data franchise F&B Indonesia untuk memberikan rekomendasi yang benar-benar personal.
              </p>

              {/* Stats */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { n: "320+", label: "Mitra Franchise Aktif" },
                  { n: "94%", label: "Tingkat Kepuasan Mitra" },
                  { n: "< 2 Mnt", label: "Waktu Analisis AI" },
                ].map(s => (
                  <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontFamily: "var(--font-syne,sans-serif)", fontSize: "1.1rem", fontWeight: 800, color: "#FF8C42", minWidth: 64 }}>{s.n}</span>
                    <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,.4)" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress bar bottom */}
            {step > 0 && step < 6 && (
              <div style={{ position: "relative", zIndex: 1, marginTop: 40 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,.3)", fontWeight: 600 }}>Progress</span>
                  <span style={{ fontSize: "0.7rem", color: "#FF8C42", fontWeight: 700 }}>{progress}%</span>
                </div>
                <div style={{ height: 4, borderRadius: 99, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#FF5C1A,#FF8C42)", width: `${progress}%`, transition: "width .6s cubic-bezier(.4,0,.2,1)" }} />
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                  {STEPS.map((s, i) => (
                    <div key={s.id} style={{ fontSize: "0.65rem", padding: "3px 8px", borderRadius: 99, background: i <= currentQ && step > 0 ? "rgba(255,92,26,.2)" : "rgba(255,255,255,.05)", color: i <= currentQ && step > 0 ? "#FF8C42" : "rgba(255,255,255,.25)", border: i <= currentQ && step > 0 ? "1px solid rgba(255,92,26,.3)" : "1px solid rgba(255,255,255,.07)", transition: "all .3s" }}>
                      {s.icon} {s.id}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Interaction side */}
          <div style={{
            background: "rgba(18,18,22,0.98)",
            padding: "52px 44px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: 520,
          }}>

            {/* INTRO STATE */}
            {step === 0 && (
              <div style={{ animation: "fadeUp .5s ease both" }}>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: 16 }}>
                  Mulai Analisis Gratis
                </p>
                <h3 style={{ fontFamily: "var(--font-syne,sans-serif)", fontSize: "1.5rem", fontWeight: 800, color: "white", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 12 }}>
                  Franchise apa yang<br />paling tepat untukmu?
                </h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,.4)", lineHeight: 1.75, marginBottom: 36 }}>
                  Jawab 4 pertanyaan singkat dan AI kami akan menganalisis pilihan franchise terbaik sesuai modal, lokasi, dan pengalamanmu.
                </p>

                {/* Feature pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
                  {["✓ Gratis selamanya", "✓ Hasil instan", "✓ Personal & akurat"].map(f => (
                    <span key={f} style={{ fontSize: "0.73rem", padding: "5px 12px", borderRadius: 99, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.55)" }}>{f}</span>
                  ))}
                </div>

                <button
                  onClick={() => setStep(1)}
                  style={{ width: "100%", padding: "15px", borderRadius: 14, cursor: "pointer", background: "linear-gradient(135deg,#FF5C1A,#FF8C42)", border: "none", color: "white", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "-0.01em", boxShadow: "0 8px 28px rgba(255,92,26,.4)", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  onMouseEnter={e => { const b = e.currentTarget; b.style.transform="translateY(-2px)"; b.style.boxShadow="0 12px 36px rgba(255,92,26,.5)"; }}
                  onMouseLeave={e => { const b = e.currentTarget; b.style.transform="translateY(0)"; b.style.boxShadow="0 8px 28px rgba(255,92,26,.4)"; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="white"/></svg>
                  Mulai Analisis AI
                </button>
              </div>
            )}

            {/* QUESTION STEPS */}
            {step >= 1 && step <= 4 && (
              <div style={{ animation: "fadeUp .4s ease both" }}>
                {/* Step indicator */}
                <div style={{ display: "flex", gap: 5, marginBottom: 32 }}>
                  {STEPS.map((_, i) => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= currentQ ? "linear-gradient(90deg,#FF5C1A,#FF8C42)" : "rgba(255,255,255,.08)", transition: "all .4s" }} />
                  ))}
                </div>

                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FF5C1A", marginBottom: 10 }}>
                  Pertanyaan {currentQ + 1} / {STEPS.length}
                </p>
                <h3 style={{ fontFamily: "var(--font-syne,sans-serif)", fontSize: "1.3rem", fontWeight: 800, color: "white", lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 28 }}>
                  {STEPS[currentQ].icon} {STEPS[currentQ].q}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {STEPS[currentQ].options.map((opt, i) => (
                    <button
                      key={opt}
                      className="option-btn"
                      onClick={() => selectOption(STEPS[currentQ].id, opt)}
                      style={{
                        textAlign: "left", padding: "13px 18px", borderRadius: 12, cursor: "pointer",
                        background: answers[STEPS[currentQ].id] === opt ? "rgba(255,92,26,.15)" : "rgba(255,255,255,.04)",
                        border: answers[STEPS[currentQ].id] === opt ? "1px solid rgba(255,92,26,.4)" : "1px solid rgba(255,255,255,.07)",
                        color: answers[STEPS[currentQ].id] === opt ? "#FF8C42" : "rgba(255,255,255,.75)",
                        fontSize: "0.85rem", fontWeight: 500,
                        animation: `optionIn .35s ease ${i * 0.07}s both`,
                        transition: "transform .2s, background .2s, border .2s, color .2s",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                      }}
                      onMouseEnter={e => { const b = e.currentTarget; if (answers[STEPS[currentQ].id] !== opt) { b.style.background="rgba(255,255,255,.07)"; b.style.color="white"; } }}
                      onMouseLeave={e => { const b = e.currentTarget; if (answers[STEPS[currentQ].id] !== opt) { b.style.background="rgba(255,255,255,.04)"; b.style.color="rgba(255,255,255,.75)"; } }}
                    >
                      {opt}
                      {answers[STEPS[currentQ].id] === opt && (
                        <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#FF5C1A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FREEFORM STEP */}
            {step === 5 && (
              <div style={{ animation: "fadeUp .4s ease both" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FF5C1A", marginBottom: 10 }}>Langkah Terakhir</p>
                <h3 style={{ fontFamily: "var(--font-syne,sans-serif)", fontSize: "1.3rem", fontWeight: 800, color: "white", lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 8 }}>
                  💬 Ada hal lain yang ingin diceritakan?
                </h3>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,.4)", marginBottom: 24, lineHeight: 1.7 }}>
                  Opsional — ceritakan situasi spesifikmu agar analisis lebih akurat.
                </p>

                {/* Summary chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {Object.values(answers).map(v => (
                    <span key={v} style={{ fontSize: "0.72rem", padding: "4px 10px", borderRadius: 99, background: "rgba(255,92,26,.12)", border: "1px solid rgba(255,92,26,.25)", color: "#FF8C42" }}>{v}</span>
                  ))}
                </div>

                <textarea
                  ref={textareaRef}
                  value={freeInput}
                  onChange={e => setFreeInput(e.target.value)}
                  placeholder="Contoh: saya ingin buka di dekat kampus, punya 1 karyawan, dan ingin bisa dikelola part-time..."
                  rows={4}
                  style={{ width: "100%", borderRadius: 14, padding: "14px 16px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.85)", fontSize: "0.84rem", lineHeight: 1.6, outline: "none", resize: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "border .2s" }}
                  onFocus={e => { e.target.style.border="1px solid rgba(255,92,26,.4)"; e.target.style.boxShadow="0 0 0 3px rgba(255,92,26,.08)"; }}
                  onBlur={e => { e.target.style.border="1px solid rgba(255,255,255,.1)"; e.target.style.boxShadow="none"; }}
                />

                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                  <button
                    onClick={submitAnalysis}
                    style={{ flex: 1, padding: "13px", borderRadius: 12, cursor: "pointer", background: "linear-gradient(135deg,#FF5C1A,#FF8C42)", border: "none", color: "white", fontSize: "0.87rem", fontWeight: 700, boxShadow: "0 6px 20px rgba(255,92,26,.35)", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                    onMouseEnter={e => { const b = e.currentTarget; b.style.transform="translateY(-1px)"; b.style.boxShadow="0 10px 28px rgba(255,92,26,.45)"; }}
                    onMouseLeave={e => { const b = e.currentTarget; b.style.transform="translateY(0)"; b.style.boxShadow="0 6px 20px rgba(255,92,26,.35)"; }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="white"/></svg>
                    Analisis Sekarang
                  </button>
                  <button
                    onClick={submitAnalysis}
                    style={{ padding: "13px 16px", borderRadius: 12, cursor: "pointer", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.5)", fontSize: "0.82rem", transition: "all .2s" }}
                    onMouseEnter={e => { const b = e.currentTarget; b.style.color="rgba(255,255,255,.8)"; b.style.background="rgba(255,255,255,.08)"; }}
                    onMouseLeave={e => { const b = e.currentTarget; b.style.color="rgba(255,255,255,.5)"; b.style.background="rgba(255,255,255,.05)"; }}
                  >
                    Lewati →
                  </button>
                </div>
              </div>
            )}

            {/* RESULT STATE */}
            {step === 6 && (
              <div style={{ animation: "fadeUp .5s ease both" }}>
                {loading ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "40px 0" }}>
                    <div style={{ position: "relative", width: 72, height: 72 }}>
                      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(255,92,26,.2)", animation: "orbitSpin 2s linear infinite" }} />
                      <div style={{ position: "absolute", inset: 6, borderRadius: "50%", border: "2px solid rgba(255,92,26,.4)", animation: "orbitSpin 1.4s linear infinite reverse" }} />
                      <div style={{ position: "absolute", inset: 14, borderRadius: "50%", background: "linear-gradient(135deg,#FF5C1A,#FF8C42)", display: "flex", alignItems: "center", justifyContent: "center", animation: "float 1.5s ease-in-out infinite", boxShadow: "0 4px 16px rgba(255,92,26,.5)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="white"/></svg>
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ color: "white", fontWeight: 600, fontSize: "0.92rem", marginBottom: 6 }}>AI sedang menganalisis profilmu...</p>
                      <p style={{ color: "rgba(255,255,255,.35)", fontSize: "0.78rem" }}>Memproses data franchise yang cocok</p>
                    </div>
                    {/* Loading dots */}
                    <div style={{ display: "flex", gap: 6 }}>
                      {[0,1,2,3,4].map(i => (
                        <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i < 3 ? "#FF5C1A" : "rgba(255,255,255,.1)", transition: "all .3s", animation: `pulse2 1.5s ease ${i*.2}s infinite` }} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <AnalysisCard content={result} onReset={reset} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}