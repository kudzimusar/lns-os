"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function HeroSection() {
  const [hash, setHash] = useState("a3f8b7e2c9d1a3f8b7e2c9d1a3f8b7e2c9d1");
  const [isSealing, setIsSealing] = useState(false);
  const [block, setBlock] = useState(847291);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSealing(true);
      setTimeout(() => {
        setIsSealing(false);
        const chars = "abcdef0123456789";
        let newHash = "";
        for (let i = 0; i < 36; i++) {
          newHash += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setHash(newHash);
        setBlock((prev) => prev + 1);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#0A1F44]">
      {/* CSS Particle System */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/5 rounded-sm animate-float"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-20px`,
              animationDuration: `${Math.random() * 15 + 15}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.03; }
          50% { opacity: 0.08; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0.03; }
        }
        .animate-float {
          animation-name: float;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
      `}</style>

      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3 text-[#E8B84B]"
          >
            <Shield size={14} className="fill-[#E8B84B]/20" />
            <span className="text-xs font-black uppercase tracking-[0.4em] font-dm-sans">
              🛡️ The world&apos;s first AI + Blockchain school OS
            </span>
          </motion.div>

          <div className="space-y-6">
            <div className="space-y-0">
               <motion.h1
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0 }}
                 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] font-manrope tracking-tighter uppercase"
               >
                 Every Record.
               </motion.h1>
               <motion.h1
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.1 }}
                 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] font-manrope tracking-tighter uppercase relative inline-block"
               >
                 Immutable.
                 <motion.span 
                   initial={{ scaleX: 0 }}
                   animate={{ scaleX: 1 }}
                   transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                   className="absolute -bottom-2 left-0 w-full h-2 bg-[#E8B84B] origin-left rounded-full"
                 />
               </motion.h1>
            </div>
            
            <div className="space-y-0 pt-4">
               <motion.h1
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.3 }}
                 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] font-manrope tracking-tighter uppercase"
               >
                 Every Insight.
               </motion.h1>
               <motion.h1
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] font-manrope tracking-tighter uppercase relative inline-block"
               >
                 Instant.
                 <motion.span 
                   initial={{ scaleX: 0 }}
                   animate={{ scaleX: 1 }}
                   transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                   className="absolute -bottom-2 left-0 w-full h-2 bg-[#D62B2B] origin-left rounded-full"
                 />
               </motion.h1>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-[#8C92A0] font-medium leading-relaxed font-dm-sans max-w-xl"
          >
            LNS OS is the operating system that schools have always needed.<br />
            AI drafts every report, flags every risk, and drafts every message.<br />
            Blockchain seals every record — permanently, publicly, provably.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6 pt-4"
          >
            <Link href="/login" className="w-full sm:w-auto">
              <Button className="w-full h-16 bg-[#D62B2B] hover:bg-[#B82525] text-white px-10 rounded-xl text-sm font-black uppercase tracking-widest shadow-xl shadow-[#D62B2B]/20 transition-all active:scale-95 flex items-center gap-3">
                Request a School Demo <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full h-16 border-white/30 text-white hover:bg-white/10 px-10 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center gap-3"
              >
                <Play size={18} fill="currentColor" /> Watch 2-min Overview
              </Button>
            </Link>
          </motion.div>

          {/* Trust Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="pt-12 text-[10px] font-black text-white/50 uppercase tracking-[0.2em] flex flex-wrap gap-x-6 gap-y-4 font-dm-sans"
          >
            <span className="flex items-center gap-2">🔒 Blockchain-sealed records</span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-2">🤖 Claude AI powered</span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-2">📱 PWA — any device</span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-2">🌍 Multilingual</span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-2">✓ GDPR compliant</span>
          </motion.div>
        </div>

        {/* Right Column - Animated Visual */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="relative w-[600px] h-[600px]">
            {/* Outer ring of dots */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
               {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-1.5 h-1.5 bg-white/10 rounded-full"
                    style={{ transform: `rotate(${i * 45}deg) translateY(-260px)` }}
                  />
               ))}
            </motion.div>

            {/* Orbiting Hexagons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Inner Ring */}
              <div className="w-[300px] h-[300px] border border-white/5 rounded-full" />
              
              {["Attendance", "Grades", "Payments", "Reports", "Behaviour", "Identity"].map((label, i) => (
                <div
                  key={label}
                  className="absolute"
                  style={{
                    transform: `rotate(${i * 60}deg) translateY(-180px)`,
                  }}
                >
                  <motion.div 
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    className="relative" 
                    style={{ transform: `rotate(-${i * 60}deg)` }}
                  >
                    <div className="w-20 h-20 bg-[#0A1F44] border border-[#E8B84B]/40 flex items-center justify-center relative z-10" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                       <span className="text-[8px] font-black uppercase text-white/60 tracking-tighter text-center px-2">{label}</span>
                    </div>
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-1/2 -z-10 w-[180px] h-[1px] bg-gradient-to-r from-transparent to-[#E8B84B]/20 origin-left" style={{ transform: 'translateX(-100%)' }} />
                  </motion.div>
                </div>
              ))}
            </motion.div>

            {/* Central Badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
               <motion.div 
                 animate={{ scale: [1, 1.05, 1] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="w-[120px] h-[120px] bg-[#0A1F44] border-2 border-[#D62B2B] flex flex-col items-center justify-center shadow-[0_0_80px_rgba(214,43,43,0.3)]"
                 style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
               >
                  <span className="text-2xl font-black text-white tracking-widest leading-none">LNS</span>
                  <span className="text-2xl font-black text-[#D62B2B] tracking-widest leading-none">OS</span>
               </motion.div>
            </div>

            {/* Live Hash String */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/5">
               <p className="font-mono text-[10px] text-[#E8B84B] tracking-[0.2em] uppercase flex items-center gap-3">
                  {isSealing ? (
                    <motion.span 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-[#E8B84B] rounded-full animate-pulse" />
                      ⛓ Sealing...
                    </motion.span>
                  ) : (
                    <motion.span 
                      key={hash}
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-green-500">✓</span> Sealed: 
                      <span className="opacity-80">
                        {hash.substring(0, 8)}...{hash.substring(28)}
                      </span>
                    </motion.span>
                  )}
                  <span className="opacity-40">· Block #{block}</span>
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
