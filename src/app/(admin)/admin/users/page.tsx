"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  Smartphone,
  CheckCircle2,
  Mail,
  Download,
  QrCode,
  Printer,
  Zap,
  X,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

const usersData = [
  { id: "1", name: "Sarah Jenkins", role: "Admin/Teacher", status: "Active", device: "Verified", email: "s.jenkins@lns.edu" },
  { id: "2", name: "Michael Scott", role: "Teacher", status: "Active", device: "Unlinked", email: "m.scott@lns.edu" },
  { id: "3", name: "Thomas Lincoln", role: "Parent", status: "Active", device: "Verified", email: "t.lincoln@gmail.com" },
  { id: "4", name: "Abraham Lincoln", role: "Student", status: "Active", device: "Linked", email: "a.lincoln@student.lns.edu" },
];

export default function UserManagementPage() {
  const [showEnroll, setShowEnroll] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [enrollStep, setEnrollStep] = useState(1); // 1: form, 2: qr generated

  const handleEnroll = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setEnrollStep(2);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">User Management</h1>
          <p className="text-lns-mid-grey font-medium">Control roles, access permissions and device linking.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-white">
            <Download size={18} className="mr-2" />
            Bulk CSV Import
          </Button>
          <Button onClick={() => { setShowEnroll(true); setEnrollStep(1); }}>
            <UserPlus size={18} className="mr-2" />
            Enroll User
          </Button>
        </div>
      </div>

      {/* Enrollment Modal Shell */}
      {showEnroll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-lns-navy/80 backdrop-blur-md animate-in fade-in duration-300">
          <Card className="w-full max-w-lg border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
             <div className="p-8 border-b border-lns-border flex items-center justify-between">
                <h3 className="text-xl font-black text-lns-navy uppercase tracking-tight">Enrollment Node</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowEnroll(false)} className="rounded-full">
                   <X size={20} />
                </Button>
             </div>
             <CardContent className="p-8">
                {enrollStep === 1 ? (
                   <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-lns-mid-grey">First Name</label>
                            <input className="w-full bg-lns-light-grey rounded-xl border-none h-12 px-4 text-sm focus:ring-1 focus:ring-lns-navy" placeholder="e.g. John" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-lns-mid-grey">Last Name</label>
                            <input className="w-full bg-lns-light-grey rounded-xl border-none h-12 px-4 text-sm focus:ring-1 focus:ring-lns-navy" placeholder="e.g. Doe" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-lns-mid-grey">Role Profile</label>
                         <select className="w-full bg-lns-light-grey rounded-xl border-none h-12 px-4 text-sm focus:ring-1 focus:ring-lns-navy appearance-none">
                            <option>Student</option>
                            <option>Teacher</option>
                            <option>Staff</option>
                            <option>Parent</option>
                         </select>
                      </div>
                      <Button className="w-full h-14 bg-lns-navy text-white rounded-2xl font-black uppercase tracking-widest mt-4" onClick={handleEnroll} disabled={isSaving}>
                         {isSaving ? <Loader2 className="animate-spin" /> : "Verify & Generate QR Identity"}
                      </Button>
                   </div>
                ) : (
                   <div className="text-center space-y-8 animate-in zoom-in duration-500">
                      <div className="space-y-2">
                         <CheckCircle2 size={48} className="text-green-500 mx-auto" />
                         <h4 className="text-xl font-black text-lns-navy uppercase tracking-tight">Success: ID Initialized</h4>
                         <p className="text-xs text-lns-mid-grey px-12">New unique LNS ID and Biometric QR token has been generated and hashed to the ledger.</p>
                      </div>

                      <div className="bg-lns-light-grey p-8 rounded-[2rem] border border-lns-border/50 inline-block relative group">
                         <QrCode size={140} className="text-lns-navy" />
                         <div className="absolute -top-3 -right-3 bg-lns-red text-white p-2 rounded-lg shadow-lg">
                            <Zap size={16} />
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <Button variant="outline" className="h-14 border-lns-border rounded-xl font-black uppercase tracking-widest text-[10px] text-lns-navy">
                            <Printer size={18} className="mr-2" />
                            Print ID Card
                         </Button>
                         <Button className="bg-lns-navy text-white h-14 rounded-xl font-black uppercase tracking-widest text-[10px]" onClick={() => setShowEnroll(false)}>
                            Finish Enrollment
                         </Button>
                      </div>
                   </div>
                )}
             </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <div className="p-4 border-b border-lns-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center bg-lns-light-grey rounded-xl px-4 w-full max-w-sm">
            <Search className="text-lns-mid-grey" size={16} />
            <input type="text" placeholder="Search by name, email or role..." className="bg-transparent border-none focus:ring-0 text-sm px-3 py-2.5 w-full" />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-10 text-xs font-bold px-4">
              <Filter size={14} className="mr-2" />
              Filter: All Roles
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-lns-border bg-lns-light-grey/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">User Details</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Security Role</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Device Auth</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lns-border">
              {usersData.map((user) => (
                <tr key={user.id} className="hover:bg-lns-light-grey/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-lns-navy text-white flex items-center justify-center font-black text-xs">
                         {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-lns-navy">{user.name}</p>
                        <p className="text-[10px] text-lns-mid-grey font-bold uppercase">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col items-center">
                        <span className="text-xs font-black text-lns-navy uppercase tracking-tighter bg-lns-light-grey px-2 py-1 rounded">
                           {user.role}
                        </span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center">
                       <div className={cn(
                         "flex items-center space-x-1.5",
                         user.device === "Verified" ? "text-green-600" : user.device === "Linked" ? "text-blue-600" : "text-lns-mid-grey"
                       )}>
                          <Smartphone size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{user.device}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-[0.1em] px-2 py-1 rounded-md",
                        user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-lns-mid-grey hover:text-lns-red" onClick={() => { setShowEnroll(true); setEnrollStep(2); }}>
                          <QrCode size={16} />
                       </Button>
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-lns-mid-grey">
                          <MoreVertical size={16} />
                       </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
