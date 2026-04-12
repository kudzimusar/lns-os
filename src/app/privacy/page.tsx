"use client";

import React from "react";
import Link from "next/link";
import { Shield, ArrowLeft, Lock, Eye, FileText, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-lns-light-grey py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <Link href="/">
          <Button variant="ghost" className="text-lns-mid-grey hover:text-lns-navy">
            <ArrowLeft size={20} className="mr-2" />
            Back to Portal
          </Button>
        </Link>

        <div className="space-y-4">
           <div className="w-16 h-16 rounded-3xl bg-lns-navy text-white flex items-center justify-center shadow-xl">
              <Shield size={32} className="text-lns-red" />
           </div>
           <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter uppercase">Privacy & Data <span className="text-lns-red">Rights</span></h1>
           <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Effective Date: April 12, 2026 • Version 2.4 (LNS-OS)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             { title: "GDPR Compliant", icon: Globe, desc: "Global standards for data protection." },
             { title: "COPPA Ready", icon: Eye, desc: "Special protections for student records." },
             { title: "Zero Knowledge", icon: Lock, desc: "Encrypted at rest and in transit." },
             { title: "Immutable Audit", icon: FileText, desc: "All access logged to blockchain." },
           ].map((item) => (
             <div key={item.title} className="p-6 bg-white rounded-3xl border border-lns-border shadow-sm flex items-start space-x-4">
                <item.icon size={24} className="text-lns-navy shrink-0" />
                <div>
                   <h3 className="text-sm font-bold text-lns-navy">{item.title}</h3>
                   <p className="text-xs text-lns-mid-grey">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="prose prose-sm max-w-none text-lns-navy space-y-8 pb-20">
           <section className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-tight border-b border-lns-border pb-2">1. Information We Collect</h2>
              <p className="text-sm leading-relaxed text-lns-dark-grey">
                 Lennon Nash OS (LNS OS) collects specific data required for academic excellence and school safety. This includes Biometric ID (for QR scanning), Academic Performance, Attendance Records, and Communication Logs. All data is categorized as "High Sensitivity" and managed under the Lennon Nash Institutional Data Decree.
              </p>
           </section>

           <section className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-tight border-b border-lns-border pb-2">2. How We Use Data</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-lns-dark-grey font-medium">
                 <li>To provide real-time academic insights via the AI Optima engine.</li>
                 <li>To verify attendance through the triple-point QR system.</li>
                 <li>To maintain an immutable record of school events on the LNS Ledger.</li>
                 <li>To facilitate secure, translated messaging between teachers and parents.</li>
              </ul>
           </section>

           <section className="space-y-4">
              <h2 className="text-xl font-black uppercase tracking-tight border-b border-lns-border pb-2">3. Your Data Rights</h2>
              <p className="text-sm leading-relaxed text-lns-dark-grey font-medium italic">
                 "Every student and parent has the absolute right to view, port, and challenge any data record stored on the LNS OS."
              </p>
              <p className="text-sm leading-relaxed text-lns-dark-grey">
                 Under GDPR and our internal "Transparency First" protocol, you may request a full cryptographic export of your data profile at any time via the Settings dashboard.
              </p>
           </section>

           <div className="p-8 bg-lns-navy rounded-2xl text-white">
              <h4 className="text-lg font-bold mb-2">Notice to Minors</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                 Student data is shared only with registered legal guardians and authorized school personnel. We NEVER sell data to third-party educational advertisers or external tech aggregates.
              </p>
           </div>
        </div>
      </div>
    </main>
  );
}
