"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  Award, 
  AlertCircle, 
  Star, 
  ShieldCheck, 
  History,
  MoreVertical,
  Activity,
  Plus,
  Trash2,
  Edit2
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BehaviourClient({ params }: { params: { id: string } }) {
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === params.id) || PLACEHOLDER_STUDENTS[0];
  const [isDeploying, setIsDeploying] = React.useState(false);

  // Mock previous entries
  const history = [
    { id: 'h1', type: 'Merit', points: '+10', title: 'Exceptional Leadership', author: 'Ms. Sarah Chen', date: 'Yesterday, 14:30', comment: 'Led the debate team to a unanimous victory with high-fidelity arguments.', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'h2', type: 'Notice', points: '0', title: 'Uniform Variance', author: 'System Security', date: 'Apr 10', comment: 'Informal neckwear detected at Block B gateway.', icon: AlertCircle, color: 'text-lns-red', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href={`/teacher/students/${params.id}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Student Profile
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <Award size={32} className="text-amber-500" />
               Citizenship Authority Log
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">{student.name} • Ranking: {student.citizenship}</p>
         </div>

         <div className="flex flex-col items-end">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey mb-2 italic">Institutional Standing</div>
            <div className="bg-lns-navy text-white px-8 py-4 rounded-3xl flex items-center gap-4 shadow-xl shadow-navy-600/20 group cursor-default relative overflow-hidden">
               <div className="absolute inset-0 bg-amber-500/10 blur-[20px] group-hover:bg-amber-500/20 transition-all" />
               <div className="relative z-10 text-4xl font-black text-white italic">450</div>
               <div className="relative z-10 h-8 w-px bg-white/20" />
               <div className="relative z-10 text-right">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Category</p>
                  <p className="text-lg font-black text-amber-500 leading-none">Platinum</p>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Entry Tools (30%) */}
         <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4">Deployment Tools</h3>
            <Card className="p-8 border-none shadow-xl bg-white rounded-[3rem] space-y-6">
               <Button className="w-full h-20 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-[1.5rem] border-2 border-amber-500/20 flex flex-col items-center justify-center gap-1 group active:scale-95 transition-all shadow-sm">
                  <Star size={24} className="group-hover:scale-125 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none mt-1">Submit Merit</span>
               </Button>
               <Button className="w-full h-20 bg-red-50 hover:bg-red-100 text-lns-red rounded-[1.5rem] border-2 border-red-500/20 flex flex-col items-center justify-center gap-1 group active:scale-95 transition-all shadow-sm">
                  <AlertCircle size={24} className="group-hover:scale-125 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none mt-1">Submit Incident</span>
               </Button>
               <Button className="w-full h-20 bg-gray-50 hover:bg-white border rounded-[1.5rem] flex flex-col items-center justify-center gap-1 group active:scale-95 transition-all shadow-sm">
                  <Activity size={24} className="group-hover:rotate-12 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none mt-1">Record Habit</span>
               </Button>
            </Card>

            <Card className="p-8 border-none shadow-sm bg-lns-navy text-white rounded-2xl space-y-4 overflow-hidden relative group">
               <div className="relative z-10 flex items-center gap-3 text-lns-red">
                  <ShieldCheck size={18} />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Authority Node</h3>
               </div>
               <p className="relative z-10 text-[10px] leading-relaxed italic text-slate-400">
                  Every behaviour entry for {student.name} is cryptographically signed by your user account and linked to the student's personal digital identity chain.
               </p>
               <Activity className="absolute -bottom-10 -right-10 text-white/5 w-48 h-48" />
            </Card>
         </div>

         {/* History Timeline (70%) */}
         <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between px-4">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 flex items-center gap-2 italic">
                  <History size={16} />
                  Verified Registry Logs (Term 2)
               </h3>
               <div className="flex items-center gap-2 text-[9px] font-black uppercase text-lns-mid-grey">
                  Filter: All Entries
               </div>
            </div>

            <div className="space-y-4">
               {history.map((log) => (
                 <Card key={log.id} className="p-8 border-none shadow-xl bg-white rounded-2xl group hover:translate-x-2 transition-transform cursor-pointer relative overflow-hidden border-l-8 border-transparent hover:border-lns-red">
                    <div className="flex items-start justify-between relative z-10">
                       <div className="flex items-start gap-6">
                          <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", log.bg, log.color)}>
                             <log.icon size={28} />
                          </div>
                          <div className="space-y-2">
                             <div className="flex items-center gap-3">
                                <h4 className="text-xl font-black text-lns-navy group-hover:text-lns-red transition-all italic tracking-tight">{log.title}</h4>
                                <span className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic leading-none", log.bg, log.color)}>
                                   {log.type}
                                </span>
                             </div>
                             <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">{log.date} • {log.author}</p>
                             <p className="text-sm text-lns-mid-grey leading-relaxed mt-4 italic border-l-4 border-gray-50 pl-6 group-hover:text-lns-navy transition-colors font-medium">
                                "{log.comment}"
                             </p>
                             <div className="flex gap-4 pt-4">
                                <Button variant="ghost" className="h-9 px-4 rounded-xl text-[9px] font-black uppercase text-lns-mid-grey hover:bg-gray-100 hover:text-lns-navy flex items-center gap-2">
                                   <Edit2 size={12} />
                                   Modify Log
                                </Button>
                                <Button variant="ghost" className="h-9 px-4 rounded-xl text-[9px] font-black uppercase text-lns-mid-grey hover:bg-red-50 hover:text-lns-red flex items-center gap-2">
                                   <Trash2 size={12} />
                                   Delete Record
                                </Button>
                             </div>
                          </div>
                       </div>
                       <div className="text-right flex flex-col items-end gap-2">
                          <span className={cn("text-4xl font-black italic tracking-tighter", log.points.startsWith('+') ? "text-green-600" : log.points === '0' ? "text-slate-300" : "text-lns-red")}>
                             {log.points}
                          </span>
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-200 group-hover:text-lns-navy bg-gray-50 group-hover:bg-white rounded-xl shadow-inner group-hover:shadow-xl transition-all">
                             <MoreVertical size={20} />
                          </Button>
                       </div>
                    </div>
                 </Card>
               ))}
            </div>

            <div className="p-12 border-2 border-dashed border-gray-100 rounded-[3rem] flex flex-col items-center justify-center text-center gap-4 animate-in slide-in-from-bottom-2 duration-700">
               <Activity size={48} className="text-lns-navy/5" />
               <p className="text-xs font-black uppercase tracking-widest text-lns-navy/30 italic">No further behavioural anomalies detected for the current session.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
