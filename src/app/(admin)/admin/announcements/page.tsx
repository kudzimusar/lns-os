"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Megaphone, 
  Plus, 
  Search, 
  Send, 
  Trash2, 
  MoreVertical, 
  Users, 
  User, 
  Globe,
  CheckCircle2,
  Clock,
  Layout
} from "lucide-react";
import { cn } from "@/lib/utils";

const announcements = [
  { 
    id: 1, 
    title: "Mid-Term Assessment Schedule", 
    content: "All Grade 10-12 students are to report to the Main Hall by 08:00 AM...", 
    target: "Grade 10-12", 
    status: "Published", 
    date: "12 Apr, 09:12 AM",
    type: "Academic"
  },
  { 
    id: 2, 
    title: "Sports Day Rescheduled", 
    content: "Due to predicted weather conditions, the Inter-House Sports Day is moved to next Friday...", 
    target: "All Students", 
    status: "Draft", 
    date: "10 Apr, 14:30 PM",
    type: "Event"
  },
  { 
    id: 3, 
    title: "Science Lab Network Maintenance", 
    content: "The fiber backbone in Block C will be offline for 2 hours today...", 
    target: "Staff", 
    status: "Published", 
    date: "08 Apr, 08:00 AM",
    type: "System"
  },
];

export default function AdminAnnouncements() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">Announcements</h1>
          <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Broadcasting Control Hub</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            New Broadcast
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Controls */}
        <div className="space-y-6">
           <Card className="border-none shadow-sm bg-white">
              <CardHeader>
                 <CardTitle className="text-sm">Quick Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                 {["All", "Published", "Drafts", "Academic", "Events"].map((item) => (
                    <button 
                       key={item}
                       onClick={() => setFilter(item)}
                       className={cn(
                          "w-full text-left px-4 py-2 rounded-xl text-xs font-bold transition-all",
                          filter === item ? "bg-lns-navy text-white shadow-md" : "text-lns-mid-grey hover:bg-lns-light-grey"
                       )}
                    >
                       {item}
                    </button>
                 ))}
              </CardContent>
           </Card>

           <Card className="border-none shadow-sm bg-lns-navy text-white p-6">
              <div className="space-y-4">
                 <div className="p-3 bg-white/10 rounded-2xl w-fit">
                    <Send className="text-lns-red" size={24} />
                 </div>
                 <div>
                    <p className="text-xl font-[900]">Push AI</p>
                    <p className="text-[10px] text-lns-mid-grey font-bold uppercase leading-tight mt-1">
                       AI predicts best broadcast time: <span className="text-white">TODAY 14:00</span>
                    </p>
                 </div>
                 <Button className="w-full bg-lns-red hover:bg-red-700 border-none text-[10px] font-black uppercase tracking-widest h-10">
                    Smart Schedule
                 </Button>
              </div>
           </Card>
        </div>

        {/* Main Content: List */}
        <div className="lg:col-span-3 space-y-6">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-lns-mid-grey" size={20} />
              <input 
                type="text" 
                placeholder="Search history, keywords..." 
                className="w-full h-14 bg-white rounded-2xl pl-12 pr-4 shadow-sm border-none focus:ring-2 focus:ring-lns-navy transition-all"
              />
           </div>

           <div className="space-y-4">
              {announcements.map((item) => (
                 <Card key={item.id} className="border-none shadow-sm bg-white group hover:shadow-md transition-all overflow-hidden">
                    <div className={cn(
                       "h-1 w-full",
                       item.type === "Academic" ? "bg-blue-500" : item.type === "Event" ? "bg-amber-500" : "bg-lns-navy"
                    )} />
                    <CardContent className="p-6">
                       <div className="flex justify-between items-start">
                          <div className="space-y-1">
                             <div className="flex items-center space-x-2">
                                <span className={cn(
                                   "text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full",
                                   item.type === "Academic" ? "bg-blue-50 text-blue-600" : item.type === "Event" ? "bg-amber-50 text-amber-600" : "bg-lns-light-grey text-lns-navy"
                                )}>
                                   {item.type}
                                </span>
                                <span className="text-[10px] text-lns-mid-grey font-bold">• {item.date}</span>
                             </div>
                             <h3 className="text-lg font-[800] text-lns-navy group-hover:text-lns-red transition-colors">{item.title}</h3>
                             <p className="text-sm text-lns-mid-grey line-clamp-2">{item.content}</p>
                          </div>
                          <div className="flex flex-col items-end space-y-4">
                             <div className="flex items-center space-x-1">
                                {item.status === "Published" ? (
                                   <CheckCircle2 size={14} className="text-green-600" />
                                ) : (
                                   <Clock size={14} className="text-amber-500" />
                                )}
                                <span className={cn(
                                   "text-[10px] font-black uppercase tracking-widest",
                                   item.status === "Published" ? "text-green-600" : "text-amber-500"
                                )}>{item.status}</span>
                             </div>
                             <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                   <Trash2 size={16} className="text-lns-mid-grey group-hover:text-lns-red transition-colors" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                   <MoreVertical size={16} className="text-lns-mid-grey" />
                                </Button>
                             </div>
                          </div>
                       </div>

                       <div className="mt-6 pt-6 border-t border-lns-border flex items-center justify-between">
                          <div className="flex items-center -space-x-2">
                             {[1, 2, 3].map((i) => (
                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-lns-light-grey flex items-center justify-center text-[8px] font-bold text-lns-navy">
                                   <User size={10} />
                                </div>
                             ))}
                             <span className="pl-4 text-[10px] font-bold text-lns-mid-grey uppercase">Sent to {item.target}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                             <Button variant="ghost" size="sm" className="text-xs font-bold text-lns-navy">
                                View Analytics
                             </Button>
                             <Button size="sm" className={cn(
                                "h-8 rounded-lg text-[10px] font-black uppercase tracking-widest px-4",
                                item.status === "Published" ? "bg-lns-navy" : "bg-lns-red"
                             )}>
                                {item.status === "Published" ? "Edit Broadcast" : "Publish Now"}
                             </Button>
                          </div>
                       </div>
                    </CardContent>
                 </Card>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
