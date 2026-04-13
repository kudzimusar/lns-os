"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 47, label: "Schools", sublabel: "Active" },
  { value: 12400, label: "Students", sublabel: "Enrolled" },
  { value: 2.1, label: "Payments", sublabel: "Processed", prefix: "£", suffix: "M" },
  { value: 99.97, label: "Uptime", sublabel: "Guaranteed", suffix: "%" },
];

export function StatsStrip() {
  return (
    <section className="bg-[#2E3A4E] py-12 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
          {stats.map((stat, i) => (
            <div 
              key={stat.label} 
              className={cn(
                "flex flex-col items-center text-center px-8",
                i !== stats.length - 1 && "lg:border-r lg:border-white/10"
              )}
            >
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <div className="mt-4 space-y-1">
                <p className="text-white font-black uppercase tracking-[0.2em] text-sm font-manrope">
                  {stat.label}
                </p>
                <p className="text-[#8C92A0] text-[10px] font-bold uppercase tracking-widest font-dm-sans">
                  {stat.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / 100));
      
      const timer = setInterval(() => {
        start += (end / 100);
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(start);
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl lg:text-5xl font-black text-white font-manrope">
      {prefix}{displayValue % 1 === 0 ? displayValue : displayValue.toFixed(2)}{suffix}
    </span>
  );
}

import { cn } from "@/lib/utils";
