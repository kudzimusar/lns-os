"use client";

import React from "react";
import { 
  ArrowLeft, 
  Megaphone, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Download, 
  Share2, 
  Printer, 
  ScanEye,
  Activity,
  Pin
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";


export default function AnnouncementClient({ params }: { params: { id: string } }) {
  // Mock announcement details based on ID
  const announcement = {
    id: params.id,
    title: 'Term 2 Progress Report Signature Protocol',
    author: 'Principal Marcus Nash',
    date: 'April 12, 2026',
    time: '09:00 AM',
    category: 'Institutional Advisory',
    urgent: true,
    content: `
      All guardians across the LNS OS network are hereby formally notified that the Term 2 Academic Progress Reports have been finalized and are available for review.

      In accordance with our High Authority Integrity Protocol, each report requires a verified digital signature by the primary guardian node before the close of this academic cycle.

      Key Deadlines:
      - Preliminary Review Period: Apr 12 - Apr 14
      - Final Signature Deployment Milestone: Apr 17 (17:00 Terminal Time)

      Failure to synchronize your digital signature may result in a latency flag on the student's personal registry and potential delays in Term 3 synchronization.

      Please access the Child Profile → Official Report Hub to complete this institutional requirement.
    `
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-24 pt-10 px-4">
      {/* Detail Toolbar */}
      <div className="flex items-center justify-between bg-white/50 backdrop-blur-lg p-4 rounded-3xl border border-gray-100 shadow-sm">
         <div className="flex items-center gap-4">
            <Link href="/parent/announcements">
               <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-lns-navy border border-gray-100 h-11 w-11">
                  <ArrowLeft size={18} />
               </Button>
            </Link>
            <div className="flex flex-col">
               <h1 className="text-[9px] font-black text-lns-mid-grey uppercase tracking-widest italic leading-none mb-1">Broadcast ID: {announcement.id}</h1>
               <div className="flex items-center gap-2 text-[10px] font-black text-lns-navy uppercase tracking-widest">
                  <Megaphone size={12} className="text-lns-red" />
                  Live Operational Advisory
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <Button variant="ghost" className="h-10 px-4 rounded-xl text-[8px] font-black uppercase tracking-widest text-lns-mid-grey hover:bg-gray-50 flex items-center gap-2 border border-gray-100">
               <Share2 size={14} />
               Synchronize Link
            </Button>
            <Button variant="ghost" className="h-10 px-4 rounded-xl text-[8px] font-black uppercase tracking-widest text-lns-mid-grey hover:bg-gray-50 flex items-center gap-2 border border-gray-100">
               <Printer size={14} />
               Asset Copy
            </Button>
         </div>
      </div>

      <Card className="p-16 md:p-24 border-none shadow-[0_50px_100px_rgba(0,0,0,0.06)] bg-white rounded-[1rem] space-y-16 overflow-hidden relative">
         {/* Detail Header */}
         <div className="space-y-10 border-b-4 border-lns-navy pb-16">
            <div className="flex items-center justify-between">
               <div className={cn(
                 "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2",
                 announcement.urgent ? "bg-lns-red/10 text-lns-red" : "bg-gray-100 text-lns-navy"
               )}>
                  {announcement.urgent ? <Pin size={12} /> : <ScanEye size={12} />}
                  {announcement.category}
               </div>
               <div className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={12} />
                  {announcement.date} • {announcement.time}
               </div>
            </div>
            
            <div className="space-y-4">
               <h2 className="text-4xl md:text-5xl font-[900] text-lns-navy tracking-tighter leading-tight italic uppercase">{announcement.title}</h2>
               <div className="flex items-center gap-4 text-xs font-bold text-lns-mid-grey">
                  <div className="w-10 h-px bg-lns-red/30" />
                  <span className="uppercase tracking-widest">{announcement.author} • High Authority Clearance</span>
               </div>
            </div>
         </div>

         {/* Content Area */}
         <div className="space-y-10">
            <div className="prose prose-lns max-w-none">
               {announcement.content.split('\n\n').map((para, i) => (
                 <p key={i} className="text-lg leading-loose text-lns-navy font-medium italic opacity-80 mb-8 whitespace-pre-line">
                   {para.trim()}
                 </p>
               ))}
            </div>

            <div className="flex items-center gap-6 p-8 bg-gray-50 rounded-2xl border border-gray-100 animate-in zoom-in duration-700">
               <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-xl flex items-center justify-center text-lns-red shrink-0">
                  <ShieldCheck size={32} />
               </div>
               <div className="space-y-1">
                  <p className="text-sm font-black text-lns-navy uppercase tracking-tight">Institutional Signature Verified</p>
                  <p className="text-[10px] font-bold text-lns-mid-grey italic">This announcement is cryptographically signed and stored within the LNS OS broadcast ledger.</p>
               </div>
            </div>
         </div>

         {/* Backdrop decorations */}
         <Activity className="absolute -bottom-20 -right-20 text-lns-navy/5 w-80 h-80 pointer-events-none" />
         <Megaphone className="absolute -top-10 -left-10 text-lns-red/5 w-64 h-64 pointer-events-none rotate-12" />
      </Card>

      {/* Action Hub */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
         <Link href="/parent/dashboard">
            <Button className="h-16 px-12 bg-white text-lns-navy border-2 border-lns-navy hover:bg-lns-navy hover:text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-navy-600/10 active:scale-95 transition-all">
               Return to Core Command
            </Button>
         </Link>
         <div className="flex items-center gap-3 text-[10px] font-black text-lns-mid-grey italic uppercase tracking-widest">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Synchronization Active
         </div>
      </div>
    </div>
  );
}
