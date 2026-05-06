"use client";
import Link from "next/link";
import Typewriter from "./Typewriter";

export function OrbitRing({ size, duration, delay, opacity }: { size: number; duration: number; delay: number; opacity: number }) {
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

export function AnalysisCard({ content, onReset }: { content: string; onReset: () => void }) {
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
        className="text-[0.85rem] leading-[1.8] ai-scroll"
        style={{
          color: "rgba(255,255,255,.82)",
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 16, padding: "20px 22px",
          maxHeight: 280, overflowY: "auto",
        }}
      >
        <div className="whitespace-pre-wrap">{content}</div>
      </div>

      {/* CTA */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={onReset}
          style={{ flex: 1, padding: "11px", borderRadius: 12, cursor: "pointer", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.7)", fontSize: "0.82rem", fontWeight: 600, transition: "all .2s" }}
        >
          ↺ Ulangi Analisis
        </button>
        <Link
          href="/franchise"
          style={{ flex: 2, padding: "11px", borderRadius: 12, cursor: "pointer", background: "linear-gradient(135deg,#FF5C1A,#FF8C42)", border: "none", color: "white", fontSize: "0.82rem", fontWeight: 700, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: "0 6px 20px rgba(255,92,26,.35)", transition: "transform .2s" }}
        >
          Lihat Franchise Cocok →
        </Link>
      </div>
    </div>
  );
}
