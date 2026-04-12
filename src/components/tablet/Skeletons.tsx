"use client";

import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

export function TableSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
      <div className="p-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-6 h-14">
            <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
            <Skeleton className="h-4 flex-1 rounded-lg" />
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-4 w-16 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 space-y-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-8 w-16 rounded-lg" />
          <Skeleton className="h-3 w-24 rounded-md" />
        </div>
      ))}
    </div>
  );
}

export function SplitPanelSkeleton() {
  return (
    <div className="flex bg-white rounded-2xl border border-gray-100 h-[600px] overflow-hidden">
      <div className="w-80 border-r border-gray-100 p-4 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-xl border border-gray-50 space-y-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-48 rounded-md" />
          </div>
        ))}
      </div>
      <div className="flex-1 p-8 space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <Skeleton className="h-10 w-72 rounded-xl" />
            <Skeleton className="h-4 w-48 rounded-md" />
          </div>
          <Skeleton className="h-12 w-32 rounded-xl" />
        </div>
        <Skeleton className="h-48 w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-[90%] rounded-md" />
          <Skeleton className="h-4 w-[95%] rounded-md" />
        </div>
      </div>
    </div>
  );
}
