"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TabletPageProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

export function TabletPage({ 
  children, 
  className, 
  maxWidth = "full" 
}: TabletPageProps) {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    "3xl": "max-w-3xl", // Section 7 Readability
    full: "max-w-full",
  };

  return (
    <div className={cn(
      "tablet-container animate-in fade-in slide-in-from-bottom-4 duration-500",
      maxWidth !== "full" && "mx-auto",
      maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  );
}

export function TabletHeader({ 
  title, 
  subtitle, 
  actions 
}: { 
  title: string; 
  subtitle?: string; 
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="space-y-1">
        <h1 className="text-[24px] font-black text-lns-navy tracking-tighter uppercase leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[15px] font-medium text-lns-mid-grey">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}

export function TabletSection({ 
  title, 
  children, 
  className 
}: { 
  title?: string; 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <section className={cn("space-y-4", className)}>
      {title && (
        <h2 className="text-[18px] font-black text-lns-navy tracking-tight uppercase">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
