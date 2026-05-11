"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface GridPoint {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: "orange" | "gold";
  reset: () => void;
  update: (mouseX: number, mouseY: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

// ─── Status messages ──────────────────────────────────────────────────────────
const STATUS_MESSAGES = [
  "Initializing systems...",
  "Loading franchise data...",
  "Connecting F&B network...",
  "Building ecosystem...",
  "Almost ready...",
];

// ─── Particle factory ─────────────────────────────────────────────────────────
function createParticle(W: number, H: number): Particle {
  const p: Particle = {
    x: 0, y: 0, vx: 0, vy: 0, life: 0, size: 0, hue: "orange",
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = -Math.random() * 0.8 - 0.2;
      this.life = Math.random();
      this.size = Math.random() * 2 + 0.5;
      this.hue = Math.random() > 0.5 ? "orange" : "gold";
    },
    update(mouseX, mouseY) {
      this.life -= 0.004;
      if (this.life <= 0) this.reset();
      this.x += this.vx;
      this.y += this.vy;
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 120) {
        this.vx += (dx / d) * 0.02;
        this.vy += (dy / d) * 0.02;
      }
    },
    draw(ctx) {
      const a = Math.sin(this.life * Math.PI) * 0.6;
      const color = this.hue === "orange" ? "#FF5C1A" : "#FFCF40";
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = color;
      ctx.shadowBlur = 4;
      ctx.shadowColor = color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
  };
  p.reset();
  return p;
}

// ─── Canvas renderer ──────────────────────────────────────────────────────────
function drawFrame(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  grid: GridPoint[],
  particles: Particle[],
  mouseX: number,
  mouseY: number
) {
  ctx.clearRect(0, 0, W, H);

  // Ambient glow
  const g1 = ctx.createRadialGradient(W * 0.25, H * 0.5, 0, W * 0.25, H * 0.5, W * 0.4);
  g1.addColorStop(0, "rgba(255,92,26,0.06)");
  g1.addColorStop(1, "rgba(255,92,26,0)");
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  const g2 = ctx.createRadialGradient(W * 0.75, H * 0.5, 0, W * 0.75, H * 0.5, W * 0.35);
  g2.addColorStop(0, "rgba(255,207,64,0.04)");
  g2.addColorStop(1, "rgba(255,207,64,0)");
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  // Grid physics + draw
  for (const p of grid) {
    const dx = mouseX - p.x;
    const dy = mouseY - p.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < 180) {
      const f = (180 - d) / 180;
      p.vx += (p.ox - p.x) * 0.04 - (dx / d) * f * 0.8;
      p.vy += (p.oy - p.y) * 0.04 - (dy / d) * f * 0.8;
    } else {
      p.vx += (p.ox - p.x) * 0.06;
      p.vy += (p.oy - p.y) * 0.06;
    }
    p.vx *= 0.85;
    p.vy *= 0.85;
    p.x += p.vx;
    p.y += p.vy;
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = i + 1; j < grid.length; j++) {
      const a = grid[i], b = grid[j];
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 52) {
        const alpha = (1 - d / 52) * 0.12;
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
    const p = grid[i];
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 0.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Particles
  for (const p of particles) {
    p.update(mouseX, mouseY);
    p.draw(ctx);
  }

  // Vignette
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(0,0,0,0.85)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);
}

