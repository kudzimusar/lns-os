"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QrCode, X, Camera, ShieldCheck, Zap, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function StudentScanner() {
  const [scanning, setScanning] = useState(true);
  const [scanned, setScanned] = useState(false);

  return (
    <div className="min-h-screen bg-lns-navy flex flex-col p-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <Link href="/student/dashboard">
           <Button variant="outline" className="border-white/20 text-white h-12 w-12 rounded-xl p-0">
              <ArrowLeft size={20} />
           </Button>
        </Link>
        <div className="text-right">
           <p className="text-[10px] font-black uppercase tracking-widest text-lns-red">Student ID: LNS-001</p>
           <h2 className="text-lg font-black text-white uppercase tracking-tight">Biometric Attendance</h2>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-8">
         <div className="relative aspect-square">
            {/* Camera Viewport */}
            <div className="absolute inset-0 bg-black rounded-[3rem] overflow-hidden border-2 border-white/10 relative">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className={cn(
                    "w-64 h-64 border-2 border-dashed rounded-3xl transition-all duration-300",
                    !scanned ? "border-white/50 scale-100" : "border-green-500 scale-90"
                  )} />
                  
                  {!scanned && (
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-[2px] bg-lns-red shadow-[0_0_15px_rgba(214,43,43,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                  )}

                  {scanned && (
                    <div className="bg-green-500 p-8 rounded-full shadow-2xl animate-in zoom-in duration-300">
                       <ShieldCheck size={64} className="text-white" />
                    </div>
                  )}
               </div>

               {/* Overlay Data */}
               <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center space-x-3">
                     <Camera size={20} className="text-lns-red" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-white">Focus Subject QR</span>
                  </div>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-8 w-8">
                     <RefreshCw size={16} />
                  </Button>
               </div>
            </div>
         </div>

         {scanned ? (
           <Card className="border-none shadow-2xl bg-white overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
              <CardContent className="p-8 space-y-6">
                 <div className="text-center space-y-2">
                    <h3 className="text-2xl font-[900] text-lns-navy tracking-tight uppercase">Successfully Logged</h3>
                    <p className="text-sm text-lns-mid-grey font-medium">Your presence in **Maths Lab 4** has been hashed to the secure ledger.</p>
                 </div>
                 <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center justify-between">
                       <span className="text-xs font-bold text-green-700">Triple-Verify Hash</span>
                       <span className="text-[10px] font-mono text-green-600">0x88c2...fa10</span>
                    </div>
                    <Link href="/student/dashboard">
                       <Button className="w-full h-14 bg-lns-navy text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-lns-navy/20">
                          Return to Dashboard
                       </Button>
                    </Link>
                 </div>
              </CardContent>
           </Card>
         ) : (
           <div className="text-center space-y-6">
              <div className="space-y-2">
                 <h4 className="text-white font-[800] tracking-tight text-lg">Position subject QR code</h4>
                 <p className="text-slate-500 text-xs px-12">Point your camera at the overhead projector or classroom door tablet to authenticate.</p>
              </div>
              <Button 
                onClick={() => setScanned(true)}
                className="bg-white/5 border border-white/10 text-white hover:bg-white/10 h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px]"
              >
                 Simulate Scan Detection
              </Button>
           </div>
         )}
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
         <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-700">Triple-Verify Protocol v3.0</p>
      </div>
    </div>
  );
}
