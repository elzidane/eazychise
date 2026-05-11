"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "アイウエオカキクABCDEFGHIJK0123456789!@#$%";

interface Props {
  text: string;
  trigger?: boolean;        // re-scramble when this flips
  className?: string;
  style?: React.CSSProperties;
  duration?: number;        // ms
  tag?: keyof JSX.IntrinsicElements;
}

export default function TextScramble({
  text,
  trigger = true,
  className = "",
  style,
  duration = 900,
  tag: Tag = "span",
}: Props) {
  const [display, setDisplay] = useState(text);
  const frame = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    let iteration = 0;
    const total = text.length * 2.5;
    clearInterval(frame.current);
    frame.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < iteration / 2.5) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration >= total) {
        clearInterval(frame.current);
        setDisplay(text);
      }
    }, duration / total);

    return () => clearInterval(frame.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);

  return (
    
    <Tag className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {display}
    </Tag>
  );
}