"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Megaphone, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Users,
  Eye,
  Trash2,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const announcements = [
  { id: 1, title: "End of Term Assessment Schedule", target: "All Users", date: "Apr 15, 2026", status: "Published", views: "1.2k" },
  { id: 2, title: "Parent-Teacher Conference (Grade 10)", target: "Parents", date: "Apr 18, 2026", status: "Scheduled", views: "0" },
  { id: 3, title: "Inter-School Sports Day Update", target: "Students & Staff", date: "Yesterday", status: "Published", views: "850" },
  { id: 4, title: "Easter Holiday Office Hours", target: "All Users", date: "Apr 05, 2026", status: "Archived", views: "2.4k" },
];

export default function AdminAnnouncementsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight flex items-center">
            <Megaphone className="mr-3 text-lns-red" size={28} />
            Announcement Board
          </h1>
          <p className="text-lns-mid-grey font-medium">Broadcast school-wide alerts or targeted role messages.</p>
        </div>
        <Button>
          <Plus size={18} className="mr-2" />
          Create Broadcast
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {announcements.map((item) => (
          <Card key={item.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden bg-white">
            <CardContent className="p-0">
               <div className="flex flex-col md:flex-row md:items-center">
                  <div className={cn(
                    "w-full md:w-2 h-2 md:h-auto shrink-0",
                    item.status === "Published" ? "bg-green-500" :
                    item.status === "Scheduled" ? "bg-blue-500" : "bg-lns-mid-grey"
                  )} />
                  
                  <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start space-x-4">
                       <div className="w-12 h-12 rounded-xl bg-lns-light-grey flex items-center justify-center text-lns-navy">
                          <Megaphone size={20} />
                       </div>
                       <div>
                          <h3 className="text-lg font-bold text-lns-navy group-hover:text-lns-red transition-colors">{item.title}</h3>
                          <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
                             <span className="flex items-center"><Users size={12} className="mr-1" /> {item.target}</span>
                             <span className="w-1 h-1 bg-lns-border rounded-full" />
                             <span className="flex items-center"><Calendar size={12} className="mr-1" /> {item.date}</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center space-x-8">
                       <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Status</p>
                          <p className={cn(
                            "text-xs font-bold",
                            item.status === "Published" ? "text-green-600" :
                            item.status === "Scheduled" ? "text-blue-600" : "text-slate-400"
                          )}>{item.status}</p>
                       </div>
                       <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Views</p>
                          <p className="text-xs font-bold text-lns-navy">{item.views}</p>
                       </div>
                       <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="h-9 px-4 text-xs font-bold">Edit</Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-lns-mid-grey hover:text-lns-red">
                             <Trash2 size={16} />
                          </Button>
                       </div>
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
