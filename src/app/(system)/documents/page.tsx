"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  FileText, 
  Search, 
  FolderPlus, 
  MoreVertical, 
  Download, 
  HardDrive,
  FileArchive,
  Image as ImageIcon,
  ChevronRight,
  ShieldCheck,
  Cloud
} from "lucide-react";
import { cn } from "@/lib/utils";

const files = [
  { id: 1, name: "Term_1_Assessment_Framework.pdf", size: "2.4 MB", type: "PDF", owner: "System Admin" },
  { id: 2, name: "Maths_Grade10_Resources.zip", size: "145 MB", type: "Archive", owner: "Sarah Jenkins" },
  { id: 3, name: "School_Policies_2026.pdf", size: "1.2 MB", type: "PDF", owner: "Principal" },
  { id: 4, name: "Campus_Redesign_Render.png", size: "8.5 MB", type: "Image", owner: "IT Dept" },
];

export default function DocumentStoragePage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight flex items-center">
            <HardDrive className="mr-3 text-lns-red" size={28} />
            Document Storage
          </h1>
          <p className="text-lns-mid-grey font-medium">Encrypted cloud repository for lesson plans, reports and policies.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-white">
            <FolderPlus size={18} className="mr-2" />
            New Folder
          </Button>
          <Button>
            Upload Files
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 space-y-6">
           <Card className="border-none shadow-xl bg-lns-navy text-white p-6 overflow-hidden relative">
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Institutional Quota</p>
                    <Cloud size={16} className="text-lns-red" />
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-xl font-black">
                       <span>12.4 GB</span>
                       <span className="text-slate-500 text-xs mt-auto pb-0.5">/ 25 GB</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-lns-red h-full w-[49.6%]" />
                    </div>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">49.6% Capacity Used</p>
                 </div>
                 <Button className="w-full h-10 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest">Manage Subscription</Button>
              </div>
           </Card>

           <Card className="border-none shadow-sm bg-white p-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey mb-4">Directories</h4>
              <nav className="space-y-1">
                 {["My Documents", "School Policies", "Shared Resources", "Archive"].map((dir, i) => (
                   <div key={dir} className={cn(
                     "flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all text-xs font-bold",
                     i === 1 ? "bg-lns-navy text-white shadow-lg" : "text-lns-mid-grey hover:bg-lns-light-grey/50"
                   )}>
                      <FileArchive size={16} />
                      <span>{dir}</span>
                   </div>
                 ))}
              </nav>
           </Card>
        </aside>

        <main className="md:col-span-3 space-y-4">
           <Card className="border-none shadow-sm bg-white overflow-hidden">
              <div className="p-4 border-b border-lns-border flex items-center px-4">
                 <Search className="text-lns-mid-grey" size={16} />
                 <input type="text" placeholder="Search filenames, tags or owners..." className="bg-transparent border-none focus:ring-0 text-sm px-3 py-2 w-full" />
              </div>
              
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-lns-border bg-lns-light-grey/50">
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">File Name</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Size</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Type</th>
                          <th className="px-6 py-4 text-right pr-8 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-lns-border">
                       {files.map((file) => (
                         <tr key={file.id} className="hover:bg-lns-light-grey/20 transition-colors group cursor-pointer">
                            <td className="px-6 py-4">
                               <div className="flex items-center space-x-3">
                                  {file.type === "PDF" ? <FileText size={18} className="text-red-500" /> : 
                                   file.type === "Archive" ? <FileArchive size={18} className="text-amber-500" /> :
                                   <ImageIcon size={18} className="text-blue-500" />}
                                  <div>
                                     <p className="text-sm font-bold text-lns-navy truncate max-w-[200px]">{file.name}</p>
                                     <p className="text-[9px] text-lns-mid-grey font-bold uppercase">Owned by {file.owner}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-6 py-4 text-xs font-bold text-lns-navy">{file.size}</td>
                            <td className="px-6 py-4 text-xs font-bold text-lns-mid-grey uppercase">{file.type}</td>
                            <td className="px-6 py-4 text-right pr-8">
                               <div className="flex items-center justify-end space-x-1.5 text-[9px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full w-fit ml-auto italic">
                                  <ShieldCheck size={10} />
                                  <span>Encrypted</span>
                               </div>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </Card>

           <div className="p-8 border-2 border-dashed border-lns-border rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-lns-light-grey rounded-full flex items-center justify-center text-lns-mid-grey">
                 <Cloud size={24} />
              </div>
              <div className="space-y-1">
                 <h4 className="text-sm font-bold text-lns-navy uppercase">Drag & Drop Files</h4>
                 <p className="text-xs text-lns-mid-grey">Maximum file size: 2GB per upload. All assets are shard-encrypted.</p>
              </div>
              <Button variant="outline" className="h-10 px-8 rounded-xl font-black uppercase tracking-widest text-[9px]">Select from local drive</Button>
           </div>
        </main>
      </div>
    </div>
  );
}
