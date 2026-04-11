"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Globe,
  Camera,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const steps = [
  { title: "Welcome", icon: Zap, desc: "Welcome to Lennon Nash OS — your modern learning environment." },
  { title: "Profile", icon: User, desc: "Let's set up your digital avatar and contact details." },
  { title: "Verify", icon: ShieldCheck, desc: "Finalize your blockchain identity and security layers." },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <main className="min-h-screen bg-lns-navy flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-lns-navy to-lns-navy">
      <div className="w-full max-w-2xl space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-red">Module 01</span>
             <span className="w-1 h-1 bg-white/20 rounded-full" />
             <span className="text-[10px] font-bold text-white uppercase tracking-widest">Initial Onboarding</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-[900] text-white tracking-tighter uppercase">
            Initialize <span className="text-lns-red">LNS OS</span>
          </h1>
        </div>

        <div className="flex items-center justify-center space-x-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500",
                i <= currentStep ? "bg-lns-red text-white shadow-lg shadow-lns-red/50" : "bg-white/5 text-white/20 border border-white/10"
              )}>
                <step.icon size={20} />
              </div>
              {i < steps.length - 1 && (
                <div className={cn(
                  "w-12 h-0.5 mx-2 transition-all duration-1000",
                  i < currentStep ? "bg-lns-red" : "bg-white/10"
                )} />
              )}
            </div>
          ))}
        </div>

        <Card className="border-none shadow-2xl bg-white/5 backdrop-blur-xl overflow-hidden rounded-[2.5rem] border border-white/10">
          <CardContent className="p-10 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">{steps[currentStep].title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">{steps[currentStep].desc}</p>
            </div>

            {currentStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-lns-red transition-all group cursor-pointer">
                  <Globe size={24} className="text-lns-red mb-3" />
                  <p className="font-bold text-white">Global Access</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Multi-campus enabled</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-lns-red transition-all group cursor-pointer">
                    <ShieldCheck size={24} className="text-lns-red mb-3" />
                    <p className="font-bold text-white">Secure Ledger</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Immutability active</p>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                 <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 rounded-3xl bg-white/10 border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-white/30 hover:text-white hover:border-lns-red transition-all cursor-pointer group">
                       <Camera size={24} className="group-hover:scale-110 transition-transform" />
                       <span className="text-[8px] font-black uppercase tracking-widest mt-2">Upload</span>
                    </div>
                    <div className="flex-1 space-y-4">
                       <div className="h-10 bg-white/5 border border-white/10 rounded-xl flex items-center px-4 text-xs font-bold text-white">
                          Sarah Jenkins
                       </div>
                       <div className="h-10 bg-white/5 border border-white/10 rounded-xl flex items-center px-4 text-xs font-bold text-slate-500">
                          Head Teacher • s.jenkins@lns.edu
                       </div>
                    </div>
                 </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-8 border-t border-white/10">
              <button 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              >
                Go Back
              </button>
              {currentStep < steps.length - 1 ? (
                <Button className="bg-lns-red hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-2xl h-14 px-10" onClick={() => setCurrentStep(currentStep + 1)}>
                   Next Step
                   <ArrowRight className="ml-2" size={18} />
                </Button>
              ) : (
                <Link href="/teacher/dashboard">
                  <Button className="bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-widest rounded-2xl h-14 px-10 shadow-lg shadow-green-600/30">
                     Enter OS System
                     <CheckCircle2 className="ml-2" size={18} />
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
