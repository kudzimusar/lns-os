"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QrCode, ArrowLeft, Maximize2, Users, Clock, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProjectorQRView() {
  const [presentCount, setPresentCount] = useState(12);
  const totalCount = 32;
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes grace

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <main className="fixed inset-0 bg-lns-navy flex flex-col items-center justify-center p-8 z-[100] animate-in fade-in duration-1000">
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <Link href="/teacher/attendance">
               <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-14 w-14 rounded-2xl p-0">
                  <ArrowLeft size={24} />
               </Button>
            </Link>
            <div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-red">Session Active</p>
               <h2 className="text-2xl font-[900] text-white tracking-widest uppercase">Grade 10A Mathematics</h2>
            </div>
         </div>
         <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1">
            <div className="px-6 py-3 border-r border-white/10 text-center">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Time Remaining</p>
               <p className={cn("text-2xl font-[900]", timeLeft < 60 ? "text-lns-red animate-pulse" : "text-white ")}>{formatTime(timeLeft)}</p>
            </div>
            <div className="px-6 py-3 text-center">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scanned</p>
               <p className="text-2xl font-[900] text-white">{presentCount}<span className="text-slate-500 text-sm">/{totalCount}</span></p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-6xl">
         {/* Large Subject QR */}
         <div className="flex flex-col items-center space-y-8">
            <div className="bg-white p-12 rounded-[3rem] shadow-[0_0_80px_rgba(255,255,255,0.1)] relative group">
               <div className="w-80 h-80 bg-lns-light-grey rounded-2xl flex items-center justify-center border-4 border-dashed border-lns-border group-hover:border-lns-red transition-all">
                  <QrCode size={200} className="text-lns-navy" />
               </div>
               <div className="absolute -top-4 -right-4 bg-lns-red text-white p-6 rounded-3xl shadow-2xl rotate-12">
                  <Zap size={32} />
               </div>
            </div>
            <div className="text-center space-y-2">
               <p className="text-sm font-bold text-white uppercase tracking-[0.2em]">Scan to Mark Attendance</p>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Token ID: SUB-M10A-7732 • Hashed Session</p>
            </div>
         </div>

         {/* Connection Status & Verification Dashboard */}
         <div className="space-y-8">
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl space-y-6">
               <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center">
                  <ShieldCheck className="mr-3 text-green-500" size={24} />
                  Triple-Verify Active
               </h3>
               <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "Teacher Present", val: "Sarah Jenkins ✓", status: "Verified" },
                    { label: "Subject Room", val: "Mathematics Lab 4", status: "Verified" },
                    { label: "Session Token", val: "0x4f...99be", status: "Active" },
                  ].map((item) => (
                    <div key={item.label} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</p>
                          <p className="text-sm font-bold text-white">{item.val}</p>
                       </div>
                       <span className="text-[9px] font-black uppercase text-green-500 bg-green-500/10 px-2 py-1 rounded-md">{item.status}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex items-center space-x-6 text-slate-400">
               <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Network Live</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Blockchain Node Sync</span>
               </div>
            </div>
         </div>
      </div>

      <div className="absolute bottom-8 flex space-x-4">
         <Button variant="ghost" className="text-slate-500 hover:text-white uppercase font-black text-[10px] tracking-widest">
            Toggle Full Screen
         </Button>
         <Button variant="ghost" className="text-slate-500 hover:text-white uppercase font-black text-[10px] tracking-widest">
            Privacy Filter
         </Button>
      </div>
    </main>
  );
}
