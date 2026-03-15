"use client";
import { useEffect, useRef } from "react";

interface Spark {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  color: string;
  size: number;
}

const COLORS = ["#FF5C1A", "#FF8C42", "#FFCF40", "#ffffff", "#FF3D00", "#FFB347"];

export default function ClickSpark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparks = useRef<Spark[]>([]);
  const raf = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnSparks = (x: number, y: number) => {
      const count = 22;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
        const speed = 3 + Math.random() * 6;
        sparks.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          life: 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 2.5 + Math.random() * 3,
        });
      }
    };

    window.addEventListener("click", (e) => spawnSparks(e.clientX, e.clientY));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks.current = sparks.current.filter(s => s.life > 0.02);

      for (const s of sparks.current) {
        s.x  += s.vx;
        s.y  += s.vy;
        s.vy += 0.18;
        s.vx *= 0.96;
        s.life -= 0.028;

        const alpha = Math.max(0, s.life);
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.max(0.1, s.size * s.life), 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = s.color;
        ctx.fill();

        // Tail
        ctx.globalAlpha = alpha * 0.4;
        ctx.beginPath();
        ctx.arc(s.x - s.vx, s.y - s.vy, Math.max(0.1, s.size * s.life * 0.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", spawnSparks as unknown as EventListener);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9997,
      }}
    />
  );
}