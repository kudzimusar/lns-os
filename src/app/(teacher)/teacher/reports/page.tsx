"use client";

import React from "react";
import PageShell from "@/components/ui/PageShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  FileText, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Zap,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const reports = [
  { student: "Amara Johnson", type: "Mid-Term Academic", status: "Generated", date: "2h ago", aiConfidence: 98 },
  { student: "Blake Nkosi", type: "Disciplinary Incident", status: "Pending Approval", date: "5h ago", aiConfidence: 94 },
  { student: "Cara Mensah", type: "End-of-Term Summary", status: "Drafting", date: "Yesterday", aiConfidence: 89 }
];

export default function TeacherReportsPage() {
  return (
    <PageShell 
      title="Student Intelligence Reports" 
      description="Manage and audit academic reports with integrated AI drafting and blockchain sealing."
    >
      <div className="space-y-8 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
              {["Active", "Pending", "Archived"].map((tab, i) => (
                 <button 
                   key={tab}
                   className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-[#0A1F44] text-white shadow-lg' : 'text-[#8C92A0] hover:text-[#0A1F44]'}`}
                 >
                    {tab}
                 </button>
              ))}
           </div>
           <Button className="bg-[#D62B2B] hover:bg-[#B82525] text-white rounded-xl h-14 px-10 font-black uppercase tracking-widest text-[11px] flex items-center gap-3 shadow-xl shadow-[#D62B2B]/20 transition-all active:scale-95">
              <Zap size={20} className="fill-white" /> AI Generate Bundle
           </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
           {reports.map((report, i) => (
             <motion.div
               key={report.student}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
             >
               <Card className="border-none shadow-xl bg-white group hover:translate-x-2 transition-transform cursor-pointer overflow-hidden">
                 <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row items-stretch">
                       <div className="w-full lg:w-2 p-0 bg-[#0A1F44]" />
                       <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
                          <div className="md:col-span-1 space-y-1">
                             <p className="text-[10px] font-black uppercase tracking-widest text-[#8C92A0]">Student Node</p>
                             <h4 className="text-lg font-black text-[#0A1F44] uppercase tracking-tight">{report.student}</h4>
                          </div>
                          
                          <div className="md:col-span-1 space-y-1">
                             <p className="text-[10px] font-black uppercase tracking-widest text-[#8C92A0]">Report Type</p>
                             <h4 className="text-sm font-black text-[#0A1F44] uppercase">{report.type}</h4>
                          </div>

                          <div className="md:col-span-1 space-y-2">
                             <div className="flex items-center gap-2">
                                <span className={cn(
                                   "w-2 h-2 rounded-full",
                                   report.status === 'Generated' ? 'bg-green-500' : report.status === 'Pending Approval' ? 'bg-amber-500' : 'bg-blue-500'
                                )} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#0A1F44]">{report.status}</span>
                             </div>
                             <div className="flex items-center gap-2 text-[#8C92A0]">
                                <Clock size={12} />
                                <span className="text-[9px] font-bold uppercase">{report.date}</span>
                             </div>
                          </div>

                          <div className="md:col-span-1 flex items-center justify-end gap-6">
                             <div className="text-right">
                                <p className="text-[8px] font-black text-[#8C92A0] uppercase tracking-widest">AI Confidence</p>
                                <p className="text-lg font-black text-blue-600">{report.aiConfidence}%</p>
                             </div>
                             <Button variant="ghost" size="icon" className="h-12 w-12 bg-[#F4F5F7] hover:bg-white hover:shadow-xl rounded-2xl transition-all">
                                <ChevronRight size={24} className="text-[#0A1F44]" />
                             </Button>
                          </div>
                       </div>
                    </div>
                 </CardContent>
               </Card>
             </motion.div>
           ))}
        </div>

        {/* Global Security Disclaimer */}
        <Card className="border-none bg-[#0A1F44] p-10 rounded-[3rem] text-white relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="space-y-4 max-w-xl text-center md:text-left">
                 <div className="flex items-center justify-center md:justify-start gap-4 text-[#E8B84B]">
                    <ShieldCheck size={28} />
                    <h3 className="text-2xl font-black uppercase tracking-tight">Immutable Record Archival</h3>
                 </div>
                 <p className="text-sm font-medium leading-relaxed opacity-70 italic font-dm-sans">
                    Every finalized report is cryptographically sealed onto the LNS Chain. This ensures authentic, tamper-proof historical data that can be verified by tertiary institutions globally.
                 </p>
              </div>
              <Button className="bg-[#D62B2B] hover:bg-[#B82525] text-white rounded-xl h-14 px-12 font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-[#D62B2B]/20 active:scale-95 transition-all">
                 System Audit Log
              </Button>
           </div>
           {/* Decorative visual */}
           <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </Card>
      </div>
    </PageShell>
  );
}
