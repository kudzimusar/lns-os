"use client";

import React from "react";
import { ASSIGNMENTS } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { 
  CheckCircle2, 
  ArrowLeft, 
  Download,
  Share2,
  Lock,
  CalendarCheck
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AssignmentSubmittedClient({ params }: { params: { id: string } }) {
  const assignment = ASSIGNMENTS.find(a => a.id === params.id);
  const timestamp = new Date().toLocaleString();

  if (!assignment) return <div>Invalid Mission.</div>;

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] gap-12 text-center animate-in zoom-in-95 duration-700 p-6">
      <div className="relative">
         <div className="absolute inset-0 bg-green-500/20 blur-[100px] animate-pulse rounded-full" />
         <div className="relative w-32 h-32 rounded-full bg-green-500 shadow-2xl shadow-green-600/40 flex items-center justify-center text-white">
            <CheckCircle2 size={64} className="animate-in slide-in-from-bottom-4 duration-500" />
         </div>
         <div className="absolute -top-4 -right-4 bg-white shadow-xl rounded-2xl p-3 border border-gray-100 flex items-center gap-2 text-[10px] font-black uppercase text-green-600">
            <Lock size={14} />
            Hashed on Chain
         </div>
      </div>

      <div className="space-y-4">
         <h1 className="text-4xl md:text-5xl font-black text-lns-navy tracking-tighter leading-none">
            Mission Successfully Deployed
         </h1>
         <p className="text-xl text-lns-mid-grey">
            Your assignment <span className="text-lns-navy font-bold">"{assignment.title}"</span> has been received and archived in the institutional vault.
         </p>
      </div>

      <Card className="p-8 border-none shadow-xl bg-white rounded-2xl w-full max-w-xl space-y-6">
         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="text-left space-y-1">
               <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Submission Receipt</p>
               <p className="text-sm font-bold text-lns-navy">{timestamp}</p>
            </div>
            <div className="text-right space-y-1">
               <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Entity Record</p>
               <p className="text-xs font-mono font-bold text-lns-navy">LNS-SUB-2026-X8Y7</p>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <Button variant="ghost" className="h-12 rounded-xl text-xs font-black uppercase tracking-widest text-lns-navy border border-gray-100 flex items-center gap-2">
               <Download size={16} />
               Secure Backup
            </Button>
            <Button variant="ghost" className="h-12 rounded-xl text-xs font-black uppercase tracking-widest text-lns-navy border border-gray-100 flex items-center gap-2">
               <Share2 size={16} />
               View Audit Log
            </Button>
         </div>

         <div className="pt-6 border-t border-gray-100">
            <Link href="/student/assignments">
               <Button className="w-full bg-lns-navy text-white hover:bg-lns-red h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center justify-center gap-3">
                  <ArrowLeft size={18} />
                  Return to Assignments Hub
               </Button>
            </Link>
         </div>
      </Card>

      <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey/40">
         <div className="flex items-center gap-2">
            <CalendarCheck size={14} />
            Term: 2, 2026
         </div>
         <div>
            LNS OS Blockchain Integrity Verified
         </div>
      </div>
    </div>
  );
}
