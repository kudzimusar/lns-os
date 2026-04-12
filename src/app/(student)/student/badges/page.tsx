"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Award, 
  ShieldCheck, 
  Star, 
  Zap, 
  Users, 
  Globe, 
  Target,
  ArrowLeft,
  ChevronRight,
  Download
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BADGES = [
  { id: 'b1', name: 'Elite Analyst', category: 'Academic', description: 'Consistently achieved MYP 7+ across all 3 terms.', icon: Zap, color: 'text-lns-navy', bg: 'bg-lns-navy/10', unlocked: true },
  { id: 'b2', name: 'Campus Catalyst', category: 'Citizenship', description: 'Awarded for exceptional collaboration in student government.', icon: Users, color: 'text-lns-red', bg: 'bg-lns-red/10', unlocked: true },
  { id: 'b3', name: 'Data Pioneer', category: 'Technical', description: 'First student to verify 100+ institutional records on-chain.', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50', unlocked: true },
  { id: 'b4', name: 'Unwavering Duty', category: 'Attendance', description: 'Maintained 100% attendance index for the current semester.', icon: Target, color: 'text-green-600', bg: 'bg-green-50', unlocked: true },
];

const LOCKED_BADGES = [
  { id: 'l1', name: 'Master of Synthesis', category: 'Academic', requirement: 'Publish a peer-reviewed article in the school journal.', icon: Star },
  { id: 'l2', name: 'Legacy Warden', category: 'Citizenship', requirement: 'Hold a leadership position for 3 consecutive terms.', icon: ShieldCheck },
];

export default function BadgesGalleryPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div className="space-y-2">
            <Link href="/student/profile" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-2">
               <ArrowLeft size={14} />
               Back to Profile Record
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight">Achievement Repository</h1>
            <p className="text-lns-mid-grey font-medium text-sm">Verified individual merits and digital badge signatures.</p>
         </div>

         <div className="flex flex-col items-end">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey mb-2">Institutional Rank</div>
            <div className="bg-lns-navy text-white px-6 py-4 rounded-3xl flex items-center gap-4 shadow-xl shadow-navy-600/20 group cursor-default">
               <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-lns-red shadow-inner">
                     <Award size={28} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-lns-navy" />
               </div>
               <div>
                  <h4 className="text-lg font-black leading-none">Pioneer Class</h4>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">450 Merits Accumulation</p>
               </div>
            </div>
         </div>
      </div>

      {/* Unlocked Section */}
      <div className="space-y-6">
         <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4">Unlocked Merits</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BADGES.map((badge) => (
              <Card key={badge.id} className="p-8 border-none shadow-xl bg-white rounded-2xl flex flex-col items-center justify-center text-center gap-6 group hover:translate-y-[-8px] transition-transform duration-500">
                 <div className={cn("w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500", badge.bg, badge.color)}>
                    <badge.icon size={40} />
                 </div>
                 <div className="space-y-2">
                    <p className={cn("text-[10px] font-black tracking-widest uppercase", badge.color)}>{badge.category}</p>
                    <h4 className="text-lg font-black text-lns-navy leading-tight">{badge.name}</h4>
                    <p className="text-xs text-lns-mid-grey leading-relaxed">{badge.description}</p>
                 </div>
                 <Button variant="ghost" className="h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-lns-navy hover:bg-gray-50 flex items-center gap-2">
                    <Download size={14} />
                    Audit Cert
                 </Button>
              </Card>
            ))}
         </div>
      </div>

      {/* Locked Section */}
      <div className="space-y-6 opacity-60">
         <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4">Developing Milestones</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LOCKED_BADGES.map((badge) => (
              <div key={badge.id} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-8 relative overflow-hidden group">
                 <div className="w-16 h-16 rounded-[1.5rem] bg-gray-100 flex items-center justify-center text-gray-300">
                    <badge.icon size={28} />
                 </div>
                 <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                       <h4 className="text-sm font-black text-gray-400 uppercase tracking-tight">{badge.name}</h4>
                    </div>
                    <p className="text-xs text-gray-400 font-medium italic">Mission: {badge.requirement}</p>
                 </div>
                 <div className="h-px w-20 bg-gray-200" />
                 <ChevronRight size={20} className="text-gray-200" />
              </div>
            ))}
         </div>
         <div className="text-center pt-8">
            <p className="text-[10px] font-bold text-lns-mid-grey italic">Complete academic and citizenship objectives to unlock more merits.</p>
         </div>
      </div>
    </div>
  );
}