// ─── Hex Ring SVG ─────────────────────────────────────────────────────────────
function HexRing() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="ec-g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF5C1A" />
          <stop offset="100%" stopColor="#FFCF40" />
        </linearGradient>
        <linearGradient id="ec-g2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF5C1A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FFCF40" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      {/* Outer hex outline */}
      <polygon points="50,5 91,27.5 91,72.5 50,95 9,72.5 9,27.5"
        stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
      {/* Inner hex filled */}
      <polygon points="50,14 82,32 82,68 50,86 18,68 18,32"
        fill="url(#ec-g2)" stroke="url(#ec-g1)" strokeWidth="1.2" />
      {/* Mid ring */}
      <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      {/* House icon hex frame */}
      <path d="M30 44 L50 34 L70 44 L70 58 L50 66 L30 58 Z"
        fill="none" stroke="url(#ec-g1)" strokeWidth="1.5" strokeLinejoin="round" />
      {/* House icon */}
      <path d="M40 54 L50 48 L50 60" stroke="#FF5C1A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M50 48 L60 54 L60 60" stroke="#FFCF40" strokeWidth="2" strokeLinecap="round" fill="none" />
      <line x1="50" y1="60" x2="60" y2="60" stroke="#FFCF40" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="60" x2="50" y2="60" stroke="#FF5C1A" strokeWidth="2" strokeLinecap="round" />
      {/* Outer rotating dashed ring */}
      <circle cx="50" cy="50" r="47" fill="none" stroke="url(#ec-g1)"
        strokeWidth="0.8" strokeDasharray="12 8" opacity="0.4">
        <animateTransform attributeName="transform" type="rotate"
          from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" />
      </circle>
      {/* Inner counter-rotating ring */}
      <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(255,255,255,0.08)"
        strokeWidth="0.5" strokeDasharray="4 12">
        <animateTransform attributeName="transform" type="rotate"
          from="360 50 50" to="0 50 50" dur="14s" repeatCount="indefinite" />
      </circle>
      {/* Orbital dot 1 */}
      <circle cx="50" cy="3" r="2.5" fill="#FF5C1A" opacity="0.9">
        <animateTransform attributeName="transform" type="rotate"
          from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" />
      </circle>
      {/* Orbital dot 2 */}
      <circle cx="50" cy="9" r="1.5" fill="#FFCF40" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate"
          from="180 50 50" to="540 50 50" dur="14s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ─── Corner Bracket ───────────────────────────────────────────────────────────
function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: 24, left: 24, borderTop: "1px solid rgba(255,92,26,0.3)", borderLeft: "1px solid rgba(255,92,26,0.3)" },
    tr: { top: 24, right: 24, borderTop: "1px solid rgba(255,92,26,0.3)", borderRight: "1px solid rgba(255,92,26,0.3)" },
    bl: { bottom: 24, left: 24, borderBottom: "1px solid rgba(255,92,26,0.3)", borderLeft: "1px solid rgba(255,92,26,0.3)" },
    br: { bottom: 24, right: 24, borderBottom: "1px solid rgba(255,92,26,0.3)", borderRight: "1px solid rgba(255,92,26,0.3)" },
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      style={{
        position: "absolute",
        width: 18, height: 18,
        ...styles[position],
      }}
    />
  );
}

