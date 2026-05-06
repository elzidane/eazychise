"use client";
import { useEffect, useRef, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [section, setSection] = useState("");
  const lastY = useRef(0);
  const [dir, setDir] = useState<"up"|"down">("down");

  useEffect(() => {
    const sections = [
      { id: "hero",       label: "Beranda" },
      { id: "franchise",  label: "Franchise" },
      { id: "why-us",     label: "Kenapa EazyChise" },
      { id: "ai-advisor", label: "AI Advisor" },
      { id: "testimony",  label: "Testimoni" },
    ];

    const onScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 80);
      setDir(scrollTop > lastY.current ? "down" : "up");
      lastY.current = scrollTop;

      // Detect current section
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          setSection(s.label);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top thin progress line */}
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999,
        width: "100%", height: 2,
        background: "rgba(255,92,26,0.12)",
        pointerEvents: "none",
      }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg,#FF3D00,#FF5C1A,#FF8C42)",
          boxShadow: "0 0 12px rgba(255,92,26,0.8)",
          transition: "width .1s linear",
        }} />
        {/* Glowing tip */}
        <div style={{
          position: "absolute", top: "50%",
          left: `${progress}%`,
          transform: "translate(-50%,-50%)",
          width: 8, height: 8, borderRadius: "50%",
          background: "#FF8C42",
          boxShadow: "0 0 12px 3px rgba(255,92,26,0.8)",
          opacity: progress > 1 && progress < 99 ? 1 : 0,
          transition: "opacity .3s",
        }} />
      </div>

      {/* Section label pill — right side */}
      <div style={{
        position: "fixed", right: 20, top: "50%",
        transform: `translateY(-50%) translateX(${visible ? 0 : 30}px)`,
        opacity: visible ? 1 : 0,
        transition: "all .4s cubic-bezier(.23,1,.32,1)",
        zIndex: 9990, pointerEvents: "none",
        display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6,
      }}>
        {/* Vertical track */}
        <div style={{
          width: 2, height: 80, borderRadius: 99,
          background: "rgba(255,92,26,.15)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: "100%",
            height: `${progress}%`,
            background: "linear-gradient(180deg,#FF5C1A,#FF8C42)",
            borderRadius: 99,
            transition: "height .2s",
          }} />
        </div>

        {/* Percent badge */}
        <div style={{
          fontSize: "0.62rem", fontWeight: 700,
          padding: "3px 8px", borderRadius: 99,
          background: "rgba(255,92,26,.12)",
          border: "1px solid rgba(255,92,26,.25)",
          color: "#FF8C42",
          letterSpacing: "0.04em",
        }}>
          {Math.round(progress)}%
        </div>
      </div>
    </>
  );
}