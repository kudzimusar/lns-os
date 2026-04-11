"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Heart, 
  ChevronRight, 
  ShieldCheck, 
  Lock, 
  Bell, 
  Globe, 
  User, 
  ArrowRight,
  Mail,
  Users,
  CheckCircle2,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ParentOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <main className="min-h-screen bg-lns-light-grey flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-12 animate-in fade-in duration-700">
         <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-lns-navy rounded-3xl flex items-center justify-center text-white shadow-2xl">
               <span className="font-black text-xl italic">LNS</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-lns-red">Parent Node Initialization</p>
         </div>

         {currentStep === 1 && (
            <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden p-12 text-center space-y-10">
               <div className="space-y-4">
                  <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter uppercase leading-tight">Welcome to the <br /><span className="text-lns-red">Guardian Hub.</span></h1>
                  <p className="text-lns-mid-grey font-medium px-8">You have been invited by **Lennon Nash High School** to link with your child's academic profile.</p>
               </div>
               
               <div className="p-8 bg-lns-navy rounded-[2.5rem] text-white flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white font-black text-xl">L</div>
                     <div className="text-left">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Linked Child</p>
                        <p className="text-lg font-bold">Alex Lincoln</p>
                     </div>
                  </div>
                  <CheckCircle2 className="text-green-500" size={24} />
               </div>

               <Button onClick={() => setCurrentStep(2)} className="w-full h-18 bg-lns-navy text-white rounded-[2rem] font-black uppercase tracking-widest h-14">
                  Continue to Identity Setup
               </Button>
            </Card>
         )}

         {currentStep === 2 && (
            <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden p-10 space-y-8 animate-in slide-in-from-bottom-6 duration-500">
               <h2 className="text-2xl font-black text-lns-navy uppercase tracking-tight text-center">Account Profile</h2>
               <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-lns-mid-grey">Full Name</label>
                       <input defaultValue="Thomas Lincoln" className="w-full h-14 bg-lns-light-grey/50 rounded-2xl px-6 text-sm font-bold text-lns-navy border-none focus:ring-1 focus:ring-lns-navy" />
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
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-lns-mid-grey">Notification Email</label>
                     <input defaultValue="t.lincoln@gmail.com" className="w-full h-14 bg-lns-light-grey/50 rounded-2xl px-6 text-sm font-bold text-lns-navy border-none" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-lns-mid-grey">Password Verification</label>
                     <div className="relative">
                        <input type="password" placeholder="••••••••" className="w-full h-14 bg-lns-light-grey/50 rounded-2xl px-6 text-sm font-bold text-lns-navy border-none" />
                        <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-lns-border" size={18} />
                     </div>
                  </div>
                  <Button onClick={() => setCurrentStep(3)} className="w-full h-16 bg-lns-navy text-white rounded-2xl font-black mt-4 shadow-xl">Secure Profile & Next</Button>
               </div>
            </Card>
         )}

         {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in duration-500 text-center">
               <div className="space-y-2">
                  <h2 className="text-3xl font-[900] text-lns-navy tracking-tighter uppercase">Legal & Data <span className="text-lns-red">Consent</span></h2>
                  <p className="text-lns-mid-grey font-medium text-sm px-12">Confirm your agreement with the LNS OS Private Protocol v2.4.</p>
               </div>
               <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "Privacy Policy", desc: "How we protect and verify your child's student record on-ledger.", icon: ShieldCheck },
                    { label: "Institutional Data Rights", desc: "Your right to view, port, and challenge school-wide data hashes.", icon: Lock },
                  ].map(policy => (
                     <div key={policy.label} className="p-6 bg-white border border-lns-border rounded-[2.5rem] flex items-center justify-between text-left hover:border-lns-red transition-all group">
                        <div className="flex items-center space-x-6">
                           <div className="w-12 h-12 rounded-2xl bg-lns-light-grey flex items-center justify-center text-lns-navy group-hover:bg-lns-navy group-hover:text-white transition-all">
                              <policy.icon size={24} />
                           </div>
                           <div className="flex-1">
                              <h4 className="text-sm font-black text-lns-navy uppercase tracking-tight">{policy.label}</h4>
                              <p className="text-[10px] text-lns-mid-grey font-bold leading-tight mt-1">{policy.desc}</p>
                           </div>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center p-0.5">
                           <div className="w-full h-full bg-green-500 rounded-full" />
                        </div>
                     </div>
                  ))}
               </div>
               <Button onClick={() => setCurrentStep(4)} className="w-full h-20 bg-lns-navy text-white rounded-[2.5rem] font-black uppercase text-xs tracking-widest shadow-2xl">Confirm Institutional Agreement</Button>
            </div>
         )}

         {currentStep === 4 && (
            <div className="space-y-10 animate-in zoom-in duration-500">
               <div className="space-y-3">
                  <CheckCircle2 className="text-green-500 mx-auto" size={56} />
                  <h2 className="text-4xl font-[900] text-lns-navy tracking-tighter uppercase leading-tight">Initialization Complete</h2>
                  <p className="text-lns-mid-grey font-medium px-12 italic text-sm">"Technology serving education, not the other way around."</p>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <Card className="border-none shadow-sm bg-white p-8 space-y-4 text-center">
                     <Bell size={24} className="mx-auto text-lns-navy" />
                     <p className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest">Push Alerts</p>
                     <p className="text-xs font-bold text-lns-navy">ENABLED</p>
                  </Card>
                  <Card className="border-none shadow-sm bg-white p-8 space-y-4 text-center">
                     <Globe size={24} className="mx-auto text-lns-navy" />
                     <p className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest">Language Hub</p>
                     <p className="text-xs font-bold text-lns-navy">ENGLISH</p>
                  </Card>
               </div>

               <Link href="/parent/dashboard" className="block w-full">
                  <Button className="w-full h-20 bg-lns-navy text-white rounded-[2.5rem] font-black uppercase tracking-widest text-lg shadow-2xl group">
                     Unlock Parent Portal <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
                  </Button>
               </Link>
            </div>
         )}
      </div>
    </main>
  );
}
