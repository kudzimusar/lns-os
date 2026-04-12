"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  Search, 
  Plus, 
  Download, 
  Filter, 
  Table, 
  Grid, 
  MoreVertical, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  UserPlus,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminStudentsRegistryPage() {
  const [search, setSearch] = React.useState("");

  const filteredStudents = PLACEHOLDER_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.idNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 p-3 md:p-6 lg:p-12">
      {/* Header Section */}
      <div className="flex flex-col space-y-6 md:flex-row md:items-end md:justify-between md:space-y-0 pb-6 border-b border-lns-border/10">
         <div className="space-y-1">
            <Link href="/admin/users" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-2">
               <ArrowLeft size={14} />
               User Directory
            </Link>
            <h1 className="text-xl md:text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-3">
               <Users size={24} className="text-lns-red shrink-0" />
               Student Registry
            </h1>
            <p className="text-[10px] md:text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic">{filteredStudents.length} Verified Sub-Nodes • Institutional Ledger</p>
         </div>

         <div className="flex items-center space-x-2 md:space-x-3 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none h-11 md:h-14 bg-white border-lns-border/20 rounded-xl md:rounded-2xl px-4 md:px-8 font-black uppercase tracking-widest text-[10px] shadow-sm flex items-center justify-center gap-2">
               <Download size={16} />
               Export
            </Button>
            <Button className="flex-1 md:flex-none h-11 md:h-14 bg-lns-navy text-white rounded-xl md:rounded-2xl px-4 md:px-10 font-black uppercase tracking-widest text-[10px] shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3">
               <UserPlus size={16} />
               Enroll
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-12">
         {/* Main Explorer */}
         <div className="lg:col-span-3 space-y-6 md:space-y-8">
            <div className="relative group">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-lns-mid-grey group-focus-within:text-lns-red transition-colors" size={18} />
               <input 
                 type="text" 
                 placeholder="Search student identity hashes..." 
                 className="w-full h-12 md:h-16 bg-white rounded-xl md:rounded-[2rem] pl-12 md:pl-16 pr-6 shadow-xl border-none focus:ring-2 focus:ring-lns-red/10 font-bold text-sm text-lns-navy transition-all outline-none"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden space-y-4">
               {filteredStudents.map((student) => (
                  <Card key={student.id} className="border-none shadow-sm bg-white p-4 space-y-4 rounded-2xl overflow-hidden relative">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-lns-navy/5 text-lns-navy flex items-center justify-center text-lg font-black border border-lns-border/5">
                           {student.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-start">
                              <h4 className="text-sm font-black text-lns-navy italic tracking-tight">{student.name}</h4>
                              <span className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-[8px] font-black uppercase text-lns-navy rounded-md">10{student.grade}A</span>
                           </div>
                           <p className="text-[9px] font-mono text-slate-400 font-bold">NODE_{student.id.toUpperCase()}</p>
                        </div>
                     </div>
                     <div className="flex items-center justify-between pt-3 border-t border-lns-border/5">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                           <span className="text-[9px] font-black uppercase text-green-600 tracking-widest italic">Synced</span>
                        </div>
                        <Link href={`/admin/users/students/${student.id}`}>
                           <Button variant="ghost" size="icon" className="h-9 w-9 text-lns-navy bg-gray-50 rounded-lg">
                              <ChevronRight size={16} />
                           </Button>
                        </Link>
                     </div>
                  </Card>
               ))}
               <Button variant="ghost" className="w-full h-12 text-[9px] font-black uppercase tracking-widest text-lns-mid-grey italic border border-dashed border-lns-border/20 rounded-xl">
                  Load Registry Archive
               </Button>
            </div>

            {/* Desktop Table Explorer */}
            <Card className="hidden md:block border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
               <div className="p-6 md:p-8 border-b border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-lns-navy bg-gray-50 px-4 py-2 rounded-xl">
                        Batch: April 2026
                     </div>
                     <div className="h-4 w-px bg-gray-100" />
                     <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-lns-navy bg-lns-light-grey/50 rounded-xl"><Table size={18}/></Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 rounded-xl"><Grid size={18}/></Button>
                     </div>
                  </div>
                  <Button variant="ghost" className="h-10 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest text-lns-mid-grey gap-2 hover:bg-gray-50">
                     <Filter size={14} />
                     Filter
                  </Button>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-gray-50/50">
                           <th className="p-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic">Node Identity</th>
                           <th className="p-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic">Class Node</th>
                           <th className="p-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic text-center">Protocol Sync</th>
                           <th className="p-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {filteredStudents.map((student) => (
                           <tr key={student.id} className="group hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-lns-red">
                              <td className="p-6">
                                 <div className="flex items-center gap-5">
                                    <div className="w-11 h-11 rounded-xl bg-lns-navy/5 text-lns-navy flex items-center justify-center text-lg font-black group-hover:bg-lns-navy group-hover:text-white transition-all shadow-inner">
                                       {student.name.charAt(0)}
                                    </div>
                                    <div>
                                       <h4 className="text-sm font-black text-lns-navy group-hover:text-lns-red transition-colors italic tracking-tight">{student.name}</h4>
                                       <p className="text-[9px] font-mono text-slate-400 font-bold">NODE_{student.id.toUpperCase()}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="p-6">
                                 <span className="px-3 py-1 bg-gray-50 border border-gray-100 text-[9px] font-black uppercase text-lns-navy rounded-lg italic">Grade {student.grade}A</span>
                              </td>
                              <td className="p-6">
                                 <div className="flex items-center justify-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                    <span className="text-[9px] font-black uppercase text-green-600 tracking-widest italic">Synchronized</span>
                                 </div>
                              </td>
                              <td className="p-6 text-right space-x-2">
                                 <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-300 hover:text-lns-navy transition-all rounded-lg">
                                    <MoreVertical size={16} />
                                 </Button>
                                 <Link href={`/admin/users/students/${student.id}`}>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-300 hover:text-lns-red transition-all rounded-lg">
                                       <ChevronRight size={16} />
                                    </Button>
                                 </Link>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </Card>
         </div>

         {/* Sidebar Stats */}
         <div className="space-y-6 md:space-y-8">
            <Card className="p-6 md:p-10 bg-lns-navy rounded-2xl md:rounded-[3.5rem] border-none shadow-2xl text-white space-y-6 md:space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-4 md:space-y-6">
                  <div className="space-y-1">
                     <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Enrollment Synopsis</p>
                     <h4 className="text-xl md:text-2xl font-black italic uppercase leading-none tracking-tight">Canonical Health</h4>
                  </div>
                  <div className="space-y-4 md:space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[9px] font-black uppercase text-slate-400">
                           <span>Target Capacity</span>
                           <span>88%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-lns-red w-[88%] shadow-[0_0_10px_rgba(214,43,43,1)]" />
                        </div>
                     </div>
                     <p className="text-[11px] md:text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        Institutional hosting optimized for {PLACEHOLDER_STUDENTS.length} active nodes.
                     </p>
                  </div>
               </div>
               <Activity className="absolute -bottom-10 -right-10 text-white/5 w-40 h-40 md:w-80 md:h-80 pointer-events-none" />
            </Card>

            <div className="p-4 md:p-6 bg-amber-50 rounded-2xl border border-dashed border-amber-200 text-center space-y-2">
               <ShieldCheck size={24} className="text-amber-500 mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-amber-900 leading-relaxed italic">
                  Cryptographically signed records archived on institutional ledger.
               </p>
            </div>

            <Card className="p-6 md:p-8 border-none shadow-xl bg-white rounded-2xl md:rounded-2xl space-y-4 md:space-y-6">
               <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic">Quick Directives</h3>
                  <Zap size={16} className="text-lns-red animate-pulse" />
               </div>
               <div className="space-y-3">
                  {["Bulk Import (CSV)", "Generate Multi-ID", "Registry Audit"].map((act, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer transition-all active:bg-gray-50 p-1 rounded">
                       <span className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey group-hover:text-lns-navy">{act}</span>
                       <ChevronRight size={12} className="text-gray-200 group-hover:text-lns-navy transition-all" />
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
