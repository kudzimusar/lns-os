"use client";

import React from "react";
import { 
  ArrowLeft, 
  BookOpen, 
  HelpCircle, 
  ChevronRight, 
  Zap, 
  Clock, 
  ThumbsUp, 
  ThumbsDown,
  MessageSquare,
  Globe,
  Activity,
  ShieldCheck,
  Cpu
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ARTICLES = [
  { id: 'scan-attendance', title: 'Synchronizing Classroom Attendance', category: 'Tutorial', time: '5 min read' },
];

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ articleId: a.id }));
}

export default function SupportArticleDetailPage({ params }: { params: { articleId: string } }) {
  const article = ARTICLES.find(a => a.id === params.articleId) || ARTICLES[0];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24 pt-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/support" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-lns-navy transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Resource Hub
            </Link>
            <h1 className="text-5xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-6">
               <BookOpen size={48} className="text-lns-red" />
               Knowledge Base
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] italic tracking-tight">{article.category} • {article.time} • Node ID: KB-{article.id.toUpperCase()}</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Article Content (75%) */}
         <div className="lg:col-span-3 space-y-12">
            <div className="prose prose-lns max-w-none space-y-8">
               <div className="space-y-4">
                  <h2 className="text-3xl font-black text-lns-navy tracking-tight italic uppercase">{article.title}</h2>
                  <p className="text-lg leading-relaxed text-lns-navy/80 italic font-medium">
                     The institutional attendance protocol ensures 100% synchrony between the physical gateway and the high-authority OS ledger.
                  </p>
               </div>

               <div className="p-10 bg-lns-navy text-white rounded-[3rem] shadow-2xl space-y-6 relative overflow-hidden group">
                  <div className="relative z-10 flex items-center gap-4">
                     <Zap size={24} className="text-lns-red animate-pulse" />
                     <h3 className="text-xl font-black italic uppercase tracking-tight">Standard Operating Procedure</h3>
                  </div>
                  <ol className="relative z-10 space-y-6 list-none p-0">
                     {[
                       "Initialize the Terminal Scanner at the Classroom Gateway.",
                       "Ensure the Student Node is broadcasting their Identity QR.",
                       "Confirm the 'Handshake Verified' visual indicator on the LNS OS HUD.",
                       "Synchronize the session data to the global persistence chain."
                     ].map((step, i) => (
                       <li key={i} className="flex gap-6 items-start">
                          <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-black text-xs italic shrink-0">{i+1}</span>
                          <span className="text-sm font-medium italic opacity-80">{step}</span>
                       </li>
                     ))}
                  </ol>
                  <Cpu size={240} className="absolute -bottom-20 -right-20 text-white/5 pointer-events-none" />
               </div>

               <div className="space-y-6">
                  <h3 className="text-lg font-black text-lns-navy italic">Common Synchronization Errors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-3">
                        <div className="flex items-center gap-3 text-lns-red">
                           <ShieldCheck size={20} />
                           <p className="text-[10px] font-black uppercase tracking-widest">ERROR: HASH_MISMATCH</p>
                        </div>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
                           This occurs when the Student Node has re-generated their Identity QR during an active scan. Please request a re-sync.
                        </p>
                     </Card>
                     <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-3">
                        <div className="flex items-center gap-3 text-amber-500">
                           <Clock size={20} />
                           <p className="text-[10px] font-black uppercase tracking-widest">ERROR: LATENCY_OVERFLOW</p>
                        </div>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
                           The local gateway is experiencing 200ms+ delay. Node will fallback to offline persistence automatically.
                        </p>
                     </Card>
                  </div>
               </div>
            </div>

            <div className="pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                  <p className="text-xs font-black text-lns-navy uppercase tracking-widest italic">Was this protocol helpful?</p>
                  <div className="flex gap-2">
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-gray-50 text-slate-400 hover:text-green-600 hover:bg-green-50 transition-all"><ThumbsUp size={20}/></Button>
                     <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-gray-50 text-slate-400 hover:text-lns-red hover:bg-red-50 transition-all"><ThumbsDown size={20}/></Button>
                  </div>
               </div>
               <Link href="/support/tickets/new">
                  <Button className="h-12 bg-lns-navy text-white rounded-xl px-8 font-black uppercase text-[9px] tracking-widest shadow-xl flex items-center gap-3">
                     Open Support Node
                     <MessageSquare size={16} />
                  </Button>
               </Link>
            </div>
         </div>

         {/* Sidebar Intel (25%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Knowledge Bloom</p>
                     <h4 className="text-2xl font-black italic uppercase leading-none tracking-tight text-lns-red">Tutorial Matrix</h4>
                  </div>
                  <div className="space-y-4">
                     {[
                       'Classroom Gateway Calibration',
                       'Identity QR Regeneration',
                       'Faculty Node Sovereignty',
                     ].map(other => (
                       <Link key={other} href="/support/other">
                          <div className="flex items-center justify-between group/link cursor-pointer border-b border-white/5 pb-3">
                             <span className="text-[10px] font-bold text-slate-300 group-hover/link:text-white transition-colors">{other}</span>
                             <ChevronRight size={14} className="text-slate-500" />
                          </div>
                       </Link>
                     ))}
                  </div>
               </div>
               <Globe className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <div className="p-6 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200 text-center space-y-3">
               <HelpCircle size={28} className="text-amber-500 mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-amber-900 leading-relaxed italic pr-2 pl-2">
                  Knowledge base nodes are updated real-time by the Technical Oversight lattice.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
