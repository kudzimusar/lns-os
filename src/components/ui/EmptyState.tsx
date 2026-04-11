"use client";

import React from "react";
import { LucideIcon, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-16 text-center space-y-8 animate-in fade-in zoom-in duration-500",
      className
    )}>
      <div className="relative">
         <div className="w-24 h-24 bg-lns-light-grey rounded-[3rem] flex items-center justify-center text-lns-mid-grey/40 shadow-inner">
            <Icon size={40} />
         </div>
         <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-xl border border-lns-border">
            <Search size={18} className="text-lns-red" />
         </div>
      </div>
      
      <div className="max-w-xs space-y-2">
         <h4 className="text-xl font-black text-lns-navy uppercase tracking-tight">{title}</h4>
         <p className="text-sm text-lns-mid-grey font-medium leading-relaxed italic">
            "{description}"
         </p>
      </div>

      {actionLabel && (
         <Button 
           onClick={onAction}
           className="h-12 px-10 bg-lns-navy text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-lns-navy/20"
         >
            <Plus size={16} className="mr-2" />
            {actionLabel}
         </Button>
      )}
    </div>
  );
}
