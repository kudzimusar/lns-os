"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const columns = [
    {
      title: "Product",
      links: ["Features", "Security", "Pricing", "Roadmap"]
    },
    {
      title: "For Schools",
      links: ["Request Demo", "School Setup", "Case Studies", "Support"]
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms & Conditions", "Data Rights", "Cookie Policy"]
    },
    {
      title: "Connect",
      links: ["Twitter/X", "LinkedIn", "Email Us"]
    }
  ];

  return (
    <footer className="bg-[#0A1F44] pt-24 pb-12 px-6 border-t border-white/5">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center space-x-1">
              <span className="text-2xl font-black tracking-tight text-white uppercase font-manrope">
                LNS <span className="text-[#D62B2B]">OS</span>
              </span>
            </Link>
            <p className="text-[#8C92A0] text-sm font-bold font-dm-sans leading-relaxed">
              The Operating System for <br /> Modern Learning.
            </p>
          </div>

          {columns.map(col => (
            <div key={col.title} className="space-y-6">
               <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">{col.title}</h4>
               <ul className="space-y-4">
                  {col.links.map(link => (
                    <li key={link}>
                       <Link href="#" className="text-[#8C92A0] hover:text-white text-xs font-bold transition-colors font-dm-sans">{link}</Link>
                    </li>
                  ))}
               </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <p className="text-[#8C92A0] text-[10px] font-black uppercase tracking-widest">
                 © 2026 LNS OS. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-[#E8B84B]/60">
                 <span>Blockchain-secured</span>
                 <span>AI-powered</span>
              </div>
           </div>

           <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="flex items-center space-x-2 text-white hover:text-[#D62B2B] transition-colors group"
           >
              <span className="text-[10px] font-black uppercase tracking-widest">Back to top</span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D62B2B] transition-all">
                 <ArrowUp size={14} />
              </div>
           </button>
        </div>
      </div>
    </footer>
  );
}
