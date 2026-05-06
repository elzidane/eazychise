"use client";
import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number; // ms per character
  delay?: number; // initial delay
  className?: string;
  onComplete?: () => void;
}

export default function Typewriter({
  text,
  speed = 20,
  delay = 0,
  className = "",
  onComplete,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index === 0 && delay > 0) {
      const timeout = setTimeout(() => {
        setIndex(1);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (index === text.length && onComplete) {
      onComplete();
    }
  }, [index, text, speed, delay, onComplete]);

  return <span className={className}>{displayedText}</span>;
}
