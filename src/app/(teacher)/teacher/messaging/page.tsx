"use client";

import React, { useState } from "react";
import PageShell from "@/components/ui/PageShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Search, 
  Plus, 
  Send, 
  Paperclip, 
  MoreVertical,
  User,
  Shield,
  Circle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const conversations = [
  {
    id: 1,
    name: "Mrs. Sarah Jenkins",
    role: "Parent (Amara Johnson)",
    lastMessage: "Thank you for the update on Amara's grade.",
    time: "10:24 AM",
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: "Mr. David Chen",
    role: "Head Component",
    lastMessage: "Staff meeting moved to 3 PM in Room 4.",
    time: "09:15 AM",
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: "Parent Council",
    role: "Group Chat",
    lastMessage: "Who is coordinating the bake sale?",
    time: "Yesterday",
    unread: 0,
    online: true
  }
];

export default function TeacherMessagingPage() {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <PageShell 
      title="Messaging Hub" 
      description="Secure, institution-verified communication with parents and staff."
    >
      <div className="flex bg-white rounded-[2rem] shadow-xl overflow-hidden h-[calc(100vh-280px)] mt-8 border border-gray-100">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100 bg-[#F4F5F7]">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C92A0]" size={16} />
              <input 
                type="text" 
                placeholder="Search conversations..."
                className="w-full h-11 pl-10 pr-4 bg-white rounded-xl border-none text-xs font-bold text-[#0A1F44] focus:ring-2 focus:ring-[#D62B2B] transition-all"
              />
            </div>
            <Button className="w-full h-11 bg-[#0A1F44] text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center space-x-2">
              <Plus size={16} />
              <span>New Message</span>
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={cn(
                  "w-full p-5 text-left transition-all border-b border-gray-50 flex items-start space-x-4",
                  selectedId === conv.id ? "bg-white ring-1 ring-inset ring-[#D62B2B]/20" : "hover:bg-gray-50"
                )}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#0A1F44]/5 flex items-center justify-center">
                    <User size={24} className="text-[#0A1F44]" />
                  </div>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-xs font-black text-[#0A1F44] uppercase tracking-tight truncate">{conv.name}</h4>
                    <span className="text-[8px] font-bold text-[#8C92A0] uppercase">{conv.time}</span>
                  </div>
                  <p className="text-[10px] font-bold text-[#0A1F44]/60 uppercase tracking-widest mb-1">{conv.role}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] text-[#8C92A0] font-medium truncate">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="bg-[#D62B2B] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#F4F5F7]/30">
          <div className="p-6 border-b border-gray-100 bg-white flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-[#D62B2B]/5 flex items-center justify-center">
                <Shield size={20} className="text-[#D62B2B]" />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#0A1F44] uppercase tracking-tight">
                  {conversations.find(c => c.id === selectedId)?.name}
                </h3>
                <div className="flex items-center space-x-2 mt-0.5">
                  <Circle size={6} className="fill-green-500 text-green-500" />
                  <span className="text-[9px] font-black text-[#8C92A0] uppercase tracking-[0.2em]">End-to-end Encrypted</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-[#8C92A0] hover:text-[#0A1F44]">
              <MoreVertical size={20} />
            </Button>
          </div>

          <div className="flex-1 p-8 overflow-y-auto space-y-6">
             {/* Simple message bubbles */}
             <div className="flex justify-end">
                <div className="bg-[#0A1F44] text-white p-4 rounded-2xl rounded-tr-none max-w-md shadow-lg">
                   <p className="text-sm font-medium">Hello Mrs. Jenkins, I wanted to follow up on Amara&apos;s recent performance improvement in Mathematics. She&apos;s doing great!</p>
                   <p className="text-[8px] font-black uppercase text-white/50 text-right mt-2">Verified Outgoing · 09:42 AM</p>
                </div>
             </div>

             <div className="flex justify-start">
                <div className="bg-white text-[#0A1F44] p-4 rounded-2xl rounded-tl-none max-w-md shadow-sm border border-gray-100">
                   <p className="text-sm font-medium">Thank you for the update on Amara&apos;s grade. We are really pleased to hear she is enjoying the lessons more now.</p>
                   <p className="text-[8px] font-black uppercase text-[#8C92A0] mt-2">Recieved · 10:24 AM</p>
                </div>
             </div>
          </div>

          <div className="p-6 bg-white border-t border-gray-100">
             <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-[#8C92A0] hover:text-[#0A1F44]">
                   <Paperclip size={20} />
                </Button>
                <div className="flex-1 relative">
                   <input 
                     type="text" 
                     placeholder="Type your secure message..."
                     className="w-full h-12 bg-[#F4F5F7] rounded-xl border-none px-6 text-sm font-medium text-[#0A1F44] focus:ring-2 focus:ring-[#D62B2B] transition-all"
                   />
                </div>
                <Button className="h-12 w-12 bg-[#D62B2B] hover:bg-[#B82525] text-white rounded-xl shadow-lg shadow-[#D62B2B]/20 transition-all flex items-center justify-center active:scale-95">
                   <Send size={20} />
                </Button>
             </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
