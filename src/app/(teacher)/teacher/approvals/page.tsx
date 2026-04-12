'use client';

import React, { useState } from 'react';
import { useAIStore } from '@/lib/ai/store';
import { QueueItem } from '@/components/ai/QueueItem';
import { Sparkles, Filter, Inbox } from 'lucide-react';

export default function ApprovalsPage() {
  const { pendingActions } = useAIStore();
  const [filter, setFilter] = useState('All');

  const filteredItems = pendingActions.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Urgent') return item.severity === 'HIGH' || item.severity === 'CRITICAL';
    return item.contentType.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-600">
            <Sparkles size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">AI Command Center</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Approval Queue</h1>
          <p className="text-slate-500 text-sm">Review, edit, and approve AI-generated communications and insights.</p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {['All', 'Urgent', 'Alert'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === f 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending', value: pendingActions.length, color: 'text-blue-600' },
          { label: 'Urgent', value: pendingActions.filter(i => i.severity === 'HIGH').length, color: 'text-red-600' },
          { label: 'Approved Today', value: 12, color: 'text-green-600' },
          { label: 'AI Accuracy', value: '94%', color: 'text-slate-900' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Queue List */}
      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <QueueItem key={item.id} item={item} />
          ))
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 border-dashed p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
              <Inbox size={40} className="text-slate-200" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Queue is empty</h3>
              <p className="text-sm text-slate-400 max-w-xs">You've cleared all pending AI drafts. Great job staying on top of your communications!</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200/50 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Sparkles className="text-red-500" size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">AI Human-in-the-Loop</p>
            <p className="text-xs text-slate-500">Every message is logged for quality assurance.</p>
          </div>
        </div>
        <button className="px-6 h-11 bg-white text-slate-900 border border-slate-200 rounded-xl text-sm font-bold hover:shadow-md transition-all active:scale-95">
          View Audit Log
        </button>
      </div>
    </div>
  );
}
