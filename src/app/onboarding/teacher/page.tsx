"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  User, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  CheckCircle2, 
  BookOpen, 
  MessageSquare, 
  QrCode, 
  Bell, 
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = [
  "Welcome",
  "Profile Identity",
  "Assigned Classes",
  "Quick Tutorial",
  "Code of Conduct",
  "Notifications"
];

export default function TeacherOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;

  return (
    <main className="min-h-screen bg-lns-navy flex flex-col p-6 items-center justify-center font-sans">
      <div className="max-w-2xl w-full space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="flex flex-col items-center text-center space-y-4">
           <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-lns-navy shadow-2xl">
              <span className="font-black text-xl italic">LNS</span>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-lns-red">Onboarding Node {currentStep}/{totalSteps}</p>
        </div>

        {currentStep === 1 && (
          <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden p-12 text-center space-y-8">
             <div className="space-y-4">
                <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter">Welcome to the <br /> <span className="text-lns-red">Operating System.</span></h1>
                <p className="text-lns-mid-grey font-medium leading-relaxed">
                   Hello Sarah Jenkins. You have been authenticated as **Head of English**. Your institutional access is now initializing.
                </p>
             </div>
             <Button 
               onClick={() => setCurrentStep(2)}
               className="w-full h-16 bg-lns-navy text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-lns-navy/20"
             >
                Start Initialization <ArrowRight size={20} className="ml-2" />
             </Button>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden p-12 space-y-8">
             <h2 className="text-2xl font-black text-lns-navy uppercase tracking-tight text-center">Complete Your ID</h2>
             <div className="flex flex-col items-center space-y-6">
                <div className="w-24 h-24 rounded-[2.5rem] bg-lns-light-grey flex items-center justify-center border-2 border-dashed border-lns-border group hover:border-lns-red transition-all cursor-pointer relative">
                   <Upload className="text-lns-mid-grey group-hover:text-lns-red" />
                   <div className="absolute -bottom-2 -right-2 bg-lns-red text-white p-2 rounded-xl shadow-lg">
                      <PlusIcon size={14} />
                   </div>
                </div>
                <div className="w-full space-y-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-lns-mid-grey">Display Name</label>
                      <input defaultValue="Sarah Jenkins" className="w-full h-14 bg-lns-light-grey/50 rounded-2xl px-6 text-sm font-bold text-lns-navy border-none focus:ring-1 focus:ring-lns-navy" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-lns-mid-grey">Preferred Language</label>
                      <select className="w-full h-14 bg-lns-light-grey/50 rounded-2xl px-6 text-sm font-bold text-lns-navy border-none appearance-none">
                         <option>English (UK)</option>
                         <option>French</option>
                         <option>Spanish</option>
                      </select>
                   </div>
                </div>
                <Button onClick={() => setCurrentStep(3)} className="w-full h-16 bg-lns-navy text-white rounded-2xl font-black">Next Phase</Button>
             </div>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden p-12 space-y-8 text-center">
             <div className="space-y-2">
                <h2 className="text-2xl font-black text-lns-navy uppercase tracking-tight">Your Assignments</h2>
                <p className="text-xs text-lns-mid-grey px-8">Confirm your scheduled classes for the current academic year.</p>
             </div>
             <div className="space-y-3">
                {["English Lit 10A", "English Bridge 8C", "Advanced IB Lit"].map(cls => (
                   <div key={cls} className="p-4 bg-lns-light-grey/50 rounded-2xl border border-lns-border/30 flex items-center justify-between text-left">
                      <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 rounded-lg bg-lns-navy text-white flex items-center justify-center font-black text-[10px]">{cls[0]}</div>
                         <span className="text-sm font-bold text-lns-navy">{cls}</span>
                      </div>
                      <span className="text-[10px] font-black uppercase text-green-600">CONFIRMED</span>
                   </div>
                ))}
             </div>
             <p className="text-[10px] text-lns-red font-black uppercase tracking-widest">Flag Incorrect Schedule?</p>
             <Button onClick={() => setCurrentStep(4)} className="w-full h-16 bg-lns-navy text-white rounded-2xl font-black">Continue to Tutorial</Button>
          </Card>
        )}

        {currentStep === 4 && (
          <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden p-12 space-y-8">
             <h2 className="text-2xl font-black text-lns-navy uppercase tracking-tight text-center italic">Core Training</h2>
             <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Scan Attendance", icon: QrCode, desc: "Teacher QR ID is required for every session." },
                  { label: "On-Ledger Marking", icon: BookOpen, desc: "Every grade is immutable once released." },
                  { label: "Safe Comms", icon: MessageSquare, desc: "Encrypted direct lines for student welfare." },
                ].map(tut => (
                   <div key={tut.label} className="p-6 bg-lns-light-grey/20 border border-lns-border rounded-3xl flex items-start space-x-6 hover:border-lns-red transition-all cursor-pointer group">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-lns-navy shadow-sm group-hover:bg-lns-navy group-hover:text-white transition-all">
                         <tut.icon size={24} />
                      </div>
                      <div className="flex-1">
                         <h4 className="text-sm font-black text-lns-navy uppercase tracking-tight">{tut.label}</h4>
                         <p className="text-xs text-lns-mid-grey font-medium leading-tight mt-1">{tut.desc}</p>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-lns-border flex items-center justify-center p-0.5 group-hover:bg-green-500 group-hover:border-green-500 transition-all">
                         <span className="text-[10px] font-black text-white opacity-0 group-hover:opacity-100 italic">GO</span>
                      </div>
                   </div>
                ))}
             </div>
             <Button onClick={() => setCurrentStep(5)} className="w-full h-16 bg-lns-navy text-white rounded-2xl font-black">Final Policy Agreement</Button>
          </Card>
        )}

        {currentStep === 6 && (
           <div className="space-y-8 animate-in zoom-in duration-700">
              <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden p-12 text-center space-y-6">
                 <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center text-white shadow-xl shadow-green-500/20">
                    <ShieldCheck size={40} />
                 </div>
                 <div className="space-y-2">
                    <h2 className="text-3xl font-black text-lns-navy uppercase tracking-tight">Onboarding <span className="text-green-600">Verified</span></h2>
                    <p className="text-sm text-lns-mid-grey px-6 leading-relaxed">
                       Your Teacher Node is now correctly linked to the LNS OS Ecosystem. Welcome to the future of academic management.
                    </p>
                 </div>
                 <Link href="/teacher/dashboard" className="block w-full">
                    <Button className="w-full h-16 bg-lns-navy text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl mt-4">
                       Enter Command Center
                    </Button>
                 </Link>
              </Card>
           </div>
        )}
      </div>

      <div className="mt-12 text-center text-white/20 select-none">
         <div className="flex items-center space-x-2 text-[8px] font-black uppercase tracking-[0.5em] mb-4">
            <span>Blockchain Verified</span>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Biometric Ready</span>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <span>LNS Private Protocol v2.4</span>
         </div>
      </div>
    </main>
  );
}

function PlusIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
       <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}
