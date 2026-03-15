"use client";
import { useEffect, useRef } from "react";

interface Props {
  color?: string;
  size?: number;
  style?: React.CSSProperties;
  speed?: number;
}

// SVG blob morphing — purely CSS, no canvas, zero CPU impact
export default function MorphBlob({ color = "rgba(255,92,26,0.08)", size = 600, style, speed = 8 }: Props) {
  const id = useRef(`blob-${Math.random().toString(36).slice(2)}`);

  return (
    <>
      <style>{`
        @keyframes morph-${id.current} {
          0%,100% { d: path("M60,20 C80,5 95,25 80,45 C95,65 75,80 55,70 C35,80 15,65 20,45 C5,25 40,35 60,20Z"); }
          25%      { d: path("M55,15 C75,0  100,20 85,50 C100,75 70,88 50,75 C30,88 5,70  15,45 C0,20  35,30 55,15Z"); }
          50%      { d: path("M65,25 C85,10 98,30 78,50 C98,70 72,85 50,72 C28,85 8,65  22,45 C2,25  45,40 65,25Z"); }
          75%      { d: path("M58,18 C78,3  96,23 82,48 C96,72 68,86 48,73 C28,86 4,68  18,43 C2,18  38,33 58,18Z"); }
        }
        #${id.current} { animation: morph-${id.current} ${speed}s ease-in-out infinite; }
      `}</style>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size, height: size, pointerEvents: "none", ...style }}
      >
        <path id={id.current} fill={color} />
      </svg>
    </>
  );
}