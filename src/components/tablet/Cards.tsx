"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, MoveRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendType?: "up" | "down" | "neutral";
}

export function StatCard({ label, value, trend, trendType }: StatCardProps) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5 flex flex-col gap-2">
      <span className="text-[13px] font-black text-lns-mid-grey uppercase tracking-widest">{label}</span>
      <span className="text-3xl font-black text-lns-navy tracking-tighter">{value}</span>
      {trend && (
        <span className={cn(
          "text-[10px] font-black uppercase tracking-widest flex items-center gap-1",
          trendType === "up" ? "text-green-600" : trendType === "down" ? "text-red-600" : "text-gray-400"
        )}>
          {trendType === "up" && <ArrowUp size={12} />}
          {trendType === "down" && <ArrowDown size={12} />}
          {trendType === "neutral" && <MoveRight size={12} />}
          {trend}
        </span>
      )}
    </div>
  );
}

export function GradeCard({ 
  subject, 
  teacher, 
  grade, 
  percentage, 
  citizenship = "C+" 
}: { 
  subject: string; 
  teacher: string; 
  grade: string; 
  percentage: number;
  citizenship?: string;
}) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            className="stroke-lns-navy opacity-10"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            className="stroke-lns-red transition-all duration-1000 ease-out"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <span className="absolute text-xs font-bold text-lns-navy">{percentage}%</span>
      </div>
      
      <div>
        <p className="font-semibold text-lns-navy">{subject}</p>
        <p className="text-sm text-lns-mid-grey">{teacher}</p>
        <div className={cn(
          "mt-1 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
          citizenship.includes("C") ? "bg-green-50 text-green-700 border border-green-200" : 
          citizenship.includes("N") ? "bg-amber-50 text-amber-700 border border-amber-200" : 
          "bg-red-50 text-red-700 border border-red-200"
        )}>
          {citizenship}
        </div>
      </div>
      
      <div className="ml-auto text-right">
        <p className="text-2xl font-bold text-lns-navy">{grade}</p>
      </div>
    </div>
  );
}
