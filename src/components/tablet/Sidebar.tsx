"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  User as UserIcon,
  HelpCircle,
  Settings
} from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

export type SidebarItem = {
  name: string;
  icon: React.ElementType;
  href: string;
  section?: string;
};

interface SidebarProps {
  items: SidebarItem[];
  role: "Teacher" | "Student" | "Parent" | "Admin";
  logoHref?: string;
}

export function Sidebar({ items, role, logoHref = "/" }: SidebarProps) {
  const isTabletLarge = useMediaQuery("(min-width: 900px)");
  const [manualToggle, setManualToggle] = useState<boolean | null>(null);
  
  const isExpanded = manualToggle !== null ? manualToggle : isTabletLarge;
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Group items by section
  const sections = items.reduce((acc, item) => {
    const section = item.section || "default";
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {} as Record<string, SidebarItem[]>);

  const sectionKeys = Object.keys(sections);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen bg-white border-r border-gray-100 transition-all duration-300 ease-in-out shrink-0 sticky top-0 z-40",
        isExpanded ? "w-[220px]" : "w-[64px]"
      )}
    >
      {/* Logo Section */}
      <Link 
        href={logoHref}
        className={cn(
          "flex items-center h-16 transition-all duration-300",
          isExpanded ? "px-6" : "px-0 justify-center"
        )}
      >
        <span className={cn(
          "text-lns-navy font-bold tracking-tighter transition-all duration-300",
          isExpanded ? "text-lg" : "text-xl"
        )}>
          LNS <span className={cn("text-lns-red", !isExpanded && "hidden")}>OS</span>
          {!isExpanded && <span className="text-lns-red ml-0.5">O</span>}
        </span>
      </Link>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        {sectionKeys.map((sectionKey, idx) => (
          <React.Fragment key={sectionKey}>
            {idx > 0 && (
              <div className="mx-4 my-2 border-t border-gray-50" />
            )}
            <div className="space-y-1">
              {sections[sectionKey].map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={!isExpanded ? item.name : undefined}
                    className={cn(
                      "flex items-center h-12 transition-all relative group",
                      isExpanded ? "px-6 space-x-3" : "px-0 justify-center",
                      active 
                        ? "bg-lns-navy/5 text-lns-red border-l-4 border-lns-red" 
                        : "text-lns-mid-grey hover:bg-gray-50 hover:text-lns-navy pl-1"
                    )}
                  >
                    <item.icon 
                      size={20} 
                      className={cn(
                        "transition-colors",
                        active ? "text-lns-red" : "group-hover:text-lns-navy"
                      )} 
                    />
                    {isExpanded && (
                      <span className="text-sm font-medium whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                    
                    {/* Tooltip for collapsed state */}
                    {!isExpanded && (
                      <div className="absolute left-16 bg-lns-navy text-white text-[10px] px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-gray-100 space-y-1">
        <Link
          href="/profile"
          className={cn(
            "flex items-center h-12 rounded-xl transition-all",
            isExpanded ? "px-3 space-x-3" : "px-0 justify-center",
            isActive("/profile") ? "bg-gray-50 text-lns-navy" : "text-lns-mid-grey hover:bg-gray-50 hover:text-lns-navy"
          )}
        >
          <UserIcon size={20} />
          {isExpanded && <span className="text-sm font-medium">Profile</span>}
        </Link>
        
        <button
          onClick={() => setManualToggle(!isExpanded)}
          className={cn(
            "flex items-center h-12 w-full rounded-xl transition-all text-lns-mid-grey hover:bg-gray-50 hover:text-lns-navy",
            isExpanded ? "px-3 space-x-3" : "px-0 justify-center"
          )}
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          {isExpanded && <span className="text-sm font-medium">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
