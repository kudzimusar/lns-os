"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Search, Filter, Database, Link as LinkIcon, Download } from "lucide-react";

const auditLogs = [
  { id: "TX-9901", event: "Grade Locked", user: "Sarah Jenkins", target: "Abraham Lincoln", timestamp: "12 Apr, 14:22", hash: "0x4f2a...8b91" },
  { id: "TX-9902", event: "Attendance Sealed", user: "Michael Scott", target: "Grade 10-A", timestamp: "12 Apr, 14:15", hash: "0x12d9...cd42" },
  { id: "TX-9903", event: "Report Generated", user: "Admin System", target: "John Doe", timestamp: "12 Apr, 13:58", hash: "0xe811...9aef" },
  { id: "TX-9904", event: "User Permission Change", user: "Admin System", target: "Janet Weiss", timestamp: "12 Apr, 13:45", hash: "0x77bc...1122" },
  { id: "TX-9905", event: "Document Uploaded", user: "Chloe O'Brian", target: "Unit_Plan_V2.pdf", timestamp: "12 Apr, 12:30", hash: "0xbb4c...4433" },
];

export default function AuditTrailPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight flex items-center">
            <ShieldCheck className="mr-3 text-lns-red" size={32} />
            Blockchain Audit Trail
          </h1>
          <p className="text-lns-mid-grey font-medium">Immutable verification ledger for all school records.</p>
        </div>
        <Button variant="outline" className="bg-white">
          <Download size={18} className="mr-2" />
          Download Audit Log
        </Button>
      </div>

      <Card className="border-none shadow-sm bg-lns-navy text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <Database size={100} />
        </div>
        <CardContent className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey">Ledger Status</p>
            <h3 className="text-xl font-bold italic text-lns-red">0.02s Since Last Sync</h3>
            <p className="text-sm text-slate-400">Total hashed records: <span className="text-white font-bold">1,244,902</span></p>
          </div>
          <div className="flex -space-x-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-lns-navy flex items-center justify-center text-[10px] font-black">
                B{i}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full bg-lns-red border-2 border-lns-navy flex items-center justify-center text-[10px] font-black shadow-lg shadow-lns-red/50">
              Live
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <div className="p-4 border-b border-lns-border bg-lns-light-grey/30 flex items-center bg-lns-light-grey rounded-xl px-3 mx-4 my-4">
          <Search className="text-lns-mid-grey" size={16} />
          <input type="text" placeholder="Search by Hash, User or Event..." className="bg-transparent border-none focus:ring-0 text-sm px-3 py-2 w-full" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-lns-border bg-lns-light-grey/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Event</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Actor</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Target</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Blockchain Hash</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Verify</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lns-border">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-lns-light-grey/20 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-lns-navy">{log.event}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-lns-navy">{log.user}</td>
                  <td className="px-6 py-4 text-sm text-lns-mid-grey font-medium">{log.target}</td>
                  <td className="px-6 py-4 text-xs font-bold text-lns-mid-grey">{log.timestamp}</td>
                  <td className="px-6 py-4 font-mono text-[10px] text-lns-red font-bold">{log.hash}</td>
                  <td className="px-6 py-4 text-center">
                    <Button variant="ghost" size="sm" className="h-8 rounded-lg text-lns-navy hover:bg-lns-navy hover:text-white transition-all">
                      <LinkIcon size={14} className="mr-2" />
                      Verify
                    </Button>
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
