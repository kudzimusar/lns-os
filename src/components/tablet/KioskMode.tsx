"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { 
  QrCode, 
  X, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  UserPlus,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface KioskModeProps {
  onExit: () => void;
  periodName?: string;
  periodTime?: string;
}

export function KioskMode({ 
  onExit, 
  periodName = "Period 3 — Maths", 
  periodTime = "09:15 – 10:00" 
}: KioskModeProps) {
  const [pin, setPin] = useState("");
  const [showPinEntry, setShowPinEntry] = useState(false);
  const [lastScanned, setLastScanned] = useState<{ name: string; time: string } | null>(null);
  const wakeLockRef = useRef<any>(null);

  // Wake Lock API implementation for Kiosk
  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        }
      } catch (err) {
        console.error("Wake Lock failed:", err);
      }
    };

    requestWakeLock();
    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    };
  }, []);

  const handleScan = (name: string) => {
    setLastScanned({ name, time: new Date().toLocaleTimeString() });
    setTimeout(() => setLastScanned(null), 1500);
  };

  const handleExitAttempt = () => {
    if (pin === "1234") {
      onExit();
    } else {
      setPin("");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A1F44] text-white flex flex-col overflow-hidden animate-in fade-in duration-500">
      {/* Kiosk Header - Enhanced Tablet Visibility */}
      <header className="h-20 px-8 flex items-center justify-between border-b border-white/10 bg-[#0A1F44]">
        <div className="flex items-center space-x-6">
          <span className="text-2xl font-black tracking-tighter uppercase">
            LNS <span className="text-lns-red">OS</span>
          </span>
          <div className="px-3 py-1 bg-lns-red text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-lns-red/20">
            KIOSK MODE ACTIVE
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-black uppercase tracking-tight">{periodName}</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{periodTime}</p>
        </div>
      </header>

      {/* Main Grid - Forced Side-by-Side on Tablet Landscape */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">
        {/* Viewfinder: Left Half */}
        <section className="relative flex flex-col items-center justify-center p-12 bg-black/40">
          <div className="relative w-full max-w-md aspect-square">
            {/* Viewfinder Brackets */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-l-8 border-lns-red rounded-tl-3xl shadow-[0_0_20px_rgba(214,43,43,0.3)]" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-8 border-r-8 border-lns-red rounded-tr-3xl shadow-[0_0_20px_rgba(214,43,43,0.3)]" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-8 border-l-8 border-lns-red rounded-bl-3xl shadow-[0_0_20px_rgba(214,43,43,0.3)]" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-8 border-r-8 border-lns-red rounded-br-3xl shadow-[0_0_20px_rgba(214,43,43,0.3)]" />
            
            <div className="absolute inset-8 bg-slate-900/50 rounded-2xl flex items-center justify-center border-2 border-white/5">
              <QrCode size={120} className="text-white/10 animate-pulse" />
              <div className="absolute top-0 left-0 w-full h-1 bg-lns-red shadow-[0_0_20px_rgba(214,43,43,1)] animate-scan" style={{ animationDuration: '3s' }} />
            </div>

            {/* Success Overlay - Section 17 Specification */}
            {lastScanned && (
              <div className="absolute inset-0 bg-green-500/95 rounded-2xl flex flex-col items-center justify-center animate-in zoom-in duration-300 z-20">
                <CheckCircle2 size={120} className="text-white mb-6 animate-bounce" />
                <p className="text-3xl font-black uppercase text-white tracking-[0.2em]">{lastScanned.name}</p>
                <p className="text-sm font-black text-white/70 mt-2 uppercase tracking-widest">SESSION SYNCHRONIZED</p>
              </div>
            )}
          </div>
          <p className="mt-12 text-sm font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">Position Institutional QR Code</p>
        </section>

        {/* Live List: Right Half */}
        <section className="flex flex-col border-l border-white/10 overflow-hidden bg-white/5">
          <div className="p-8 border-b border-white/10 flex items-center justify-between bg-black/20">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Institutional Roll Call</h3>
              <p className="text-lg font-black uppercase">Live Synchronization</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-green-500 tracking-widest">Present</p>
                <p className="text-3xl font-black leading-none">18</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Remaining</p>
                <p className="text-3xl font-black leading-none text-slate-500">6</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-4 scrollbar-hide">
             <div className="space-y-4">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 Recently Authenticated
               </p>
               {[
                 { name: "Amara Johnson", time: "09:12", status: "present" },
                 { name: "Blake Nkosi", time: "09:10", status: "present" },
                 { name: "Cara Mensah", time: "09:08", status: "present" },
                 { name: "Zinhle Dlamini", time: "09:05", status: "present" },
               ].map((s, i) => (
                 <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                       <CheckCircle2 size={24} />
                     </div>
                     <span className="font-black text-sm uppercase tracking-tight">{s.name}</span>
                   </div>
                   <span className="text-[10px] font-black text-slate-400 bg-black/20 px-2 py-1 rounded-lg">{s.time}</span>
                 </div>
               ))}
             </div>

             <div className="space-y-4 pt-8">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pending Sync</p>
               {[
                 { name: "David Moyo" },
                 { name: "Elena Petrov" },
               ].map((s, i) => (
                 <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-black/40 opacity-30 border border-white/5">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full border-2 border-slate-500" />
                     <span className="font-bold text-sm uppercase tracking-tight">{s.name}</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </section>
      </main>

      {/* Footer / Exit Control - Section 17/21 Rules */}
      <footer className="h-20 px-8 flex items-center justify-center border-t border-white/10 bg-[#0A1F44] relative shrink-0">
        {!showPinEntry ? (
          <button 
            onClick={() => setShowPinEntry(true)}
            className="flex items-center gap-3 text-slate-500 hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.2em] active:scale-95"
          >
            <Lock size={16} />
            Secure Node Exit
          </button>
        ) : (
          <div className="flex items-center gap-4 animate-in slide-in-from-bottom-6 duration-300">
            <input 
              type="password" 
              maxLength={4}
              placeholder="HASH PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoFocus
              className="bg-white/5 border border-white/20 h-14 w-40 px-6 rounded-2xl text-center font-black text-xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-lns-red transition-all"
            />
            <Button 
              onClick={handleExitAttempt}
              className="bg-lns-red hover:bg-red-700 h-14 px-8 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-lns-red/20 active:scale-95 transition-transform"
            >
              Verify identity
            </Button>
            <button 
              onClick={() => { setShowPinEntry(false); setPin(""); }}
              className="p-3 text-slate-500 hover:text-white bg-white/5 rounded-2xl ml-2"
            >
              <X size={24} />
            </button>
          </div>
        )}

        <div className="absolute right-8 hidden lg:flex items-center gap-3 bg-black/20 px-4 py-2 rounded-xl border border-white/5">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,1)]" />
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ledger Protocol Active</span>
        </div>
      </footer>
    </div>
  );
}
