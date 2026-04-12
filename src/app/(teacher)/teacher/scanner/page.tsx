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
  Zap
} from "lucide-react";

const recentlyScanned = [
  { name: "John Doe", time: "11:24 AM", status: "Success" },
  { name: "Sarah Smith", time: "11:23 AM", status: "Success" },
  { name: "Alex Wong", time: "11:22 AM", status: "Success" },
];

export default function QRScannerPage() {
  const [mode, setMode] = useState<"teacher" | "student">("teacher");
  const [scanning, setScanning] = useState(true);

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">
            QR Scanner
          </h1>
          <p className="text-lns-mid-grey font-medium">
            Register attendance via device camera.
          </p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-lns-border">
          <button
            onClick={() => setMode("teacher")}
            className={cn(
              "px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
              mode === "teacher" ? "bg-lns-navy text-white shadow-lg" : "text-lns-mid-grey hover:bg-lns-light-grey"
            )}
          >
            Staff
          </button>
          <button
            onClick={() => setMode("student")}
            className={cn(
              "px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
              mode === "student" ? "bg-lns-navy text-white shadow-lg" : "text-lns-mid-grey hover:bg-lns-light-grey"
            )}
          >
            Student
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-2xl bg-[#0A1F44] relative overflow-hidden aspect-video flex flex-col items-center justify-center rounded-[3rem]">
            {scanning ? (
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-12">
                <div className="relative">
                  <div className="w-64 h-64 border-4 border-white/20 rounded-[3rem] flex items-center justify-center relative overflow-hidden">
                    <QrCode size={120} className="text-white/40 animate-pulse" />
                    {/* Scanning Line Animation */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-lns-red shadow-[0_0_15px_rgba(214,43,43,1)] animate-scan" />
                  </div>
                  {/* Corner Accents */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-lns-red rounded-tl-xl" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-lns-red rounded-tr-xl" />
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-lns-red rounded-bl-xl" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-lns-red rounded-br-xl" />
                </div>
                
                <p className="text-white font-black uppercase tracking-[0.3em] text-[10px] mt-12 animate-pulse">
                  Establishing Biometric Link...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-6 text-white text-center p-12">
                 <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                    <Camera size={40} className="text-white/40" />
                 </div>
                 <h3 className="text-xl font-bold">Scanner Offline</h3>
                 <p className="text-slate-400 text-sm max-w-xs">Camera node has been terminated. Reactivate to resume attendance processing.</p>
                 <Button onClick={() => setScanning(true)} className="bg-lns-red hover:bg-red-700 text-white border-none h-12 px-8 rounded-xl font-black uppercase tracking-widest text-[10px]">
                   Initialize Camera
                 </Button>
              </div>
            )}
            
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">
                  Cam Source 01: Secure
                </span>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" className="text-white hover:bg-white/10 p-2 h-10 w-10 rounded-xl">
                  <Maximize2 size={18} />
                </Button>
                <Button variant="ghost" className="text-white hover:bg-white/10 p-2 h-10 w-10 rounded-xl">
                  <RefreshCcw size={18} />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-sm bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-lns-light-grey rounded-2xl flex items-center justify-center text-lns-navy">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lns-navy">Manual Entry Hub</h3>
                  <p className="text-xs text-lns-mid-grey">Enter LNS Identity Hash manually.</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="secondary" className="h-12 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest">
                  Override Node
                </Button>
                <Button variant="danger" onClick={() => setScanning(!scanning)}>
                  {scanning ? "Stop Scanner" : "Start Scanner"}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Status */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="border-b border-lns-border/10">
              <CardTitle className="text-sm font-black text-lns-navy uppercase tracking-tight">Session Progress</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-[900] text-lns-navy">24<span className="text-lns-mid-grey text-lg">/32</span></div>
                  <span className="text-xs font-black text-green-600 uppercase tracking-widest">75% Present</span>
                </div>
                <div className="h-2 w-full bg-lns-light-grey rounded-full overflow-hidden">
                  <div className="h-full bg-lns-navy w-3/4 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between border-b border-lns-border/10">
              <CardTitle className="text-sm font-black text-lns-navy uppercase tracking-tight">Recent Scans</CardTitle>
              <UserCheck size={18} className="text-lns-mid-grey" />
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto">
              {recentlyScanned.map((scan, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-lns-light-grey/20 transition-all cursor-pointer border-b border-lns-border/10 last:border-none">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-lns-light-grey flex items-center justify-center font-black text-xs text-lns-navy">
                      {scan.name.split(' ')[0][0]}{scan.name.split(' ')[1][0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-lns-navy">{scan.name}</p>
                      <div className="flex items-center space-x-2 text-[10px] text-lns-mid-grey font-bold uppercase mt-0.5">
                        <Clock size={10} />
                        <span>{scan.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
