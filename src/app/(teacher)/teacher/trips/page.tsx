"use client";

import React from "react";
import Link from "next/link";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Bus, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight,
  ChevronRight,
  MoreVertical
} from "lucide-react";

const trips = [
  { 
    id: "trip-001", 
    title: "Science Museum Trip", 
    category: "Academic", 
    date: "15 May 2026", 
    location: "Natural History Museum", 
    students: 18, 
    maxStudents: 30, 
    status: "OPEN",
    progress: 60
  },
  { 
    id: "trip-002", 
    title: "V&A Design Workshop", 
    category: "Arts", 
    date: "22 May 2026", 
    location: "V&A Museum", 
    students: 12, 
    maxStudents: 15, 
    status: "OPEN",
    progress: 80
  },
  { 
    id: "trip-003", 
    title: "Sports Day Regional Finals", 
    category: "Sports", 
    date: "05 Jun 2026", 
    location: "Olympic Park", 
    students: 45, 
    maxStudents: 50, 
    status: "PLANNING",
    progress: 90
  }
];

export default function TeacherTripListPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-8 px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-xl md:text-3xl font-[800] text-lns-navy tracking-tight uppercase">Trips & Excursions</h1>
          <p className="text-xs md:text-base text-lns-mid-grey font-medium">Manage student outings, logistics and payments</p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none bg-white h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl">
            <Filter size={14} className="mr-2" />
            Filter
          </Button>
          <Button className="flex-1 sm:flex-none h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl bg-lns-navy text-white">
            <Plus size={14} className="mr-2" />
            Create New Trip
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {trips.map((trip) => (
           <Card key={trip.id} className="border-none shadow-sm bg-white hover:shadow-xl transition-all duration-500 overflow-hidden group">
              <div className="h-40 bg-lns-light-grey relative overflow-hidden">
                 <div className="absolute inset-0 bg-lns-navy opacity-0 group-hover:opacity-10 transition-opacity"></div>
                 <div className="absolute top-4 left-4">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                       trip.status === "OPEN" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                    }`}>
                       {trip.status}
                    </span>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Bus size={64} strokeWidth={1.5} className="text-lns-navy/10 group-hover:scale-110 transition-transform duration-700" />
                 </div>
              </div>
              <CardHeader className="pb-2">
                 <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey mb-1">{trip.category}</p>
                        <CardTitle className="text-lg font-[900] text-lns-navy leading-tight">{trip.title}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full -mt-2 -mr-2">
                       <MoreVertical size={14} />
                    </Button>
                 </div>
              </CardHeader>
              <CardContent>
                 <div className="space-y-3 mb-6">
                    <div className="flex items-center text-xs font-medium text-lns-mid-grey">
                       <Calendar size={14} className="mr-2 text-lns-red" />
                       {trip.date}
                    </div>
                    <div className="flex items-center text-xs font-medium text-lns-mid-grey">
                       <MapPin size={14} className="mr-2" />
                       {trip.location}
                    </div>
                    <div className="flex items-center text-xs font-medium text-lns-mid-grey">
                       <Users size={14} className="mr-2" />
                       {trip.students} / {trip.maxStudents} Confirmed
                    </div>
                 </div>
                 <div className="pt-4 border-t border-lns-light-grey">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Financial Progress</span>
                       <span className="text-[10px] font-black text-lns-navy uppercase tracking-widest">{trip.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-lns-light-grey rounded-full overflow-hidden">
                       <div className={`h-full bg-lns-navy rounded-full transition-all duration-1000`} style={{ width: `${trip.progress}%` }}></div>
                    </div>
                 </div>
              </CardContent>
              <div className="p-4 bg-lns-navy/5 group-hover:bg-lns-navy/10 transition-colors">
                 <Link href={`/teacher/trips/${trip.id}`}>
                    <Button className="w-full bg-lns-navy text-white hover:bg-lns-navy/90 h-10 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center">
                       Manage Manifesto
                       <ChevronRight size={14} className="ml-2" />
                    </Button>
                 </Link>
              </div>
           </Card>
         ))}
      </div>
    </div>
  );
}
