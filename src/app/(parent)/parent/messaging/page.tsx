"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  MessageSquare, 
  Search, 
  Send, 
  Paperclip, 
  Languages,
  ShieldCheck,
  CheckCheck,
  User,
  MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";

const messages = [
  { id: 1, sender: "Ms. Jenkins (Class Teacher)", preview: "Hi Mr. Wong, Alex did a great job in English today...", time: "10:30 AM", unread: true, avatar: "SJ" },
  { id: 2, sender: "School Admin", preview: "The consent form for the Science Museum is ready.", time: "Yesterday", unread: false, avatar: "SA" },
  { id: 3, sender: "Mr. Henderson (Maths)", preview: "Just a reminder about the quadratic quiz tomorrow.", time: "9 Apr", unread: false, avatar: "JH" },
];

export default function ParentMessaging() {
  const [activeChat, setActiveChat] = useState(1);

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Sidebar - Inbox */}
      <div className="w-full md:w-80 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
           <h1 className="text-2xl font-[800] text-lns-navy tracking-tight">Messages</h1>
           <Button size="icon" variant="outline" className="h-8 w-8 rounded-full border-lns-border">
             <MessageSquare size={16} />
           </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lns-mid-grey" size={14} />
          <input type="text" placeholder="Search chats..." className="w-full bg-white rounded-xl pl-9 pr-4 py-2.5 text-xs border border-lns-border shadow-sm focus:ring-1 focus:ring-lns-navy transition-all" />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {messages.map((msg) => (
            <Card 
              key={msg.id} 
              onClick={() => setActiveChat(msg.id)}
              className={cn(
                "border-none shadow-sm cursor-pointer transition-all hover:translate-x-1",
                activeChat === msg.id ? "bg-lns-navy text-white" : "bg-white text-lns-navy"
              )}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-1">
                   <div className="flex items-center space-x-3">
                     <div className={cn(
                       "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shadow-sm",
                       activeChat === msg.id ? "bg-white/10" : "bg-lns-light-grey"
                     )}>
                       {msg.avatar}
                     </div>
                     <p className={cn("text-xs font-bold truncate max-w-[120px]", activeChat === msg.id ? "text-white" : "text-lns-navy")}>{msg.sender}</p>
                   </div>
                   <span className={cn("text-[9px] font-bold uppercase", activeChat === msg.id ? "text-white/50" : "text-lns-mid-grey")}>{msg.time}</span>
                </div>
                <p className={cn("text-[11px] line-clamp-1 mt-1", activeChat === msg.id ? "text-white/70" : "text-lns-mid-grey font-medium")}>
                  {msg.preview}
                </p>
                {msg.unread && activeChat !== msg.id && (
                  <div className="mt-2 flex justify-end">
                    <div className="w-2 h-2 bg-lns-red rounded-full" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <Card className="flex-1 border-none shadow-xl bg-white flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-lns-border flex items-center justify-between bg-lns-light-grey/20">
           <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-lns-navy rounded-xl flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
                SJ
              </div>
              <div>
                <h3 className="text-sm font-bold text-lns-navy">Ms. Sarah Jenkins</h3>
                <div className="flex items-center space-x-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-widest">Active Now</span>
                </div>
              </div>
           </div>
           
           <div className="flex items-center space-x-2">
              <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-100 text-green-700">
                <Languages size={14} />
                <span className="text-[10px] font-black uppercase tracking-tighter">AI Translation: English (UK)</span>
              </div>
              <Button size="icon" variant="ghost" className="h-9 w-9 text-lns-mid-grey">
                <MoreVertical size={20} />
              </Button>
           </div>
        </div>

        {/* Chat Body (Placeholder) */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-lns-light-grey/5">
           <div className="flex justify-center">
             <span className="px-4 py-1.5 bg-lns-light-grey rounded-full text-[10px] font-bold text-lns-mid-grey uppercase tracking-widest shadow-sm">Today</span>
           </div>

           <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-lns-navy rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm">SJ</div>
              <div className="max-w-[70%] bg-white border border-lns-border p-4 rounded-2xl rounded-tl-none shadow-sm">
                <p className="text-sm text-lns-navy leading-relaxed font-medium">Hi Mr. Wong! Alex has been very focused in English Lit today. I wanted to share that their analysis of modernist poetry was excellent.</p>
                <div className="mt-2 text-[9px] font-bold text-lns-mid-grey uppercase">10:30 AM</div>
              </div>
           </div>

           <div className="flex items-start justify-end">
              <div className="max-w-[70%] bg-lns-navy p-4 rounded-2xl rounded-tr-none shadow-lg text-white">
                <p className="text-sm leading-relaxed font-medium opacity-90">Thank you, Ms. Jenkins! That's great to hear. We'll make sure to review the feedback together tonight.</p>
                <div className="mt-2 text-[9px] font-bold text-white/50 flex items-center justify-end uppercase">
                  10:45 AM
                  <CheckCheck size={12} className="ml-1 text-lns-red" />
                </div>
              </div>
           </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-lns-border bg-white">
           <div className="flex items-center space-x-3 bg-lns-light-grey rounded-2xl px-4 py-2 border border-lns-border/50 shadow-inner focus-within:border-lns-navy transition-all">
              <button className="text-lns-mid-grey hover:text-lns-navy transition-colors">
                <Paperclip size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 font-medium" 
              />
              <Button size="icon" className="h-9 w-9 rounded-xl shadow-md">
                <Send size={18} />
              </Button>
           </div>
           <p className="mt-2 text-[9px] font-bold text-lns-mid-grey text-center uppercase tracking-widest opacity-60">
             Messages are encrypted and hashed to the data trail.
           </p>
        </div>
      </Card>
    </div>
  );
}
