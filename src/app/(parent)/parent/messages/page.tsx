"use client";

import React from "react";
import { MESSAGE_THREADS, PLACEHOLDER_TEACHERS } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  ChevronLeft,
  MessageSquare,
  Globe,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SplitPanel, SplitPanelEmptyState } from "@/components/tablet/SplitPanel";
import { useRouter } from "next/navigation";

export default function ParentMessagesPage({ params }: { params?: { threadId?: string } }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = React.useState<string | null>(params?.threadId || null);
  const [newMessage, setNewMessage] = React.useState("");
  
  const selectedThread = MESSAGE_THREADS.find(t => t.id === selectedId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    router.push(`/parent/messages/${id}`);
  };

  const LeftPanel = (
    <div className="flex flex-col h-full bg-white">
      <div className="p-8 border-b border-gray-100 space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-2xl font-black text-lns-navy tracking-tight italic">Family Comms</h2>
           <Link href="/parent/messages/new">
              <Button size="icon" className="h-10 w-10 bg-lns-red text-white hover:bg-red-700 rounded-xl shadow-lg shadow-red-600/20 active:scale-90 transition-all">
                 <Plus size={20} />
              </Button>
           </Link>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-lns-mid-grey" size={18} />
          <input 
            type="text" 
            placeholder="Search institutional threads..." 
            className="w-full h-12 pl-12 pr-4 rounded-2xl border border-gray-100 bg-gray-50 text-xs font-bold text-lns-navy outline-none focus:bg-white focus:ring-2 focus:ring-lns-red/10 transition-all"
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
                "w-full text-left p-5 rounded-3xl transition-all group relative border-l-8",
                isActive 
                  ? "bg-lns-navy/5 border-lns-red shadow-inner shadow-navy-600/5 scale-[1.02] z-10" 
                  : "hover:bg-gray-50 border-transparent"
              )}
            >
              <div className="flex gap-4">
                 <div className="w-14 h-14 rounded-2xl bg-lns-navy flex-shrink-0 flex items-center justify-center text-white text-xl font-black shadow-xl group-hover:scale-110 transition-transform">
                    {thread.participant.name.charAt(0)}
                 </div>
                 <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between mb-0.5">
                       <h4 className={cn("text-sm font-black truncate", isActive ? "text-lns-navy" : "text-gray-700")}>
                          {thread.participant.name}
                       </h4>
                       <span className="text-[9px] font-black text-lns-mid-grey uppercase tracking-widest italic">{new Date(thread.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <p className="text-[10px] font-black text-lns-navy/60 truncate uppercase tracking-widest">{thread.subject}</p>
                    <p className="text-xs text-lns-mid-grey truncate font-medium">
                       {thread.lastMessage}
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
          <div className="px-10 py-6 border-b border-gray-50 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-10">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-lns-navy flex items-center justify-center text-white text-lg font-black shadow-xl">
                    {selectedThread.participant.name.charAt(0)}
                </div>
                <div>
                   <h3 className="text-lg font-[900] text-lns-navy leading-none mb-1 italic">{selectedThread.participant.name}</h3>
                   <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey italic">
                      {selectedThread.participant.role} • {selectedThread.subject}
                      <span className="flex items-center gap-2 text-green-600">
                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                         HIGH AUTHORITY CHANNEL
                      </span>
                   </div>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="text-lns-mid-grey hover:text-lns-navy rounded-xl h-11 w-11 hover:bg-gray-50 border border-gray-50">
                   <MoreVertical size={20} />
                </Button>
             </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-10 space-y-10">
             {selectedThread.messages.map((msg, i) => {
               const isSender = msg.sender === 'parent' || msg.sender === 'student'; // Assuming 'student' as current sender for now or handle correctly
               const isInstitutional = msg.sender === 'teacher' || msg.sender === 'system';

               return (
                 <div 
                   key={msg.id} 
                   className={cn(
                     "flex flex-col max-w-[85%] animate-in fade-in slide-in-from-bottom-4 duration-500",
                     !isInstitutional ? "ml-auto items-end" : "items-start"
                   )}
                 >
                   <div className={cn(
                     "p-6 rounded-[2rem] text-sm font-medium leading-relaxed shadow-xl",
                     !isInstitutional 
                       ? "bg-lns-navy text-white rounded-tr-none shadow-navy-600/10" 
                       : "bg-gray-50 text-lns-navy border border-gray-100 rounded-tl-none shadow-gray-200/5 text-slate-700"
                   )}>
                      {msg.text}
                   </div>
                   <div className="flex items-center gap-3 mt-4 px-2">
                      <span className="text-[9px] font-black text-lns-mid-grey uppercase tracking-[0.3em] italic">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      {isInstitutional && (
                        <div className="flex items-center gap-2 text-lns-red text-[9px] font-black uppercase tracking-widest italic animate-pulse">
                           <Globe size={11} />
                           Faculty Response Ledger
                        </div>
                      )}
                      {!isInstitutional && <div className="text-green-500 font-black text-[9px] uppercase tracking-widest italic flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Delivered to Node</div>}
                   </div>
                 </div>
               );
             })}
          </div>

          {/* Input Area */}
          <div className="p-8 border-t border-gray-50 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
             <div className="bg-gray-50 rounded-2xl p-3 flex items-center gap-4 border border-gray-100 focus-within:ring-4 focus-within:ring-lns-red/5 focus-within:bg-white focus-within:border-lns-navy/10 transition-all duration-500">
                <Button variant="ghost" size="icon" className="text-lns-mid-grey hover:text-lns-navy h-12 w-12 rounded-2xl flex-shrink-0 hover:bg-gray-100">
                   <Paperclip size={24} />
                </Button>
                <input 
                  type="text"
                  placeholder="Draft encrypted institutional communication..."
                  className="flex-1 bg-transparent border-none outline-none px-4 text-sm font-bold text-lns-navy placeholder:text-gray-300"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button 
                  disabled={!newMessage.trim()}
                  className="bg-lns-red text-white hover:bg-red-700 h-14 px-10 flex items-center justify-center rounded-2xl flex-shrink-0 shadow-2xl shadow-red-600/30 active:scale-90 transition-all font-black uppercase tracking-widest text-[10px]"
                >
                   <Send size={20} className="mr-3" />
                   Transmit
                </Button>
             </div>
          </div>
        </>
      ) : (
        <SplitPanelEmptyState 
          title="Communications Channel Inactive" 
          description="Select an active thread or deploy a new institutional request to begin faculty coordination."
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
        leftWidth="w-full md:w-96"
      />
      
      {/* Mobile Back Button */}
      {selectedId && (
        <button 
          onClick={() => setSelectedId(null)}
          className="md:hidden fixed top-24 left-6 z-50 bg-white/90 backdrop-blur-md shadow-2xl rounded-full p-3 text-lns-navy border border-gray-100 hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
      )}
    </div>
  );
}

import Link from "next/link";
