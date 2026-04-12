"use client";

import React from "react";
import { 
  ArrowLeft, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  Zap, 
  Activity, 
  TrendingUp, 
  Clock, 
  MoreVertical,
  Plus,
  Star,
  Globe,
  Wallet,
  Building,
  Layers,
  MapPin,
  Lock,
  Cpu,
  Monitor,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SealedBadge } from "@/components/blockchain/SealedBadge";
import { generateMockHash } from "@/lib/blockchain";

const TEACHERS = [
  { id: 'tea-001', name: 'James Okafor', subject: 'Mathematics', sessions: 12, status: 'Synced', email: 'j.okafor@lns.edu' },
];

export async function generateStaticParams() {
  return TEACHERS.map(t => ({ id: t.id }));
}

export default function AdminTeacherDetailPage({ params }: { params: { id: string } }) {
  const teacher = TEACHERS.find(t => t.id === params.id) || TEACHERS[0];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24 pt-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/admin/users/teachers" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-lns-navy transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Faculty Registry
            </Link>
            <h1 className="text-5xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-6">
               <Layers size={48} className="text-lns-red" />
               Faculty Node: {teacher.name}
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] italic tracking-tight">Lead Faculty Node {teacher.id?.toUpperCase()} • {teacher.subject} Command</p>
         </div>

         <div className="flex items-center space-x-3">
            <Button variant="outline" className="h-14 bg-white border-gray-100 rounded-2xl px-8 font-black uppercase tracking-widest text-[10px] shadow-sm">
               Audit Sessions
            </Button>
            <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-3">
               Edit Personnel Data
               <Zap size={18} />
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Main Identity Info (66%) */}
         <div className="lg:col-span-2 space-y-12">
            
            {/* Payroll & Sessions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card className="p-10 border-none shadow-2xl bg-lns-navy text-white rounded-[3.5rem] space-y-8 relative overflow-hidden group">
                  <div className="relative z-10 space-y-6">
                     <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Faculty Payroll Node</h3>
                        <Wallet size={20} className="text-lns-red" />
                     </div>
                     <div className="space-y-1">
                        <p className="text-5xl font-[900] tracking-tighter italic">£4,850.00</p>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Monthly Compensation Sync</p>
                     </div>
                     <div className="pt-4 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                           <span className="text-[9px] font-black uppercase text-slate-400 italic">Tax Code: 1257L</span>
                           <span className="text-[9px] font-black text-green-400 uppercase">SYNCHRONIZED</span>
                        </div>
                        <Button className="w-full h-12 bg-white text-lns-navy hover:bg-lns-red hover:text-white rounded-xl font-black uppercase text-[10px]">Generate Payslip Token</Button>
                     </div>
                  </div>
                  <Cpu size={200} className="absolute -bottom-20 -right-20 text-white/5 pointer-events-none group-hover:scale-110 transition-transform" />
               </Card>

               <Card className="p-10 border-none shadow-2xl bg-white rounded-[3.5rem] space-y-8 relative overflow-hidden group">
                  <div className="relative z-10 space-y-6">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy italic">Assigned Curriculum Nodes</h3>
                     <div className="space-y-3">
                        {["Grade 7 Mathematics", "AS Level Calculus", "IGCSE Pure Math"].map(node => (
                           <div key={node} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group-hover:bg-white hover:shadow-xl transition-all">
                              <span className="text-sm font-black text-lns-navy italic">{node}</span>
                              <div className="w-8 h-8 rounded-lg bg-lns-navy/5 text-lns-navy flex items-center justify-center"><ChevronRight size={14}/></div>
                           </div>
                        ))}
                     </div>
                     <Button variant="outline" className="w-full h-12 border-dashed border-2 border-gray-100 rounded-xl font-black uppercase text-[9px] text-slate-300">Deploy New Assignment</Button>
                  </div>
                  <Building size={140} className="absolute -bottom-10 -right-10 text-black/5 pointer-events-none group-hover:scale-110 transition-transform" />
               </Card>
            </div>

            {/* Performance Matrix */}
            <div className="space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-8 italic flex items-center gap-4">
                  <Activity size={18} className="text-lns-red" />
                  Academic Excellence Ledger
               </h3>
               <Card className="p-10 border-none shadow-xl bg-white rounded-[3.5rem] space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {[
                       { label: "Session Punctuality", val: "99.8%", icon: Clock, color: "text-green-500" },
                       { label: "Ledger Accuracy", val: "Verified", icon: ShieldCheck, color: "text-blue-500" },
                       { label: "Student Feedback", val: "4.8/5", icon: Star, color: "text-amber-500" },
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

         {/* Sidebar Bio (33%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-1 flex flex-col items-center text-center">
                     <div className="w-32 h-32 rounded-2xl bg-lns-red text-white flex items-center justify-center text-5xl font-black shadow-2xl mb-8 group-hover:-rotate-6 transition-transform">
                        {teacher.name.charAt(0)}
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Faculty Status</p>
                     <h4 className="text-3xl font-black italic uppercase leading-none tracking-tight text-white">ACTIVE NODE</h4>
                  </div>
                  <div className="pt-6 border-t border-white/10 space-y-6">
                     <div className="flex items-center gap-4">
                        <Mail size={18} className="text-lns-red" />
                        <span className="text-xs font-bold text-slate-300">{teacher.email}</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <Phone size={18} className="text-lns-red" />
                        <span className="text-xs font-bold text-slate-300">+44 7722 000122</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <MapPin size={18} className="text-lns-red" />
                        <span className="text-xs font-bold text-slate-300">Dept. Mathematics Hub</span>
                     </div>
                  </div>
               </div>
               <Globe className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none group-hover:scale-125 transition-transform" />
            </Card>

            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic">Security Clearance</h3>
                  <Lock size={18} className="text-green-500" />
               </div>
               <div className="space-y-4 pt-4">
                  {[
                    { label: "Enhanced DBS: Verified", hash: generateMockHash() },
                    { label: "Faculty Appointment", hash: generateMockHash() },
                    { label: "System Access: High", hash: generateMockHash() }
                  ].map((act, i) => (
                    <div key={i} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 group cursor-pointer transition-all hover:border-lns-navy hover:bg-white">
                       <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-lns-navy">{act.label}</span>
                          <ShieldCheck size={14} className="text-green-500" />
                       </div>
                       <SealedBadge hash={act.hash} />
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
