"use client";

import React from "react";
import Link from "next/link";
import { FolderLock, ArrowLeft, Cookie, Database, Gavel, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

const legalDox = [
   { name: "Privacy Policy", icon: ShieldCheck, href: "/privacy", desc: "Data collection and student protection standards." },
   { name: "Terms of Service", icon: Gavel, href: "/terms", desc: "Digital conduct and institutional agreement." },
   { name: "Cookie Policy", icon: Cookie, href: "/legal", desc: "How we use local storage and session tokens." },
   { name: "Data Processing Agreement", icon: Database, href: "/legal", desc: "Technical details of our 100% GDPR compliant cloud." },
];

export default function LegalCentre() {
  return (
    <main className="min-h-screen bg-lns-light-grey py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link href="/">
          <Button variant="ghost" className="text-lns-mid-grey hover:text-lns-navy">
            <ArrowLeft size={20} className="mr-2" />
            Back to Portal
          </Button>
        </Link>

        <div className="text-center space-y-4">
           <h1 className="text-5xl font-[900] text-lns-navy tracking-tighter uppercase">Legal & <span className="text-lns-red">Compliance</span></h1>
           <p className="text-lns-mid-grey font-medium max-w-xl mx-auto">Transparency is our core protocol. Read about our commitment to student safety and data integrity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {legalDox.map((doc) => (
             <Link key={doc.name} href={doc.href}>
                <Card className="border-none shadow-sm hover:shadow-xl transition-all cursor-pointer group bg-white">
                   <CardContent className="p-8 flex items-start space-x-6">
                      <div className="w-14 h-14 rounded-2xl bg-lns-light-grey flex items-center justify-center text-lns-navy group-hover:bg-lns-navy group-hover:text-white transition-all">
                         <doc.icon size={28} />
                      </div>
                      <div className="flex-1 space-y-1">
                         <h3 className="text-lg font-bold text-lns-navy group-hover:text-lns-red transition-colors">{doc.name}</h3>
                         <p className="text-xs text-lns-mid-grey font-medium leading-relaxed">{doc.desc}</p>
                      </div>
                      <ChevronRight size={20} className="text-lns-border group-hover:text-lns-navy" />
                   </CardContent>
                </Card>
             </Link>
           ))}
        </div>

        <Card className="border-none shadow-2xl bg-lns-navy text-white p-10 overflow-hidden relative">
           <div className="relative z-10 space-y-6">
              <h4 className="text-2xl font-black uppercase tracking-tight">GDPR & COPPA Certified</h4>
              <p className="max-w-xl text-slate-400 text-sm leading-relaxed">
                 Lennon Nash OS is built on a private, sovereign architecture. We do not use third-party tracking scripts or external font providers that could expose student IP addresses to advertising networks. 
              </p>
              <div className="flex flex-wrap gap-4">
                 {["TLS 1.3", "AES-256", "Blockchain Verified", "Sovereign Cloud"].map(tag => (
                   <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-lns-mid-grey border border-white/10">{tag}</span>
                 ))}
              </div>
           </div>
           <FolderLock className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64" />
        </Card>
      </div>
    </main>
  );
}
