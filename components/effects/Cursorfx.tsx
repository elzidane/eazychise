"use client";
import { useEffect, useRef, useState } from "react";

interface Trail {
  x: number;
  y: number;
  id: number;
  opacity: number;
}

export default function CursorFX() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mouse = useRef({ x: -200, y: -200 });
  const cursor = useRef({ x: -200, y: -200 });
  const trailId = useRef(0);
  const raf = useRef<number>();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Dot snaps instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      // Spawn trail particle
      trailId.current++;
      const id = trailId.current;
      setTrails(prev => [
        ...prev.slice(-14),
        { x: e.clientX, y: e.clientY, id, opacity: 1 },
      ]);
      setTimeout(() => {
        setTrails(prev => prev.filter(t => t.id !== id));
      }, 500);

      // Hover detection
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isHover = el?.closest("a,button,[data-hover]") != null;
      setHovering(isHover);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Smooth ring follow
    const tick = () => {
      cursor.current.x += (mouse.current.x - cursor.current.x) * 0.12;
      cursor.current.y += (mouse.current.y - cursor.current.y) * 0.12;
      if (cursorRef.current) {
        const size = hovering ? 44 : clicking ? 20 : 32;
        cursorRef.current.style.transform = `translate(${cursor.current.x - size / 2}px, ${cursor.current.y - size / 2}px)`;
        cursorRef.current.style.width = size + "px";
        cursorRef.current.style.height = size + "px";
        cursorRef.current.style.opacity = hovering ? "1" : "0.7";
        cursorRef.current.style.borderColor = hovering ? "#FF5C1A" : "rgba(255,92,26,0.6)";
        cursorRef.current.style.background = hovering ? "rgba(255,92,26,0.12)" : "transparent";
        cursorRef.current.style.mixBlendMode = hovering ? "normal" : "difference";
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    // Hide default cursor on desktop
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (raf.current) cancelAnimationFrame(raf.current);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Trail particles */}
      {trails.map((t, i) => (
        <div
          key={t.id}
          style={{
            position: "fixed",
            left: 0, top: 0,
            width: 6, height: 6,
            borderRadius: "50%",
            background: `rgba(255,${92 + i * 8},26,${0.6 - i * 0.04})`,
            transform: `translate(${t.x - 3}px, ${t.y - 3}px) scale(${1 - i * 0.05})`,
            pointerEvents: "none",
            zIndex: 9998,
            animation: "trailFade .5s ease forwards",
            boxShadow: `0 0 ${4 + i}px rgba(255,92,26,0.4)`,
          }}
        />
      ))}

      {/* Outer ring — laggy */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          left: 0, top: 0,
          width: 32, height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,92,26,0.6)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "width .2s, height .2s, opacity .2s, border-color .2s, background .2s",
          willChange: "transform",
        }}
      />

      {/* Inner dot — instant */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          left: 0, top: 0,
          width: 8, height: 8,
          borderRadius: "50%",
          background: "#FF5C1A",
          pointerEvents: "none",
          zIndex: 9999,
          boxShadow: "0 0 10px rgba(255,92,26,.8)",
          willChange: "transform",
          transition: clicking ? "transform .05s" : "none",
          transform: clicking ? "scale(0.6)" : "scale(1)",
        }}
      />

      <style>{`
        @keyframes trailFade {
          0% { opacity: 1; transform: translate(var(--tx), var(--ty)) scale(1); }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
        }
        a, button, [data-hover] { cursor: none !important; }
      `}</style>
    </>
  );
}