"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  Search, 
  Plus, 
  Download, 
  Filter, 
  MoreVertical, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  UserPlus,
  ArrowLeft,
  Mail,
  Calendar,
  Layers
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TEACHERS = [
  { id: 'tea-001', name: 'James Okafor', subject: 'Mathematics', sessions: 12, status: 'Synced', email: 'j.okafor@lns.edu' },
  { id: 'tea-002', name: 'Sarah Chen', subject: 'English', sessions: 8, status: 'Synced', email: 's.chen@lns.edu' },
  { id: 'tea-003', name: 'David Petrov', subject: 'Science', sessions: 15, status: 'On Leave', email: 'd.petrov@lns.edu' },
  { id: 'tea-004', name: 'Amina Hassan', subject: 'Humanities', sessions: 10, status: 'Synced', email: 'a.hassan@lns.edu' },
];

export default function AdminTeachersRegistryPage() {
  const [search, setSearch] = React.useState("");

  const filteredTeachers = TEACHERS.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/admin/users" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to User Directory
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <Layers size={32} className="text-lns-red" />
               Faculty Persistence Node Registry
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Canonical Academic Faculty Ledger • Verified Personnel Hub</p>
         </div>

         <div className="flex items-center space-x-3">
            <Button variant="outline" className="h-14 bg-white border-gray-100 rounded-2xl px-8 font-black uppercase tracking-widest text-[10px] shadow-sm flex items-center gap-2">
               <Download size={18} />
               Export Faculty Data
            </Button>
            <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-3">
               <UserPlus size={18} />
               Initialize Faculty Node
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Main List (75%) */}
         <div className="lg:col-span-3 space-y-8">
            <div className="relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-lns-mid-grey group-focus-within:text-lns-red transition-colors" size={24} />
               <input 
                 type="text" 
                 placeholder="Search faculty hashes, subjects, or institutional email nodes..." 
                 className="w-full h-16 bg-white rounded-[2rem] pl-16 pr-8 shadow-2xl border-none focus:ring-4 focus:ring-lns-red/5 font-bold text-sm text-lns-navy transition-all outline-none"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               {filteredTeachers.map((teacher) => (
                 <Card key={teacher.id} className="p-8 border-none shadow-xl bg-white rounded-[3rem] group hover:translate-y-[-8px] transition-transform duration-500 relative overflow-hidden border-t border-gray-50">
                    <div className="relative z-10 space-y-8">
                       <div className="flex items-start justify-between">
                          <div className="w-16 h-16 rounded-[1.2rem] bg-lns-navy text-white flex items-center justify-center text-3xl font-black shadow-xl group-hover:bg-lns-red transition-all">
                             {teacher.name.charAt(0)}
                          </div>
                          <div className={cn(
                             "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest italic border",
                             teacher.status === 'Synced' ? "bg-green-50 text-green-600 border-green-100" : "bg-amber-50 text-amber-600 border-amber-100"
                          )}>
                             {teacher.status}
                          </div>
                       </div>
                       
                       <div className="space-y-4">
                          <h4 className="text-xl font-black text-lns-navy group-hover:text-lns-red transition-all italic tracking-tight uppercase leading-none">{teacher.name}</h4>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic mt-1 leading-none">{teacher.subject} Lead Node</p>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Active Cycles</p>
                             <p className="text-sm font-black text-lns-navy italic">{teacher.sessions} Nodes/Wk</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Communication</p>
                             <Mail size={16} className="text-lns-red" />
                          </div>
                       </div>

                       <div className="flex items-center justify-between pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/admin/users/teachers/${teacher.id}`}>
                             <div className="flex items-center gap-3 text-lns-navy font-black text-[10px] uppercase tracking-widest italic hover:text-lns-red cursor-pointer">
                                Audit Faculty Node
                                <ChevronRight size={16} />
                             </div>
                          </Link>
                          <Button variant="ghost" size="icon" className="h-10 w-10"><MoreVertical size={20}/></Button>
                       </div>
                    </div>
                    <Activity size={180} className="absolute -bottom-20 -right-20 opacity-[0.03] text-lns-navy pointer-events-none group-hover:opacity-10 transition-opacity" />
                 </Card>
               ))}
            </div>
         </div>

         {/* Sidebar Stats (25%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Faculty Synopsis</p>
                     <h4 className="text-2xl font-black italic uppercase leading-none tracking-tight">Institutional Load</h4>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                           <span>Total Sync Status</span>
                           <span>92%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-green-500 w-[92%] shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        Institutional faculty nodes are 92% synchronized. 1 node is currently in "Off-Lattice" mode for maintenance.
                     </p>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <div className="p-6 bg-blue-500/5 rounded-2xl border-2 border-dashed border-blue-500/20 text-center space-y-3">
               <ShieldCheck size={28} className="text-blue-500 mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-blue-500/60 leading-relaxed italic pr-2 pl-2">
                  Faculty credentials and session allocations are verified via the institutional blockchain.
               </p>
            </div>

            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic">Personnel Sync</h3>
                  <Zap size={18} className="text-lns-red animate-pulse" />
               </div>
               <div className="space-y-4">
                  {[
                    "Broadcast Term 2 Directive",
                    "Session Load Audit",
                    "Add Guest Faculty Node"
                  ].map((act, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer transition-all">
                       <span className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey group-hover:text-lns-navy">{act}</span>
                       <ChevronRight size={14} className="text-gray-100 group-hover:text-lns-navy transition-all" />
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
