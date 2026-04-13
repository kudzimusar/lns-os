"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative bg-gradient-to-br from-[#0A1F44] to-[#2E3A4E] py-32 px-6 overflow-hidden">
      {/* Animated background particles simulation with CSS */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#D62B2B] rounded-full blur-[100px] animate-pulse" />
         <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#E8B84B] rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto relative z-10 text-center">
        <h2 className="text-5xl md:text-7xl font-black text-white font-manrope uppercase leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto">
          Ready to transform <br />
          your school?
        </h2>
        <p className="text-xl md:text-2xl text-white/70 font-bold font-dm-sans mb-16 max-w-2xl mx-auto">
          Join the schools already running on LNS OS. <br className="hidden md:block" />
          Get started in under 10 minutes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
           <div className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 flex flex-col items-center">
              <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">For Schools</h3>
              <Link href="/login" className="w-full">
                <Button className="w-full h-16 bg-[#D62B2B] hover:bg-[#B82525] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-[#D62B2B]/40 active:scale-95 transition-all">
                   Request a School Demo
                </Button>
              </Link>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-6">Takes 2 minutes · No commitment</p>
           </div>
           <div className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 flex flex-col items-center">
              <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">For Parents</h3>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full h-16 border-white/20 text-white hover:bg-white/5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs active:scale-95 transition-all">
                  I&apos;m a Parent — Get Started
                </Button>
              </Link>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-6">Check if your school uses LNS OS</p>
           </div>
        </div>

        <div className="mt-16 pt-16 border-t border-white/5">
           <p className="text-[#8C92A0] font-bold uppercase tracking-widest text-[10px]">
              Already have an account? <Link href="/login" className="text-white hover:text-[#D62B2B] transition-colors">Sign in here</Link>
           </p>
        </div>
      </div>
    </section>
  );
}
