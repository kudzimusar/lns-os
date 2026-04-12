"use client";

import React from 'react';
import { Sparkles, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SealedBadge } from './SealedBadge';

interface ChainNodeProps {
  label: string;
  hash: string;
  timestamp: string;
  actor: string;
  icon: React.ReactNode;
  color: 'blue' | 'amber' | 'green';
  details?: string;
}

function ChainNode({ label, hash, timestamp, actor, icon, color, details }: ChainNodeProps) {
  const colorStyles = {
    blue: "bg-blue-50 border-blue-100 text-blue-700 font-bold",
    amber: "bg-amber-50 border-amber-100 text-amber-700 font-bold",
    green: "bg-green-50 border-green-100 text-green-700 font-bold",
  };

  const iconStyles = {
    blue: "bg-blue-100 text-blue-600 border-blue-200",
    amber: "bg-amber-100 text-amber-600 border-amber-200",
    green: "bg-green-100 text-green-600 border-green-200",
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border", iconStyles[color])}>
          {icon}
        </div>
        <div className="flex-1 w-px bg-slate-200 my-2" />
      </div>
      <div className="flex-1 pb-8">
        <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-sm mb-2", colorStyles[color])}>
          {label}
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-sm font-medium text-slate-900">{actor}</p>
              <p className="text-xs text-slate-500">{new Date(timestamp).toLocaleString()}</p>
            </div>
            <SealedBadge hash={hash} />
          </div>
          {details && (
            <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 font-mono">
              {details}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface AIApprovalChainProps {
  record: {
    aiDraftHash: string;
    aiGeneratedAt: string;
    aiModel: string;
    humanEditorId: string;
    humanEditedAt: string;
    humanEditPercentage: number;
    finalContentHash: string;
    approvedBy: string;
    approvedAt: string;
    diffSummary?: string;
  };
}

export function AIApprovalChainViewer({ record }: AIApprovalChainProps) {
  return (
    <div className="max-w-lg">
      <ChainNode
        label="AI Generated Draft"
        hash={record.aiDraftHash}
        timestamp={record.aiGeneratedAt}
        actor={record.aiModel}
        icon={<Sparkles size={18} />}
        color="blue"
        details="Draft generated based on attendance trigger: student_absent_3_days"
      />
      
      <ChainNode
        label={record.humanEditPercentage === 0 
          ? "Human Reviewed (No Edits)" 
          : `Human Edited (${record.humanEditPercentage}% changed)`}
        hash={record.finalContentHash} // Normally a diff hash
        timestamp={record.humanEditedAt}
        actor={record.humanEditorId}
        icon={<User size={18} />}
        color={record.humanEditPercentage > 0 ? "amber" : "green"}
        details={record.diffSummary || "Modified tone to be more empathetic toward family situation."}
      />

      <ChainNode
        label="Approved and Sent"
        hash={record.finalContentHash}
        timestamp={record.approvedAt}
        actor={record.approvedBy}
        icon={<CheckCircle2 size={18} />}
        color="green"
      />
    </div>
  );
}
