"use client";

import React from 'react';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SealedBadgeProps {
  hash: string;
  timestamp?: string;
  className?: string;
  showVerify?: boolean;
}

export function SealedBadge({ hash, timestamp, className, showVerify = false }: SealedBadgeProps) {
  const truncatedHash = `${hash.slice(0, 6)}...${hash.slice(-4)}`;

  const handleVerify = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would trigger a verification logic
    alert(`Verifying hash: ${hash}\nResult: MATCHED ✓`);
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200",
        className
      )}
      title={timestamp ? `Sealed at: ${new Date(timestamp).toLocaleString()}` : undefined}
    >
      <Lock size={12} className="text-slate-500" />
      <span className="text-[10px] font-mono text-slate-600">
        {truncatedHash}
      </span>
      {showVerify && (
        <button
          onClick={handleVerify}
          className="ml-1 text-[10px] font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          Verify
        </button>
      )}
    </div>
  );
}
