"use client";

import React from "react";
import Link from "next/link";
import { Scale, ArrowLeft, ShieldAlert, CheckCircle2, AlertTriangle, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-lns-light-grey py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-10 font-sans">
        <Link href="/">
          <Button variant="ghost" className="text-lns-mid-grey hover:text-lns-navy">
            <ArrowLeft size={20} className="mr-2" />
            Back to Portal
          </Button>
        </Link>

        <div className="space-y-4">
           <div className="w-16 h-16 rounded-3xl bg-lns-red text-white flex items-center justify-center shadow-xl">
              <Scale size={32} />
           </div>
           <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter uppercase">Standard Terms of <span className="text-lns-red">Engagement</span></h1>
           <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Academic Year 2026/2027 • Standard Institutional License</p>
        </div>

        <div className="prose prose-sm max-w-none text-lns-navy space-y-8 pb-20">
           <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl flex items-start space-x-4">
              <AlertTriangle className="text-amber-600 shrink-0" size={24} />
              <p className="text-xs text-amber-800 font-medium">
                 By accessing Lennon Nash OS, you agree to abide by the School Code of Conduct and acknowledge that all digital fingerprints are hashed to the school's private blockchain for accountability.
              </p>
           </div>

           <section className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-tight border-b border-lns-border pb-2">1. Use of Digital Identity</h2>
              <p className="text-sm leading-relaxed text-lns-dark-grey">
                 Every user is assigned a unique Biometric QR Identity. Sharing of QR codes or account credentials is a level 3 security violation. Impersonating another student or staff member in the digital environment will result in immediate suspension.
              </p>
           </section>

           <section className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-tight border-b border-lns-border pb-2">2. Verification Protocols</h2>
              <p className="text-sm leading-relaxed text-lns-dark-grey">
                 LNS OS uses a triple-verified attendance system. You agree that your physical presence is required to trigger a successful "Subject + Teacher + Student" hash. Attempting to scan a Subject QR from a remote location via digital proxies is strictly prohibited.
              </p>
           </section>

           <section className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-tight border-b border-lns-border pb-2">3. Academic Integrity</h2>
              <p className="text-sm leading-relaxed text-lns-dark-grey">
                 The AI feedback engine (Optima-1) provides assistive drafting only. Students must submit original thinking. Use of external LLMs without proper citation and "LNS-Original" verification will mark the assignment as "Fraudulent" on the ledger.
              </p>
           </section>

           <section className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-tight border-b border-lns-border pb-2">4. Right to Audit</h2>
              <p className="text-sm leading-relaxed text-lns-dark-grey">
                 Lennon Nash High School reserves the right to audit all messaging and file storage on LNS OS to ensure a safe, bullying-free environment for all minors.
              </p>
           </section>

           <div className="flex items-center justify-between p-8 bg-white border border-lns-border rounded-[2.5rem] shadow-sm">
              <div className="flex items-center space-x-3">
                 <FileCheck className="text-green-600" size={24} />
                 <span className="text-sm font-black text-lns-navy">Institutional Compliance Verified</span>
              </div>
              <Button size="sm" className="bg-lns-navy text-white text-[10px] font-black uppercase tracking-widest">Download PDF Copy</Button>
           </div>
        </div>
      </div>
    </main>
  );
}
