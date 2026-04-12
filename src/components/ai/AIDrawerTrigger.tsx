'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { useAIStore } from '@/lib/ai/store';

export const AIDrawerTrigger: React.FC = () => {
  const { setDrawerOpen, pendingActions } = useAIStore();
  const pendingCount = pendingActions.length;

  return (
    <button
      onClick={() => setDrawerOpen(true)}
      className="fixed right-4 top-4 z-40 flex items-center gap-2 h-10 px-4 
                 bg-slate-900 text-white rounded-xl text-sm font-medium 
                 shadow-lg hover:bg-slate-800 active:scale-95 transition-all
                 md:right-6 md:top-6"
      aria-label="Open AI Assistant"
    >
      <Sparkles size={16} className="text-blue-400" />
      <span className="hidden sm:inline">AI Insights</span>
      {pendingCount > 0 && (
        <span className="w-5 h-5 bg-red-600 rounded-full text-xs 
                         flex items-center justify-center font-bold">
          {pendingCount}
        </span>
      )}
    </button>
  );
};
