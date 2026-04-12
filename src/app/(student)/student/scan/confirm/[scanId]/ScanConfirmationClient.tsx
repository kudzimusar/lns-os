"use client";

import React from "react";
import { CheckCircle2, MapPin, Clock, Calendar, ArrowRight, User, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

    { scanId: 'scan-eng-7a' },
    { scanId: 'scan-sci-8b' },
  ];
export default function ScanConfirmationClient({ params }: { params: { scanId: string } }) {
  // Mock scan data
  const scanDetails = {
    location: "Block B, Room 204",
    subject: "Advanced Mathematics",
    teacher: "Mr. James Okafor",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: "Verified",
    hash: "sha256:7f8d9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f"
  };

  return (
    <div className="h-screen -m-4 md:-m-6 lg:-m-8 bg-white flex flex-col items-center justify-center p-8 space-y-12 animate-in fade-in zoom-in-95 duration-700">
      {/* Top Status */}
      <div className="relative group">
         <div className="absolute inset-0 bg-green-500/20 blur-[80px] rounded-full animate-pulse" />
         <div className="relative w-32 h-32 rounded-full bg-green-500 flex items-center justify-center text-white shadow-2xl shadow-green-600/30">
            <CheckCircle2 size={64} className="animate-in slide-in-from-bottom-4 duration-500" />
         </div>
      </div>

      <div className="text-center space-y-4">
         <h1 className="text-4xl md:text-5xl font-[900] text-lns-navy tracking-tighter leading-tight">Attendance Synchronized</h1>
         <p className="text-xl text-lns-mid-grey">Your presence in <span className="text-lns-navy font-black">"{scanDetails.subject}"</span> has been logged.</p>
      </div>

      <Card className="p-8 border-none shadow-2xl bg-white rounded-2xl w-full max-w-xl space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey">Location Node</p>
               <div className="flex items-center gap-2 text-lns-navy font-bold">
                  <MapPin size={16} className="text-lns-red" />
                  {scanDetails.location}
               </div>
            </div>
            <div className="space-y-1">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey">Terminal Status</p>
               <div className="flex items-center gap-2 text-green-600 font-black">
                  <ShieldCheck size={16} />
                  {scanDetails.status}
               </div>
            </div>
            <div className="space-y-1">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey">Subject Authority</p>
               <div className="flex items-center gap-2 text-lns-navy font-bold">
                  <User size={16} className="text-lns-mid-grey" />
                  {scanDetails.teacher}
               </div>
            </div>
            <div className="space-y-1">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey">Arrival Delta</p>
               <div className="flex items-center gap-2 text-lns-navy font-bold">
                  <Clock size={16} className="text-lns-mid-grey" />
                  {scanDetails.timestamp}
               </div>
            </div>
         </div>

         <div className="pt-8 border-t border-gray-50 flex flex-col gap-4">
            <div className="text-center">
               <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey mb-2 line-clamp-1">Blockchain Hash: {scanDetails.hash}</p>
            </div>
            <Link href="/student/dashboard">
               <Button className="w-full bg-lns-navy text-white hover:bg-lns-red h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center justify-center gap-3">
                  Return to Hub Monitoring
                  <ArrowRight size={20} />
               </Button>
            </Link>
         </div>
      </Card>

      <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey/40">
         <div className="flex items-center gap-2">
            <Calendar size={14} />
            April 2026 Cycle
         </div>
         <div>
            LNS OS Attendance Protocol v1.4
         </div>
      </div>
    </div>
  );
}
