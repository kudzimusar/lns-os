"use client";

import React from "react";
import { Lock, FileText, MessageSquare, UserPlus, ShieldCheck, Activity, Search, Filter, Database, Link as LinkIcon, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TabletPage, TabletHeader } from "@/components/tablet/TabletPage";
import { SealedBadge } from "@/components/blockchain/SealedBadge";
import { AIApprovalChainViewer } from "@/components/blockchain/AIApprovalChainViewer";
import { generateMockHash } from "@/lib/blockchain";

const AUDIT_RECORDS = [
  {
    domain: 'ENROLLMENT',
    action: 'New Student Provisioned',
    actor: 'Admin (admin-001)',
    timestamp: '2026-04-12T10:00:00Z',
    details: 'Student: James Wilson. Identity verified via Birth Cert #8821.',
    hash: generateMockHash()
  },
  {
    domain: 'ATTENDANCE',
    action: 'Class Register Sealed',
    actor: 'Teacher (teacher-042)',
    timestamp: '2026-04-12T09:15:00Z',
    details: 'Grade 10-B, Period 1. 28 Present, 4 Absent.',
    hash: generateMockHash()
  },
  {
    domain: 'POLICY',
    action: 'Grading Weights Modified',
    actor: 'Principal (admin-001)',
    timestamp: '2026-04-11T16:30:00Z',
    details: 'Final Exams weight increased from 30% to 40% for Term 3.',
    hash: generateMockHash()
  }
];

const MOCK_AI_RECORD = {
  aiDraftHash: generateMockHash(),
  aiGeneratedAt: '2026-04-12T11:05:00Z',
  aiModel: 'Claude 3.5 Sonnet',
  humanEditorId: 'Teacher (teacher-042)',
  humanEditedAt: '2026-04-12T11:08:00Z',
  humanEditPercentage: 15,
  finalContentHash: generateMockHash(),
  approvedBy: 'Teacher (teacher-042)',
  approvedAt: '2026-04-12T11:08:30Z',
  diffSummary: 'Adjusted the tone of the absence notification to be more personal.'
};

export default function AuditTrailPage() {
  return (
    <div className="space-y-8 p-6 md:p-12 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight flex items-center">
            <ShieldCheck className="mr-3 text-lns-red" size={32} />
            Institutional Ledger
          </h1>
          <p className="text-lns-mid-grey font-medium uppercase tracking-widest text-[10px]">Proof-of-Action Audit for Regulatory Compliance</p>
        </div>
        <Button variant="outline" className="bg-white rounded-xl shadow-sm h-12 px-6 font-black uppercase text-[10px] tracking-widest active:scale-95">
          <Download size={18} className="mr-2" /> Download Full Archive
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left: General Audit Trail */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="border-none shadow-sm bg-lns-navy text-white overflow-hidden relative rounded-[2rem]">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <Database size={120} />
            </div>
            <CardContent className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey">Blockchain Health</p>
                <h3 className="text-2xl font-black italic text-lns-red uppercase">0.02s Since Last Pulse</h3>
                <p className="text-sm text-slate-400 font-medium">Total hashed records: <span className="text-white font-bold tracking-widest">1,244,902</span></p>
              </div>
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full bg-slate-800 border-2 border-lns-navy flex items-center justify-center text-[10px] font-black group hover:bg-slate-700 transition-colors cursor-pointer">
                    B{i}
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full bg-lns-red border-2 border-lns-navy flex items-center justify-center text-[10px] font-black shadow-[0_0_20px_rgba(214,43,43,0.5)]">
                  Live
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy px-2 flex items-center gap-2">
               <Activity size={14} className="text-lns-red" /> Operational Seal Timeline
            </h3>
            
            {AUDIT_RECORDS.map((record, i) => (
              <Card key={i} className="p-6 border-none shadow-xl bg-white rounded-2xl md:rounded-[2rem] hover:scale-[1.01] transition-transform cursor-pointer border-l-4 border-transparent hover:border-lns-red">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-lns-navy shrink-0">
                      {record.domain === 'ENROLLMENT' && <UserPlus size={24} />}
                      {record.domain === 'ATTENDANCE' && <Lock size={24} />}
                      {record.domain === 'POLICY' && <ShieldCheck size={24} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 bg-lns-navy text-white rounded-md">
                          {record.domain}
                        </span>
                        <h4 className="text-base font-black text-lns-navy uppercase tracking-tight italic">{record.action}</h4>
                      </div>
                      <p className="text-[10px] text-lns-mid-grey font-black uppercase tracking-widest">
                        Node: {record.actor} • {new Date(record.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <SealedBadge hash={record.hash} showVerify className="md:scale-110" />
                </div>
                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100/50 text-xs text-slate-600 italic font-medium leading-relaxed">
                  "{record.details}"
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Detailed Analysis (AI Approval Chain) */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy px-2 flex items-center gap-2">
             <MessageSquare size={14} className="text-blue-500" /> AI Accountability Protocol
          </h3>
          
          <Card className="p-8 border-none shadow-2xl bg-white rounded-2xl flex flex-col items-center">
            <div className="text-center mb-10 w-full">
              <h4 className="text-base font-black text-lns-navy uppercase tracking-tight italic">Content Approval Chain</h4>
              <p className="text-[10px] text-lns-mid-grey font-black uppercase mt-1 tracking-widest opacity-60">Message Reference: MSG-9921</p>
            </div>
            
            <AIApprovalChainViewer record={MOCK_AI_RECORD} />

            <div className="mt-6 pt-8 border-t border-slate-100 w-full text-center">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
                Record cryptographically sealed at 11:08:30Z. No human-readable data is stored on-chain.
              </p>
            </div>
          </Card>

          {/* Verification Stats Card */}
          <Card className="p-10 border-none shadow-xl bg-lns-navy text-white rounded-[3rem] relative overflow-hidden group">
             <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shadow-xl">
                      <ShieldCheck size={28} className="text-lns-red" />
                   </div>
                   <h4 className="text-xl font-black italic tracking-wide">Ledger Integrity</h4>
                </div>
                <div className="space-y-6">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated Transactions</p>
                      <p className="text-4xl font-black text-white italic">1.2M+</p>
                   </div>
                   <div className="h-px bg-white/10 w-full" />
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Public Proof Roots</p>
                      <p className="text-4xl font-black text-white italic">4,812</p>
                   </div>
                </div>
             </div>
             <Activity className="absolute -bottom-20 -right-20 text-white/5 w-64 h-64 group-hover:scale-110 transition-transform duration-1000" />
          </Card>
        </div>
      </div>
    </div>
  );
}
