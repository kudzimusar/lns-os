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
  LifeBuoy
} from "lucide-react";
import { cn } from "@/lib/utils";

const faqCategories = [
  { name: "Getting Started", count: 12, icon: HelpCircle },
  { name: "Attendance & QR", count: 8, icon: BookOpen },
  { name: "Gradebook Magic", count: 15, icon: LifeBuoy },
  { name: "Blockchain Ledger", count: 5, icon: MessageSquare },
];

export default function SupportPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 pt-10 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-[900] text-lns-navy tracking-tighter uppercase">
          How can we <span className="text-lns-red">Help?</span>
        </h1>
        <p className="text-lns-mid-grey font-medium max-w-xl mx-auto">Search our knowledge base, watch tutorials, or connect with a support specialist.</p>
        
        <div className="max-w-2xl mx-auto relative pt-4">
           <Search className="absolute left-6 top-1/2 -translate-y-1/4 text-lns-mid-grey" size={20} />
           <input 
             type="text" 
             placeholder="Search for articles, guides or error codes..." 
             className="w-full h-16 bg-white shadow-xl rounded-[2rem] border-none pl-16 pr-8 text-sm focus:ring-2 focus:ring-lns-red transition-all"
           />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {faqCategories.map((cat) => (
           <Card key={cat.name} className="border-none shadow-sm hover:shadow-lg transition-all cursor-pointer group bg-white">
              <CardContent className="p-6 text-center space-y-3">
                 <div className="w-12 h-12 rounded-2xl bg-lns-light-grey flex items-center justify-center text-lns-navy mx-auto group-hover:bg-lns-navy group-hover:text-white transition-all">
                    <cat.icon size={24} />
                 </div>
                 <h3 className="text-sm font-bold text-lns-navy">{cat.name}</h3>
                 <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">{cat.count} Articles</p>
              </CardContent>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="border-none shadow-xl bg-lns-navy text-white overflow-hidden p-8 flex flex-col justify-between">
            <div className="space-y-4">
               <h3 className="text-2xl font-[800]">Video Tutorials</h3>
               <p className="text-slate-400 text-sm leading-relaxed">Watch masterclasses on using LNS OS features like the AI Insight engine and Attendance sealing.</p>
            </div>
            <div className="pt-8 space-y-3">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="flex items-center space-x-3">
                       <PlayCircle size={18} className="text-lns-red" />
                       <span className="text-xs font-bold">LNS OS Masterclass #{i}</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-500" />
                 </div>
               ))}
               <Button className="w-full mt-4 bg-white text-lns-navy hover:bg-lns-red hover:text-white font-black uppercase tracking-widest text-[10px] h-12">
                  View YouTube Channel
               </Button>
            </div>
         </Card>

         <Card className="border-none shadow-xl bg-white p-8 space-y-6">
            <div className="space-y-2">
               <h3 className="text-2xl font-[800] text-lns-navy">Submit a Ticket</h3>
               <p className="text-lns-mid-grey text-sm">Can't find what you're looking for? Open a formal support ticket.</p>
            </div>
            <div className="space-y-4 pt-4">
               <input placeholder="Issue Subject" className="w-full h-12 bg-lns-light-grey rounded-xl border-none px-4 text-sm focus:ring-1 focus:ring-lns-navy" />
               <textarea placeholder="Describe the problem..." className="w-full h-32 bg-lns-light-grey rounded-xl border-none p-4 text-sm focus:ring-1 focus:ring-lns-navy" />
               <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-lns-navy/20">
                  Send to IT Support
               </Button>
            </div>
         </Card>
      </div>

      <div className="pt-10 border-t border-lns-border text-center">
         <div className="flex items-center justify-center space-x-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
            <a href="#" className="hover:text-lns-red flex items-center">API Docs <ExternalLink size={10} className="ml-1" /></a>
            <span className="w-1 h-1 bg-lns-border rounded-full" />
            <a href="#" className="hover:text-lns-red flex items-center">System Status <span className="ml-2 w-2 h-2 bg-green-500 rounded-full" /></a>
            <span className="w-1 h-1 bg-lns-border rounded-full" />
            <a href="#" className="hover:text-lns-red flex items-center">Technical Whitepaper <ExternalLink size={10} className="ml-1" /></a>
         </div>
      </div>
    </div>
  );
}
