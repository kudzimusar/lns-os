"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SplitPanelProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  leftWidth?: string; // e.g., "w-64", "w-72", "w-80"
  className?: string;
  showMobileDetail?: boolean;
}

export function SplitPanel({
  leftPanel,
  rightPanel,
  leftWidth = "w-72",
  className,
  showMobileDetail = false,
}: SplitPanelProps) {
  return (
    <div className={cn("flex h-full overflow-hidden", className)}>
      {/* Left Panel - List */}
      <aside 
        className={cn(
          "h-full border-r border-gray-100 overflow-y-auto shrink-0 md:flex flex-col bg-white",
          leftWidth,
          showMobileDetail ? "hidden md:flex" : "flex w-full md:flex"
        )}
      >
        {leftPanel}
      </aside>

      {/* Right Panel - Detail */}
      <section 
        className={cn(
          "h-full flex-1 overflow-y-auto bg-white transition-all duration-300",
          showMobileDetail ? "flex w-full" : "hidden md:flex"
        )}
      >
        {rightPanel}
      </section>
    </div>
  );
}

export function SplitPanelEmptyState({
  title = "Select an item",
  description = "Choose an item from the list to view its details.",
  icon: Icon,
}: {
  title?: string;
  description?: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in duration-500">
      <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
        {Icon ? (
          <Icon size={40} className="text-lns-mid-grey" />
        ) : (
          <div className="w-10 h-10 rounded bg-gray-200 animate-pulse" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-lns-navy mb-2">{title}</h3>
      <p className="text-sm text-lns-mid-grey max-w-xs">{description}</p>
    </div>
  );
}
