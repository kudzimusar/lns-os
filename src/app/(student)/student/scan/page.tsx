"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  QrCode, 
  X, 
  Camera, 
  ShieldCheck, 
  Zap, 
  ArrowLeft, 
  RefreshCw, 
  Smartphone,
  Maximize2
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { KioskMode } from "@/components/tablet/KioskMode";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SealedBadge } from "@/components/blockchain/SealedBadge";
import { generateMockHash } from "@/lib/blockchain";

export default function StudentScanner() {
  const [scanned, setScanned] = useState(false);
  const [isKioskActive, setIsKioskActive] = useState(false);
  const isLandscape = useMediaQuery("(orientation: landscape) and (min-width: 768px)");

  // Kiosk Mode for landscape tablet as per section 17
  if (isKioskActive || (isLandscape && !scanned)) {
    return <KioskMode onExit={() => setIsKioskActive(false)} />;
  }

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in duration-500 min-h-full pb-8 md:pb-6 px-4 md:px-0">
      {/* Header Info - Optimized for Tablet */}
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-lns-navy tracking-tight uppercase">Institutional Terminal</h1>
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-black uppercase tracking-widest text-lns-red bg-red-50 px-2 py-0.5 rounded-full border border-red-100">Student ID: LNS-001</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-lns-navy/40">Secure Session</span>
            </div>
         </div>
         <Link href="/student/dashboard">
            <Button variant="ghost" className="bg-white border border-lns-border h-12 w-12 rounded-2xl p-0 active:scale-95 transition-transform shadow-sm">
               <X size={24} className="text-lns-navy" />
            </Button>
         </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 md:gap-12 w-full max-w-4xl mx-auto">
         {/* Camera Viewport - Centred 70% width for Tablet Portrait as per section 8 */}
         <div className="relative w-full md:w-[70%] lg:w-[60%] aspect-square shrink-0 group">
            <div className="absolute inset-0 bg-[#0A1F44] rounded-2xl md:rounded-[3.5rem] overflow-hidden border-2 border-white/10 shadow-2xl transition-all group-hover:shadow-lns-navy/20">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className={cn(
                    "w-48 h-48 md:w-64 md:h-64 border-4 border-dashed rounded-[2rem] md:rounded-[3rem] transition-all duration-500",
                    !scanned ? "border-white/20 scale-100" : "border-green-500 scale-95"
                  )} />
                  
                  {!scanned && (
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-1 bg-lns-red shadow-[0_0_20px_rgba(214,43,43,1)] animate-scan" />
                  )}

                  {scanned && (
                    <div className="bg-green-500 p-8 md:p-12 rounded-full shadow-[0_0_60px_rgba(34,197,94,0.5)] animate-in zoom-in duration-500 flex flex-col items-center gap-2">
                       <ShieldCheck size={64} className="text-white md:scale-125" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white">Verified</span>
                    </div>
                  )}
               </div>

               {/* Viewport HUD */}
               <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center space-x-3">
                     <Camera size={20} className="text-lns-red animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Focus node QR</span>
                  </div>
                  <Button 
                    onClick={() => setIsKioskActive(true)}
                    className="text-white bg-white/10 hover:bg-white/20 text-[9px] font-black uppercase tracking-widest px-4 h-9 rounded-xl active:scale-95 transition-transform"
                  >
                     Mount Kiosk
                  </Button>
               </div>
               
               <div className="absolute top-6 right-6">
                  <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)] animate-pulse" />
               </div>
            </div>
         </div>

         {/* Content Area */}
         <div className="w-full max-w-lg">
          {scanned ? (
            <Card className="border-none shadow-2xl bg-white overflow-hidden animate-in slide-in-from-bottom-8 duration-500 rounded-3xl">
                <CardContent className="p-8 md:p-10 space-y-8">
                  <div className="text-center space-y-3">
                      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap size={32} className="text-green-600" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-lns-navy tracking-tight uppercase">Hash Verified</h3>
                      <p className="text-xs md:text-sm text-lns-mid-grey font-medium leading-relaxed uppercase tracking-widest italic">Attendance record committed to institutional ledger.</p>
                  </div>
                  <div className="space-y-6">
                      <div className="p-5 bg-lns-light-grey/30 rounded-2xl border border-lns-border/10 space-y-4">
                        <div className="flex items-center justify-between">
                           <div>
                             <p className="text-[10px] font-black text-lns-navy uppercase tracking-widest">Target Period</p>
                             <p className="text-sm font-black uppercase">Period 3: Mathematics</p>
                           </div>
                           <div className="text-right">
                             <p className="text-[10px] font-black text-lns-navy uppercase tracking-widest">Timestamp</p>
                             <p className="text-sm font-black uppercase text-lns-red">09:12:44 AM</p>
                           </div>
                        </div>
                        <div className="pt-2 border-t border-lns-border/10 flex items-center justify-between">
                          <span className="text-[9px] font-black text-lns-mid-grey uppercase tracking-widest">Transaction Trace</span>
                          <span className="text-[9px] font-mono text-lns-navy bg-white px-2 py-0.5 rounded shadow-sm">0x88c2...fa10</span>
                        </div>
                      </div>
                      <Link href="/student/dashboard" className="block">
                        <Button className="w-full h-14 md:h-16 bg-lns-navy text-white hover:bg-slate-800 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-lns-navy/20 active:scale-95 transition-all text-xs">
                            Initialize Dashboard
                        </Button>
                      </Link>
                  </div>
                </CardContent>
            </Card>
          ) : (
            <div className="text-center space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-full border border-lns-border shadow-sm">
                    <Smartphone size={16} className="text-lns-red" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-lns-navy">Orientation: Terminal mode</span>
                  </div>
                  <h4 className="text-lns-navy font-black tracking-tight text-3xl md:text-4xl uppercase">Verification node</h4>
                  <p className="text-lns-mid-grey text-xs md:text-sm leading-relaxed uppercase tracking-[0.15em] font-medium mx-auto max-w-sm">Synchronize your institutional session by targeting the classroom QR node.</p>
                </div>
                
                {/* Simulated Identity Card - Section 9 Rules */}
                <div className="p-8 bg-white border border-lns-border rounded-3xl flex flex-col items-center gap-6 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-lns-red" />
                  <div className="p-4 bg-white rounded-2xl shadow-inner border border-lns-border/20 group-hover:scale-105 transition-transform duration-500">
                    <QrCode size={160} className="text-lns-navy md:scale-110" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey mb-1">Institutional Identity</p>
                    <p className="text-sm font-black text-lns-navy uppercase tracking-tight">STUDENT LNS-001</p>
                  </div>
                </div>

                <Button 
                  onClick={() => setScanned(true)}
                  className="w-full bg-lns-red text-white hover:bg-red-700 h-14 md:h-16 px-10 rounded-2xl font-black uppercase tracking-[0.2em] text-xs active:scale-95 transition-all shadow-xl shadow-lns-red/30"
                >
                  Verify Protocol
                </Button>
            </div>
          )}
         </div>
      </div>

      {/* Institutional Protocol Footer */}
      <div className="mt-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-lns-mid-grey/40 gap-4 border-t border-lns-border/5">
         <p className="text-[9px] font-black uppercase tracking-[0.4em]">Institutional protocol v3.0 // k.nas-sys</p>
         <div className="flex items-center gap-4">
            <p className="text-[9px] font-black uppercase tracking-[0.4em]">Encrypted Session</p>
            <div className="h-1 w-12 bg-green-500/20 rounded-full overflow-hidden">
               <div className="h-full bg-green-500 w-2/3" />
            </div>
         </div>
      </div>
    </div>
  );
}
