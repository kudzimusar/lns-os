"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  User, 
  Settings, 
  Award, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Download,
  QrCode,
  FileText,
  History
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SealedBadge } from "@/components/blockchain/SealedBadge";
import { generateMockHash } from "@/lib/blockchain";

export default function StudentProfilePage() {
  const student = PLACEHOLDER_STUDENTS[0]; // Self

  const stats = [
    { label: "Grade Index", value: `${student.powerScore}%`, icon: Zap, color: "text-lns-navy" },
    { label: "Attendance", value: "98.4%", icon: Clock, color: "text-green-500" },
    { label: "Merits Earned", value: "450", icon: Award, color: "text-lns-red" },
    { label: "Citizenship", value: student.citizenship, icon: ShieldCheck, color: "text-green-600" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Profile Header */}
      <Card className="p-8 border-none shadow-xl bg-white rounded-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-8">
            <Link href="/student/profile/edit">
               <Button variant="ghost" size="icon" className="h-10 w-10 text-lns-mid-grey hover:text-lns-navy rounded-xl border border-gray-100 bg-white shadow-sm">
                  <Settings size={20} />
               </Button>
            </Link>
         </div>

         <div className="flex flex-col md:flex-row items-center gap-10 md:items-start relative z-10">
            <div className="relative">
               <div className="w-32 h-32 rounded-2xl bg-lns-navy flex items-center justify-center text-white text-5xl font-black shadow-2xl overflow-hidden border-4 border-white">
                  {student.name.charAt(0)}
                  {/* Ideally an image here */}
               </div>
               <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-gray-50 hover:scale-110 transition-transform cursor-pointer">
                  <Link href="/student/qr-code">
                    <QrCode size={24} className="text-lns-navy" />
                  </Link>
               </div>
            </div>

            <div className="text-center md:text-left space-y-2">
               <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight">{student.name}</h1>
               <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-lns-mid-grey">
                  <span className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100">{student.idNumber}</span>
                  <span className="px-3 py-1 rounded-full bg-lns-navy/5 text-lns-navy border border-lns-navy/10">{student.class}</span>
                  <span className="flex items-center gap-1 text-green-600">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                     Verified Institutional Record
                  </span>
               </div>
            </div>
         </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
         {stats.map((stat, i) => (
           <Card key={i} className="p-6 border-none shadow-sm bg-white rounded-[2rem] space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                 <stat.icon size={20} className={stat.color} />
                 <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">{stat.label}</span>
              </div>
              <p className="text-2xl font-black text-lns-navy">{stat.value}</p>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Content Column */}
         <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 border-none shadow-sm bg-white rounded-2xl space-y-6">
               <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy">Institutional Insight (AI)</h3>
               <p className="text-lns-navy/70 leading-relaxed text-sm italic">
                  "{student.name} demonstrates high analytical capabilities, particularly in {student.class}. Their recent performance in Mathematics shows an 8% improvement trajectory. Maintaining a high citizenship score (Platinum) has contributed positively to their Power Score. Recommendation: Increase humanities engagement to broaden the graduation index."
               </p>
            </Card>

            {/* Recent Activity/Timeline */}
            <div className="space-y-4">
               <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy px-4 flex items-center gap-2">
                  <History size={16} />
                  Registry Audit
               </h3>
               <div className="space-y-3">
                  {[
                    { type: 'Attendance', detail: 'Math 7A: Present', date: 'Today, 09:15', icon: ShieldCheck, color: 'text-green-500', hash: generateMockHash() },
                    { type: 'Grade', detail: 'Project Alpha: 94%', date: 'Yesterday, 14:30', icon: Zap, color: 'text-lns-red', hash: generateMockHash() },
                    { type: 'Merit', detail: 'Outstanding Collaboration', date: 'High Command, 10 Apr', icon: Award, color: 'text-lns-navy', hash: generateMockHash() },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-50 shadow-sm hover:translate-x-1 transition-transform cursor-pointer group">
                       <div className={cn("p-2 rounded-xl bg-gray-50", log.color)}>
                          <log.icon size={20} />
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-lns-navy truncate">{log.detail}</p>
                          <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-widest">{log.type} • {log.date}</p>
                       </div>
                       <SealedBadge hash={log.hash} />
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Sidebar Content */}
         <div className="space-y-6">
            <Card className="p-8 border-none shadow-xl bg-lns-navy text-white rounded-2xl space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Institutional Repository</h3>
               <div className="space-y-3">
                  {[
                    { name: 'Study-Permit-2026.pdf', size: '1.2MB' },
                    { name: 'Report-Card-Term-1.pdf', size: '2.4MB' },
                    { name: 'Identity-Hashed-Cert.pdf', size: '0.8MB' },
                  ].map((file, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer border border-white/5">
                       <FileText size={18} className="text-lns-red" />
                       <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold truncate">{file.name}</p>
                          <div className="flex items-center gap-2">
                             <p className="text-[8px] font-medium text-slate-500">{file.size}</p>
                             <span className="text-[7px] font-mono text-slate-400 bg-white/5 px-1 rounded uppercase tracking-tighter">HASH:{generateMockHash().slice(0, 8)}</span>
                          </div>
                       </div>
                       <Download size={14} className="text-white/20 group-hover:text-white transition-colors" />
                    </div>
                  ))}
               </div>
               <Link href="/student/documents" className="block">
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl h-12 text-[10px] font-black uppercase tracking-widest border border-white/10">
                    View Master Repository
                  </Button>
               </Link>
            </Card>

            <Card className="p-8 border-none shadow-sm bg-white rounded-2xl space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey">Refined Traits</h3>
               <div className="flex flex-wrap gap-2">
                  {["Analytical", "Collaborator", "Pioneer", "Resilient"].map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-gray-50 text-lns-navy text-[10px] font-black uppercase tracking-widest border border-gray-100">
                       {tag}
                    </span>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
