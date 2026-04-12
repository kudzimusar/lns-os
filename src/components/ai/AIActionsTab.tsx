'use client';

import React from 'react';
import { useAIStore } from '@/lib/ai/store';
import { QueueItemSimple } from './QueueItemSimple';
import { Inbox, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const AIActionsTab: React.FC = () => {
  const { pendingActions, userRole } = useAIStore();
  
  if (pendingActions.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
          <Inbox className="text-slate-300" size={32} />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-900">All clear!</p>
          <p className="text-xs text-slate-500">No pending AI actions require your approval right now.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Approvals</p>
        <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {pendingActions.length} Items
        </span>
      </div>

      <div className="space-y-3">
        {pendingActions.slice(0, 3).map((item) => (
          <QueueItemSimple key={item.id} item={item} />
        ))}
      </div>

      {pendingActions.length > 3 && (
        <p className="text-center text-[11px] text-slate-400">
          + {pendingActions.length - 3} more items in queue
        </p>
      )}

      <Link 
        href={`/${userRole}/approvals`}
        className="mt-4 w-full h-11 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-slate-800 transition-all active:scale-[0.98]"
      >
        <span>Go to Approval Queue</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};
