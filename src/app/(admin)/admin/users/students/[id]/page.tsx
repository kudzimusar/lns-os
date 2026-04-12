"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { 
  ArrowLeft, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Activity, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Plus,
  Zap,
  Star,
  Globe,
  Wallet,
  Building,
  Heart
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map(s => ({ id: s.id }));
}

export default function AdminStudentDetailPage({ params }: { params: { id: string } }) {
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === params.id) || PLACEHOLDER_STUDENTS[0];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24 pt-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/admin/users/students" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-lns-navy transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Student Registry
            </Link>
            <h1 className="text-5xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-6">
               <User size={48} className="text-lns-red" />
               Node Profile: {student.name}
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] italic tracking-tight">Institutional Enrollment Node {student.idNumber} • Grade {student.grade}A</p>
         </div>

         <div className="flex items-center space-x-3">
            <Button variant="outline" className="h-14 bg-white border-gray-100 rounded-2xl px-8 font-black uppercase tracking-widest text-[10px] shadow-sm">
               Audit Ledger
            </Button>
            <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-3">
               Edit Institutional Data
               <Zap size={18} />
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Main Identity Info (66%) */}
         <div className="lg:col-span-2 space-y-12">
            
            {/* Identity & Contact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card className="p-10 border-none shadow-2xl bg-white rounded-[3.5rem] space-y-8 relative overflow-hidden group">
                  <div className="relative z-10 space-y-6">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy italic">Primary Guardian Hub</h3>
                     <div className="space-y-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-lns-navy"><Heart size={20}/></div>
                           <div>
                              <p className="text-sm font-black text-lns-navy italic">Mrs. Elena {student.name.split(' ')[1]}</p>
                              <p className="text-[9px] font-black uppercase text-slate-400">Mother / Primary Node</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-lns-navy"><Phone size={20}/></div>
                           <p className="text-sm font-black text-lns-navy italic">+44 7700 900244</p>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-lns-navy"><MapPin size={20}/></div>
                           <p className="text-sm font-black text-lns-navy italic opacity-70">14 Academic Square, London</p>
                        </div>
                     </div>
                  </div>
                  <Building size={140} className="absolute -bottom-10 -right-10 text-black/5 pointer-events-none group-hover:scale-110 transition-transform" />
               </Card>

               <Card className="p-10 border-none shadow-2xl bg-lns-navy text-white rounded-[3.5rem] space-y-8 relative overflow-hidden group">
                  <div className="relative z-10 space-y-6">
                     <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Financial Synchronization</h3>
                        <Wallet size={20} className="text-lns-red" />
                     </div>
                     <div className="space-y-1">
                        <p className="text-5xl font-[900] tracking-tighter italic">£2,450.00</p>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Current Balance Cycle</p>
                     </div>
                     <div className="pt-4 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                           <span className="text-[9px] font-black uppercase text-slate-400 italic">Auto-Pay Node</span>
                           <span className="text-[9px] font-black text-green-400 uppercase">ACTIVE</span>
                        </div>
                        <Button className="w-full h-12 bg-white text-lns-navy hover:bg-lns-red hover:text-white rounded-xl font-black uppercase text-[10px]">View Ledger Details</Button>
                     </div>
                  </div>
                  <TrendingUp size={200} className="absolute -bottom-20 -right-20 text-white/5 pointer-events-none group-hover:scale-110 transition-transform" />
               </Card>
            </div>

            {/* Academic Resonance Feed */}
            <div className="space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-8 italic flex items-center gap-4">
                  <Activity size={18} className="text-lns-red" />
                  Cohort Persistence Feed
               </h3>
               <Card className="p-10 border-none shadow-xl bg-white rounded-[3.5rem] space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {[
                       { label: "Attendance Node", val: "94.2%", icon: Clock, color: "text-green-500" },
                       { label: "Behavioral Hash", val: "Clean", icon: ShieldCheck, color: "text-blue-500" },
                       { label: "Grade Resonance", val: "IB/MYP 6.4", icon: Star, color: "text-amber-500" },
                     ].map((stat, i) => (
                       <div key={i} className="space-y-2 group cursor-pointer">
                          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110", "bg-gray-50", stat.color)}>
                             <stat.icon size={24} />
                          </div>
                          <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
                          <p className="text-xl font-black text-lns-navy italic tracking-tight">{stat.val}</p>
                       </div>
                     ))}
                  </div>
               </Card>
            </div>
         </div>

         {/* Sidebar Intel (33%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-1 flex flex-col items-center text-center">
                     <div className="w-32 h-32 rounded-2xl bg-white text-lns-navy flex items-center justify-center text-5xl font-black shadow-2xl mb-8 group-hover:rotate-6 transition-transform">
                        {student.name.charAt(0)}
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Institutional Status</p>
                     <h4 className="text-3xl font-black italic uppercase leading-none tracking-tight text-green-500">FULLY SYNCED</h4>
                  </div>
                  <div className="pt-6 border-t border-white/10 space-y-4">
                     <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                        <span>Identity Lock</span>
                        <span className="text-white">Active</span>
                     </div>
                     <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                        <span>Lattice Visibility</span>
                        <span className="text-white">High</span>
                     </div>
                  </div>
               </div>
               <Globe className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none group-hover:scale-125 transition-transform" />
            </Card>

            <div className="p-8 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200 flex flex-col items-center gap-6 text-center">
               <AlertCircle size={32} className="text-amber-500 animate-pulse" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-900 leading-relaxed italic pr-4 pl-4">
                  NOTE: INDIVIDUAL EDUCATIONAL PROVISION (IEP) NODE DETECTED. ACCESS SECURITY LAYER 2 FOR DETAILS.
               </p>
               <Link href={`/admin/users/students/${student.id}/iep`}>
                  <Button variant="ghost" className="text-[10px] font-black uppercase text-amber-600 hover:text-white hover:bg-amber-600 h-10 px-6 rounded-xl transition-all">Audit IEP Node</Button>
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
}