// ─── Main SplashScreen ────────────────────────────────────────────────────────
export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const gridRef = useRef<GridPoint[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  // ── Canvas setup ────────────────────────────────────────────────────────────
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;

    // Build grid
    const grid: GridPoint[] = [];
    const spacing = 48;
    for (let x = 0; x < W; x += spacing) {
      for (let y = 0; y < H; y += spacing) {
        grid.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
      }
    }
    gridRef.current = grid;

    // Build particles
    particlesRef.current = Array.from({ length: 80 }, () => createParticle(W, H));
  }, []);

  // ── Render loop ─────────────────────────────────────────────────────────────
  const startLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = () => {
      drawFrame(
        ctx,
        canvas.width, canvas.height,
        gridRef.current,
        particlesRef.current,
        mouseRef.current.x,
        mouseRef.current.y
      );
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  // ── Lifecycle ────────────────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";

    initCanvas();
    startLoop();

    const handleResize = () => initCanvas();
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);

    // Progress ticker
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(100, prev + 1.4);
        setStatusIndex(Math.min(
          STATUS_MESSAGES.length - 1,
          Math.floor((next / 100) * STATUS_MESSAGES.length)
        ));
        if (next >= 100) clearInterval(progressInterval);
        return next;
      });
    }, 25);

    // Glitch exit sequence
    const glitchTimer = setTimeout(() => setShowGlitch(true), 2500);
    const hideGlitchTimer = setTimeout(() => setShowGlitch(false), 2700);
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => { document.body.style.overflow = "auto"; }, 1200);
    }, 2750);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(glitchTimer);
      clearTimeout(hideGlitchTimer);
      clearTimeout(exitTimer);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      document.body.style.overflow = "auto";
    };
  }, [initCanvas, startLoop]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          suppressHydrationWarning
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0a0a0a",
            overflow: "hidden",
          }}
        >
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", inset: 0 }}
          />

          {/* Scan lines */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
            zIndex: 1,
          }} />

          {/* Corner brackets */}
          {(["tl", "tr", "bl", "br"] as const).map(pos => (
            <CornerBracket key={pos} position={pos} />
          ))}

          {/* Glitch overlay */}
          <AnimatePresence>
            {showGlitch && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.08 }}
                style={{
                  position: "absolute", inset: 0, zIndex: 20,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <div style={{ position: "relative" }}>
                  {/* Glitch red layer */}
                  <div style={{
                    position: "absolute", left: -3, top: 0,
                    fontFamily: "Georgia, serif",
                    fontSize: "3.2rem", fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: "#FF5C1A",
                    clipPath: "inset(20% 0 60% 0)",
                  }}>
                    EazyChise
                  </div>
                  {/* Glitch gold layer */}
                  <div style={{
                    position: "absolute", left: 3, top: 0,
                    fontFamily: "Georgia, serif",
                    fontSize: "3.2rem", fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: "#FFCF40",
                    clipPath: "inset(55% 0 20% 0)",
                  }}>
                    EazyChise
                  </div>
                  {/* Main */}
                  <div style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "3.2rem", fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: "#fff",
                  }}>
                    Eazy<span style={{ color: "#FF5C1A" }}>Chise</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Center UI */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            zIndex: 2, pointerEvents: "none",
          }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              {/* Hex ring icon */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: 100, height: 100, marginBottom: 28 }}
              >
                <HexRing />
              </motion.div>

              {/* Brand name */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: 900,
                  fontSize: "3.2rem",
                  letterSpacing: "-0.04em",
                  color: "#fff",
                  lineHeight: 1,
                  textShadow: "0 0 60px rgba(255,92,26,0.4)",
                }}
              >
                Eazy<span style={{ color: "#FF5C1A" }}>Chise</span>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.62rem",
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                  marginTop: 10,
                  marginBottom: 52,
                }}
              >
                Platform Franchise F&amp;B Indonesia
              </motion.p>

              {/* Progress */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.4 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                style={{ width: 260 }}
              >
                {/* Bar track */}
                <div style={{
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 99,
                  overflow: "visible",
                  position: "relative",
                }}>
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.05, ease: "linear" }}
                    style={{
                      position: "absolute",
                      left: 0, top: 0, bottom: 0,
                      background: "linear-gradient(90deg, #FF5C1A, #FFCF40)",
                      borderRadius: 99,
                      minWidth: progress > 0 ? 4 : 0,
                    }}
                  >
                    {/* Glowing tip dot */}
                    <div style={{
                      position: "absolute",
                      right: -1, top: -3,
                      width: 3, height: 7,
                      background: "#fff",
                      boxShadow: "0 0 8px #FF5C1A, 0 0 4px #FFCF40",
                      borderRadius: 2,
                    }} />
                  </motion.div>
                </div>

                {/* Meta row */}
                <div style={{
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.15)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}>
                    {STATUS_MESSAGES[statusIndex]}
                  </span>
                  <span style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.08em",
                  }}>
                    {Math.min(100, Math.round(progress))}%
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom credit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            style={{
              position: "absolute",
              bottom: 28, left: 0, right: 0,
              display: "flex", justifyContent: "center",
              zIndex: 2, pointerEvents: "none",
            }}
          >
            <span style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.55rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.1)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}>
              Franchise Made Easy
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}