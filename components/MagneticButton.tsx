"use client";
import { useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function MagneticButton({ children, strength = 0.35, className = "", style, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    ref.current!.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    ref.current!.style.transform = "translate(0,0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transition: "transform .4s cubic-bezier(.23,1,.32,1)", display: "inline-block" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
}