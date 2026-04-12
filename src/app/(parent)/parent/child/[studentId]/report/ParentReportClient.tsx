"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS, SUBJECTS, PLACEHOLDER_TEACHERS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Share2, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Activity,
  FileText,
  Star,
  CheckCircle2,
  ScanEye,
  QrCode
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SealedBadge } from "@/components/blockchain/SealedBadge";
import { BlockchainCorrectionDialog } from "@/components/blockchain/BlockchainCorrectionDialog";
import { generateMockHash } from "@/lib/blockchain";
import { motion } from "framer-motion";

export default function ParentReportClient({ params }: { params: { studentId: string } }) {
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === params.studentId) || PLACEHOLDER_STUDENTS[0];
  const [isSigned, setIsSigned] = React.useState(false);
  const [correctionDialogOpen, setCorrectionDialogOpen] = React.useState(false);
  const [selectedForCorrection, setSelectedForCorrection] = React.useState<any>(null);

  const reportHash = generateMockHash();
  const polygonTxHash = '0x' + reportHash.slice(0, 40);

  const handleRequestCorrection = (sub: string, currentVal: string) => {
    setSelectedForCorrection({
      id: sub,
      domain: 'GRADES',
      originalValue: currentVal,
      hash: generateMockHash(),
      timestamp: new Date().toISOString()
    });
    setCorrectionDialogOpen(true);
  };

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 p-4 md:p-8 lg:p-12 bg-gray-50/50 min-h-screen">
      {/* Viewer Toolbar */}
      <div className="sticky top-0 md:top-4 z-50 flex items-center justify-between bg-white/95 backdrop-blur-xl p-3 md:p-4 rounded-xl md:rounded-3xl shadow-xl border border-white/50 -mx-1 md:mx-0">
         <div className="flex items-center gap-3 md:gap-6">
            <Link href={`/parent/child/${params.studentId}`}>
               <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full hover:bg-gray-100 text-lns-navy border border-gray-100 shrink-0">
                  <ArrowLeft size={18} />
               </Button>
            </Link>
            <div className="flex flex-col">
               <h1 className="text-[11px] md:text-sm font-black text-lns-navy uppercase tracking-tight">Academic Report Card • Term 2</h1>
               <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-lns-mid-grey">
                  <ScanEye size={10} className="text-lns-red" />
                  AUTHENTICATED • {student.name}
               </div>
            </div>
         </div>

         <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:flex h-11 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest text-lns-mid-grey hover:bg-gray-50 border border-gray-100">
               <Share2 size={14} className="mr-2" />
               Share
            </Button>
            <Button className="h-11 px-4 md:px-8 rounded-xl bg-lns-navy text-white hover:bg-lns-red text-[9px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center gap-2">
               <Download size={16} />
               <span className="hidden xs:inline">Secure PDF</span>
               <span className="xs:hidden">PDF</span>
            </Button>
         </div>
      </div>

      {/* Official Report Display */}
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-10">
         <Card className="bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] md:shadow-[0_50px_100px_rgba(0,0,0,0.08)] rounded-2xl md:rounded-[0.5rem] overflow-hidden p-6 md:p-24 space-y-8 md:space-y-16">
            {/* Report Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-start border-b-2 md:border-b-4 border-lns-navy pb-8 md:pb-12 gap-6">
               <div className="space-y-3 md:space-y-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-lns-navy rounded-xl md:rounded-2xl flex items-center justify-center text-white text-xl md:text-3xl font-black">L</div>
                  <div>
                     <h2 className="text-xl md:text-3xl font-[900] text-lns-navy tracking-tighter">LENNON NASH OS</h2>
                     <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-lns-red italic mt-1">Official Academic Decree</p>
                  </div>
               </div>
               <div className="text-left md:text-right space-y-1 md:space-y-1 w-full md:w-auto">
                  <p className="text-[8px] md:text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Digital Registry ID</p>
                  <p className="text-xs font-mono font-bold text-lns-navy">{student.idNumber}</p>
                  <div className="pt-2 md:pt-4 space-y-2">
                     <p className="text-[8px] md:text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Anchored Proof (Polygon)</p>
                     <div className="flex flex-col md:items-end gap-1.5">
                        <div className="flex items-center gap-1.5 text-green-600 font-black text-[10px] md:text-xs uppercase italic">
                           <ShieldCheck size={14} />
                           Verified On-Chain
                        </div>
                        <p className="text-[9px] font-mono text-slate-400 max-w-[120px] truncate">{polygonTxHash}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Student metadata grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 py-6 md:py-8 border-b border-gray-100">
               <div className="space-y-1">
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Refined Name</p>
                  <p className="text-[13px] md:text-sm font-black text-lns-navy">{student.name}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Grade Level</p>
                  <p className="text-[13px] md:text-sm font-black text-lns-navy">10{student.grade}A</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Power Score</p>
                  <p className="text-[13px] md:text-sm font-black text-lns-navy tracking-tight">{student.powerScore}%</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Citizenship</p>
                  <p className="text-[13px] md:text-sm font-black text-green-600 italic">Gold Tier</p>
               </div>
            </div>

            {/* Matrix Section */}
            <div className="space-y-6 md:space-y-8">
               <h3 className="text-base md:text-lg font-black text-lns-navy tracking-tight uppercase italic flex items-center gap-3">
                  <TrendingUp size={20} className="text-lns-red" />
                  Performance Matrix
               </h3>
               
               {/* Mobile List Matrix */}
               <div className="md:hidden divide-y divide-gray-50 border-t border-gray-50">
                  {SUBJECTS.map((sub, i) => {
                    const pct = 75 + Math.floor(Math.random() * 20);
                    const band = Math.floor(pct / 12.5);
                    return (
                      <div key={sub.name} className="py-4 flex items-center justify-between">
                         <div className="space-y-1">
                            <p className="text-sm font-bold text-lns-navy">{sub.name}</p>
                            <p className="text-[8px] font-black text-slate-400 italic uppercase">Band {band} • {pct}% Match</p>
                         </div>
                         <div className="text-right">
                            <span className="text-2xl font-black text-lns-navy tracking-tighter">A</span>
                         </div>
                      </div>
                    );
                  })}
               </div>

               {/* Desktop Table Matrix */}
               <table className="hidden md:table w-full text-left">
                  <thead>
                     <tr className="border-b-2 border-gray-100">
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Mission Subject</th>
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">MYP Band</th>
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Refinement %</th>
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-right">Grade Ledger</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                      {SUBJECTS.map((sub, i) => {
                        const pct = 75 + Math.floor(Math.random() * 20);
                        const band = Math.floor(pct / 12.5);
                        const subHash = generateMockHash();
                        return (
                          <tr key={sub.name} className="group hover:bg-slate-50 transition-colors">
                             <td className="py-6 space-y-1">
                                <div className="flex items-center gap-3">
                                   <p className="text-sm font-bold text-lns-navy">{sub.name}</p>
                                   <SealedBadge hash={subHash} />
                                </div>
                                <p className="text-[9px] font-bold text-slate-400 italic uppercase">Lead Node Verified</p>
                             </td>
                             <td className="py-6 text-center text-sm font-black text-lns-navy">{band}</td>
                             <td className="py-6 text-center text-sm font-black text-lns-navy">{pct}%</td>
                             <td className="py-6 text-right space-y-2">
                                <p className="font-black text-xl text-lns-navy leading-none">A</p>
                                <button 
                                   onClick={() => handleRequestCorrection(sub.name, `${pct}% (Band ${band})`)}
                                   className="text-[8px] font-black uppercase text-lns-red opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                   Request Correction
                                </button>
                             </td>
                          </tr>
                        );
                      })}
                  </tbody>
               </table>
            </div>

            {/* Synopsis */}
            <div className="space-y-4 md:space-y-6 pt-8 md:pt-12 border-t border-gray-100">
               <h3 className="text-base md:text-lg font-black text-lns-navy tracking-tight uppercase italic flex items-center gap-3">
                  <Activity size={20} className="text-lns-red" />
                  Principal's Synthesis
               </h3>
               <div className="p-5 md:p-10 bg-gray-50 rounded-2xl md:rounded-[2rem] border border-gray-100 relative quote-style">
                  <p className="text-[13px] md:text-sm text-lns-navy/80 leading-relaxed italic">
                     "{student.name} continues to demonstrate an exceptional capacity for analytical synthesis across all primary nodes. Resilience in peer collaboration cycles is 100% verified."
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200/50 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase tracking-widest">AI Drafted</span>
                        <span className="text-[9px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase tracking-widest">Human Approved</span>
                     </div>
                     <SealedBadge hash={generateMockHash()} />
                  </div>
               </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 pt-8 md:pt-16">
               <div className="space-y-4">
                  <div className="h-1 bg-lns-navy w-full" />
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] md:text-xs font-black text-lns-navy uppercase tracking-widest">DR. MARCUS NASH</p>
                        <p className="text-[8px] md:text-[9px] font-bold text-lns-mid-grey uppercase tracking-widest">Director of Operations</p>
                     </div>
                     <div className="h-10 w-10 bg-lns-navy/5 flex items-center justify-center p-2 rounded transform -rotate-12 border border-lns-navy/10">
                        <ShieldCheck size={24} className="text-lns-navy" />
                     </div>
                  </div>
               </div>
               <div className="space-y-4 opacity-50 md:opacity-100">
                  <div className="h-1 bg-gray-100 w-full" />
                  <div>
                     <p className="text-[10px] md:text-xs font-black text-lns-mid-grey uppercase tracking-widest">PORTAL GUARDIAN</p>
                     <p className="text-[8px] md:text-[9px] font-bold text-lns-mid-grey uppercase tracking-widest italic leading-none">Awaiting Digital Signature</p>
                  </div>
               </div>
            </div>

            {/* Verification Footer (Domain 12) */}
            <div className="pt-12 md:pt-20 flex flex-col items-center gap-6">
               <div className="p-4 bg-white border border-slate-200 rounded-3xl shadow-lg">
                  <QrCode size={120} className="text-lns-navy" />
               </div>
               <div className="text-center space-y-1">
                  <p className="text-[10px] font-black text-lns-navy uppercase tracking-widest leading-none">Public Verification Node</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed italic">
                     Scan to verify this credential on the LNS Registry (Polygon Mainnet)
                  </p>
               </div>
               <Link href={`/verify/passport/${reportHash}`}>
                  <Button variant="ghost" className="text-[10px] font-black text-lns-red uppercase underline tracking-widest">
                     Manual Verification Link
                  </Button>
               </Link>
            </div>
         </Card>

         {/* Approval Center */}
         {!isSigned ? (
           <Card className="p-6 md:p-10 border-none shadow-2xl bg-lns-navy text-white rounded-2xl md:rounded-2xl space-y-6 md:space-y-8 flex flex-col md:flex-row items-center gap-6 md:gap-10 animate-in slide-in-from-bottom-8 duration-1000">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/10 flex items-center justify-center text-white shadow-inner shrink-0">
                 <ScanEye size={32} md:size={48} />
              </div>
              <div className="flex-1 space-y-2 text-center md:text-left">
                 <h3 className="text-lg md:text-2xl font-black tracking-tight italic uppercase">Acknowledgement Required</h3>
                 <p className="text-slate-400 text-xs md:text-sm italic">Digitally sign this academic decree to verify reception.</p>
              </div>
              <Button onClick={() => setIsSigned(true)} className="w-full md:w-auto h-14 md:h-16 px-8 md:px-12 bg-lns-red text-white hover:bg-red-700 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all outline-none border-b-4 border-red-900">
                 Digitally Sign Record
              </Button>
           </Card>
         ) : (
           <Card className="p-5 md:p-8 border-none shadow-xl bg-green-500 text-white rounded-2xl md:rounded-2xl flex items-center gap-4 md:gap-6 animate-in zoom-in duration-500">
              <CheckCircle2 size={24} md:size={32} />
              <div className="space-y-0.5">
                 <h3 className="text-base md:text-lg font-black uppercase italic tracking-tight leading-none">Record Synchronized</h3>
                 <p className="text-[10px] md:text-xs font-bold text-white/80">Digital signature logged: April 12, 11:57 AM</p>
              </div>
           </Card>
         )}
      </div>

      {selectedForCorrection && (
        <BlockchainCorrectionDialog
          isOpen={correctionDialogOpen}
          onClose={() => setCorrectionDialogOpen(false)}
          record={selectedForCorrection}
          onSuccess={(hash) => {
            console.log("Correction Sealed:", hash);
            // In a real app, update state to reflect the superseding record
          }}
        />
      )}
    </div>
  );
}
