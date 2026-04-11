"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  FileBarChart, 
  Printer, 
  Sparkles, 
  Search, 
  Filter, 
  ChevronRight,
  Download,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  X,
  Loader2,
  FileCheck,
  Send,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(1); // 1: List, 2: Select Student, 3: AI Draft, 4: Preview/Approve
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const startAIGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(4);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">Report Generator</h1>
          <p className="text-lns-mid-grey font-medium">Verified PDF reporting with AI-assisted comment generation.</p>
        </div>
        {step === 1 && (
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="bg-white">
              <Printer size={18} className="mr-2" />
              Bulk Print
            </Button>
            <Button onClick={() => setStep(2)}>
              <Sparkles size={18} className="mr-2 text-white" />
              New Report Session
            </Button>
          </div>
        )}
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
           <Card className="md:col-span-2 border-none shadow-sm bg-white overflow-hidden">
              <div className="p-4 border-b border-lns-border flex items-center bg-lns-light-grey/30 px-3 mx-4 my-4 rounded-xl">
                 <Search className="text-lns-mid-grey" size={16} />
                 <input type="text" placeholder="Search saved reports..." className="bg-transparent border-none focus:ring-0 text-sm px-3 py-2 w-full" />
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-lns-border bg-lns-light-grey/50">
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Report Profile</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Type</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Status</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-lns-border">
                       {[
                         { id: 1, title: "Abraham Lincoln - T1 2026", type: "Academic", status: "Published" },
                         { id: 2, title: "Benjamin Franklin - T1 2026", type: "Academic", status: "Draft" },
                       ].map((report) => (
                         <tr key={report.id} className="hover:bg-lns-light-grey/20 transition-colors group">
                            <td className="px-6 py-4">
                               <div className="flex items-center space-x-3">
                                  <FileBarChart size={18} className="text-lns-navy" />
                                  <span className="text-sm font-bold text-lns-navy">{report.title}</span>
                               </div>
                            </td>
                            <td className="px-6 py-4">
                               <span className="text-[10px] font-black text-lns-navy uppercase">{report.type}</span>
                            </td>
                            <td className="px-6 py-4">
                               <span className={cn(
                                 "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                                 report.status === "Published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                               )}>{report.status}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                               <Button variant="ghost" size="icon" className="h-8 w-8 text-lns-mid-grey group-hover:text-lns-navy">
                                  <ChevronRight size={18} />
                               </Button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </Card>

           <Card className="border-none shadow-xl bg-lns-navy text-white p-8 flex flex-col justify-center text-center space-y-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
                 <Sparkles className="text-lns-red" size={32} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">AI Batch Assist</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-bold">
                 Initialize an AI session to draft comments for your entire class (32 students) based on all academic hashes.
              </p>
              <Button className="bg-lns-red hover:bg-red-700 text-white rounded-xl h-12 font-black uppercase text-[10px] tracking-widest" onClick={() => setStep(2)}>
                 Start Class Cycle
              </Button>
           </Card>
        </div>
      )}

      {(step === 2 || step === 3 || step === 4) && (
        <Card className="border-none shadow-2xl bg-white overflow-hidden animate-in zoom-in duration-300">
           <div className="p-6 bg-lns-light-grey/30 border-b border-lns-border flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setStep(step - 1)} className="text-lns-mid-grey hover:text-lns-navy">
                 <ChevronLeft size={20} className="mr-2" /> Back
              </Button>
              <div className="flex items-center space-x-4">
                 {[1, 2, 3].map(i => (
                    <div key={i} className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black",
                      step - 1 === i ? "bg-lns-navy text-white" : step - 1 > i ? "bg-green-500 text-white" : "bg-lns-light-grey text-lns-border"
                    )}>
                       {step - 1 > i ? <CheckCircle2 size={12} /> : i}
                    </div>
                 ))}
              </div>
              <Button variant="ghost" size="icon" onClick={() => setStep(1)}><X size={20} /></Button>
           </div>

           <CardContent className="p-10">
              {step === 2 && (
                 <div className="max-w-md mx-auto space-y-8 py-10">
                    <div className="text-center space-y-2">
                       <h3 className="text-2xl font-black text-lns-navy uppercase tracking-tight">Select Student Hub</h3>
                       <p className="text-sm text-lns-mid-grey">Which academic node are we reporting on today?</p>
                    </div>
                    <div className="space-y-3">
                       {["Abraham Lincoln", "Michael Faraday", "Marie Curie"].map(name => (
                          <div 
                            key={name}
                            onClick={() => { setSelectedStudent(name); setStep(3); }}
                            className="p-4 bg-white border border-lns-border rounded-2xl flex items-center justify-between hover:border-lns-red hover:shadow-lg transition-all cursor-pointer group"
                          >
                             <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-lns-navy text-white flex items-center justify-center font-black">{name[0]}</div>
                                <span className="text-sm font-bold text-lns-navy group-hover:text-lns-red transition-all">{name}</span>
                             </div>
                             <ChevronRight size={18} className="text-lns-border group-hover:text-lns-navy" />
                          </div>
                       ))}
                    </div>
                 </div>
              )}

              {step === 3 && (
                 <div className="max-w-2xl mx-auto space-y-10 py-10">
                    <div className="flex items-center space-x-6">
                       <div className="w-20 h-20 rounded-[2rem] bg-lns-navy flex items-center justify-center text-white text-3xl font-black shadow-xl">
                          {selectedStudent?.[0]}
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-lns-red">Drafting Report Node</p>
                          <h3 className="text-3xl font-black text-lns-navy tracking-tight">{selectedStudent}</h3>
                          <p className="text-sm text-lns-mid-grey uppercase font-bold tracking-tight mt-1">Grade 10A • IB Literature Pathway</p>
                       </div>
                    </div>

                    <Card className="bg-lns-light-grey/30 border-dashed border-2 border-lns-border p-10 text-center space-y-6">
                       <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-lns-navy shadow-sm">
                          <Sparkles size={32} className="text-lns-red" />
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-lg font-bold text-lns-navy">Synthesizing Qualitative Data...</h4>
                          <p className="text-xs text-lns-mid-grey max-w-sm mx-auto">AI is cross-referencing performance on-ledger, attendance hashes, and behavioral merits for this student.</p>
                       </div>
                       <Button 
                         className="h-14 px-10 bg-lns-navy text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-lns-navy/20"
                         onClick={startAIGeneration}
                         disabled={isGenerating}
                       >
                          {isGenerating ? <Loader2 className="animate-spin mr-2" /> : "Execute AI Draft Engine"}
                       </Button>
                    </Card>
                 </div>
              )}

              {step === 4 && (
                 <div className="max-w-3xl mx-auto space-y-8">
                    <div className="flex items-center justify-between border-b border-lns-border pb-6">
                       <h3 className="text-2xl font-black text-lns-navy uppercase tracking-tight">AI Augmented Draft</h3>
                       <div className="flex items-center space-x-2 text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          <Sparkles size={12} />
                          <span>Optima-1 High Confidence</span>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest">Qualitative Commentary</label>
                          <textarea 
                             className="w-full h-48 bg-lns-light-grey/50 rounded-3xl border-none p-6 text-sm font-medium leading-relaxed italic border-b-2 border-transparent focus:border-lns-navy transition-all"
                             defaultValue={`${selectedStudent} has demonstrated exceptional commitment to the IB Literature syllabus this term. Their analysis of postmodern textual structures has improved by 15% following intensive feedback... Attendance remains a perfect 100% on the blockchain ledger.`}
                          />
                       </div>
                       
                       <div className="grid grid-cols-2 gap-6">
                          <div className="p-6 bg-lns-navy rounded-3xl text-white space-y-4">
                             <h5 className="text-[10px] font-black tracking-widest uppercase text-slate-400">Final Projected Grade</h5>
                             <div className="flex items-center justify-between">
                                <span className="text-5xl font-black">A*</span>
                                <TrendingUp className="text-green-500" size={32} />
                             </div>
                          </div>
                          <div className="p-6 bg-lns-light-grey rounded-3xl space-y-4">
                             <h5 className="text-[10px] font-black tracking-widest uppercase text-lns-mid-grey">LNS Power Score</h5>
                             <div className="flex items-center justify-between">
                                <span className="text-5xl font-black text-lns-navy">88.2</span>
                                <Zap className="text-lns-red" size={32} />
                             </div>
                          </div>
                       </div>

                       <div className="flex items-center justify-end space-x-4 pt-8">
                          <Button variant="outline" className="h-14 px-8 border-lns-border rounded-2xl font-black uppercase text-[10px] text-lns-navy">
                             <Download className="mr-2" size={16} /> Save to PDF
                          </Button>
                          <Button className="h-14 px-10 bg-lns-red text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-lns-red/20" onClick={() => setStep(1)}>
                             <Send className="mr-2" size={16} /> Publish to Guardian
                          </Button>
                       </div>
                    </div>
                 </div>
              )}
           </CardContent>
        </Card>
      )}
    </div>
  );
}
