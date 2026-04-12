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
  ChevronLeft, 
  Heart, 
  Plus, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  ExternalLink, 
  Mail,
  Zap,
  Clock,
  Download
} from "lucide-react";

const campaigns = [
  { 
    id: "CAMP-01", 
    title: "Eco-Hub Sustainable Lab", 
    goal: 50000, 
    raised: 34500, 
    donors: 842, 
    category: "BUILDING", 
    status: "ACTIVE", 
    giftAid: true 
  },
  { 
    id: "CAMP-02", 
    title: "Musical Instrument Fund", 
    goal: 5000, 
    raised: 5200, 
    donors: 112, 
    category: "EQUIPMENT", 
    status: "COMPLETED", 
    giftAid: true 
  },
  { 
    id: "CAMP-03", 
    title: "Hardship Bursary 2026", 
    goal: 10000, 
    raised: 1200, 
    donors: 14, 
    category: "SCHOLARSHIP", 
    status: "OPENING_SOON", 
    giftAid: true 
  }
];

export default function AdminFinanceFundraisingPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-8 px-0">
      <div className="flex items-center space-x-2 px-1">
        <Link href="/admin/finance">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white">
            <ChevronLeft size={20} className="text-lns-navy" />
          </Button>
        </Link>
        <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Back to Finance</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-xl md:text-3xl font-[800] text-lns-navy tracking-tight uppercase">Fundraising & Campaigns</h1>
          <p className="text-xs md:text-base text-lns-mid-grey font-medium">Manage philanthropic initiatives and Gift Aid collection</p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none bg-white h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl">
            <Download size={14} className="mr-2" />
            Gift Aid Report
          </Button>
          <Button className="flex-1 sm:flex-none h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl bg-lns-navy text-white px-8">
            <Plus size={14} className="mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Global Fundraising Stats */}
         <Card className="lg:col-span-1 border-none shadow-sm bg-white p-6">
            <div className="flex flex-col h-full justify-between">
               <div>
                  <div className="p-3 bg-lns-navy text-white rounded-2xl w-fit mb-4">
                     <TrendingUp size={24} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey mb-1">Annual Total Raised</h3>
                  <p className="text-3xl font-[900] text-lns-navy tracking-tighter">£40,900</p>
               </div>
               <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-lns-navy">
                     <span>HMRC Gift Aid Pending</span>
                     <span className="text-green-600">£10,225</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-lns-navy">
                     <span>Active Donors</span>
                     <span>968 Families</span>
                  </div>
               </div>
            </div>
         </Card>

         {/* Campaign List */}
         <div className="lg:col-span-3 space-y-4">
            {campaigns.map((camp) => (
              <Card key={camp.id} className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-lg transition-all duration-500">
                 <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                       <div className="flex items-start md:items-center flex-1">
                          <div className={`p-4 rounded-2xl mr-5 shrink-0 ${camp.status === 'ACTIVE' ? 'bg-lns-red/10 text-lns-red' : 'bg-lns-navy/5 text-lns-navy'}`}>
                             <Heart size={28} className={camp.status === 'ACTIVE' ? 'fill-current' : ''} />
                          </div>
                          <div>
                             <div className="flex items-center space-x-2 mb-1">
                                <span className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey">{camp.id} • {camp.category}</span>
                                {camp.giftAid && <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-green-100 text-green-600 rounded-md">Gift Aid</span>}
                             </div>
                             <h4 className="text-xl font-[900] text-lns-navy leading-tight">{camp.title}</h4>
                             <div className="flex items-center space-x-4 mt-2 h-4">
                                <div className="flex items-center text-[11px] font-bold text-lns-mid-grey"><Users size={12} className="mr-1.5" /> {camp.donors} Donors</div>
                                <div className="flex items-center text-[11px] font-bold text-lns-mid-grey"><Clock size={12} className="mr-1.5" /> Ends in 12 days</div>
                             </div>
                          </div>
                       </div>
                       
                       <div className="md:w-64">
                          <div className="flex justify-between items-end mb-2">
                             <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey leading-none mb-1">Raised / Goal</p>
                                <p className="text-lg font-[900] text-lns-navy">£{camp.raised.toLocaleString()} <span className="text-xs text-lns-mid-grey font-bold">/ £{camp.goal.toLocaleString()}</span></p>
                             </div>
                             <span className="text-xs font-black text-lns-navy italic">{Math.round((camp.raised / camp.goal) * 100)}%</span>
                          </div>
                          <div className="h-2 w-full bg-lns-light-grey rounded-full overflow-hidden">
                             <div 
                                className={`h-full rounded-full transition-all duration-1000 ${camp.status === 'ACTIVE' ? 'bg-lns-red' : 'bg-lns-navy'}`} 
                                style={{ width: `${Math.min(100, (camp.raised / camp.goal) * 100)}%` }}
                             ></div>
                          </div>
                       </div>

                       <div className="flex items-center space-x-2">
                          <Link href={`/fundraising/${camp.id}`} target="_blank">
                             <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-lns-border hover:bg-lns-light-grey">
                                <Globe size={16} />
                             </Button>
                          </Link>
                          <Button className="h-10 px-6 bg-lns-navy text-white hover:bg-lns-navy/90 rounded-xl text-[10px] font-black uppercase tracking-widest">
                             Manage
                          </Button>
                       </div>
                    </div>
                    
                    {/* AI Draft Hook */}
                    <div className="mt-6 pt-6 border-t border-lns-light-grey flex items-center justify-between">
                       <div className="flex items-center space-x-2">
                          <Zap size={14} className="text-lns-red" />
                          <p className="text-[11px] font-bold text-lns-mid-grey tracking-tight italic">AI drafted a weekly progress update for this campaign. Review & Approve?</p>
                       </div>
                       <Button variant="ghost" className="text-[9px] font-black uppercase tracking-widest text-lns-navy hover:bg-lns-navy/5 px-3 h-8 rounded-lg outline-none">
                          View Draft
                       </Button>
                    </div>
                 </CardContent>
              </Card>
            ))}
         </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-3 opacity-50 py-8">
         <ShieldCheck size={28} className="text-lns-navy" />
         <p className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic text-center max-w-sm">Every donation is cryptographically sealed to a immutable audit path for zero-loss institutional accounting.</p>
      </div>
    </div>
  );
}
