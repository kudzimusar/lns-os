"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  GraduationCap, 
  MessageSquare, 
  User,
  Settings,
  HelpCircle,
  Users
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/mobile/BottomNav";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { Sidebar, SidebarItem } from "@/components/tablet/Sidebar";
import { AIInitializer } from "@/components/ai/AIInitializer";
import { 
  Home, 
  Users, 
  CalendarCheck, 
  GraduationCap, 
  MessageSquare, 
  Bell, 
  FileText 
} from "lucide-react";

const parentSidebarItems: SidebarItem[] = [
  { name: "Home", icon: Home, href: "/parent/dashboard", section: "1" },
  { name: "My Child", icon: Users, href: "/parent/child", section: "1" },
  { name: "Attendance", icon: CalendarCheck, href: "/parent/attendance", section: "1" },
  { name: "Grades", icon: GraduationCap, href: "/parent/grades", section: "1" },
  
  { name: "Messages", icon: MessageSquare, href: "/parent/messages", section: "2" },
  { name: "Announcements", icon: Bell, href: "/parent/announcements", section: "2" },
  
  { name: "Documents", icon: FileText, href: "/parent/documents", section: "3" },
];

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Get title from current route
  const currentItem = parentSidebarItems.find(item => item.href === pathname);
  const pageTitle = currentItem?.name || "Parent";

  return (
    <div className="flex h-screen overflow-hidden bg-lns-light-grey">
      <AIInitializer role="parent" />
      <Sidebar items={parentSidebarItems} role="Parent" logoHref="/parent/dashboard" />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="hidden md:block">
          <TopBar />
        </div>
        <MobileHeader title={pageTitle} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pt-20 md:pt-0 pb-24 md:pb-8">
          {children}
        </main>
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
