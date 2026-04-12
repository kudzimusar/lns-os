"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: "search" | "notifications" | "none";
  onRightActionClick?: () => void;
}

export function MobileHeader({
  title,
  showBack = false,
  rightAction = "notifications",
  onRightActionClick,
}: MobileHeaderProps) {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 glass-header flex items-center justify-between px-4 z-40 md:hidden">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={24} className="text-lns-navy" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-lns-navy truncate max-w-[200px]">
          {title}
        </h1>
      </div>

      <div className="flex items-center">
        {rightAction === "search" && (
          <button
            onClick={onRightActionClick}
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
          >
            <Search size={22} className="text-lns-navy" />
          </button>
        )}
        {rightAction === "notifications" && (
          <button
            onClick={onRightActionClick}
            className="relative w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
          >
            <Bell size={22} className="text-lns-navy" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-lns-red rounded-full border border-white" />
          </button>
        )}
      </div>
    </header>
  );
}
