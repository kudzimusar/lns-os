"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  User, 
  Camera, 
  ArrowLeft, 
  Save, 
  Trash2,
  Lock,
  Mail,
  Phone,
  Layout
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileEditPage() {
  const router = useRouter();
  const student = PLACEHOLDER_STUDENTS[0];
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      router.push("/student/profile");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Link href="/student/profile">
               <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-lns-navy">
                  <ArrowLeft size={24} />
               </Button>
            </Link>
            <div>
               <h1 className="text-xl font-black text-lns-navy tracking-tight">Modify Student Persona</h1>
               <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-widest">LNS-2024 Institutional Registry Update</p>
            </div>
         </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Avatar Edit Side */}
         <div className="space-y-6">
            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl flex flex-col items-center justify-center text-center gap-6 group">
               <div className="relative">
                  <div className="w-32 h-32 rounded-2xl bg-lns-navy flex items-center justify-center text-white text-5xl font-black shadow-2xl border-4 border-white transition-transform group-hover:scale-95 duration-500">
                     {student.name.charAt(0)}
                  </div>
                  <button type="button" className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-lns-red text-white shadow-xl flex items-center justify-center border border-white hover:scale-110 active:scale-95 transition-all">
                     <Camera size={20} />
                  </button>
               </div>
               <div className="space-y-1">
                  <p className="text-sm font-black text-lns-navy">Institutional Avatar</p>
                  <p className="text-[10px] font-bold text-lns-mid-grey px-4">This profile photo will be used at all terminal scan gateways.</p>
               </div>
               <Button type="button" variant="ghost" className="text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red h-8">
                  <Trash2 size={14} className="mr-2" />
                  Remove Image
               </Button>
            </Card>

            <Card className="p-8 border-none shadow-sm bg-gray-50/50 rounded-2xl space-y-4">
               <div className="flex items-center gap-3 text-lns-navy">
                  <Lock size={18} className="text-lns-red" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Authority Lock</h3>
               </div>
               <p className="text-[10px] leading-relaxed text-lns-mid-grey">
                  Core registry data (Name, LNS ID, Grade Level) is immutable at the student level. Submit a Support Ticket for official modifications.
               </p>
            </Card>
         </div>

         {/* Form Side */}
         <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-8">
               <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey ml-1">Academic Name (Immutable)</label>
                        <input 
                          type="text" 
                          disabled 
                          className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 text-sm font-bold text-lns-navy/50 opacity-100 cursor-not-allowed"
                          value={student.name}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey ml-1">LNS Identity Code</label>
                        <input 
                          type="text" 
                          disabled 
                          className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 text-sm font-bold text-lns-navy/50 opacity-100 cursor-not-allowed"
                          value={student.idNumber}
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-lns-navy ml-1 flex items-center gap-2">
                        <Mail size={12} />
                        Personalized Communication Index
                     </label>
                     <input 
                       type="email" 
                       className="w-full h-14 bg-gray-50 border border-gray-100 focus:bg-white focus:border-lns-navy/20 outline-none rounded-2xl px-6 text-sm font-bold text-lns-navy transition-all"
                       placeholder="Enter terminal email..."
                       defaultValue={`${student.name.toLowerCase().replace(" ", ".")}@lns.edu`}
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-lns-navy ml-1 flex items-center gap-2">
                        <Phone size={12} />
                        Emergency Node Access
                     </label>
                     <input 
                       type="tel" 
                       className="w-full h-14 bg-gray-50 border border-gray-100 focus:bg-white focus:border-lns-navy/20 outline-none rounded-2xl px-6 text-sm font-bold text-lns-navy transition-all"
                       placeholder="Enter terminal phone..."
                       defaultValue="+44 20 7946 0958"
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-lns-navy ml-1 flex items-center gap-2">
                        <Layout size={12} />
                        Interface Preference
                     </label>
                     <select className="w-full h-14 bg-gray-50 border border-gray-100 focus:bg-white focus:border-lns-navy/20 outline-none rounded-2xl px-6 text-sm font-bold text-lns-navy appearance-none transition-all cursor-pointer">
                        <option>Refined (Institutional Theme)</option>
                        <option>High-Contrast (Accessible)</option>
                        <option>Monochrome (Node Optimized)</option>
                     </select>
                  </div>
               </div>

               <div className="pt-6 border-t border-gray-50">
                  <Button 
                    type="submit" 
                    disabled={isSaving}
                    className="w-full bg-lns-navy text-white hover:bg-lns-red h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                     {isSaving ? "Synchronizing..." : "Synchronize Profile Data"}
                     {!isSaving && <Save size={18} />}
                  </Button>
               </div>
            </Card>
         </div>
      </form>
    </div>
  );
}
