"use client";

/**
 * React Bits-inspired components — implementasi manual tanpa npm
 * Terinspirasi dari: reactbits.dev
 * 
 * Komponen:
 * 1. BlurText        — teks muncul dari blur ke fokus per kata/huruf
 * 2. CountUp         — angka naik animasi saat scroll
 * 3. ShinyText       — teks dengan efek shimmer berkilap
 * 4. GradientText    — teks dengan gradient warna bergerak
 * 5. Particles       — partikel melayang di background
 * 6. TiltCard        — kartu tilt 3D saat di-hover
 * 7. ScrollRevealText — teks masuk satu per satu saat scroll
 * 8. BlobCursor      — blob mengikuti cursor (sebagai alternatif)
 */

import { useEffect, useRef, useState, ReactNode } from "react";

// ─── 1. BLUR TEXT ────────────────────────────────────────────────────────────
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "chars";
  className?: string;
  once?: boolean;
}

export function BlurText({ text, delay = 80, animateBy = "words", className = "", once = true }: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  const parts = animateBy === "words" ? text.split(" ") : text.split("");

  useEffect(() => {
    if (done) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); if (once) { setDone(true); obs.disconnect(); } }
      else if (!once) setVisible(false);
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [done, once]);

  return (
    <>
      <style>{`
        @keyframes blurIn {
          from { filter:blur(12px); opacity:0; transform:translateY(8px); }
          to   { filter:blur(0);   opacity:1; transform:translateY(0); }
        }
      `}</style>
      <span ref={ref} className={className} aria-label={text}>
        {parts.map((p, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              animation: visible ? `blurIn .6s cubic-bezier(.22,1,.36,1) ${i * delay}ms both` : "none",
              opacity: visible ? 1 : 0,
              filter: visible ? "none" : "blur(4px)",
              whiteSpace: animateBy === "words" ? "pre" : "normal",
            }}
          >
            {p}{animateBy === "words" && i < parts.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </>
  );
}

// ─── 2. COUNT UP ─────────────────────────────────────────────────────────────
interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export function CountUp({ end, duration = 2000, prefix = "", suffix = "", className = "", decimals = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(eased * end);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}

// ─── 3. SHINY TEXT ───────────────────────────────────────────────────────────
interface ShinyTextProps {
  text: string;
  speed?: number;
  className?: string;
  shimmerWidth?: number;
}

export function ShinyText({ text, speed = 3, className = "", shimmerWidth = 100 }: ShinyTextProps) {
  return (
    <>
      <style>{`
        @keyframes shinyMove {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
      <span
        className={className}
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.75) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.75) 100%)`,
          backgroundColor: "transparent",
          backgroundSize: `${shimmerWidth * 3}% 100%`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          animation: `shinyMove ${speed}s linear infinite`,
          display: "inline-block",
          fontWeight: "inherit",
        }}
      >
        {text}
      </span>
    </>
  );
}

// ─── 4. GRADIENT TEXT ────────────────────────────────────────────────────────
interface GradientTextProps {
  text: string;
  colors?: string[];
  speed?: number;
  className?: string;
}

export function GradientText({ text, colors = ["#FF5C1A", "#FF8C42", "#FFCF40", "#FF3D00", "#FF5C1A"], speed = 6, className = "" }: GradientTextProps) {
  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <span
        className={className}
        style={{
          backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
          backgroundColor: "transparent",
          backgroundSize: "300% 100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          animation: `gradientShift ${speed}s ease infinite`,
          display: "inline-block",
        }}
      >
        {text}
      </span>
    </>
  );
}

// ─── 5. PARTICLES BACKGROUND ─────────────────────────────────────────────────
interface ParticlesProps {
  count?: number;
  color?: string;
  speed?: number;
  size?: number;
  opacity?: number;
  className?: string;
}

export function Particles({ count = 40, color = "#FF5C1A", speed = 0.3, size = 2, opacity = 0.4, className = "" }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = canvas.offsetWidth, h = canvas.offsetHeight;
    canvas.width = w; canvas.height = h;

    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      r: size * (0.5 + Math.random()),
    }));

    const hex2rgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r},${g},${b}`;
    };
    const rgb = hex2rgb(color);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

        // Draw connections
        for (const q of pts) {
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${rgb},${(1 - dist / 100) * opacity * 0.4})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${opacity})`;
        ctx.fill();
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const resize = () => {
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w; canvas.height = h;
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [count, color, speed, size, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

// ─── 6. TILT CARD ────────────────────────────────────────────────────────────
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

export function TiltCard({ children, className = "", style, maxTilt = 12, scale = 1.03, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current!.style.transform = `perspective(600px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale(${scale})`;
    if (glareRef.current) {
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      glareRef.current.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.18) 0%, transparent 60%)`;
      glareRef.current.style.opacity = "1";
    }
  };

  const onLeave = () => {
    ref.current!.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transition: "transform .4s cubic-bezier(.23,1,.32,1)", transformStyle: "preserve-3d", position: "relative", overflow: "hidden" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      {glare && (
        <div ref={glareRef} style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none", transition: "opacity .3s", zIndex: 10 }} />
      )}
    </div>
  );
}

// ─── 7. SCROLL REVEAL TEXT ───────────────────────────────────────────────────
interface ScrollRevealTextProps {
  text: string;
  className?: string;
  stagger?: number;
  from?: "bottom" | "left" | "right";
}

export function ScrollRevealText({ text, className = "", stagger = 60, from = "bottom" }: ScrollRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const words = text.split(" ");

  const fromMap = {
    bottom: "translateY(20px)",
    left: "translateX(-20px)",
    right: "translateX(20px)",
  };

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes wordReveal {
          from { opacity:0; transform: var(--word-from); }
          to   { opacity:1; transform: translateX(0) translateY(0); }
        }
      `}</style>
      <div ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}>
        {words.map((w, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: visible ? 1 : 0,
              "--word-from": fromMap[from],
              animation: visible ? `wordReveal .5s cubic-bezier(.22,1,.36,1) ${i * stagger}ms both` : "none",
            } as React.CSSProperties}
          >
            {w}
          </span>
        ))}
      </div>
    </>
  );
}

// ─── 8. NOISE TEXTURE OVERLAY ────────────────────────────────────────────────
export function NoiseTexture({ opacity = 0.03, className = "" }: { opacity?: number; className?: string }) {
  return (
    <>
      <style>{`
        .noise-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: ${opacity};
          pointer-events: none;
          z-index: 999;
          mix-blend-mode: overlay;
        }
      `}</style>
      <div className={`noise-overlay ${className}`} />
    </>
  );
}