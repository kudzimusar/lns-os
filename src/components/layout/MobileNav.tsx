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
  { 
    name: "Home", 
    icon: LayoutDashboard, 
    getHref: (role: string) => `/${role}/dashboard` 
  },
  { 
    name: "Activity", 
    icon: ClipboardList, 
    getHref: (role: string) => {
      if (role === 'teacher') return '/teacher/assignments';
      if (role === 'student') return '/student/assignments';
      if (role === 'parent') return '/parent/reports';
      if (role === 'admin') return '/admin/analytics';
      return '/';
    }
  },
  { 
    name: "Access", 
    icon: QrCode, 
    getHref: (role: string) => {
      if (role === 'teacher') return '/teacher/scanner';
      if (role === 'student') return '/student/scan';
      if (role === 'parent') return '/parent/attendance';
      if (role === 'admin') return '/admin/qr-management';
      return '/';
    }
  },
  { 
    name: "Inbox", 
    icon: MessageSquare, 
    getHref: (role: string) => `/${role}/messaging` 
  },
  { 
    name: "Profile", 
    icon: User, 
    getHref: () => "/settings" 
  },
];

export function MobileNav() {
  const pathname = usePathname();
  
  // Determine role from pathname: /teacher/dashboard -> teacher
  const roleMatch = pathname.match(/^\/([^/]+)/);
  const role = roleMatch ? roleMatch[1] : "teacher"; // default to teacher or handle based on context

  // Check if role is one of the valid ones, else fallback
  const validRoles = ['teacher', 'student', 'parent', 'admin', 'corporate'];
  const activeRole = validRoles.includes(role) ? role : 'teacher';

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-lns-border h-20 px-6 flex items-center justify-between z-50">
      {mobileItems.map((item) => {
        const href = item.getHref(activeRole);
        const isActive = pathname === href;
        return (
          <Link
            key={item.name}
            href={href}
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
