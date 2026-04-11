"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Building2, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  CheckCircle2, 
  GraduationCap, 
  Calendar, 
  Users, 
  Mail, 
  Printer, 
  FileText,
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = [
  "School Profile",
  "Grading System",
  "Term Dates",
  "Add Staff",
  "Enroll Students",
  "Link Parents",
  "Class Assign",
  "Review",
  "Print ID Cards"
];

export default function AdminOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <main className="min-h-screen bg-lns-light-grey flex flex-col">
      {/* Onboarding Header */}
      <header className="bg-white border-b border-lns-border p-6 sticky top-0 z-50">
         <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
               <div className="w-10 h-10 bg-lns-navy rounded-xl flex items-center justify-center text-white text-xs font-black shadow-lg">LNS</div>
               <div>
                  <h1 className="text-lg font-black text-lns-navy uppercase tracking-tight">Institution Onboarding</h1>
                  <div className="flex items-center space-x-2">
                     <span className="text-[10px] font-black uppercase text-lns-mid-grey">Step {currentStep} of {totalSteps}:</span>
                     <span className="text-[10px] font-black uppercase text-lns-red">{steps[currentStep-1]}</span>
                  </div>
               </div>
            </div>
            <div className="hidden md:flex items-center space-x-1">
               {steps.map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-1.5 w-8 rounded-full transition-all",
                      currentStep > i ? "bg-lns-red" : currentStep === i + 1 ? "bg-lns-navy" : "bg-lns-border"
                    )} 
                  />
               ))}
            </div>
            <Button variant="ghost" className="text-lns-mid-grey font-bold text-xs">Save & Exit</Button>
         </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full p-6 py-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
         {/* Step 1: School Profile */}
         {currentStep === 1 && (
            <div className="space-y-8">
               <div className="text-center space-y-2">
                  <h2 className="text-4xl font-[900] text-lns-navy tracking-tighter">Define Your <span className="text-lns-red">Institution</span></h2>
                  <p className="text-lns-mid-grey font-medium">Let's start with the basics of your school identity.</p>
               </div>
               <Card className="border-none shadow-xl bg-white p-8">
                  <CardContent className="space-y-6">
                     <div className="flex flex-col items-center space-y-4 pb-4 border-b border-lns-border">
                        <div className="w-24 h-24 rounded-[2rem] bg-lns-light-grey flex items-center justify-center border-2 border-dashed border-lns-border group hover:border-lns-red transition-all cursor-pointer">
                           <Upload className="text-lns-mid-grey group-hover:text-lns-red" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Institutional Logo</p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest">School Name</label>
                           <input placeholder="e.g. Lennon Nash High School" className="w-full h-12 bg-lns-light-grey/50 rounded-xl px-4 text-sm font-bold text-lns-navy border-none focus:ring-1 focus:ring-lns-navy" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest">Country/Region</label>
                           <input placeholder="e.g. United Kingdom" className="w-full h-12 bg-lns-light-grey/50 rounded-xl px-4 text-sm font-bold text-lns-navy border-none focus:ring-1 focus:ring-lns-navy" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest">Timezone</label>
                           <select className="w-full h-12 bg-lns-light-grey/50 rounded-xl px-4 text-sm font-bold text-lns-navy border-none focus:ring-1 focus:ring-lns-navy appearance-none">
                              <option>GMT (UTC+0)</option>
                              <option>CET (UTC+1)</option>
                              <option>EST (UTC-5)</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest">Academic Year</label>
                           <input placeholder="2026/2027" className="w-full h-12 bg-lns-light-grey/50 rounded-xl px-4 text-sm font-bold text-lns-navy border-none focus:ring-1 focus:ring-lns-navy" />
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         )}

         {/* Step 2: Grading System */}
         {currentStep === 2 && (
            <div className="space-y-8">
               <div className="text-center space-y-2">
                  <h2 className="text-4xl font-[900] text-lns-navy tracking-tighter">Grading <span className="text-lns-red">Scales</span></h2>
                  <p className="text-lns-mid-grey font-medium">Configure how subjects are weighted and assessed.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {["Logic / Theory", "Application", "Communication"].map((cat) => (
                    <Card key={cat} className="border-none shadow-sm bg-white p-6">
                       <p className="text-[10px] font-black uppercase text-lns-mid-grey mb-4">{cat}</p>
                       <input defaultValue="33.3%" className="text-2xl font-[900] text-lns-navy w-full bg-transparent border-none p-0 focus:ring-0" />
                       <div className="pt-4 mt-4 border-t border-lns-border">
                          <p className="text-[9px] font-bold text-lns-mid-grey italic">Weighting must sum to 100%</p>
                       </div>
                    </Card>
                  ))}
               </div>
               <Card className="border-none shadow-sm bg-white p-8 space-y-6">
                  <h3 className="text-lg font-bold text-lns-navy">Citizenship Labels</h3>
                  <div className="flex flex-wrap gap-3">
                     {["Platinum", "Gold", "Silver", "Bronze"].map(label => (
                        <div key={label} className="px-4 py-2 bg-lns-light-grey rounded-xl text-xs font-bold text-lns-navy border border-lns-border">
                           {label}
                        </div>
                     ))}
                     <Button variant="ghost" size="sm" className="text-lns-red font-black text-[10px] tracking-widest">ADD LABEL +</Button>
                  </div>
               </Card>
            </div>
         )}

         {/* Step 3: Term Dates */}
         {currentStep === 3 && (
            <div className="space-y-8">
               <div className="text-center space-y-2">
                  <h2 className="text-4xl font-[900] text-lns-navy tracking-tighter">The <span className="text-lns-red">Calendar</span></h2>
                  <p className="text-lns-mid-grey font-medium">Define your academic milestones and breaks.</p>
               </div>
               <div className="space-y-4">
                  {[1, 2, 3].map(term => (
                     <Card key={term} className="border-none shadow-sm bg-white flex items-center justify-between p-8">
                        <div className="flex items-center space-x-6">
                           <div className="w-12 h-12 rounded-2xl bg-lns-navy text-white flex items-center justify-center font-black">T{term}</div>
                           <div>
                              <p className="text-sm font-bold text-lns-navy">Term {term} Duration</p>
                              <p className="text-[10px] font-bold text-lns-mid-grey uppercase">Sept 1 — Dec 15</p>
                           </div>
                        </div>
                        <Button variant="outline" className="border-lns-border h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest text-lns-navy">Configure</Button>
                     </Card>
                  ))}
               </div>
            </div>
         )}

         {/* Step 4 & 5: Staff & Students (Bulk Upload Experience) */}
         {(currentStep === 4 || currentStep === 5) && (
            <div className="space-y-8">
               <div className="text-center space-y-2">
                  <h2 className="text-4xl font-[900] text-lns-navy tracking-tighter">Bulk <span className="text-lns-red">{currentStep === 4 ? "Staff" : "Student"}</span> Import</h2>
                  <p className="text-lns-mid-grey font-medium">Upload your rosters to auto-generate LNS Identity tokens.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="border-2 border-dashed border-lns-border bg-white p-12 flex flex-col items-center justify-center text-center space-y-6 hover:border-lns-red transition-all cursor-pointer group">
                     <div className="w-20 h-20 bg-lns-light-grey rounded-[2.5rem] flex items-center justify-center text-lns-mid-grey group-hover:bg-lns-red group-hover:text-white transition-all">
                        <Upload size={32} />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-lg font-bold text-lns-navy">Drop CSV File Here</h3>
                        <p className="text-xs text-lns-mid-grey">Or click to browse your local server.</p>
                     </div>
                  </Card>
                  <Card className="bg-lns-navy text-white p-12 flex flex-col justify-center space-y-6">
                     <div className="space-y-2">
                        <h3 className="text-xl font-bold uppercase tracking-tight">Need a template?</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">Download our zero-error CSV template to ensure all biometric fields are correctly mapped.</p>
                     </div>
                     <Button className="bg-white text-lns-navy hover:bg-lns-red hover:text-white transition-all h-14 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                        Download Template
                     </Button>
                  </Card>
               </div>
               <div className="p-6 bg-white rounded-3xl border border-lns-border shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                     <CheckCircle2 size={24} className="text-green-500" />
                     <span className="text-sm font-bold text-lns-navy">124 {currentStep === 4 ? "Staff Members" : "Students"} identified in queue</span>
                  </div>
                  <Button variant="ghost" className="text-[10px] font-black uppercase text-lns-navy">Preview List</Button>
               </div>
            </div>
         )}

         {/* Step 9: Print ID Cards (Final Step) */}
         {currentStep === 9 && (
            <div className="space-y-8">
               <div className="text-center space-y-2">
                  <h2 className="text-4xl font-[900] text-lns-navy tracking-tighter">Physical <span className="text-lns-red">Identity</span></h2>
                  <p className="text-lns-mid-grey font-medium">Batch print all institution QR ID cards for physical check-in.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-none shadow-xl bg-white p-10 space-y-6 text-center">
                     <div className="w-20 h-20 bg-lns-navy rounded-[2rem] mx-auto flex items-center justify-center text-white">
                        <Users size={32} />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-xl font-black text-lns-navy">1,240 Student Cards</h3>
                        <p className="text-xs text-lns-mid-grey uppercase font-bold tracking-widest">Standard PVC Format</p>
                     </div>
                     <Button className="w-full h-14 bg-lns-navy text-white rounded-2xl font-black uppercase tracking-widest text-[12px] shadow-2xl">
                        <Printer size={20} className="mr-3" />
                        Print Student Batch
                     </Button>
                  </Card>
                  <Card className="border-none shadow-xl bg-white p-10 space-y-6 text-center">
                     <div className="w-20 h-20 bg-lns-red rounded-[2rem] mx-auto flex items-center justify-center text-white">
                        <ShieldCheck size={32} />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-xl font-black text-lns-navy">90 Staff Identity Cards</h3>
                        <p className="text-xs text-lns-mid-grey uppercase font-bold tracking-widest">Enhanced Access Level</p>
                     </div>
                     <Button className="w-full h-14 bg-lns-red text-white rounded-2xl font-black uppercase tracking-widest text-[12px] shadow-2xl">
                        <Printer size={20} className="mr-3" />
                        Print Staff Batch
                     </Button>
                  </Card>
               </div>
               <div className="p-8 bg-green-50 rounded-[2.5rem] border border-green-200 flex flex-col items-center space-y-4 text-center">
                  <Zap className="text-green-600" size={32} />
                  <h3 className="text-xl font-black text-green-950 uppercase tracking-tight">Onboarding Complete</h3>
                  <p className="text-sm text-green-800 font-medium px-12">All institution nodes have been successfully synchronized to the LNS blockchain ledger. Your school is now active.</p>
                  <Link href="/admin/dashboard" className="w-full max-w-sm">
                     <Button className="w-full h-16 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">
                        Enter Command Dashboard
                     </Button>
                  </Link>
               </div>
            </div>
         )}

         {/* Onboarding Navigation Footer */}
         <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-lns-border p-6 flex items-center justify-center">
            <div className="max-w-4xl w-full flex items-center justify-between">
               <Button 
                 variant="ghost" 
                 onClick={prevStep} 
                 disabled={currentStep === 1}
                 className="text-lns-mid-grey font-black uppercase tracking-widest text-xs"
               >
                  <ChevronLeft size={20} className="mr-2" /> Back
               </Button>
               {currentStep < 9 ? (
                 <Button 
                   onClick={nextStep} 
                   className="bg-lns-navy text-white px-12 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-lns-navy/20"
                 >
                    Next Phase: {steps[currentStep]} <ChevronRight size={20} className="ml-2" />
                 </Button>
               ) : null}
            </div>
         </div>
      </div>
    </main>
  );
}

