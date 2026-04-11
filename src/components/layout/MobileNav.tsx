"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ClipboardList,
  QrCode,
  MessageSquare,
  User,
} from "lucide-react";

const mobileItems = [
  { name: "Home", icon: LayoutDashboard, href: "/teacher/dashboard" },
  { name: "Work", icon: ClipboardList, href: "/teacher/assignments" },
  { name: "QR", icon: QrCode, href: "/teacher/scanner" },
  { name: "Chat", icon: MessageSquare, href: "/teacher/messaging" },
  { name: "Profile", icon: User, href: "/settings" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-lns-border h-20 px-6 flex items-center justify-between z-50">
      {mobileItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href || "#"}
            className={cn(
              "flex flex-col items-center space-y-1 transition-all",
              isActive ? "text-lns-red" : "text-lns-mid-grey"
            )}
          >
            <item.icon size={24} />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
