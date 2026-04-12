"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS, PLACEHOLDER_TEACHERS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  Award, 
  AlertCircle, 
  Star, 
  ShieldCheck, 
  TrendingUp, 
  History,
  Info,
  ChevronRight,
  MoreVertical,
  Activity,
  Zap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ChildBehaviourClient({ params }: { params: { studentId: string } }) {
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === params.studentId) || PLACEHOLDER_STUDENTS[0];

  const interactions = [
    { type: 'Merit', points: '+10', title: 'Exceptional Peer Leadership', teacher: 'Ms. Sarah Chen', subject: 'Communications (English)', date: '2026-04-10', comment: 'Demonstrated outstanding empathy and clarity during the debate session.', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
    { type: 'Merit', points: '+5', title: 'Calculus Precision', teacher: 'Mr. James Okafor', subject: 'Mathematics', date: '2026-04-05', comment: 'Consistent accuracy in the complex imaginary numbers module.', icon: Zap, color: 'text-lns-navy', bg: 'bg-lns-navy/10' },
    { type: 'Notice', points: '0', title: 'Resource Readiness', teacher: 'System Node IV', subject: 'Library Hub', date: '2026-03-28', comment: 'Returned all technical assets before the term deadline.', icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
    { type: 'Incident', points: '-2', title: 'Terminal Latency', teacher: 'Security Gateway 7', subject: 'Campus Entrance', date: '2026-03-15', comment: 'Late Arrival (5 mins) without valid institutional clearance.', icon: AlertCircle, color: 'text-lns-red', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href={`/parent/child/${params.studentId}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Child Profile
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <Award size={32} className="text-amber-500" />
               Institutional Merit Log
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic">{student.name} • Citizenship Rank: {student.citizenship}</p>
         </div>

         <div className="flex flex-col items-end">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey mb-2">Merit Accumulator</div>
            <div className="bg-lns-navy text-white px-8 py-4 rounded-3xl flex items-center gap-4 shadow-xl shadow-navy-600/20 group cursor-default">
               <div className="text-4xl font-black text-white italic">450</div>
               <div className="h-8 w-px bg-white/20" />
               <div className="text-right">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</p>
                  <p className="text-lg font-black text-white leading-none uppercase italic">Elite</p>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Behaviour Timeline */}
         <div className="lg:col-span-2 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 flex items-center gap-2 italic">
               <History size={16} />
               Verified Variance Timeline (Term 2)
            </h3>
            
            <div className="space-y-3">
               {interactions.map((node, i) => (
                 <Card key={i} className="p-8 border-none shadow-xl bg-white rounded-2xl group hover:translate-x-2 transition-transform cursor-pointer overflow-hidden relative">
                    <div className="flex items-start justify-between relative z-10">
                       <div className="flex items-start gap-6">
                          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", node.bg, node.color)}>
                             <node.icon size={24} />
                          </div>
                          <div className="space-y-1">
                             <div className="flex items-center gap-2">
                                <h4 className="text-lg font-black text-lns-navy group-hover:text-lns-red transition-all">{node.title}</h4>
                                <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest italic", node.bg, node.color)}>
                                   {node.type}
                                </span>
                             </div>
                             <p className="text-[9px] font-black text-lns-mid-grey uppercase tracking-widest">{node.date} • {node.teacher} ({node.subject})</p>
                             <p className="text-xs text-lns-mid-grey leading-relaxed mt-2 italic px-4 border-l-2 border-gray-100">"{node.comment}"</p>
                          </div>
                       </div>
                       <div className="text-right flex flex-col items-end gap-2">
                          <span className={cn("text-2xl font-black", node.points.startsWith('+') ? "text-green-600" : node.points === '0' ? "text-lns-mid-grey" : "text-lns-red")}>
                             {node.points}
                          </span>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-200 group-hover:text-lns-navy">
                             <MoreVertical size={16} />
                          </Button>
                       </div>
                    </div>
                    {/* Background accent */}
                    <div className={cn("absolute bottom-0 right-0 w-32 h-32 opacity-[0.03] translate-x-10 translate-y-10", node.color)}>
                       <node.icon size={120} />
                    </div>
                 </Card>
               ))}
            </div>
         </div>

         {/* Right Sidebar Stats Area */}
         <div className="space-y-6">
            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy">Trait Refinement Index</h3>
               <div className="space-y-4">
                  {[
                    { label: "Collaboration", val: 92, color: "bg-blue-500" },
                    { label: "Critical Thinking", val: 88, color: "bg-lns-navy" },
                    { label: "Technical Duty", val: 95, color: "bg-green-500" },
                    { label: "Community", val: 84, color: "bg-lns-red" },
                  ].map((trait, i) => (
                    <div key={i} className="space-y-1">
                       <div className="flex justify-between text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">
                          <span>{trait.label}</span>
                          <span>{trait.val}%</span>
                       </div>
                       <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full transition-all duration-1000", trait.color)} style={{ width: `${trait.val}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </Card>

            <Card className="p-8 border-none shadow-2xl bg-lns-red text-white rounded-2xl space-y-4 overflow-hidden relative group">
               <div className="relative z-10 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-100">Official Sanction Registry</p>
                  <h4 className="text-xl font-black tracking-tight italic uppercase leading-none">Notice Threshold</h4>
                  <p className="text-xs font-bold leading-relaxed py-2">0/3 Incidents Detected</p>
               </div>
               <div className="relative z-10 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-0 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
               </div>
               <p className="relative z-10 text-[9px] font-bold text-red-100 italic">This node is clear of operational variances for the April 2026 cycle.</p>
               <Activity className="absolute -bottom-10 -right-10 text-white/10 w-48 h-48" />
            </Card>

            <div className="p-4 flex items-center gap-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
               <ShieldCheck size={20} className="text-green-500" />
               <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey leading-tight">
                  All behavioural hashes are crytpographically signed by the reporting faculty member and verified on-chain.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
