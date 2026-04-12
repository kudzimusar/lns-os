"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  PlayCircle, 
  Search, 
  ChevronRight,
  ExternalLink,
  LifeBuoy,
  Tickets
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const faqCategories = [
  { name: "Getting Started", count: 12, icon: HelpCircle, id: 'getting-started' },
  { name: "Attendance & QR", count: 8, icon: BookOpen, id: 'attendance' },
  { name: "Gradebook Magic", count: 15, icon: LifeBuoy, id: 'gradebook' },
  { name: "Blockchain Ledger", count: 5, icon: MessageSquare, id: 'blockchain' },
];

export default function SupportPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 pt-10 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-[900] text-lns-navy tracking-tighter uppercase">
          How can we <span className="text-lns-red">Help?</span>
        </h1>
        <p className="text-lns-mid-grey font-medium max-w-xl mx-auto italic">Search our institutional knowledge base, watch masterclasses, or connect with a support specialist.</p>
        
        <div className="max-w-2xl mx-auto relative pt-4">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-lns-mid-grey" size={20} />
           <input 
             type="text" 
             placeholder="Search for articles, guides or error codes..." 
             className="w-full h-16 bg-white shadow-2xl rounded-[2rem] border-none pl-16 pr-8 text-sm focus:ring-2 focus:ring-lns-red transition-all outline-none"
           />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {faqCategories.map((cat) => (
           <Link key={cat.name} href={`/support/${cat.id}`}>
             <Card className="border-none shadow-sm hover:shadow-xl transition-all cursor-pointer group bg-white h-full">
                <CardContent className="p-6 text-center space-y-3">
                   <div className="w-12 h-12 rounded-2xl bg-lns-light-grey flex items-center justify-center text-lns-navy mx-auto group-hover:bg-lns-navy group-hover:text-white transition-all shadow-inner">
                      <cat.icon size={24} />
                   </div>
                   <h3 className="text-sm font-bold text-lns-navy">{cat.name}</h3>
                   <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">{cat.count} Articles</p>
                </CardContent>
             </Card>
           </Link>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="border-none shadow-2xl bg-lns-navy text-white overflow-hidden p-10 flex flex-col justify-between rounded-2xl relative group">
            <div className="absolute inset-0 bg-lns-red/10 blur-[80px] group-hover:bg-lns-red/20 transition-all" />
            <div className="relative z-10 space-y-6">
               <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tighter uppercase italic">Video Masterclasses</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Watch high-fidelity tutorials on using LNS OS features like the AI Insight engine and Attendance sealing.</p>
               </div>
               <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group/item">
                       <div className="flex items-center space-x-4">
                          <PlayCircle size={20} className="text-lns-red group-hover/item:scale-110 transition-transform" />
                          <span className="text-xs font-bold">LNS OS Operational Guide #{i}</span>
                       </div>
                       <ChevronRight size={16} className="text-slate-500" />
                    </div>
                  ))}
               </div>
               <Button className="w-full mt-4 bg-white text-lns-navy hover:bg-lns-red hover:text-white font-black uppercase tracking-widest text-[10px] h-14 rounded-2xl shadow-xl shadow-white/5 transition-all">
                  Launch Institutional Channel
               </Button>
            </div>
         </Card>

         <Card className="border-none shadow-2xl bg-white p-10 space-y-8 rounded-2xl">
            <div className="space-y-2">
               <h3 className="text-3xl font-black text-lns-navy tracking-tighter uppercase italic">Deploy Support Ticket</h3>
               <p className="text-lns-mid-grey text-sm">Can't resolve the variance? Open a formal encrypted support ticket for high-authority review.</p>
            </div>
            <div className="space-y-4 pt-4">
               <input placeholder="Issue Subject (e.g. Attendance Variance)" className="w-full h-14 bg-gray-50 rounded-2xl border border-gray-100 px-6 text-sm font-bold text-lns-navy outline-none focus:bg-white focus:border-lns-navy/20 transition-all shadow-inner" />
               <textarea placeholder="Describe the operational anomaly..." className="w-full h-40 bg-gray-50 rounded-2xl border border-gray-100 p-6 text-sm font-bold text-lns-navy outline-none focus:bg-white focus:border-lns-navy/20 transition-all shadow-inner" />
               <div className="flex items-center justify-between gap-4">
                  <Link href="/support/tickets" className="flex-1">
                    <Button variant="ghost" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] text-lns-mid-grey hover:bg-gray-50 flex items-center gap-2">
                       <Tickets size={16} />
                       My Active Logs
                    </Button>
                  </Link>
                  <Button className="flex-[2] h-14 bg-lns-red text-white hover:bg-red-700 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-red-600/20 active:scale-95 transition-all">
                     Transmit to High Command
                  </Button>
               </div>
            </div>
         </Card>
      </div>

      {/* Footer Info Hub */}
      <div className="pt-12 border-t border-gray-100 text-center">
         <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey/60">
            <Link href="/legal" className="hover:text-lns-red flex items-center transition-colors">OS LEGAL FRAMEWORK <ExternalLink size={10} className="ml-2" /></Link>
            <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
            <Link href="/privacy" className="hover:text-lns-red flex items-center transition-colors">SECURITY PROTOCOLS <ChevronRight size={10} className="ml-2" /></Link>
            <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
            <div className="flex items-center gap-3">
               <span className="text-green-500 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> SYSTEM OPERATIONAL</span>
               <Link href="/terms" className="hover:text-lns-red transition-colors ml-4">VERSION 1.4.2</Link>
            </div>
         </div>
      </div>
    </div>
  );
}
