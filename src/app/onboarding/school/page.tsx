"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Building,
  Users,
  Calendar,
  Zap,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = [
  "Identity Hub",
  "Institutional Node",
  "Faculty Contacts",
  "Academic Cycles",
  "Security Protocol"
];

export default function SchoolOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;

  return (
    <main className="min-h-screen bg-lns-navy flex flex-col p-6 items-center justify-center font-sans">
      <div className="max-w-3xl w-full space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="flex flex-col items-center text-center space-y-4">
           <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-lns-navy shadow-2xl">
              <span className="font-black text-xl italic uppercase font-mono">LNS</span>
           </div>
           <div className="space-y-1">
             <h2 className="text-sm font-black text-white uppercase tracking-[0.5em] italic">Institutional Onboarding</h2>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-red">Node Initializer {currentStep}/{totalSteps}</p>
           </div>
        </div>

        {currentStep === 1 && (
          <Card className="border-none shadow-2xl bg-white rounded-[3.5rem] overflow-hidden p-12 text-center space-y-10">
             <div className="space-y-4">
                <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter">Your Institution, <br /> <span className="text-lns-red">Fully Digital.</span></h1>
                <p className="text-lns-mid-grey font-medium leading-relaxed max-w-md mx-auto">
                   Lennon Nash OS requires your primary institutional metadata to initialize the global directory node.
                </p>
             </div>
             <div className="grid grid-cols-1 gap-6 text-left">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-4">School Name</label>
                   <input placeholder="e.g. Lennon Nash Academy" className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl px-8 font-black text-lg text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner" />
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                   <div className="flex-1 space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-4">Institutional Logo</label>
                       <div className="h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 hover:text-lns-navy hover:border-lns-navy transition-all cursor-pointer group hover:bg-white">
                          <Upload size={32} className="group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] font-black uppercase mt-4">Broadcast Logo (SVG/PNG)</span>
                       </div>
                   </div>
                </div>
             </div>
             <Button 
               onClick={() => setCurrentStep(2)}
               className="w-full h-18 bg-lns-navy text-white rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-navy-600/20 active:scale-95 transition-all text-xs"
             >
                Initialize Discovery Node <ArrowRight size={20} className="ml-3" />
             </Button>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="border-none shadow-2xl bg-white rounded-[3.5rem] overflow-hidden p-12 space-y-10">
             <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                <h2 className="text-2xl font-black text-lns-navy uppercase tracking-tight italic">Node Location</h2>
                <MapPin className="text-lns-red" />
             </div>
             <div className="grid grid-cols-1 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Physical Address Node</label>
                   <textarea placeholder="Line 1, City, Region, Postcode" className="w-full h-32 bg-gray-50 border border-gray-100 rounded-[2rem] p-8 text-sm font-bold italic text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner resize-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Institutional Phone</label>
                      <input placeholder="+44 20 ..." className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-black text-lns-navy outline-none" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Primary Support Email</label>
                      <input placeholder="admin@school.com" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-black text-lns-navy outline-none" />
                   </div>
                </div>
             </div>
             <div className="flex gap-4">
                <Button onClick={() => setCurrentStep(1)} variant="ghost" className="h-16 px-8 rounded-2xl font-black uppercase text-[10px] text-slate-400">Back</Button>
                <Button onClick={() => setCurrentStep(3)} className="h-16 flex-1 bg-lns-navy text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">Sync Location Node</Button>
             </div>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="border-none shadow-2xl bg-white rounded-[3.5rem] overflow-hidden p-12 space-y-8">
             <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                <h2 className="text-2xl font-black text-lns-navy uppercase tracking-tight italic">High Authority Contacts</h2>
                <Users className="text-lns-red" />
             </div>
             <p className="text-xs text-lns-mid-grey font-medium leading-relaxed">Setup the primary administrative nodes responsible for institutional governance.</p>
             <div className="space-y-4">
                {["Head Teacher / Principal", "IT Administrator", "Finance Lead"].map(role => (
                   <div key={role} className="p-6 bg-gray-50 border border-gray-100 rounded-[2rem] flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-lns-navy text-white flex items-center justify-center font-black text-[10px] italic">ID</div>
                         <div className="space-y-0.5">
                            <p className="text-[10px] font-black uppercase text-slate-400">{role}</p>
                            <input placeholder="Node Name" className="bg-transparent text-sm font-bold text-lns-navy outline-none border-none p-0 h-auto w-40" />
                         </div>
                      </div>
                      <Plus className="text-slate-200 group-hover:text-lns-red transition-colors" size={20} />
                   </div>
                ))}
             </div>
             <Button onClick={() => setCurrentStep(4)} className="w-full h-16 bg-lns-navy text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Register Authority Nodes</Button>
          </Card>
        )}

        {currentStep === 5 && (
           <div className="space-y-8 animate-in zoom-in duration-700">
              <Card className="border-none shadow-2xl bg-white rounded-[3.5rem] overflow-hidden p-16 text-center space-y-10 border-t-8 border-green-500">
                 <div className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center text-white shadow-2xl shadow-green-500/30">
                    <ShieldCheck size={48} />
                 </div>
                 <div className="space-y-4">
                    <h2 className="text-4xl font-[900] text-lns-navy tracking-tighter uppercase leading-none italic">Institution <span className="text-green-600">Locked.</span></h2>
                    <p className="text-lns-mid-grey font-medium leading-relaxed max-w-sm mx-auto">
                       Your school node is now cryptographically live in the global LNS OS directory.
                    </p>
                 </div>
                 <Link href="/admin/dashboard" className="block w-full">
                    <Button className="w-full h-20 bg-lns-navy text-white rounded-[2rem] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all text-xs">
                       Finalize & Launch Admin OS
                    </Button>
                 </Link>
              </Card>
           </div>
        )}
      </div>

      <div className="mt-12 text-center text-white/10 select-none">
         <div className="flex items-center space-x-2 text-[8px] font-black uppercase tracking-[0.5em] mb-4">
            <Globe size={10} />
            <span>Institutional Node Propagation Active</span>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <span>AES-256 Deployment Ready</span>
         </div>
      </div>
    </main>
  );
}
