"use client";
import { useEffect, useRef } from "react";

interface Ripple { x: number; y: number; r: number; life: number; }

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>();
  const mouse = useRef({ x: -1000, y: -1000 });
  const smoothMouse = useRef({ x: -1000, y: -1000 });
  const ripples = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let t = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onClick = (e: MouseEvent) => {
      ripples.current.push({ x: e.clientX, y: e.clientY, r: 0, life: 1 });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    // Ambient orbs that float on their own
    const orbs = [
      { x: 0.15, y: 0.25, r: 0.55, color: "255,92,26",  speed: 0.00035, amp: 0.09 },
      { x: 0.80, y: 0.65, r: 0.45, color: "255,140,40", speed: 0.00055, amp: 0.07 },
      { x: 0.50, y: 0.05, r: 0.40, color: "220,50,10",  speed: 0.00045, amp: 0.08 },
      { x: 0.30, y: 0.85, r: 0.35, color: "255,195,55", speed: 0.00028, amp: 0.06 },
    ];

    const tick = () => {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth cursor following — lerp 6%
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.06;
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.06;

      // ── Cursor glow orb ─────────────────────────────────────
      const cx = smoothMouse.current.x;
      const cy = smoothMouse.current.y;
      const cursorR = 320;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cursorR);
      cg.addColorStop(0,    "rgba(255,92,26,0.22)");
      cg.addColorStop(0.35, "rgba(255,92,26,0.10)");
      cg.addColorStop(0.7,  "rgba(255,92,26,0.03)");
      cg.addColorStop(1,    "rgba(255,92,26,0)");
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Inner hot spot
      const inner = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
      inner.addColorStop(0, "rgba(255,180,80,0.18)");
      inner.addColorStop(1, "rgba(255,92,26,0)");
      ctx.fillStyle = inner;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ── Ambient floating orbs ───────────────────────────────
      for (const orb of orbs) {
        const ox = (orb.x + Math.sin(t * orb.speed) * orb.amp) * canvas.width;
        const oy = (orb.y + Math.cos(t * orb.speed * 1.4) * orb.amp) * canvas.height;
        const r  = orb.r * Math.max(canvas.width, canvas.height);
        const g  = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
        g.addColorStop(0,   `rgba(${orb.color},0.12)`);
        g.addColorStop(0.4, `rgba(${orb.color},0.05)`);
        g.addColorStop(1,   `rgba(${orb.color},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // ── Ripple rings on click ───────────────────────────────
      ripples.current = ripples.current.filter(rp => rp.life > 0);
      for (const rp of ripples.current) {
        rp.r    += 18;
        rp.life -= 0.028;
        const a = Math.max(0, rp.life * 0.5);
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,92,26,${a})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Second ring, slightly behind
        if (rp.r > 30) {
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.r - 24, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,160,40,${a * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width:  "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}