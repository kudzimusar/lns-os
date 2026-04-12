"use client";

import React, { useState } from "react";
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
  ChevronLeft, 
  Bus, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  QrCode, 
  Users, 
  MoreVertical, 
  Mail, 
  Download,
  AlertCircle,
  ShieldCheck,
  Zap,
  MapPin,
  Calendar
} from "lucide-react";

const tripAttendees = [
  { id: "STU-001", name: "Amara Johnson", status: "CONFIRMED", paid: true, consent: true, boarded: true, method: "STRIPE_CARD" },
  { id: "STU-002", name: "Blake Nkosi", status: "CONFIRMED", paid: true, consent: true, boarded: false, method: "WALLET" },
  { id: "STU-003", name: "David Moyo", status: "PENDING", paid: false, consent: false, boarded: false, method: null },
  { id: "STU-004", name: "Elena Petrov", status: "OVERDUE", paid: false, consent: false, boarded: false, method: null },
  { id: "STU-005", name: "Leo Smith", status: "CONFIRMED", paid: true, consent: true, boarded: false, method: "PAYPAL" },
];

export default function TeacherTripDetailClient({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("attendees");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-8 px-0">
      <div className="flex items-center space-x-2 px-1">
        <Link href="/teacher/trips">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white">
            <ChevronLeft size={20} className="text-lns-navy" />
          </Button>
        </Link>
        <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Back to Trip List</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-1">
        <div className="flex items-start space-x-5">
           <div className="p-4 bg-lns-navy text-white rounded-3xl shrink-0 shadow-lg shadow-lns-navy/10">
              <Bus size={40} strokeWidth={2.5} />
           </div>
           <div>
              <div className="flex items-center space-x-2 mb-1">
                 <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-md">Academic</span>
                 <span className="text-[10px] font-bold text-lns-mid-grey">ID: LNS-TRP-2026-Science</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-[900] text-lns-navy tracking-tighter uppercase leading-none mb-2">Science Museum Trip</h1>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-lns-mid-grey">
                 <div className="flex items-center"><MapPin size={14} className="mr-1 text-lns-red" /> Natural History Museum</div>
                 <div className="flex items-center"><Calendar size={14} className="mr-1" /> 15 May 2026</div>
                 <div className="flex items-center"><Clock size={14} className="mr-1" /> 08:30 - 16:00</div>
              </div>
           </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-white h-12 text-[10px] font-black uppercase tracking-widest rounded-xl">
            <Download size={14} className="mr-2" />
            Passenger List
          </Button>
          <Button className="h-12 bg-lns-navy text-white hover:bg-lns-navy/90 text-[10px] font-black uppercase tracking-widest rounded-xl px-6">
            <QrCode size={14} className="mr-2" />
            Boarding Scanner
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-none shadow-sm bg-white overflow-hidden relative">
            <CardContent className="pt-6">
               <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey mb-4">Financial Status</p>
               <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-3xl font-[900] text-lns-navy">£432 / £624</h3>
                    <div className="flex items-center mt-2 group">
                       <div className="h-2 w-32 bg-lns-light-grey rounded-full overflow-hidden mr-3">
                          <div className="h-full bg-lns-navy w-[60%] rounded-full"></div>
                       </div>
                       <span className="text-[10px] font-black text-lns-navy">60% PAID</span>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-base font-black text-lns-red">£192 Outstanding</p>
                     <p className="text-[9px] font-bold text-lns-mid-grey">8 Unpaid students</p>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="border-none shadow-sm bg-white overflow-hidden relative">
            <CardContent className="pt-6">
               <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey mb-4">Boarding Progress</p>
               <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-3xl font-[900] text-lns-navy">12 / 18</h3>
                    <p className="text-xs font-semibold text-lns-mid-grey mt-2 italic">Students physically on bus</p>
                  </div>
                  <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                     <Users size={24} />
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="border-none shadow-sm bg-lns-navy text-white overflow-hidden relative">
            <CardContent className="pt-6">
               <div className="flex items-center space-x-2 mb-4">
                  <Zap size={16} className="text-lns-red fill-lns-red" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50">AI Workflow Node</p>
               </div>
               <p className="text-xs text-white/70 italic border-l-2 border-lns-red pl-3 leading-relaxed">
                  "Collection deadline is in 5 days. I've drafted 8 reminders for the unpaid accounts. Ready for 1-tap dispatch?"
               </p>
               <Button className="w-full mt-4 bg-white text-lns-navy hover:bg-white/90 h-10 text-[9px] font-black uppercase tracking-widest rounded-lg">
                  Approve & Dispatch Reminders
               </Button>
            </CardContent>
         </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
         <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="py-4 border-b border-lns-light-grey">
               <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Trip Manifest & Status</CardTitle>
                  <div className="flex items-center space-x-4">
                     <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        Confirmed
                     </div>
                     <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                        Pending
                     </div>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="px-0">
               <div className="overflow-x-auto">
                   <table className="w-full">
                      <thead>
                        <tr className="bg-lns-light-grey/50">
                           <th className="px-6 py-4 text-left text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Student</th>
                           <th className="px-6 py-4 text-center text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Payment</th>
                           <th className="px-6 py-4 text-center text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Consent</th>
                           <th className="px-6 py-4 text-center text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Boarded</th>
                           <th className="px-6 py-4 text-center text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Blockchain</th>
                           <th className="px-6 py-4 text-right text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-lns-light-grey">
                         {tripAttendees.map((student) => (
                           <tr key={student.id} className="hover:bg-lns-light-grey/20 transition-colors group">
                              <td className="px-6 py-4">
                                 <div className="flex items-center">
                                    <div className="w-9 h-9 rounded-xl bg-lns-navy/5 flex items-center justify-center mr-3 font-black text-lns-navy text-xs">
                                       {student.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                       <p className="text-sm font-[800] text-lns-navy">{student.name}</p>
                                       <p className="text-[9px] font-bold text-lns-mid-grey uppercase">{student.id}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                 <div className="flex flex-col items-center">
                                    {student.paid ? (
                                       <>
                                          <CheckCircle2 size={20} className="text-green-500 mb-1" />
                                          <span className="text-[8px] font-black text-green-600 uppercase tracking-widest">£24.00</span>
                                       </>
                                    ) : (
                                       <XCircle size={20} className="text-lns-red/30 mb-1" />
                                    )}
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                 {student.consent ? (
                                    <CheckCircle2 size={20} className="text-green-500 mx-auto" />
                                 ) : (
                                    <Clock size={20} className="text-amber-500 mx-auto" />
                                 )}
                              </td>
                              <td className="px-6 py-4 text-center">
                                 {student.boarded ? (
                                    <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full inline-flex items-center mx-auto">
                                       <QrCode size={12} className="mr-1.5" />
                                       <span className="text-[9px] font-black uppercase tracking-widest">BOARDED</span>
                                    </div>
                                 ) : (
                                    <div className="w-2 h-2 rounded-full bg-lns-light-grey mx-auto"></div>
                                 )}
                              </td>
                              <td className="px-6 py-4 text-center">
                                 {student.paid && (
                                    <div className="flex items-center justify-center space-x-1 text-green-600">
                                       <ShieldCheck size={16} />
                                       <span className="text-[9px] font-mono opacity-50">a3f8...</span>
                                    </div>
                                 )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                                       <Mail size={14} className="text-lns-mid-grey" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                                       <MoreVertical size={14} className="text-lns-mid-grey" />
                                    </Button>
                                 </div>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
               </div>
            </CardContent>
         </Card>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm bg-lns-navy text-white p-6">
               <div className="flex items-start justify-between">
                  <div>
                     <h4 className="text-sm font-black uppercase tracking-widest text-white/50 mb-2 leading-none">Emergency Contact Node</h4>
                     <p className="text-xs font-medium text-white/70 leading-relaxed mb-6">In the event of an emergency during the trip, this module will broadcast alerts to all confirmed guardians with one tap.</p>
                     <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-11 text-[10px] font-black uppercase tracking-widest px-6 rounded-xl">
                        View Guardian List
                     </Button>
                  </div>
                  <AlertCircle size={32} className="text-lns-red opacity-40 shrink-0" />
               </div>
            </Card>
            <Card className="border border-dashed border-lns-border bg-lns-light-grey/30 flex flex-col items-center justify-center p-8 text-center grayscale opacity-80 decoration-none">
                <ShieldCheck size={32} className="text-lns-navy/20 mb-4" />
                <h4 className="text-xs font-black uppercase tracking-widest text-lns-navy mb-1 tracking-widest">Safety Record Registry</h4>
                <p className="text-[10px] font-medium text-lns-mid-grey">Every scan is sealed to the permanent record ledger.</p>
            </Card>
         </div>
      </div>
    </div>
  );
}
