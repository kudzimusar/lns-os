"use client";

import React from "react";
import PageShell from "@/components/ui/PageShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Zap, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User, 
  MessageSquare,
  ShieldAlert,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const approvals = [
  {
    id: "APP_01",
    type: "Disciplinary Log",
    initiator: "Mr. Okafor",
    subject: "Blake Nkosi",
    content: "Suspension for repeated disruption. Needs principal verification.",
    priority: "High",
    aiRecommendation: "Approve based on Policy Section 4.2",
    time: "10m ago"
  },
  {
    id: "APP_02",
    type: "Grade Correction",
    initiator: "Mrs. Jenkins",
    subject: "Amara Johnson",
    content: "Correction from 82% to 92% due to missed coursework credit.",
    priority: "Med",
    aiRecommendation: "Verify evidence link before sealing.",
    time: "2h ago"
  },
  {
    id: "APP_03",
    type: "Expenditure",
    initiator: "Finance Office",
    subject: "Science Lab Equipment",
    content: "Purchase of 15 new microscopes (£2,400).",
    priority: "High",
    aiRecommendation: "Budget remains: £8,500. Low risk.",
    time: "4h ago"
  }
];

export default function AdminApprovalsPage() {
  return (
    <PageShell 
      title="AI Approval Queue" 
      description="Review and authorize critical actions flagged by the LNS OS Intelligence Layer."
    >
      <div className="space-y-8 mt-8">
        {/* Priority Filter */}
        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-fit">
           {["All Tasks", "Disciplinary", "Financial", "Academic"].map((filter, i) => (
              <button 
                key={filter}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-[#0A1F44] text-white shadow-lg' : 'text-[#8C92A0] hover:text-[#0A1F44]'}`}
              >
                 {filter}
              </button>
           ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {approvals.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-none shadow-xl bg-white overflow-hidden group">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-12">
                     {/* Left Indicator */}
                     <div className={`md:col-span-1 hidden md:flex items-center justify-center ${app.priority === 'High' ? 'bg-red-500' : 'bg-[#E8B84B]'}`}>
                        <ShieldAlert size={24} className="text-white" />
                     </div>
                     
                     {/* Main Content */}
                     <div className="md:col-span-8 p-8 space-y-4">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center space-x-3">
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8C92A0]">Action Required</span>
                              <div className="w-1 h-1 rounded-full bg-gray-300" />
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0A1F44]">{app.type}</span>
                           </div>
                           <div className="flex items-center space-x-2 text-[#8C92A0]">
                              <Clock size={12} />
                              <span className="text-[9px] font-bold uppercase tracking-widest">{app.time}</span>
                           </div>
                        </div>
                        
                        <div>
                           <h3 className="text-xl font-black text-[#0A1F44] font-manrope uppercase">{app.subject}</h3>
                           <p className="text-sm font-bold text-[#8C92A0] mt-1 flex items-center">
                              <User size={14} className="mr-2" /> Initiated by {app.initiator}
                           </p>
                        </div>
                        
                        <div className="bg-[#F4F5F7] p-5 rounded-2xl border-l-4 border-gray-200">
                           <p className="text-xs font-bold text-[#0A1F44] leading-relaxed italic">
                              &ldquo;{app.content}&rdquo;
                           </p>
                        </div>
                        
                        <div className="flex items-center space-x-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                           <Zap size={18} className="text-blue-600 animate-pulse" />
                           <div>
                              <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">AI Reasoning Layer</p>
                              <p className="text-[11px] font-bold text-blue-900">{app.aiRecommendation}</p>
                           </div>
                        </div>
                     </div>
                     
                     {/* Actions */}
                     <div className="md:col-span-3 bg-[#F4F5F7]/50 p-8 border-l border-gray-100 flex flex-col justify-center space-y-4">
                        <Button className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center space-x-3 shadow-lg shadow-green-600/20 active:scale-95 transition-all">
                           <CheckCircle2 size={18} />
                           <span>Authorize</span>
                        </Button>
                        <Button variant="outline" className="w-full h-14 border-red-100 bg-white hover:bg-red-50 text-red-600 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center space-x-3 active:scale-95 transition-all">
                           <XCircle size={18} />
                           <span>Decline</span>
                        </Button>
                        <button className="text-[9px] font-black text-[#8C92A0] uppercase tracking-widest hover:text-[#0A1F44] transition-colors mt-2 text-center">
                           Request Further Insight
                        </button>
                     </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Footer Statistics */}
        <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 gap-6">
           <div className="flex items-center space-x-8">
              <div>
                 <p className="text-[9px] font-black text-[#8C92A0] uppercase tracking-widest text-center md:text-left">Processed Today</p>
                 <p className="text-2xl font-black text-[#0A1F44] font-manrope text-center md:text-left">142</p>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div>
                 <p className="text-[9px] font-black text-[#8C92A0] uppercase tracking-widest text-center md:text-left">AI Offload Rate</p>
                 <p className="text-2xl font-black text-[#D62B2B] font-manrope text-center md:text-left">84%</p>
              </div>
           </div>
           <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8C92A0] hover:text-[#0A1F44] flex items-center">
              View Audit History <ChevronRight size={16} className="ml-2" />
           </Button>
        </div>
      </div>
    </PageShell>
  );
}
