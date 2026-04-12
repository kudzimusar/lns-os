"use client";

import React, { useState } from "react";
import { 
  UserPlus, 
  ArrowLeft, 
  ShieldCheck, 
  ChevronRight, 
  Zap, 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Upload,
  Layers,
  CheckCircle2,
  Lock,
  History
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = ["Biometric Node", "Institutional Meta", "Parent Hub Bridge", "Security Seal"];

export default function EnrollStudentPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100">
        <div className="space-y-1">
          <Link href="/admin/users/students" className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey hover:text-lns-red flex items-center gap-2 transition-colors mb-4">
             <ArrowLeft size={14} /> Student Registry
          </Link>
          <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
             <UserPlus size={32} className="text-lns-red" />
             Asset Enrollment
          </h1>
          <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Initializing New Student Node • LNS OS Persistence Engine</p>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="grid grid-cols-4 gap-4">
         {steps.map((step, i) => (
           <div key={step} className="space-y-3">
              <div className={cn(
                "h-2 rounded-full transition-all duration-700",
                currentStep > i ? "bg-lns-navy" : currentStep === i + 1 ? "bg-lns-red shadow-[0_0_15px_rgba(214,43,43,0.3)]" : "bg-gray-100"
              )} />
              <p className={cn(
                "text-[9px] font-black uppercase tracking-widest italic text-center",
                currentStep === i + 1 ? "text-lns-red font-black" : "text-slate-400"
              )}>{step}</p>
           </div>
         ))}
      </div>

      {/* Enrollment Form Hub */}
      <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden">
         <div className="p-10 md:p-16 space-y-12">

            {currentStep === 1 && (
               <div className="space-y-10 animate-in fade-in duration-500">
                  <div className="flex flex-col md:flex-row items-center gap-12">
                     <div className="w-48 h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[3rem] flex flex-col items-center justify-center text-slate-300 group hover:border-lns-red hover:bg-red-50/30 transition-all cursor-pointer">
                        <Camera size={40} className="mb-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-center">Capture Biometric<br/>Identity Node</span>
                     </div>
                     <div className="flex-1 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-4">Full Identity Name</label>
                              <input placeholder="e.g. Amara Johnson" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-black text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-4">Date of Generation</label>
                              <input type="date" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-black text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-4">Institutional ID Pattern</label>
                           <input defaultValue="LNS-2026-X492" className="w-full h-14 bg-lns-navy/5 border border-lns-navy/10 rounded-2xl px-6 font-mono font-black text-lns-navy/40 italic cursor-not-allowed" disabled />
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {currentStep === 2 && (
               <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Primary Cohort Node</label>
                        <select className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-black text-lns-navy outline-none">
                           <option>Grade 7A</option>
                           <option>Grade 7B</option>
                           <option>Grade 8A</option>
                           <option>Grade 8B</option>
                        </select>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Linguistic Protocol</label>
                        <select className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-black text-lns-navy outline-none">
                           <option>English (UK)</option>
                           <option>Mandarin (Simplified)</option>
                           <option>French (Standard)</option>
                        </select>
                     </div>
                  </div>
               </div>
            )}

            {currentStep === 4 && (
               <div className="space-y-12 text-center py-10 animate-in zoom-in duration-700">
                  <div className="w-32 h-32 bg-green-500 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-green-500/30">
                     <ShieldCheck size={64} />
                  </div>
                  <div className="space-y-4">
                     <h2 className="text-4xl font-[900] text-lns-navy tracking-tighter uppercase italic leading-none">Identity <span className="text-green-600">Locked.</span></h2>
                     <p className="text-sm font-bold text-slate-400 max-w-sm mx-auto uppercase tracking-widest italic">The student node is cryptographically prepared for deployment to the institutional lattice.</p>
                  </div>
               </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-10 border-t border-gray-50">
               {currentStep > 1 && currentStep < 4 ? (
                 <Button onClick={() => setCurrentStep(prev => prev - 1)} variant="ghost" className="h-14 px-8 rounded-2xl font-black uppercase text-[10px] text-slate-400">
                    Previous Shard
                 </Button>
               ) : <div />}
               
               {currentStep < 4 ? (
                 <Button 
                   onClick={() => setCurrentStep(prev => prev + 1)} 
                   className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-12 font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all"
                 >
                    {currentStep === 3 ? "Seal Identity Node" : "Synchronize Step"} <ChevronRight size={18} className="ml-2" />
                 </Button>
               ) : (
                 <Link href="/admin/users/students" className="w-full">
                    <Button className="w-full h-18 bg-lns-navy text-white hover:bg-lns-red rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl active:scale-95 transition-all">
                       Finalize Deployment & Return to Registry
                    </Button>
                 </Link>
               )}
            </div>
         </div>
      </Card>

      {/* Side Meta */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 opacity-30">
         <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.5em]"><Zap size={10} /> Latency: 42ms</div>
         <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.5em]"><Lock size={10} /> AES-256 Protocol Active</div>
         <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.5em]"><History size={10} /> Audit Trail Node: Ready</div>
      </div>
    </div>
  );
}
