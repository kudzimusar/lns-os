"use client";

import React from "react";
import { 
  ShieldCheck, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  Activity, 
  Clock, 
  User, 
  Database, 
  Download, 
  Share2,
  Lock,
  Cpu,
  Globe,
  Zap,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MOCK_RECORDS = [
  { id: 'rec-88220', type: 'Attendance Locked', student: 'Amara Johnson', triggeredBy: 'Mr. James Okafor', date: 'Today, 11:24 AM', hash: '8f4c4bf21e2f47ba401040404c4b784c4b784c4b784c4b', status: 'VERIFIED' },
];

    { recordId: 'rec-88221' },
    { recordId: 'rec-88222' },
  ];
}

export default function AdminAuditClient({ params }: { params: { recordId: string } }) {
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);

  const record = MOCK_RECORDS.find(r => r.id === params.recordId) || MOCK_RECORDS[0];

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24 pt-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-100 drop-shadow-sm">
         <div className="space-y-1">
            <Link href="/admin/audit" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Institutional Audit Log
            </Link>
            <h1 className="text-5xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-6">
               <Database size={48} className="text-lns-red" />
               Node Persistence Audit
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-[0.4em] italic tracking-tight">Canonical Ledger Verification • System Node {record.id}</p>
         </div>

         <div className="flex items-center space-x-3">
            <Button variant="outline" className="h-14 bg-white border-gray-100 rounded-2xl px-8 font-black uppercase tracking-widest text-[10px] shadow-sm flex items-center gap-2">
               <Download size={18} />
               Export PDF
            </Button>
            <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-3">
               Broadcast Evidence
               <Share2 size={18} />
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Main Record Detail (66%) */}
         <div className="lg:col-span-2 space-y-10">
            <Card className="p-12 border-none shadow-[0_50px_100px_rgba(0,0,0,0.06)] bg-white rounded-[3.5rem] relative overflow-hidden group">
               <div className="relative z-10 space-y-16">
                  <div className="flex justify-between items-start">
                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 rounded-2xl bg-lns-navy text-white flex items-center justify-center shadow-xl">
                              <Lock size={24} />
                           </div>
                           <div className="space-y-1">
                              <h3 className="text-2xl font-black text-lns-navy italic tracking-tight uppercase leading-none">{record.type}</h3>
                              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Transaction Classification</p>
                           </div>
                        </div>
                     </div>
                     <div className={cn(
                       "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all duration-700",
                       isVerified ? "bg-green-500 text-white shadow-green-600/20" : "bg-lns-navy/5 text-slate-400"
                     )}>
                        {isVerified ? "PROTOCOL VERIFIED" : "AWAITING CONSENSUS"}
                     </div>
                  </div>

                  {/* Metadata Mapping */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                     <div className="space-y-8">
                        <div className="space-y-2">
                           <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 italic flex items-center gap-2">
                              <Clock size={12}/> Persistence Timestamp
                           </p>
                           <p className="text-xl font-black text-lns-navy italic">{record.date}</p>
                        </div>
                        <div className="space-y-2">
                           <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 italic flex items-center gap-2">
                              <User size={12}/> Event Trigger Node
                           </p>
                           <p className="text-xl font-black text-lns-navy italic">{record.triggeredBy} <span className="text-xs opacity-30 text-slate-400 tracking-normal">(Faculty Node)</span></p>
                        </div>
                     </div>
                     <div className="space-y-8">
                        <div className="space-y-2">
                           <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 italic flex items-center gap-2">
                              <ShieldCheck size={12}/> Affected Entity
                           </p>
                           <p className="text-xl font-black text-lns-navy italic">{record.student} <span className="text-xs opacity-30 text-slate-400 tracking-normal">(Student Node)</span></p>
                        </div>
                        <div className="space-y-2">
                           <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 italic flex items-center gap-2">
                              <Cpu size={12}/> Verification Method
                           </p>
                           <p className="text-xl font-black text-lns-navy italic">SHA-256 Consensus Sync</p>
                        </div>
                     </div>
                  </div>

                  {/* Blockchain Hash View */}
                  <div className="space-y-6 pt-10 border-t border-gray-50 relative group">
                     <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 italic">Canonical Persistence Hash (Monospace)</p>
                     <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 shadow-inner group-hover:bg-lns-navy transition-all duration-700">
                        <code className="text-[12px] font-black break-all text-lns-navy font-mono tracking-tight group-hover:text-white leading-relaxed">
                           {record.hash}
                        </code>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <Button 
                       disabled={isVerified || isVerifying}
                       onClick={handleVerify}
                       className={cn(
                        "h-20 flex-1 rounded-[1.8rem] font-black uppercase tracking-widest text-[11px] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3",
                        isVerified ? "bg-green-500 text-white pointer-events-none" : "bg-lns-navy text-white hover:bg-lns-red"
                       )}
                     >
                        {isVerifying ? (
                          <>
                            <Activity size={24} className="animate-spin" />
                            Synchronizing Lattice Consensus...
                          </>
                        ) : isVerified ? (
                          <>
                            <CheckCircle2 size={24} />
                            Persistence Integrity Confirmed
                          </>
                        ) : (
                          <>
                            <ShieldCheck size={24} />
                            Initiate Global Verification
                          </>
                        )}
                     </Button>
                  </div>
               </div>
               <ShieldCheck size={400} className="absolute -bottom-40 -right-40 text-black/5 pointer-events-none rotate-12 opacity-50" />
            </Card>

            <div className="flex items-center justify-between px-10">
               <Button variant="ghost" className="gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-lns-navy transition-all h-14">
                  <ChevronLeft size={20} />
                  Prev Instance: rec-88219
               </Button>
               <Button variant="ghost" className="gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-lns-navy transition-all h-14">
                  Next Instance: rec-88221
                  <ChevronRight size={20} />
               </Button>
            </div>
         </div>

         {/* Sidebar Stats (33%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-10 overflow-hidden relative group">
               <div className="relative z-10 space-y-8">
                  <div className="space-y-2 text-center">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Platform Fidelity Index</p>
                     <p className="text-6xl font-black italic tracking-tighter text-lns-red">100.0s</p>
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Atomic Precision Score</p>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                           <span>Global Consensus Sync</span>
                           <span>Verified</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-green-500 w-full shadow-[0_0_15px_rgba(34,197,94,1)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "Institutional persistence node {record.id} is cryptographically bound to the LNS OS global lattice. No hash-conflicts detected."
                     </p>
                  </div>
               </div>
               <Globe className="absolute -top-20 -left-20 text-white/5 w-80 h-80 pointer-events-none group-hover:scale-125 transition-transform" />
            </Card>

            <div className="p-8 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200 flex flex-col items-center gap-6 text-center">
               <AlertTriangle size={32} className="text-amber-500 animate-pulse" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-900 leading-relaxed italic pr-4 pl-4">
                  ANY HASH VARIANCE DETECTED WILL TRIGGER AN IMMEDIATE NODE ISOLATION PROTOCOL AND COMPLIANCE NOTIFICATION.
               </p>
            </div>

            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic">Metadata Trace</h3>
                  <Zap size={18} className="text-blue-500" />
               </div>
               <div className="space-y-3">
                  {["System Context: High-Authority", "Protocol Version: v1.4.2", "Chain Source: Ledger #4"].map((act, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer transition-all">
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-lns-navy">{act}</span>
                       <ShieldCheck size={14} className="text-gray-100 group-hover:text-green-500 transition-all" />
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
