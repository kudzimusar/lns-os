"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  Settings, 
  ShieldAlert, 
  Megaphone,
  LayoutDashboard,
  HelpCircle,
  FileText
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/mobile/BottomNav";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { Sidebar, SidebarItem } from "@/components/tablet/Sidebar";
import { AIInitializer } from "@/components/ai/AIInitializer";
import { 
  BarChart3, 
  Users, 
  Settings, 
  ShieldAlert, 
  Megaphone,
  LayoutDashboard,
  BrainCircuit
} from "lucide-react";

const adminSidebarItems: SidebarItem[] = [
  { name: "Overview", icon: LayoutDashboard, href: "/admin/dashboard", section: "1" },
  { name: "User Directory", icon: Users, href: "/admin/users", section: "1" },
  { name: "Announcements", icon: Megaphone, href: "/admin/announcements", section: "1" },
  { name: "Approvals", icon: BrainCircuit, href: "/admin/approvals", section: "1" },
  
  { name: "Data Insights", icon: BarChart3, href: "/admin/analytics", section: "2" },
  { name: "Audit Trail", icon: ShieldAlert, href: "/admin/audit", section: "2" },
  
  { name: "School Settings", icon: Settings, href: "/admin/settings", section: "3" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Get title from current route
  const currentItem = adminSidebarItems.find(item => item.href === pathname);
  const pageTitle = currentItem?.name || "Admin";

  return (
    <div className="flex h-screen overflow-hidden bg-lns-light-grey">
      <AIInitializer role="admin" />
      <Sidebar items={adminSidebarItems} role="Admin" logoHref="/admin/dashboard" />
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
