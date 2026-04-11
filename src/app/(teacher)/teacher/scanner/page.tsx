"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
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
import { cn } from "@/lib/utils";

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
              "px-4 py-2 rounded-lg text-xs font-bold transition-all",
              mode === "teacher" ? "bg-lns-navy text-white" : "text-lns-mid-grey"
            )}
          >
            Teacher Scan
          </button>
          <button
            onClick={() => setMode("student")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-bold transition-all",
              mode === "student" ? "bg-lns-navy text-white" : "text-lns-mid-grey"
            )}
          >
            Self-Scan Mode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Scanner Viewport */}
        <div className="lg:col-span-2 relative">
          <Card className="h-full min-h-[400px] border-none shadow-xl bg-black rounded-3xl overflow-hidden relative group">
            {/* Camera Simulation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                "w-64 h-64 border-2 border-dashed rounded-3xl transition-all duration-300",
                scanning ? "border-lns-red animate-pulse scale-100" : "border-white/20 scale-95"
              )} />
              
              {/* Scan Line */}
              {scanning && (
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-[2px] bg-lns-red shadow-[0_0_15px_rgba(214,43,43,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
              )}
            </div>

            {/* Overlay UI */}
            <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
              <div className="bg-lns-navy/80 backdrop-blur-md px-4 py-2 rounded-xl text-white border border-white/10 flex items-center space-x-3">
                <div className="w-2 h-2 bg-lns-red rounded-full animate-pulse" />
                <span className="text-[10px] uppercase font-[800] tracking-widest">Live Camera Feed</span>
              </div>
              <Button size="icon" variant="ghost" className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20">
                <Maximize2 size={20} />
              </Button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-green-600/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-[10px] font-bold flex items-center">
                  <Zap size={14} className="mr-1.5" />
                  SYNCING TO CHAIN
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20">
                  <RefreshCcw size={18} className="mr-2" />
                  Flip Camera
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
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm">Session Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-[800] text-lns-navy">24<span className="text-lns-mid-grey text-lg">/32</span></div>
                  <span className="text-xs font-bold text-green-600">75% Present</span>
                </div>
                <div className="h-2 w-full bg-lns-light-grey rounded-full overflow-hidden">
                  <div className="h-full bg-lns-navy w-3/4 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm h-full max-h-[400px] overflow-hidden flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Recent Scans</CardTitle>
              <UserCheck size={18} className="text-lns-mid-grey" />
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pt-0">
              <div className="space-y-4">
                {recentlyScanned.map((scan, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-lns-light-grey/50 border border-lns-border/30 animate-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-lns-navy text-white text-[10px] font-bold flex items-center justify-center">
                        {scan.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-lns-navy">{scan.name}</p>
                        <p className="text-[10px] text-lns-mid-grey font-semibold uppercase">{scan.time}</p>
                      </div>
                    </div>
                    <div className="text-green-600">
                      <CheckCircleIcon size={18} />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-[10px] font-bold uppercase tracking-widest text-lns-navy">
                View Register
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CheckCircleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
