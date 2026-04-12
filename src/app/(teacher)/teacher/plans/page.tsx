"use client";

import React from "react";
import { 
  BookOpen, 
  Plus, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  FileText,
  Zap,
  Layout,
  Layers
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  { id: 'plan-001', title: 'Modernist Poetry Unit', subject: 'English 10A', term: 'Term 2', progress: 65, lastEdit: '2 days ago' },
  { id: 'plan-002', title: 'The Great Gatsby: Analysis', subject: 'English 10A', term: 'Term 2', progress: 40, lastEdit: 'Today' },
  { id: 'plan-003', title: 'Creative Writing Workshop', subject: 'Grade 9B', term: 'Term 2', progress: 100, lastEdit: '1 week ago' },
];

export default function PlansPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-1">
          <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
             <Layers size={32} className="text-lns-red" />
             Unit Planning Hub
          </h1>
          <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Academic Curriculum Nodes • Cycle 2026</p>
        </div>
        <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-2">
          <Plus size={18} />
          Initialize New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.id} className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden group hover:translate-y-[-4px] transition-all border-b-8 border-transparent hover:border-lns-red">
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="px-3 py-1 bg-gray-50 rounded-full text-[9px] font-black uppercase tracking-widest text-lns-mid-grey border border-gray-100 italic">
                  {plan.subject} • {plan.term}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-lns-red flex items-center gap-1.5">
                   <Clock size={12} />
                   {plan.lastEdit}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-[900] text-lns-navy tracking-tight uppercase italic leading-tight group-hover:text-lns-red transition-colors">
                  {plan.title}
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                   <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Syllabus Coverage</p>
                   <p className="text-lg font-black text-lns-navy italic">{plan.progress}%</p>
                </div>
                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-lns-navy rounded-full transition-all duration-1000 group-hover:bg-lns-red" 
                     style={{ width: `${plan.progress}%` }} 
                   />
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                 <Button variant="outline" className="flex-1 h-12 rounded-xl text-[9px] font-black uppercase tracking-widest border-gray-100">
                    <Layout size={14} className="mr-2" /> View Nodes
                 </Button>
                 <Button className="w-12 h-12 rounded-xl bg-lns-navy text-white hover:bg-lns-red flex items-center justify-center p-0 transition-all">
                    <ChevronRight size={18} />
                 </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Create Card */}
        <button className="h-[340px] border-4 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center space-y-4 group hover:border-lns-red hover:bg-red-50/30 transition-all">
           <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-lns-red group-hover:text-white transition-all shadow-inner">
              <Plus size={32} />
           </div>
           <div className="text-center">
              <p className="text-sm font-black text-lns-navy uppercase tracking-widest italic">New Unit Node</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Initialize Curriculum Chain</p>
           </div>
        </button>
      </div>

      {/* Footer Meta */}
      <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
         <div className="flex items-center gap-8 text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">
            <div className="flex items-center gap-2"><TrendingUp size={14} /> Global Syllabus Resonance: 84%</div>
            <div className="flex items-center gap-2"><ShieldCheck size={14} /> Verified Planning Chain</div>
         </div>
         <div className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">LNS OS // Curriculum v2.0</div>
      </div>
    </div>
  );
}
