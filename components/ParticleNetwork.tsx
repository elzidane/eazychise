"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  opacity: number;
  baseX: number; baseY: number;
}

const PARTICLE_COUNT = 55;
const CONNECTION_DIST = 130;
const CURSOR_REPEL = 110;
const REPEL_STRENGTH = 0.018;

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    function initParticles() {
      particles.current = Array.from({ length: PARTICLE_COUNT }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          x, y,
          baseX: x, baseY: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: 1.2 + Math.random() * 1.8,
          opacity: 0.3 + Math.random() * 0.5,
        };
      });
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener("mouseleave", () => {
      mouse.current = { x: -9999, y: -9999 };
    });

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particles.current;

      for (const p of pts) {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Cursor repel
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CURSOR_REPEL && dist > 0) {
          const force = (CURSOR_REPEL - dist) / CURSOR_REPEL;
          p.x += (dx / dist) * force * REPEL_STRENGTH * 60;
          p.y += (dy / dist) * force * REPEL_STRENGTH * 60;
        }

        // Soft boundary bounce
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        // Draw particle dot
        const cursorDist = Math.sqrt((p.x - mouse.current.x) ** 2 + (p.y - mouse.current.y) ** 2);
        const glow = cursorDist < 160 ? 1 - cursorDist / 160 : 0;
        const alpha = p.opacity + glow * 0.4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + glow * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,${Math.round(92 + glow * 80)},26,${alpha})`;
        if (glow > 0.2) {
          ctx.shadowBlur = 8 * glow;
          ctx.shadowColor = "rgba(255,92,26,0.6)";
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECTION_DIST) {
            const strength = 1 - d / CONNECTION_DIST;

            // Check if line passes near cursor
            const mx = (pts[i].x + pts[j].x) / 2;
            const my = (pts[i].y + pts[j].y) / 2;
            const cd = Math.sqrt((mx - mouse.current.x) ** 2 + (my - mouse.current.y) ** 2);
            const cursorBoost = cd < 180 ? (1 - cd / 180) * 0.5 : 0;

            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(255,${Math.round(92 + cursorBoost * 80)},26,${(strength * 0.18 + cursorBoost * 0.3).toFixed(3)})`;
            ctx.lineWidth = strength * 0.8 + cursorBoost * 0.6;
            ctx.stroke();
          }
        }
      }

      // Cursor connection lines to nearby particles
      if (mouse.current.x > 0) {
        for (const p of pts) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 170) {
            const s = 1 - d / 170;
            ctx.beginPath();
            ctx.moveTo(mouse.current.x, mouse.current.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(255,140,40,${(s * 0.45).toFixed(3)})`;
            ctx.lineWidth = s * 1.2;
            ctx.stroke();
          }
        }
      }

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0,
        width: "100vw", height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.85,
      }}
    />
  );
}