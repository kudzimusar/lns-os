'use client';

import React from 'react';
import { ApprovalQueueItem } from '@/types/ai';
import { Clock, User, ChevronRight } from 'lucide-react';

interface Props {
  item: ApprovalQueueItem;
}

// Simple relative time formatter
const getRelativeTime = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / 60000);
  
  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return `${Math.floor(diffInHours / 24)}d ago`;
};

export const QueueItemSimple: React.FC<Props> = ({ item }) => {
  const severityColors = {
    LOW: 'bg-blue-100 text-blue-700',
    MEDIUM: 'bg-amber-100 text-amber-700',
    HIGH: 'bg-red-100 text-red-700',
    CRITICAL: 'bg-red-600 text-white'
  };

  return (
    <div className="group p-3 bg-white border border-slate-100 rounded-xl hover:border-slate-200 hover:shadow-sm transition-all cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0 ${severityColors[item.severity]}`}>
            {item.severity}
          </span>
          <span className="text-[10px] text-slate-400 font-medium truncate uppercase tracking-tighter">
            {item.type.replace(/_/g, ' ')}
          </span>
        </div>
        <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
      </div>

      <p className="text-sm font-semibold text-slate-800 mb-2 line-clamp-1">
        {item.studentName || 'System Action'}
      </p>

      <div className="flex items-center justify-between text-[10px] text-slate-400">
        <div className="flex items-center gap-1">
          <User size={10} />
          <span>To: {item.recipient.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={10} />
          <span>{getRelativeTime(item.generatedAt)}</span>
        </div>
      </div>
    </div>
  );
};
