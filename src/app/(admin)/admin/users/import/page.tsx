"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  FileSpreadsheet, 
  Upload, 
  Download, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  X,
  Loader2,
  Table as TableIcon,
  Trash2, Zap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BulkImportPage() {
  const [step, setStep] = useState(1); // 1: Upload, 2: Validate, 3: Success
  const [isUploading, setIsUploading] = useState(false);

  const mockUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setStep(2);
    }, 1500);
  };

  const mockFinalize = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-4 sm:px-0">
        <div className="flex items-center space-x-4">
           <Link href="/admin/users">
              <Button variant="outline" className="h-12 w-12 rounded-xl p-0 bg-white">
                 <ArrowLeft size={18} />
              </Button>
           </Link>
           <div>
              <h1 className="text-3xl font-[900] text-lns-navy tracking-tighter uppercase">Roster <span className="text-lns-red">Sync</span></h1>
              <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Bulk Institutional Entity Enrollment</p>
           </div>
        </div>
        <div className="flex items-center space-x-3">
           <div className="flex items-center space-x-2 mr-4">
              {[1, 2, 3].map(i => (
                 <div key={i} className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black",
                    step === i ? "bg-lns-navy text-white shadow-lg scale-110" : step > i ? "bg-green-500 text-white" : "bg-lns-border text-white"
                 )}>
                    {step > i ? <CheckCircle2 size={12} /> : i}
                 </div>
              ))}
           </div>
        </div>
      </div>

      {step === 1 && (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Card className="border-2 border-dashed border-lns-border bg-white p-16 flex flex-col items-center justify-center text-center space-y-8 hover:border-lns-red transition-all cursor-pointer group rounded-[3rem]">
               <div className="w-24 h-24 bg-lns-light-grey rounded-[3rem] flex items-center justify-center text-lns-mid-grey group-hover:bg-lns-navy group-hover:text-white transition-all shadow-inner">
                  <Upload size={40} />
               </div>
               <div className="space-y-4">
                  <h2 className="text-2xl font-black text-lns-navy uppercase tracking-tight">Broadcast Source File</h2>
                  <p className="text-sm text-lns-mid-grey px-12 leading-relaxed font-medium">Drag your .csv, .xls, or .xlsx file here to begin the biometric mapping protocol.</p>
               </div>
               <Button onClick={mockUpload} disabled={isUploading} className="bg-lns-navy text-white h-16 px-12 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl">
                  {isUploading ? <Loader2 className="animate-spin" /> : "Select File Hub"}
               </Button>
            </Card>

            <div className="space-y-6">
               <Card className="border-none shadow-xl bg-gradient-to-br from-lns-navy to-slate-900 text-white p-10 rounded-[3rem] relative overflow-hidden">
                  <div className="relative z-10 space-y-6">
                     <div className="space-y-2">
                        <h3 className="text-xl font-black uppercase tracking-tight">Need the Blueprint?</h3>
                        <p className="text-xs text-slate-400 font-bold leading-relaxed">Our zero-fault template ensures 100% success rate during the on-ledger hashing process. Use this for all staff and student rosters.</p>
                     </div>
                     <Button className="bg-white text-lns-navy hover:bg-lns-red hover:text-white transition-all h-14 w-full rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl">
                        <Download size={18} className="mr-3" /> Download Template Hub
                     </Button>
                  </div>
                  <FileSpreadsheet size={160} className="absolute -bottom-10 -right-10 text-white/5" />
               </Card>
               
               <Card className="border-none shadow-sm bg-white p-8 space-y-4 rounded-3xl">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey">Import Protocols</h4>
                  <div className="space-y-3">
                     {[
                       "UTF-8 Encoding Required",
                       "Manual Key Verification Enabled",
                       "Duplicates Hashed and Merged",
                       "Biometric Seeds Auto-Generated"
                     ].map(r => (
                        <div key={r} className="flex items-center space-x-3 text-xs font-bold text-lns-navy">
                           <div className="w-1.5 h-1.5 bg-lns-red rounded-full" />
                           <span>{r}</span>
                        </div>
                     ))}
                  </div>
               </Card>
            </div>
         </div>
      )}

      {step === 2 && (
         <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-4">
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 text-amber-600">
                     <AlertCircle size={24} />
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-lns-navy uppercase tracking-tight">Validation Audit</h3>
                     <p className="text-xs text-lns-mid-grey font-bold uppercase tracking-widest">324 Rows identified • 2 Warnings • 0 Errors</p>
                  </div>
               </div>
               <div className="flex items-center space-x-3">
                  <Button variant="outline" className="h-12 border-lns-border rounded-xl">Clear Queue</Button>
                  <Button onClick={mockFinalize} disabled={isUploading} className="h-12 bg-lns-navy text-white rounded-xl px-8 font-black uppercase text-[10px] tracking-widest">
                     {isUploading ? <Loader2 className="animate-spin" /> : "Finalize Roster Sync"}
                  </Button>
               </div>
            </div>

            <Card className="border-none shadow-xl bg-white overflow-hidden rounded-[2.5rem]">
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="border-b border-lns-border bg-lns-light-grey/50">
                           <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey">Mapping Node</th>
                           <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey">Role</th>
                           <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey">Email Identity</th>
                           <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey">Status</th>
                           <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey text-right">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-lns-border">
                        {[
                          { name: "John Doe", role: "Student", email: "j.doe@student.edu", status: "Valid" },
                          { name: "Jane Smith", role: "Teacher", email: "j.smith@lns.edu", status: "Valid" },
                          { name: "Bob Wilson", role: "Parent", email: "bob_w@gmail.com", status: "Duplicate (Merge)" },
                        ].map((row, i) => (
                           <tr key={i} className="hover:bg-lns-light-grey/20 transition-colors group">
                              <td className="px-8 py-5 font-bold text-lns-navy text-sm">{row.name}</td>
                              <td className="px-8 py-5"><span className="text-[10px] font-black bg-lns-light-grey px-2 py-1 rounded uppercase tracking-tighter text-lns-navy">{row.role}</span></td>
                              <td className="px-8 py-5 text-xs text-lns-mid-grey font-bold">{row.email}</td>
                              <td className="px-8 py-5">
                                 <span className={cn(
                                   "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                   row.status === "Valid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                 )}>{row.status}</span>
                              </td>
                              <td className="px-8 py-5 text-right">
                                 <Button variant="ghost" size="icon" className="text-lns-mid-grey hover:text-lns-red"><Trash2 size={16} /></Button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </Card>
         </div>
      )}

      {step === 3 && (
         <div className="max-w-xl mx-auto py-20 text-center space-y-10 animate-in zoom-in duration-500">
            <div className="relative inline-block">
               <div className="w-32 h-32 bg-green-500 rounded-[3rem] shadow-2xl shadow-green-500/20 flex items-center justify-center text-white mx-auto">
                  <CheckCircle2 size={64} />
               </div>
               <div className="absolute -bottom-2 -right-2 bg-lns-navy p-3 rounded-2xl text-white shadow-xl animate-bounce">
                  <Zap size={24} />
               </div>
            </div>
            <div className="space-y-4">
               <h2 className="text-4xl font-[900] text-lns-navy tracking-tight uppercase">Sync Optimized</h2>
               <p className="text-lg text-lns-mid-grey px-8 font-medium">324 Institution nodes have been finalized and hashed to the LNS ecosystem. Biometric QR tokens are now live for all imported users.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <Link href="/admin/users" className="block">
                  <Button variant="outline" className="w-full h-16 rounded-2xl font-black uppercase text-[10px] tracking-widest text-lns-navy border-lns-border border-2">Return to Users</Button>
               </Link>
               <Link href="/admin/qr-management" className="block">
                  <Button className="w-full h-16 bg-lns-navy text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl">Bulk Print QR Cards</Button>
               </Link>
            </div>
         </div>
      )}
    </div>
  );
}
