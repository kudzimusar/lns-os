"use client";

import React from "react";
import PageShell from "@/components/ui/PageShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Fingerprint, 
  Key, 
  Edit3,
  LogOut,
  Clock,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";

export default function GlobalProfilePage() {
  return (
    <PageShell 
      title="Institutional Profile" 
      description="Manage your verified biometric identity and security credentials."
    >
      <div className="max-w-4xl mt-8 space-y-8">
        {/* Header Card */}
        <Card className="border-none shadow-xl bg-white overflow-hidden rounded-[2.5rem]">
           <CardContent className="p-0">
              <div className="bg-[#0A1F44] p-10 flex flex-col md:flex-row items-center gap-8">
                 <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center border-4 border-white/5">
                       <User size={64} className="text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#E8B84B] rounded-xl flex items-center justify-center shadow-lg">
                       <ShieldCheck size={20} className="text-[#0A1F44]" />
                    </div>
                 </div>
                 <div className="text-center md:text-left space-y-2">
                    <h2 className="text-4xl font-black text-white font-manrope uppercase">Mrs. Sarah Jenkins</h2>
                    <p className="text-[#8C92A0] font-black uppercase tracking-[0.2em] text-xs">Primary Admin & Senior Educator</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                       <div className="flex items-center space-x-2 text-[10px] font-black text-white/50 uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full">
                          <Fingerprint size={12} className="text-[#E8B84B]" />
                          <span>Biometrics Active</span>
                       </div>
                       <div className="flex items-center space-x-2 text-[10px] font-black text-white/50 uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full">
                          <Key size={12} className="text-[#E8B84B]" />
                          <span>Quantum Sealed</span>
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-8">
                    <h3 className="text-xs font-black text-[#8C92A0] uppercase tracking-[0.3em]">Identity Details</h3>
                    <div className="space-y-6">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-[#F4F5F7] flex items-center justify-center text-[#0A1F44]">
                             <Mail size={18} />
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-[#8C92A0] uppercase tracking-widest">Email Address</p>
                             <p className="text-sm font-bold text-[#0A1F44]">s.jenkins@lns-academy.edu</p>
                          </div>
                       </div>
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-[#F4F5F7] flex items-center justify-center text-[#0A1F44]">
                             <Phone size={18} />
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-[#8C92A0] uppercase tracking-widest">Phone Number</p>
                             <p className="text-sm font-bold text-[#0A1F44]">+234 (0) 813 456 7890</p>
                          </div>
                       </div>
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-[#F4F5F7] flex items-center justify-center text-[#0A1F44]">
                             <MapPin size={18} />
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-[#8C92A0] uppercase tracking-widest">Office Location</p>
                             <p className="text-sm font-bold text-[#0A1F44]">Block B, Room 402</p>
                          </div>
                       </div>
                    </div>
                    <Button variant="outline" className="w-full h-12 border-gray-100 text-[#0A1F44] font-black uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2">
                       <Edit3 size={16} /> Edit Public Profile
                    </Button>
                 </div>
                 
                 <div className="space-y-8">
                    <h3 className="text-xs font-black text-[#8C92A0] uppercase tracking-[0.3em]">Institutional Presence</h3>
                    <div className="space-y-4">
                       {[
                          { label: "Date Joined", value: "Sept 2021", icon: Clock },
                          { label: "Clearance Level", value: "Level 4 (Admin)", icon: ShieldCheck },
                          { label: "Devices Verified", value: "3 Active", icon: Fingerprint }
                       ].map(item => (
                          <div key={item.label} className="p-4 rounded-2xl border border-gray-50 flex items-center justify-between">
                             <div className="flex items-center space-x-3">
                                <item.icon size={16} className="text-[#0A1F44]" />
                                <span className="text-[10px] font-black text-[#8C92A0] uppercase tracking-widest">{item.label}</span>
                             </div>
                             <span className="text-xs font-black text-[#0A1F44] uppercase tracking-tight">{item.value}</span>
                          </div>
                       ))}
                    </div>
                    
                    <div className="pt-8">
                       <Button className="w-full h-14 bg-gray-50 hover:bg-red-50 text-red-600 hover:text-red-700 font-black uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2 border border-transparent hover:border-red-100 transition-all">
                          <LogOut size={16} /> Terminate All Session Nodes
                       </Button>
                    </div>
                 </div>
              </div>
           </CardContent>
        </Card>
        
        {/* Verification Status */}
        <div className="text-center">
           <p className="text-[8px] font-mono text-[#8C92A0] uppercase tracking-[0.2em]">
              Verified Institutional Address: 0x71C765...d2b3 | Block Synced: 3.4s ago
           </p>
        </div>
      </div>
    </PageShell>
  );
}
