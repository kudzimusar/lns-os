"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { 
  QrCode, 
  X, 
  UserCheck, 
  Clock, 
  Camera,
  Maximize2,
  RefreshCcw,
  Zap,
  Monitor,
  ShieldCheck,
  Lock
} from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SealedBadge } from "@/components/blockchain/SealedBadge";
import { BlockchainSealToast } from "@/components/blockchain/BlockchainSealToast";
import { generateMockHash } from "@/lib/blockchain";

const recentlyScanned = [
  { name: "John Doe", time: "11:24 AM", status: "Success" },
  { name: "Sarah Smith", time: "11:23 AM", status: "Success" },
  { name: "Alex Wong", time: "11:22 AM", status: "Success" },
  { name: "Amara Johnson", time: "11:20 AM", status: "Success" },
  { name: "Blake Nkosi", time: "11:18 AM", status: "Success" },
];

export default function QRScannerPage() {
  const [mode, setMode] = useState<"teacher" | "student">("teacher");
  const isLandscape = useMediaQuery("(orientation: landscape) and (min-width: 768px)");
  const [showSealToast, setShowSealToast] = useState(false);
  const [sealDetails, setSealDetails] = useState({ hash: '', timestamp: '' });

  const handleFinalize = () => {
    const hash = generateMockHash();
    const timestamp = new Date().toISOString();
    setSealDetails({ hash, timestamp });
    setShowSealToast(true);
  };

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in duration-500 min-h-full pb-8 px-4 md:px-0">
      {/* Header Section - Tablet Optimized */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 text-center md:text-left">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-lns-navy tracking-tight uppercase">
            Attendance Protocol
          </h1>
          <p className="text-xs md:text-sm text-lns-mid-grey font-medium uppercase tracking-widest">
            Institutional Biometric Verification node.
          </p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-lns-border self-center md:self-end">
          <button
            onClick={() => setMode("teacher")}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all",
              mode === "teacher" ? "bg-lns-navy text-white shadow-lg" : "text-lns-mid-grey hover:bg-lns-light-grey"
            )}
          >
            Staff
          </button>
          <button
            onClick={() => setMode("student")}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all",
              mode === "student" ? "bg-lns-navy text-white shadow-lg" : "text-lns-mid-grey hover:bg-lns-light-grey"
            )}
          >
            Student
          </button>
        </div>
      </div>

      {/* Main Grid: Adapts to Tablet Orientation */}
      <div className={cn(
        "grid gap-6 transition-all duration-300",
        isLandscape ? "grid-cols-2" : "grid-cols-1"
      )}>
        <div className="space-y-6">
          {/* Scanner Viewport - Optimized for Tablet */}
          <Card className={cn(
            "border-none shadow-2xl bg-[#0A1F44] relative overflow-hidden flex flex-col items-center justify-center rounded-2xl md:rounded-[2rem] transition-all",
            isLandscape ? "aspect-square lg:aspect-video h-full" : "aspect-square w-full md:w-[70%] mx-auto"
          )}>
            {scanning ? (
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 md:p-12">
                <div className="relative">
                  <div className="w-48 h-48 md:w-64 md:h-64 border-2 border-white/20 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center relative overflow-hidden">
                    <QrCode size={80} className="text-white/40 animate-pulse md:scale-150" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-lns-red shadow-[0_0_15px_rgba(214,43,43,1)] animate-scan" />
                  </div>
                  {/* Corner Accents - Tablet Specs */}
                  <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-lns-red rounded-tl-xl" />
                  <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-lns-red rounded-tr-xl" />
                  <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-lns-red rounded-bl-xl" />
                  <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-lns-red rounded-br-xl" />
                </div>
                
                <p className="text-white font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px] mt-8 md:mt-12 animate-pulse text-center">
                  Establishing Neural Uplink...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6 text-white text-center p-8 md:p-12">
                 <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-full flex items-center justify-center">
                    <Camera size={30} className="text-white/40 md:scale-125" />
                 </div>
                 <h3 className="text-lg md:text-xl font-bold">Scanner Standby</h3>
                 <p className="text-slate-400 text-[10px] md:text-xs max-w-[200px] leading-relaxed">Camera node offline. Initialize to resume institutional verification.</p>
                 <Button onClick={() => setScanning(true)} className="bg-lns-red hover:bg-red-700 text-white h-12 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-transform shadow-lg shadow-lns-red/20">
                   Initialize Node
                 </Button>
              </div>
            )}
            
            {/* Viewport Controls */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest leading-none">
                  SECURE CONNECTION
                </span>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" className="text-white hover:bg-white/10 p-0 h-10 w-10 rounded-xl active:scale-90">
                  <Maximize2 size={18} />
                </Button>
                <Button variant="ghost" className="text-white hover:bg-white/10 p-0 h-10 w-10 rounded-xl active:scale-90">
                  <RefreshCcw size={18} />
                </Button>
              </div>
            </div>
          </Card>

          {/* Manual Entry - Optimized for Tablet */}
          <Card className="border-none shadow-sm bg-white p-6 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-lns-light-grey rounded-2xl flex items-center justify-center text-lns-navy shrink-0">
                  <Monitor size={24} />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-black text-lns-navy uppercase tracking-tight">Kiosk Console</h3>
                  <p className="text-[10px] text-lns-mid-grey uppercase font-bold tracking-widest">Institutional Overide Access</p>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button variant="secondary" className="flex-1 md:flex-none h-12 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest active:scale-95">
                  Input Hash
                </Button>
                <Button 
                  onClick={() => setScanning(!scanning)}
                  className={cn(
                    "flex-1 md:flex-none h-12 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all text-white",
                    scanning ? "bg-lns-navy" : "bg-lns-red shadow-lg shadow-lns-red/20"
                  )}
                >
                  {scanning ? "Kill Node" : "Boot Node"}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Status Panel - Takes Right Side in Landscape */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-white rounded-2xl">
            <CardHeader className="border-b border-lns-border/5 py-4 px-6 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-black text-lns-navy uppercase tracking-widest">Attendance Quota</CardTitle>
              <Zap size={16} className="text-lns-red" />
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-end justify-between">
                  <div className="text-4xl font-black text-lns-navy tracking-tighter">
                    24<span className="text-lns-mid-grey text-xl font-bold">/32</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Status: Stable</p>
                    <p className="text-xs font-bold text-lns-navy uppercase tracking-tight">75% Synchronized</p>
                  </div>
                </div>
                <div className="h-3 w-full bg-lns-light-grey rounded-full overflow-hidden">
                  <div className="h-full bg-lns-navy w-3/4 rounded-full" />
                </div>
                <Button 
                  onClick={handleFinalize}
                  className="w-full bg-slate-900 text-white hover:bg-black h-12 rounded-xl font-black uppercase tracking-widest text-[9px] active:scale-95 transition-all shadow-xl"
                >
                  <Lock size={14} className="mr-2" /> Lock & Seal Register
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden flex flex-col rounded-2xl h-[440px]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-lns-border/5 py-4 px-6 sticky top-0 bg-white z-10">
              <CardTitle className="text-xs font-black text-lns-navy uppercase tracking-widest">Verified Roll Call</CardTitle>
              <UserCheck size={16} className="text-lns-mid-grey" />
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto scrollbar-hide">
              {recentlyScanned.map((scan, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-lns-light-grey/20 transition-all cursor-pointer border-b border-lns-border/5 last:border-none group active:scale-[0.98] origin-center min-h-[72px]">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-lns-light-grey/50 flex items-center justify-center font-black text-[11px] text-lns-navy border border-lns-navy/5 group-hover:bg-lns-navy group-hover:text-white transition-all shadow-sm">
                      {scan.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-[14px] font-black text-lns-navy uppercase tracking-tight">{scan.name}</p>
                      <div className="flex items-center space-x-2 text-[10px] text-lns-mid-grey font-black uppercase mt-1 tracking-widest">
                        <Clock size={10} className="text-lns-red" />
                        <span>SYNCHRONIZED: {scan.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse" />
                    <SealedBadge hash={generateMockHash()} className="bg-white" />
                  </div>
                </div>
              ))}
              
              <div className="p-8 text-center bg-gray-50/50">
                 <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-[0.2em] opacity-30">End of Synchronized Ledger</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {showSealToast && (
        <BlockchainSealToast 
          message="Attendance Register Sealed"
          hash={sealDetails.hash}
          timestamp={sealDetails.timestamp}
          onClose={() => setShowSealToast(false)}
        />
      )}
    </div>
  );
}
