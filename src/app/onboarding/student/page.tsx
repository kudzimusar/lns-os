"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  User, 
  ChevronRight, 
  Plus,
  Upload, 
  CheckCircle2, 
  QrCode, 
  ArrowRight,
  Zap,
  ShieldCheck,
  BookOpen,
  Monitor
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function StudentOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <main className="min-h-screen bg-lns-navy flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-xl w-full space-y-10 animate-in fade-in zoom-in duration-700">
         <div className="w-16 h-16 bg-white rounded-3xl mx-auto flex items-center justify-center text-lns-navy shadow-2xl relative">
            <span className="font-black text-xl italic leading-none">LNS</span>
            <div className="absolute -top-2 -right-2 bg-lns-red w-4 h-4 rounded-full border-2 border-white animate-pulse" />
         </div>

         {currentStep === 1 && (
            <div className="space-y-8">
               <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl font-[900] text-white tracking-tighter uppercase leading-tight">Welcome, <br /><span className="text-lns-red">Alex Lincoln.</span></h1>
                  <p className="text-slate-400 font-medium text-lg px-8">Your digital academic profile for Grade 10A is now active.</p>
               </div>
               <Button onClick={() => setCurrentStep(2)} className="h-20 w-full bg-white text-lns-navy rounded-[2rem] font-black uppercase text-xl shadow-2xl shadow-white/10 group transition-all">
                  Initialize Profile <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
               </Button>
            </div>
         )}

         {currentStep === 2 && (
            <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden p-10 space-y-8 animate-in slide-in-from-bottom-6 duration-500">
               <h2 className="text-2xl font-black text-lns-navy uppercase tracking-tight">Identity Token</h2>
               <div className="flex flex-col items-center space-y-6">
                  <div className="w-28 h-28 rounded-[2.5rem] bg-lns-light-grey flex items-center justify-center border-4 border-dashed border-lns-border group hover:border-lns-red transition-all cursor-pointer relative overflow-hidden">
                     <Upload size={32} className="text-lns-mid-grey group-hover:text-lns-red" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Upload Your Institutional Photo</p>
                  <Button onClick={() => setCurrentStep(3)} className="w-full h-16 bg-lns-navy text-white rounded-2xl font-black uppercase tracking-widest">Generate QR Card</Button>
               </div>
            </Card>
         )}

         {currentStep === 3 && (
            <div className="space-y-10 animate-in zoom-in duration-500">
               <div className="space-y-4">
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight">This is You.</h2>
                  <p className="text-slate-400 text-sm px-10">Your unique LNS Biometric QR. Keep it safe — it's how you scan into every class and verified assessment.</p>
               </div>
               
               <div className="p-12 bg-white rounded-[3rem] shadow-2xl relative inline-block group">
                  <QrCode size={180} className="text-lns-navy" />
                  <div className="absolute -top-4 -right-4 bg-lns-red text-white p-4 rounded-3xl shadow-xl rotate-12 transition-transform group-hover:rotate-6">
                     <ShieldCheck size={32} />
                  </div>
                  <div className="mt-8 border-t border-lns-border pt-6 text-center">
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey">LNS-ID-2026-0042</p>
                  </div>
               </div>

               <Button onClick={() => setCurrentStep(4)} className="w-full h-18 bg-white text-lns-navy rounded-[2rem] font-black uppercase text-xs tracking-widest h-16">
                  Final Training & Access
               </Button>
            </div>
         )}

         {currentStep === 4 && (
            <div className="space-y-8">
               <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "Class Attendance", icon: Monitor, desc: "Scan overhead QR at the start of every session." },
                    { label: "Power Score", icon: Zap, desc: "Track your real-time academic rank and merits." },
                    { label: "Task Hub", icon: BookOpen, desc: "Manage assignments and verified IB benchmarks." },
                  ].map(t => (
                     <div key={t.label} className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center space-x-6 text-left hover:bg-white/10 transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-lns-navy shrink-0 shadow-xl group-hover:bg-lns-navy group-hover:text-white transition-all">
                           <t.icon size={24} />
                        </div>
                        <div>
                           <h4 className="text-sm font-black text-white uppercase tracking-tight">{t.label}</h4>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{t.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
               <Link href="/student/dashboard" className="block w-full">
                  <Button className="w-full h-20 bg-white text-lns-navy rounded-[2.5rem] font-black uppercase tracking-widest shadow-2xl text-lg group">
                     Unlock Dashboard <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
                  </Button>
               </Link>
            </div>
         )}
      </div>

      <div className="fixed bottom-8 text-[8px] font-black uppercase tracking-[0.6em] text-white/10">
         Secured by LNS High-Trust Network
      </div>
    </main>
  );
}
