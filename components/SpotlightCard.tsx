"use client";
import { useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  spotlightColor?: string;
}

export default function SpotlightCard({ children, className = "", style, spotlightColor = "rgba(255,92,26,0.12)" }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current!.style.setProperty("--mx", x + "px");
    cardRef.current!.style.setProperty("--my", y + "px");
    cardRef.current!.style.setProperty("--spotlight", spotlightColor);
  };

  const onLeave = () => {
    cardRef.current!.style.setProperty("--mx", "-999px");
    cardRef.current!.style.setProperty("--my", "-999px");
  };

  return (
    <>
      <style>{`
        .spotlight-card {
          position: relative;
          overflow: hidden;
        }
        .spotlight-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(300px circle at var(--mx,-999px) var(--my,-999px), var(--spotlight,rgba(255,92,26,.12)), transparent 70%);
          pointer-events: none;
          z-index: 1;
          transition: opacity .3s;
        }
        .spotlight-card > * { position: relative; z-index: 2; }
      `}</style>
      <div
        ref={cardRef}
        className={`spotlight-card ${className}`}
        style={style}
        onMouseMove={onMouseMove}
        onMouseLeave={onLeave}
      >
        {children}
      </div>
    </>
  );
}