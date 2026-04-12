'use client';

import React from 'react';
import { AlertTriangle, TrendingDown, CheckCircle, Sparkles } from 'lucide-react';
import { useAIStore } from '@/lib/ai/store';

export type FlagType = 'at-risk' | 'grade-drop' | 'draft-ready' | 'insight';

interface Props {
  type: FlagType;
  entityId: string;
  label?: string;
  className?: string;
}

export const AIFlag: React.FC<Props> = ({ type, entityId, label, className = "" }) => {
  const { openWithContext } = useAIStore();

  const configs = {
    'at-risk': {
      icon: AlertTriangle,
      text: 'AI Flag',
      styles: 'bg-[#FFF5F5] text-[#C53030] border-[#FEB2B2]'
    },
    'grade-drop': {
      icon: TrendingDown,
      text: 'Trending Down',
      styles: 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]'
    },
    'draft-ready': {
      icon: CheckCircle,
      text: 'AI Draft Ready',
      styles: 'bg-[#F0F7FF] text-[#0055D4] border-[#BEE3F8]'
    },
    'insight': {
      icon: Sparkles,
      text: 'AI Insight',
      styles: 'bg-[#F8FAFC] text-[#334155] border-[#E2E8F0]'
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <span 
      onClick={(e) => {
        e.stopPropagation();
        openWithContext(type, entityId);
      }}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border cursor-pointer transition-all hover:scale-105 active:scale-95 ${config.styles} ${className}`}
    >
      <Icon size={12} className={type === 'at-risk' ? 'animate-pulse' : ''} />
      <span>{label || config.text}</span>
    </span>
  );
};
