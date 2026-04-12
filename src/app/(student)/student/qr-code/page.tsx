"use client";

import React from "react";
import { QrCode, ArrowLeft, ShieldCheck, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";

export default function StudentQRCodePage() {
  const student = PLACEHOLDER_STUDENTS[0]; // Self

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 space-y-8 md:space-y-12 animate-in fade-in duration-700 min-h-full bg-[#0A1F44] rounded-2xl md:rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Decorative Blur Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-lns-red/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Header Info */}
      <div className="text-center space-y-2 z-10">
         <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter">{student.name}</h1>
         <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Institutional Identity • {student.idNumber}</p>
      </div>

      {/* QR Display - Responsive Size */}
      <div className="relative group z-10 w-full max-w-[280px] md:max-w-xs aspect-square">
         <div className="relative bg-white p-6 md:p-10 rounded-2xl md:rounded-[3rem] shadow-[0_0_50px_rgba(214,43,43,0.2)] flex items-center justify-center h-full">
            <QrCode className="w-full h-full text-lns-navy" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl border-2 md:border-4 border-white">
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-lns-red flex items-center justify-center text-white font-black text-sm md:text-lg">L</div>
            </div>
         </div>
      </div>

      {/* Verification Stats */}
      <div className="flex items-center gap-8 md:gap-12 text-white/60 z-10">
         <div className="flex flex-col items-center gap-2">
            <ShieldCheck size={20} md:size={24} className="text-green-400" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Verified</span>
         </div>
         <div className="flex flex-col items-center gap-2">
            <Download size={20} md:size={24} className="text-slate-400 cursor-pointer active:text-white transition-colors" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Offline</span>
         </div>
         <div className="flex flex-col items-center gap-2">
            <Share2 size={20} md:size={24} className="text-slate-400 cursor-pointer active:text-white transition-colors" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Export</span>
         </div>
      </div>

      {/* Instruction */}
      <div className="max-w-[240px] md:max-w-xs text-center z-10">
         <p className="text-[10px] md:text-xs font-medium text-slate-400 leading-relaxed italic">
            Present this terminal code at any classroom gateway or campus node for institutional clearance.
         </p>
      </div>
    </div>
  );
}
