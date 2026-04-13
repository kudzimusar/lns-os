"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function HeroSection() {
  const [hash, setHash] = useState("a3f8b7e2c9d1a3f8b7e2c9d1a3f8b7e2c9d1");
  const [block, setBlock] = useState(847291);

  useEffect(() => {
    const interval = setInterval(() => {
      const chars = "abcdef0123456789";
      let newHash = "";
      for (let i = 0; i < 36; i++) {
        newHash += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setHash(newHash);
      setBlock((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#0A1F44]">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      <div className="absolute inset-0 z-0 bg-radial-gradient from-transparent to-[#0A1F44]/50" />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3 text-[#E8B84B]"
          >
            <Shield size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] font-dm-sans">
              Trusted by forward-thinking schools
            </span>
          </motion.div>

          <div className="space-y-4">
            {["Every Record.", "Immutable.", "Every Insight.", "Instant."].map((line, i) => (
              <motion.h1
                key={line}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none font-manrope tracking-tighter uppercase"
              >
                {line.includes("Immutable") ? (
                  <span className="relative inline-block">
                    {line}
                    <span className="absolute bottom-2 left-0 w-full h-2 bg-[#E8B84B]/30 blur-sm rounded-full" />
                  </span>
                ) : line.includes("Instant") ? (
                  <span className="relative inline-block">
                    {line}
                    <span className="absolute bottom-2 left-0 w-full h-2 bg-[#D62B2B]/30 blur-sm rounded-full" />
                  </span>
                ) : (
                  line
                )}
              </motion.h1>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-xl text-[#8C92A0] font-medium leading-relaxed font-dm-sans max-w-xl"
          >
            LNS OS is the world&apos;s first AI-powered, blockchain-secured school
            operating system. Built for teachers, trusted by parents, verified
            by institutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <Link href="/login" className="w-full sm:w-auto">
              <Button className="w-full h-14 bg-[#D62B2B] hover:bg-[#B82525] text-white px-10 rounded-xl text-sm font-black uppercase tracking-widest shadow-xl shadow-[#D62B2B]/20 transition-all active:scale-95">
                Request a Demo <ArrowRight className="ml-3" size={18} />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full h-14 border-white/20 text-white hover:bg-white/5 px-10 rounded-xl text-sm font-black uppercase tracking-widest transition-all"
              >
                See How It Works ↓
              </Button>
            </Link>
          </motion.div>

          {/* Trust Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="pt-12 text-[9px] font-black text-[#8C92A0] uppercase tracking-[0.2em] flex flex-wrap gap-x-6 gap-y-4 font-dm-sans"
          >
            <span>🔒 Blockchain-secured</span>
            <span>🤖 AI-powered</span>
            <span>📊 Real-time analytics</span>
            <span>🌍 Multilingual</span>
            <span>📱 PWA Support</span>
          </motion.div>
        </div>

        {/* Right Column - Animated Visual */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="relative w-[500px] h-[500px]">
            {/* Center Hexagon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Central Ring */}
              <div className="w-[300px] h-[300px] border border-[#E8B84B]/20 rounded-full" />
              
              {/* Orbiting Hexagons */}
              {["Attendance", "Grades", "Payments", "Reports", "Behaviour", "Identity"].map((label, i) => (
                <div
                  key={label}
                  className="absolute"
                  style={{
                    transform: `rotate(${i * 60}deg) translateY(-180px)`,
                  }}
                >
                  <div className="relative" style={{ transform: `rotate(-${i * 60}deg)` }}>
                    <div className="w-20 h-20 bg-[#0A1F44] border border-[#E8B84B]/40 flex items-center justify-center relative z-10" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                       <span className="text-[8px] font-black uppercase text-white/60 tracking-tighter text-center px-2">{label}</span>
                    </div>
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-1/2 -z-10 w-[180px] h-[1px] bg-gradient-to-r from-[#E8B84B]/0 to-[#E8B84B]/20 origin-left" style={{ transform: 'translateX(-100%)' }} />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Central Badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
               <motion.div 
                 animate={{ scale: [1, 1.05, 1] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="w-32 h-32 bg-[#D62B2B] flex items-center justify-center shadow-[0_0_50px_rgba(214,43,43,0.4)]"
                 style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
               >
                  <span className="text-xl font-black text-white tracking-widest">LNS OS</span>
               </motion.div>
            </div>

            {/* Live Hash String */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
               <p className="font-mono text-[10px] text-[#E8B84B] tracking-widest uppercase opacity-70">
                  Sealed: {hash.substring(0, 4)}...{hash.substring(32)} · {new Date().toLocaleTimeString()} · Block #{block}
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
