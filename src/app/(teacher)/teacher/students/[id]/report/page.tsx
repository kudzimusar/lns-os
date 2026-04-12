"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS, SUBJECTS, PLACEHOLDER_TEACHERS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  Save, 
  Send, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  ScanEye,
  Settings,
  MoreVertical,
  Plus
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    id: s.id,
  }));
}

export default function TeacherStudentReportEditorPage({ params }: { params: { id: string } }) {
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === params.id) || PLACEHOLDER_STUDENTS[0];
  const [isFinalizing, setIsFinalizing] = React.useState(false);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 p-6 lg:p-12 bg-gray-50/30 min-h-screen">
      {/* Editor Toolbar */}
      <div className="sticky top-4 z-50 flex items-center justify-between bg-white/90 backdrop-blur-xl p-5 rounded-[2rem] shadow-2xl border border-white/50">
         <div className="flex items-center gap-6">
            <Link href={`/teacher/students/${params.id}`}>
               <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-lns-navy border border-gray-100 h-12 w-12">
                  <ArrowLeft size={20} />
               </Button>
            </Link>
            <div className="flex flex-col">
               <h1 className="text-sm font-black text-lns-navy uppercase tracking-widest leading-none mb-1 italic">Draft Report Deployment • Term 2 2026</h1>
               <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-lns-red italic">
                  <ScanEye size={12} />
                  Institutional Authorization Required
               </div>
            </div>
         </div>

         <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-6 py-2 bg-gray-50 rounded-xl text-[10px] font-black text-lns-navy mr-4">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               ENCRYPTED EDITOR ACTIVE
            </div>
            <Button variant="ghost" className="h-12 px-6 rounded-2xl text-[9px] font-black uppercase tracking-widest text-lns-mid-grey hover:bg-gray-50 flex items-center gap-2 border border-gray-100">
               <Save size={16} />
               Save Draft Index
            </Button>
            <Button 
              onClick={() => setIsFinalizing(true)}
              disabled={isFinalizing}
              className="h-14 px-10 rounded-2xl bg-lns-navy text-white hover:bg-lns-red text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-3"
            >
               {isFinalizing ? "Synchronizing Asset..." : "Finalize & Send to Parent"}
               {!isFinalizing && <Send size={20} />}
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
         {/* Sidebar Controls (25%) */}
         <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4">Registry Metadata</h3>
            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="space-y-4">
                  <div className="space-y-1">
                     <p className="text-[9px] font-black text-lns-mid-grey uppercase tracking-widest px-2 italic">Student Entity</p>
                     <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 font-black text-sm text-lns-navy uppercase italic">{student.name}</div>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[9px] font-black text-lns-mid-grey uppercase tracking-widest px-2 italic">Official ID</p>
                     <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 font-bold text-xs text-lns-navy/60">{student.idNumber}</div>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[9px] font-black text-lns-mid-grey uppercase tracking-widest px-2 italic">Status</p>
                     <div className="p-4 bg-green-50 rounded-2xl border border-green-100 font-black text-[10px] text-green-600 uppercase italic flex items-center justify-between">
                        Verified Record
                        <ShieldCheck size={14} />
                     </div>
                  </div>
               </div>
            </Card>

            <Card className="p-8 border-none shadow-xl bg-lns-navy text-white rounded-2xl space-y-6 overflow-hidden relative group">
               <div className="relative z-10 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Authorization Status</h4>
                  <div className="space-y-3">
                     {[
                       { role: "Faculty Mentor", status: "Active", icon: CheckCircle2, color: "text-green-500" },
                       { role: "High Command", status: "Pending", icon: Activity, color: "text-amber-500" },
                       { role: "Institutional Audit", status: "Syncing", icon: ShieldCheck, color: "text-blue-500" },
                     ].map((auth, i) => (
                       <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 group cursor-default">
                          <div className="flex items-center gap-3">
                             <auth.icon size={16} className={auth.color} />
                             <span className="text-[10px] font-black uppercase italic tracking-widest">{auth.role}</span>
                          </div>
                          <span className={cn("text-[8px] font-black uppercase", auth.color)}>{auth.status}</span>
                       </div>
                     ))}
                  </div>
               </div>
               <TrendingUp className="absolute -bottom-10 -right-10 text-white/5 w-48 h-48 pointer-events-none" />
            </Card>

            <div className="p-4 bg-lns-red/5 rounded-2xl border-2 border-dashed border-lns-red/20 text-center space-y-2">
               <p className="text-[9px] font-black uppercase tracking-widest text-lns-red italic">Warning: Finalization is an immutable terminal action.</p>
            </div>
         </div>

         {/* Report Canvas (75%) */}
         <div className="lg:col-span-3 space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4">Institutional Asset Canvas</h3>
            <Card className="bg-white border-none shadow-[0_50px_100px_rgba(0,0,0,0.1)] rounded-[0.5rem] overflow-hidden p-16 md:p-24 space-y-16">
               <div className="flex justify-between items-start border-b-8 border-lns-navy pb-16">
                  <div className="space-y-6">
                     <div className="w-20 h-20 bg-lns-navy rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-2xl">L</div>
                     <div>
                        <h2 className="text-4xl font-[900] text-lns-navy tracking-tighter uppercase italic">LENNON NASH OS</h2>
                        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-lns-red italic mt-1 font-mono">Academic Decree Registry v1.4</p>
                     </div>
                  </div>
                  <div className="text-right space-y-1">
                     <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">Terminal Node</p>
                     <p className="text-xs font-mono font-bold text-lns-navy">NODE_ID_7F8D9A0</p>
                  </div>
               </div>

               <div className="space-y-10">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-8">
                     <TrendingUp size={24} className="text-lns-red" />
                     <h3 className="text-xl font-black text-lns-navy tracking-tighter uppercase italic">Asset Performance Matrix</h3>
                  </div>

                  <table className="w-full text-left">
                     <thead>
                        <tr className="border-b-2 border-gray-50">
                           <th className="py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic">Subject Mission</th>
                           <th className="py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Refinement %</th>
                           <th className="py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-right">Draft Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {SUBJECTS.map((sub, i) => {
                          const pct = 75 + Math.floor(Math.random() * 20);
                          return (
                            <tr key={sub.name} className="group hover:bg-gray-50 transition-all cursor-pointer">
                               <td className="py-8 space-y-1">
                                  <p className="text-lg font-black text-lns-navy italic tracking-tight">{sub.name}</p>
                                  <p className="text-[9px] font-black text-slate-400 italic uppercase">Faculty Lead: Sarah Jenkins</p>
                               </td>
                               <td className="py-8 text-center">
                                  <div className="flex flex-col items-center gap-2">
                                     <span className="text-xl font-black text-lns-navy italic">{pct}%</span>
                                     <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-lns-navy w-[88%]" style={{ width: `${pct}%` }} />
                                     </div>
                                  </div>
                               </td>
                               <td className="py-8 text-right">
                                  <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-200 group-hover:text-lns-red">
                                     <Settings size={18} />
                                  </Button>
                               </td>
                            </tr>
                          );
                        })}
                     </tbody>
                  </table>
               </div>

               <div className="space-y-8 pt-16 border-t border-gray-100">
                  <h3 className="text-xl font-black text-lns-navy tracking-tighter uppercase italic flex items-center gap-3">
                     <Activity size={24} className="text-lns-red" />
                     Lead Faculty Synthesis
                  </h3>
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey ml-2 italic leading-none">Draft Operational Commentary</p>
                     <textarea 
                       className="w-full h-48 bg-gray-50 rounded-2xl border-2 border-gray-100 p-10 text-lg font-bold italic leading-relaxed text-lns-navy outline-none focus:bg-white focus:border-lns-red/2 transition-all shadow-inner resize-none appearance-none"
                       defaultValue={`${student.name} continues to demonstrate high resonance across all primary nodes. Performance in Term 2 shows deliberate growth in communicative synthesis.`}
                     />
                  </div>
               </div>

               <div className="pt-24 flex items-center justify-between border-t border-gray-100 grayscale opacity-40">
                  <div className="space-y-2">
                     <p className="text-xs font-black text-lns-navy uppercase tracking-widest">FACULTY LEAD</p>
                     <div className="h-px bg-lns-navy w-48" />
                  </div>
                  <div className="space-y-2 text-right">
                     <p className="text-xs font-black text-lns-navy uppercase tracking-widest">PARENT GUARDIAN</p>
                     <div className="h-px bg-lns-navy w-48" />
                  </div>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
