"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  to: number;
  duration?: number;       // ms
  prefix?: string;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
  decimals?: number;
}

export default function CounterUp({
  to, duration = 800, prefix = "", suffix = "",
  className = "", style, decimals = 0,
}: Props) {
  const [val, setVal] = useState(to); // Start at target to prevent FOUC
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current!;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(parseFloat((eased * to).toFixed(decimals)));
          if (t < 1) requestAnimationFrame(tick);
          else setVal(to);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration, decimals]);

  return (
    <span ref={ref} className={className} style={style} suppressHydrationWarning>
      {prefix}{val.toLocaleString("id-ID")}{suffix}
    </span>
  );
}