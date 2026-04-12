"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Megaphone, 
  Clock, 
  ChevronRight, 
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Bell,
  Star,
  Info,
  Pin
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ANNOUNCEMENTS = [
  { id: 'ann-001', title: 'Term 2 Progress Report Signature Protocol', type: 'Critical', date: 'Today, 09:00 AM', preview: 'All guardians are required to digitally sign the Term 2 reports by Friday 17:00...', category: 'Academic', urgent: true },
  { id: 'ann-002', title: 'Parent-Teacher Council: April Cycle', type: 'Meeting', date: 'Yesterday, 14:30 PM', preview: 'The upcoming PTC will be held in the High Authority Auditorium. Attendance via terminal is also supported...', category: 'Community', urgent: false },
  { id: 'ann-003', title: 'Campus Security Synchronization', type: 'Security', date: 'Apr 10, 2026', preview: 'New QR gateway nodes have been deployed in Block B as part of the LNS OS v1.4 infrastructure update...', category: 'Institutional', urgent: false },
  { id: 'ann-004', title: 'Holistic Arts Exhibition: Call for Entries', type: 'Event', date: 'Apr 08, 2026', preview: 'Students are invited to submit their digital and physical assets for the annual inter-disciplinary showcase...', category: 'Student Life', urgent: false },
];

export default function ParentAnnouncementsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 pt-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/parent/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Family Command
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <Megaphone size={32} className="text-lns-red" />
               Institutional Broadcast Center
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Official family communications and advisory updates.</p>
         </div>

         <div className="flex items-center bg-gray-50 p-2 rounded-2xl border border-gray-100 shadow-inner">
            <Button variant="ghost" className="h-10 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest text-lns-navy bg-white shadow-sm">All Intel</Button>
            <Button variant="ghost" className="h-10 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest text-lns-mid-grey hover:bg-gray-100">Unread Logs</Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main List Column */}
         <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
               {ANNOUNCEMENTS.map((item) => (
                 <Link key={item.id} href={`/parent/announcements/${item.id}`} className="block">
                    <Card className={cn(
                      "p-8 border-none shadow-xl rounded-2xl group hover:translate-x-2 transition-transform cursor-pointer relative overflow-hidden",
                      item.urgent ? "bg-white border-l-8 border-lns-red" : "bg-white"
                    )}>
                       <div className="flex items-start justify-between relative z-10">
                          <div className="flex items-start gap-6">
                             <div className={cn(
                               "w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform",
                               item.urgent ? "bg-lns-red/5 text-lns-red" : "bg-lns-navy/5 text-lns-navy"
                             )}>
                                {item.urgent ? <Bell size={24} /> : <Info size={24} />}
                             </div>
                             <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                   <h4 className={cn("text-lg font-black leading-tight group-hover:text-lns-red transition-colors", item.urgent ? "text-lns-navy" : "text-slate-800")}>{item.title}</h4>
                                   {item.urgent && <Pin size={16} className="text-lns-red animate-pulse" />}
                                </div>
                                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-lns-mid-grey italic">
                                   <Clock size={12} />
                                   {item.date} • {item.category}
                                </div>
                                <p className="text-xs text-lns-mid-grey leading-relaxed pr-8 line-clamp-2 italic font-medium">"{item.preview}"</p>
                             </div>
                          </div>
                          <ChevronRight size={24} className="text-gray-200 group-hover:text-lns-navy transition-colors shrink-0" />
                       </div>
                    </Card>
                 </Link>
               ))}
            </div>

            <Button variant="outline" className="w-full h-16 border-2 border-dashed border-gray-100 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-lns-mid-grey hover:bg-gray-50 flex items-center gap-2">
               Access Historic Communication Logs
               <Calendar size={16} />
            </Button>
         </div>

         {/* Sidebar / Advisory Hub */}
         <div className="space-y-8">
            <Card className="p-8 border-none shadow-2xl bg-lns-navy text-white rounded-2xl space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">High Authority Intel</p>
                     <h4 className="text-2xl font-black tracking-tight italic uppercase leading-none">Security Briefing</h4>
                  </div>
                  <div className="space-y-4">
                     {[
                       { label: "Infrastructure Update", version: "v1.4.2", health: "99.8%" },
                       { label: "Attendance Protocol", version: "Verified", health: "Active" },
                     ].map((node, i) => (
                       <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                          <div className="space-y-0.5">
                             <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">Institutional System Node</p>
                             <p className="text-[10px] font-black uppercase tracking-widest">{node.label}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-black text-lns-red uppercase italic">{node.health}</p>
                             <p className="text-[8px] font-bold text-slate-500 uppercase">{node.version}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-green-500 italic uppercase">
                     <ShieldCheck size={18} />
                     Blockchain Synchronized
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80" />
            </Card>

            <Card className="p-8 border-none shadow-xl bg-[#FFFBF0] rounded-2xl space-y-4 border border-amber-100">
               <div className="flex items-center gap-3 text-amber-900 border-b border-amber-200 pb-4">
                  <Star size={20} className="text-amber-500" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Portal Support Assets</h3>
               </div>
               <div className="space-y-3">
                  {["Guardian Guide PDF", "QR Identity Standards", "Institutional Calendar Cycle"].map((act, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] font-black text-amber-900/60 uppercase group cursor-pointer hover:text-amber-900">
                       {act}
                       <ChevronRight size={14} className="text-amber-200" />
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
