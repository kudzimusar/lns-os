"use client";

import React from "react";
import { PLACEHOLDER_TEACHERS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  User, 
  Search, 
  Check, 
  ShieldCheck,
  Globe,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NewMessagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTo = searchParams.get('to');
  const initialSubject = searchParams.get('subject') || '';

  const [selectedTeacherId, setSelectedTeacherId] = React.useState<string | null>(initialTo);
  const [subject, setSubject] = React.useState(initialSubject);
  const [message, setMessage] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      router.push("/parent/messages/thread-new"); // In a real app we'd redirect to the new ID
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 pt-10 px-4">
      {/* Header */}
      <div className="flex items-center gap-6">
         <Link href="/parent/messages">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-lns-navy border border-gray-100 h-12 w-12">
               <ArrowLeft size={24} />
            </Button>
         </Link>
         <div>
            <h1 className="text-3xl font-[900] text-lns-navy tracking-tight leading-none uppercase italic">Initialize Channel</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey italic mt-1">Institutional Communication Deployment</p>
         </div>
      </div>

      <form onSubmit={handleSend} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Recipient Selector */}
         <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4">Authority Nodes</h3>
            <Card className="p-4 border-none shadow-xl bg-white rounded-2xl space-y-4">
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-lns-mid-grey" size={16} />
                  <input placeholder="Search faculty..." className="w-full h-11 bg-gray-50 rounded-xl pl-11 pr-4 text-xs font-bold text-lns-navy border border-gray-100 outline-none focus:bg-white focus:ring-2 focus:ring-lns-red/10 transition-all" />
               </div>
               <div className="space-y-2 max-h-[400px] overflow-y-auto px-1">
                  {PLACEHOLDER_TEACHERS.map((teacher) => (
                    <button
                      key={teacher.id}
                      type="button"
                      onClick={() => setSelectedTeacherId(teacher.id)}
                      className={cn(
                        "w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between group border border-transparent",
                        selectedTeacherId === teacher.id ? "bg-lns-navy text-white shadow-xl scale-[1.02]" : "hover:bg-gray-50"
                      )}
                    >
                       <div className="flex items-center gap-3">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-black group-hover:bg-lns-red transition-all", selectedTeacherId === teacher.id ? "bg-white/10" : "bg-lns-navy/5 text-lns-navy")}>
                             {teacher.name.charAt(0)}
                          </div>
                          <div>
                             <p className="text-[10px] font-black truncate leading-tight uppercase tracking-tight">{teacher.name}</p>
                             <p className={cn("text-[8px] font-bold uppercase tracking-widest leading-none", selectedTeacherId === teacher.id ? "text-slate-400" : "text-lns-mid-grey")}>{teacher.subject}</p>
                          </div>
                       </div>
                       {selectedTeacherId === teacher.id && <Check size={16} className="text-green-400" />}
                    </button>
                  ))}
               </div>
            </Card>

            <div className="p-6 bg-lns-red/5 rounded-[2rem] border-2 border-dashed border-lns-red/20 space-y-3">
               <div className="flex items-center gap-2 text-lns-red">
                  <Globe size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest italic">Node Availability</span>
               </div>
               <p className="text-[10px] leading-relaxed text-lns-red/80 font-medium">Selected recipient will receive an encrypted notification at their next sync interval.</p>
            </div>
         </div>

         {/* Composer */}
         <div className="lg:col-span-2 space-y-6">
            <Card className="p-10 border-none shadow-2xl bg-white rounded-[3rem] space-y-10">
               <div className="space-y-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy ml-4">Communication Index (Subject)</label>
                     <input 
                       required
                       placeholder="e.g. Attendance Variance Query"
                       className="w-full h-16 bg-gray-50 rounded-[1.5rem] border border-gray-100 px-8 text-sm font-black text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner"
                       value={subject}
                       onChange={(e) => setSubject(e.target.value)}
                     />
                  </div>

                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy ml-4">Message Body (Hashed)</label>
                     <textarea 
                       required
                       placeholder="Operational details and request specificities..."
                       className="w-full h-64 bg-gray-50 rounded-[2rem] border border-gray-100 p-8 text-sm font-bold text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner resize-none"
                       value={message}
                       onChange={(e) => setMessage(e.target.value)}
                     />
                  </div>
               </div>

               <div className="flex flex-col md:flex-row items-center gap-6 pt-10 border-t border-gray-50">
                  <Button 
                    type="submit" 
                    disabled={!selectedTeacherId || !subject.trim() || !message.trim() || isSending}
                    className="w-full h-16 bg-lns-navy text-white hover:bg-lns-red rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-navy-600/20 active:scale-95 transition-all flex items-center justify-center gap-4 text-[11px]"
                  >
                     {isSending ? "Digitally Signing..." : "Initialize Thread Deployment"}
                     {!isSending && <Plus size={22} />}
                  </Button>
                  <div className="flex items-center gap-3 text-[10px] font-black text-lns-mid-grey italic shrink-0">
                     <ShieldCheck size={18} className="text-green-500" />
                     SECURE SESSION
                  </div>
               </div>
            </Card>

            <div className="text-center px-10">
               <p className="text-[10px] leading-relaxed text-slate-400 font-medium italic">
                  Privacy Warning: This communication belongs to the institutional registry and may be audited for administrative compliance. 
                  Encryption level: SHA-256 Hashed Nodes.
               </p>
            </div>
         </div>
      </form>
    </div>
  );
}
