"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  Send, 
  Plus, 
  Layout, 
  Calendar, 
  Layers, 
  Check, 
  ShieldCheck, 
  Activity, 
  FilePlus, 
  Search,
  ScanEye,
  Info
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const COHORTS = [
  { id: '10a-eng', name: 'Grade 10-A English Lit', count: 32 },
  { id: '10b-eng', name: 'Grade 10-B English Lit', count: 28 },
  { id: '11a-comm', name: 'Grade 11-A Communication', count: 24 },
];

export default function TeacherNewAssignmentPage() {
  const router = useRouter();
  const [selectedCohorts, setSelectedCohorts] = React.useState<string[]>([]);
  const [isDeploying, setIsDeploying] = React.useState(false);

  const toggleCohort = (id: string) => {
    setSelectedCohorts(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    setTimeout(() => {
      router.push("/teacher/assignments");
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 pt-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="flex items-center gap-6">
            <Link href="/teacher/assignments">
               <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-lns-navy h-12 w-12 border border-gray-100 bg-white">
                  <ArrowLeft size={24} />
               </Button>
            </Link>
            <div className="space-y-1">
               <h1 className="text-3xl font-[900] text-lns-navy tracking-tighter leading-none italic uppercase">Institutional Asset Deployment</h1>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey italic">Academic Assignment Builder • LNS OS v1.4.2</p>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase text-green-600 bg-green-50 px-6 py-2 rounded-xl outline-dashed outline-1 outline-green-200">
               <ShieldCheck size={18} />
               SECURE SESSION ACTIVE
            </div>
         </div>
      </div>

      <form onSubmit={handleDeploy} className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Deployment Controllers (25%) */}
         <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic">Node Target Synchronization</h3>
            
            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="space-y-2">
                  <p className="text-[9px] font-black text-lns-mid-grey uppercase tracking-widest px-2 italic">Faculty Assignments</p>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto px-1">
                     {COHORTS.map((cohort) => (
                       <button
                         key={cohort.id}
                         type="button"
                         onClick={() => toggleCohort(cohort.id)}
                         className={cn(
                           "w-full text-left p-4 rounded-xl transition-all border border-transparent group flex items-center justify-between",
                           selectedCohorts.includes(cohort.id) ? "bg-lns-navy text-white shadow-xl scale-[1.05]" : "bg-gray-50 hover:bg-white hover:border-gray-100"
                         )}
                       >
                          <div className="space-y-0.5">
                             <p className="text-[10px] font-black uppercase italic leading-none">{cohort.name}</p>
                             <p className={cn("text-[8px] font-bold uppercase tracking-widest", selectedCohorts.includes(cohort.id) ? "text-slate-400" : "text-slate-400")}>{cohort.count} Student Assets</p>
                          </div>
                          {selectedCohorts.includes(cohort.id) && <Check size={16} className="text-green-400" />}
                       </button>
                     ))}
                  </div>
               </div>

               <div className="pt-4 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black text-lns-mid-grey uppercase tracking-widest px-2">
                     <span>Deployment Nodes</span>
                     <span className="text-lns-red italic">{selectedCohorts.length} Clusters</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                     <Info size={16} className="text-blue-500" />
                     <p className="text-[8px] font-bold text-slate-500 leading-relaxed italic">Multiple cluster selection will synchronize the asset timeline across all target cohorts instantaneously.</p>
                  </div>
               </div>
            </Card>

            <Card className="p-8 border-none shadow-xl bg-lns-navy text-white rounded-2xl space-y-4 overflow-hidden relative group">
               <h4 className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Faculty Authorization</h4>
               <p className="relative z-10 text-[10px] leading-relaxed italic text-slate-400">
                  Deploying this asset task generates a unique SHA-256 identifier within the institutional broadcast vault.
               </p>
               <Activity className="absolute -bottom-10 -right-10 text-white/5 w-48 h-48 pointer-events-none group-hover:rotate-45 transition-transform" />
            </Card>
         </div>

         {/* Asset Canvas (75%) */}
         <div className="lg:col-span-3 space-y-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic">Asset Synthesis Canvas</h3>
            
            <Card className="p-12 md:p-16 border-none shadow-2xl bg-white rounded-[3rem] space-y-10 relative overflow-hidden">
               <div className="space-y-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy ml-4 flex items-center gap-2">
                        <FilePlus size={16} className="text-lns-red" />
                        Asset Index Title
                     </label>
                     <input required placeholder="e.g. Terminal Discourse: Modernist Synthesis" className="w-full h-16 bg-gray-50 border border-gray-200 rounded-[1.5rem] px-8 text-lg font-black italic text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy ml-4 flex items-center gap-2 italic">
                           <Calendar size={16} />
                           Synchronization Deadline
                        </label>
                        <input required type="datetime-local" className="w-full h-14 bg-gray-50 border border-gray-200 rounded-[1rem] px-6 text-[11px] font-black text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy ml-4 flex items-center gap-2 italic">
                           <Layers size={16} />
                           Curriculum Category
                        </label>
                        <select className="w-full h-14 bg-gray-50 border border-gray-200 rounded-[1rem] px-6 text-[11px] font-black text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner appearance-none">
                           <option>Communications (Criterion A)</option>
                           <option>Analytical Thinking (Criterion B)</option>
                           <option>Creative Framework (Criterion C)</option>
                           <option>Contextual Mastery (Criterion D)</option>
                        </select>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy ml-4 flex items-center gap-2 italic">
                        <Layout size={16} />
                        Mission Description & Parameters
                     </label>
                     <textarea required className="w-full h-64 bg-gray-50 border border-gray-200 rounded-[2rem] p-10 text-sm font-bold italic leading-relaxed text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner resize-none" placeholder="Draft the institutional operational brief for this academic node..." />
                  </div>
               </div>

               <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 italic">
                     <ScanEye size={18} />
                     Asset will be visible to students in the Academic Repository.
                  </div>
                  <Button 
                    type="submit" 
                    disabled={selectedCohorts.length === 0 || isDeploying}
                    className="h-16 px-14 bg-lns-red text-white hover:bg-black rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-red-600/30 active:scale-95 transition-all flex items-center gap-4"
                  >
                     {isDeploying ? "Deploying Synchronization..." : "Initialize Asset Deployment"}
                     {!isDeploying && <Plus size={22} />}
                  </Button>
               </div>

               {/* Stylized background accent */}
               <FilePlus className="absolute bottom-0 right-0 p-12 opacity-[0.02] text-lns-navy w-96 h-96 pointer-events-none" />
            </Card>

            <div className="text-center px-10 grayscale opacity-40">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                  Institutional Acknowledgement: This deployment is a permanent node on the academic timeline. 
                  Every modification cycle is tracked for institutional audit.
               </p>
            </div>
         </div>
      </form>
    </div>
  );
}
