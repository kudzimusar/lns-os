"use client";

import React from "react";
import { MESSAGE_THREADS } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  ChevronLeft,
  MessageSquare,
  Globe,
  Plus,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SplitPanel, SplitPanelEmptyState } from "@/components/tablet/SplitPanel";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudentMessagesPage({ params }: { params?: { threadId?: string } }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = React.useState<string | null>(params?.threadId || null);
  const [newMessage, setNewMessage] = React.useState("");
  
  const selectedThread = MESSAGE_THREADS.find(t => t.id === selectedId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    router.push(`/student/messages/${id}`);
  };

  const LeftPanel = (
    <div className="flex flex-col h-full bg-white border-r border-gray-50 overflow-hidden">
      <div className="p-10 border-b border-gray-50 space-y-8">
        <div className="flex items-center justify-between">
           <h2 className="text-3xl font-[900] text-lns-navy tracking-tighter italic uppercase">Comms Hub</h2>
           <Button size="icon" className="h-12 w-12 bg-lns-red text-white hover:bg-black rounded-2xl shadow-xl shadow-red-600/20 active:scale-90 transition-all">
              <Plus size={24} />
           </Button>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-lns-mid-grey group-focus-within:text-lns-red transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search threads..." 
            className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-100 bg-gray-50 text-[10px] font-black uppercase text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {MESSAGE_THREADS.map((thread) => {
          const isActive = selectedId === thread.id;
          return (
            <button
              key={thread.id}
              onClick={() => handleSelect(thread.id)}
              className={cn(
                "w-full text-left p-6 rounded-[2rem] transition-all group relative border-l-8 overflow-hidden",
                isActive 
                  ? "bg-lns-navy text-white border-lns-red shadow-2xl scale-[1.02] z-10" 
                  : "hover:bg-gray-50 border-transparent bg-white shadow-sm border border-gray-50"
              )}
            >
              <div className="flex gap-5 relative z-10">
                 <div className={cn(
                   "w-16 h-16 rounded-[1.2rem] flex-shrink-0 flex items-center justify-center text-2xl font-black shadow-xl transition-all",
                   isActive ? "bg-white text-lns-navy" : "bg-lns-navy text-white group-hover:bg-lns-red"
                 )}>
                    {thread.participant.name.charAt(0)}
                 </div>
                 <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between">
                       <h4 className={cn("text-sm font-black italic tracking-tight truncate", isActive ? "text-white" : "text-lns-navy")}>
                          {thread.participant.name}
                       </h4>
                       <span className={cn("text-[8px] font-black uppercase italic", isActive ? "text-slate-400" : "text-slate-400")}>10:30 AM</span>
                    </div>
                    <p className={cn("text-[9px] font-black uppercase tracking-[0.2em] truncate leading-none", isActive ? "text-white/60" : "text-lns-navy/60")}>{thread.subject}</p>
                    <p className={cn("text-xs font-medium truncate italic leading-relaxed", isActive ? "text-slate-300" : "text-lns-mid-grey")}>
                       "{thread.lastMessage}"
                    </p>
                 </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const RightPanel = (
    <div className="h-full bg-white flex flex-col">
      {selectedThread ? (
        <>
          {/* Thread Header */}
          <div className="px-12 py-8 border-b border-gray-50 flex items-center justify-between bg-white/95 backdrop-blur-lg sticky top-0 z-10 shadow-sm">
             <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-lns-navy flex items-center justify-center text-white text-xl font-black shadow-2xl">
                    {selectedThread.participant.name.charAt(0)}
                </div>
                <div>
                   <h3 className="text-xl font-[900] text-lns-navy leading-none mb-2 italic uppercase tracking-tight">{selectedThread.participant.name}</h3>
                   <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey italic leading-none">
                      {selectedThread.participant.role} • {selectedThread.subject}
                      <span className="flex items-center gap-2 text-green-600 ml-4 border-l pl-4 border-gray-100">
                         <ShieldCheck size={14} />
                         SECURE SESSION ACTIVE
                      </span>
                   </div>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="text-lns-mid-grey hover:text-lns-navy rounded-2xl h-12 w-12 hover:bg-gray-50 border border-gray-50">
                   <MoreVertical size={24} />
                </Button>
             </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-12 space-y-12">
             {selectedThread.messages.map((msg, i) => {
               const isStudent = msg.sender === 'student';
               return (
                 <div 
                   key={msg.id} 
                   className={cn(
                     "flex flex-col max-w-[80%] animate-in fade-in slide-in-from-bottom-6 duration-700",
                     isStudent ? "ml-auto items-end" : "items-start"
                   )}
                 >
                   <div className={cn(
                     "p-8 rounded-2xl text-sm font-medium leading-relaxed shadow-2xl relative overflow-hidden",
                     isStudent 
                       ? "bg-lns-navy text-white rounded-tr-none shadow-navy-600/10" 
                       : "bg-gray-50 text-lns-navy border border-gray-100 rounded-tl-none shadow-gray-200/5 text-slate-700 font-bold"
                   )}>
                      <p className="relative z-10 italic">"{msg.text}"</p>
                      {isStudent && <div className="absolute inset-x-0 bottom-0 h-1 bg-lns-red opacity-30 shadow-[0_0_15px_rgba(214,43,43,1)]" />}
                   </div>
                   <div className="flex items-center gap-4 mt-6 px-4">
                      <span className="text-[9px] font-black text-lns-mid-grey uppercase tracking-[0.4em] italic">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      {!isStudent && (
                        <div className="flex items-center gap-2 text-lns-red text-[9px] font-black uppercase tracking-widest italic border-l pl-4 border-gray-100">
                           <Globe size={11} />
                           Institutional Sync
                        </div>
                      )}
                      {isStudent && <div className="text-green-500 font-black text-[9px] uppercase tracking-widest italic flex items-center gap-2 border-l pl-4 border-gray-100"><ShieldCheck size={11}/> Delivered</div>}
                   </div>
                 </div>
               );
             })}
          </div>

          {/* Input Area */}
          <div className="p-10 border-t border-gray-100 bg-white shadow-[0_-30px_60px_rgba(0,0,0,0.03)] z-10">
             <div className="bg-gray-50 rounded-[3rem] p-4 flex items-center gap-6 border-2 border-gray-100 focus-within:ring-8 focus-within:ring-lns-red/5 focus-within:bg-white focus-within:border-lns-navy/10 transition-all duration-700">
                <Button variant="ghost" size="icon" className="text-lns-mid-grey hover:text-lns-navy h-14 w-14 rounded-[1.5rem] flex-shrink-0 hover:bg-gray-100 transition-all">
                   <Paperclip size={28} />
                </Button>
                <input 
                  type="text"
                  placeholder="Draft encrypted institutional communication..."
                  className="flex-1 bg-transparent border-none outline-none px-6 text-sm font-black italic text-lns-navy placeholder:text-gray-300"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button 
                  disabled={!newMessage.trim()}
                  className="bg-lns-navy text-white hover:bg-lns-red h-16 px-12 flex items-center justify-center rounded-[1.5rem] flex-shrink-0 shadow-2xl shadow-navy-600/20 active:scale-95 transition-all font-black uppercase tracking-widest text-[11px] outline-none border-b-4 border-navy-900"
                >
                   <Send size={24} className="mr-4" />
                   Transmit Sync
                </Button>
             </div>
          </div>
        </>
      ) : (
        <SplitPanelEmptyState 
          title="Institutional Comms Node Inactive" 
          description="Initialize a secure thread from the directory to begin institutional messaging synchronization."
          icon={MessageSquare}
        />
      )}
    </div>
  );

  return (
    <div className="h-[calc(100vh-140px)] -m-4 md:-m-6 lg:-m-8">
      <SplitPanel 
        leftPanel={LeftPanel} 
        rightPanel={RightPanel}
        showMobileDetail={!!selectedId}
        leftWidth="w-full md:w-[450px]"
      />
      
      {/* Mobile Back Button */}
      {selectedId && (
        <button 
          onClick={() => setSelectedId(null)}
          className="md:hidden fixed top-24 left-8 z-50 bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-full p-4 text-lns-navy border border-gray-100 hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronLeft size={28} />
        </button>
      )}
    </div>
  );
}
