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

  const renderContent = (content: string) => {
    // Simple markdown parsing for **bold** and ### headers
    const parts = content.split(/(\*\*.*?\*\*|### .*?\n|### .*?$)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="text-[#FF5C1A]">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("### ")) {
        return <h4 key={i} className="font-syne font-bold text-lg mt-4 mb-2 text-[#111]">{part.replace("### ", "")}</h4>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return <span className={className}>{renderContent(displayedText)}</span>;
}
