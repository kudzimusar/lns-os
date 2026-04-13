"use client";

import React from "react";
import PageShell from "@/components/ui/PageShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Settings, 
  Shield, 
  Database, 
  Bell, 
  Users, 
  Globe, 
  Lock, 
  Zap,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

const groups = [
  {
    title: "System Integrity",
    items: [
      { name: "Blockchain Node Status", icon: Database, value: "Operational — Block #847k", action: "Manage Nodes" },
      { name: "Encryption Protocols", icon: Lock, value: "AES-256 Quantum Resistant", action: "Rotate Keys" },
      { name: "AI Model Config", icon: Zap, value: "LNS-LLM v4.2 Internal", action: "Tune Weights" }
    ]
  },
  {
    title: "Community & Access",
    items: [
      { name: "Global Permissions", icon: Users, value: "Role-based Active", action: "Audit Roles" },
      { name: "Parent Interface", icon: Globe, value: "Multilingual Enabled", action: "Language Settings" },
      { name: "Notification Hub", icon: Bell, value: "Email/PWA/SMS Push Active", action: "Config Hub" }
    ]
  }
];

export default function AdminSettingsPage() {
  return (
    <PageShell 
      title="System Settings" 
      description="Global configuration and cryptographic governance for the LNS OS infrastructure."
    >
      <div className="space-y-12 mt-8 max-w-5xl">
        {groups.map((group, groupIndex) => (
          <div key={group.title} className="space-y-6">
            <h3 className="text-sm font-black text-[#8C92A0] uppercase tracking-[0.3em] font-manrope">{group.title}</h3>
            <div className="grid grid-cols-1 gap-4">
              {group.items.map((item, itemIndex) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (groupIndex * 3 + itemIndex) * 0.05 }}
                >
                  <Card className="border-none shadow-sm hover:shadow-md transition-all group bg-white overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
                        <div className="flex items-center space-x-6">
                           <div className="w-12 h-12 rounded-2xl bg-[#0A1F44]/5 flex items-center justify-center text-[#0A1F44] group-hover:bg-[#0A1F44] group-hover:text-white transition-all">
                              <item.icon size={22} />
                           </div>
                           <div>
                              <h4 className="text-xs font-black text-[#0A1F44] uppercase tracking-widest">{item.name}</h4>
                              <p className="text-[11px] font-bold text-[#8C92A0] mt-0.5">{item.value}</p>
                           </div>
                        </div>
                        <Button variant="ghost" className="h-11 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0A1F44] bg-[#F4F5F7] hover:bg-[#0A1F44] hover:text-white transition-all flex items-center group/btn">
                           {item.action} <ChevronRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div className="pt-12 border-t border-gray-100">
          <Card className="border-2 border-red-100 bg-red-50/30 p-8 rounded-[2rem] overflow-hidden relative">
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2 text-center md:text-left">
                   <h3 className="text-lg font-black text-red-600 uppercase tracking-tight flex items-center justify-center md:justify-start">
                      <Shield size={20} className="mr-2" /> System Governance
                   </h3>
                   <p className="text-xs font-bold text-red-600/60 leading-relaxed uppercase tracking-widest">
                      Critical actions affecting every record on the institutional ledger. 
                   </p>
                </div>
                <div className="flex items-center gap-4">
                   <Button className="bg-white text-red-600 border border-red-100 hover:bg-red-600 hover:text-white font-black uppercase tracking-widest text-[10px] h-12 px-8 rounded-xl transition-all">
                      Export Audit Ledger
                   </Button>
                   <Button className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-[10px] h-12 px-8 rounded-xl shadow-lg shadow-red-600/20 active:scale-95 transition-all">
                      Emergency Lockdown
                   </Button>
                </div>
             </div>
          </Card>
        </div>
        
        <div className="text-center pt-8">
           <p className="text-[9px] font-black text-[#8C92A0] uppercase tracking-[0.4em]">
              Lennon Nash System Core v2.0.4 — © 2026 
           </p>
        </div>
      </div>
    </PageShell>
  );
}
