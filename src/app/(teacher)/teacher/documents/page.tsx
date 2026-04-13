"use client";

import React from "react";
import PageShell from "@/components/ui/PageShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  FileText, 
  Download, 
  Upload, 
  Shield, 
  MoreVertical,
  Calendar,
  Search,
  CheckCircle2
} from "lucide-react";

const documents = [
  { name: "Staff Handbook 2026", type: "PDF", size: "4.2 MB", date: "Jan 12, 2026", verified: true },
  { name: "Mathematics Curriculum - Term 2", type: "DOCX", size: "1.8 MB", date: "Mar 05, 2026", verified: true },
  { name: "Emergency Response Protocol", type: "PDF", size: "2.1 MB", date: "Feb 18, 2026", verified: true },
  { name: "Salary Slip - March 2026", type: "PDF", size: "540 KB", date: "Apr 01, 2026", verified: true }
];

export default function TeacherDocumentsPage() {
  return (
    <PageShell 
      title="Secure Documents" 
      description="Manage and access institutional documents with blockchain integrity."
    >
      <div className="space-y-8 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C92A0]" size={16} />
              <input 
                 type="text" 
                 placeholder="Search my documents..."
                 className="w-full h-12 pl-12 pr-4 bg-white rounded-xl border border-gray-100 text-xs font-bold text-[#0A1F44] focus:ring-2 focus:ring-[#D62B2B] transition-all"
              />
           </div>
           <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-100 bg-white text-[#0A1F44] font-black uppercase tracking-widest text-[10px] h-12 rounded-xl">
                 Filter By Type
              </Button>
              <Button className="bg-[#D62B2B] hover:bg-[#B82525] text-white font-black uppercase tracking-widest text-[10px] h-12 px-8 rounded-xl flex items-center gap-2 shadow-lg shadow-[#D62B2B]/20">
                 <Upload size={16} /> Upload New
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {documents.map((doc, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all group bg-white overflow-hidden">
               <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6">
                     <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#0A1F44]/5 flex items-center justify-center text-[#0A1F44] group-hover:bg-[#0A1F44] group-hover:text-white transition-all">
                           <FileText size={28} />
                        </div>
                        <div>
                           <div className="flex items-center space-x-3">
                              <h3 className="text-sm font-black text-[#0A1F44] uppercase tracking-tight">{doc.name}</h3>
                              {doc.verified && (
                                 <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border border-green-100">
                                    <CheckCircle2 size={10} />
                                    <span>Verified Hash</span>
                                 </div>
                              )}
                           </div>
                           <div className="flex items-center space-x-6 mt-1">
                              <p className="text-[10px] font-bold text-[#8C92A0] uppercase tracking-widest">{doc.type} · {doc.size}</p>
                              <div className="flex items-center text-[10px] font-bold text-[#8C92A0] uppercase tracking-widest">
                                 <Calendar size={12} className="mr-1.5" /> {doc.date}
                              </div>
                           </div>
                        </div>
                     </div>
                     
                     <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="text-[#8C92A0] hover:text-[#0A1F44]">
                           <Download size={20} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-[#8C92A0] hover:text-[#0A1F44]">
                           <MoreVertical size={20} />
                        </Button>
                     </div>
                  </div>
                  
                  {/* Subtle blockchain status bar */}
                  <div className="h-1.5 bg-[#F4F5F7] relative">
                     <div className="absolute inset-0 bg-green-500/10 w-full" />
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent w-20 animate-pulse" />
                  </div>
               </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Info Card */}
        <Card className="border-none bg-[#0A1F44] text-white p-8 rounded-[2rem] relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl text-center md:text-left">
                 <div className="flex items-center justify-center md:justify-start space-x-3 text-[#E8B84B]">
                    <Shield size={24} />
                    <h3 className="text-xl font-black uppercase tracking-tight">Institutional Integrity Protocol</h3>
                 </div>
                 <p className="text-sm font-bold text-white/70 leading-relaxed font-dm-sans">
                    Every document uploaded to LNS OS is cryptographically hashed and sealed on the private institution ledger. 
                    This guarantees that no document can be altered or forged after archival.
                 </p>
              </div>
              <Button className="bg-white text-[#0A1F44] hover:bg-white/90 font-black uppercase tracking-widest text-xs h-14 px-10 rounded-xl shadow-2xl">
                 Audit Access Logs
              </Button>
           </div>
           
           {/* Decorative background shape */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </Card>
      </div>
    </PageShell>
  );
}
