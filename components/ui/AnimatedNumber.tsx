"use client";
import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { formatRupiah as formatRupiahUtil } from "@/lib/utils/formatRupiah";

interface AnimatedNumberProps {
  value: number;
  formatRupiah?: boolean;
  prefix?: string;
  suffix?: string;
  isFloat?: boolean;
}

export default function AnimatedNumber({ 
  value, 
  formatRupiah = false, 
  prefix = "", 
  suffix = "", 
  isFloat = false 
}: AnimatedNumberProps) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  const display = useTransform(spring, (current) => {
    if (formatRupiah) {
      return formatRupiahUtil(current);
    }
    return prefix + (isFloat ? current.toFixed(1) : Math.round(current).toString()) + suffix;
  });

  return (
    <motion.span 
      className="tabular-nums inline-block tracking-tight" 
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {display}
    </motion.span>
  );
}
