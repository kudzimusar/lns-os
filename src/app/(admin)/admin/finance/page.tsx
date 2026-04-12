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
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  CreditCard, 
  DollarSign, 
  AlertCircle,
  FileText,
  Download,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  ChevronRight,
  MoreVertical,
  Mail,
  User
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell,
  PieChart,
  Pie,
  CartesianGrid
} from "recharts";

const financeStats = [
  { label: "Total Billed", value: "£142,400", change: "+12.5%", trend: "up" },
  { label: "Total Collected", value: "£134,180", change: "+8.2%", trend: "up" },
  { label: "Outstanding", value: "£8,220", change: "-5.1%", trend: "down" },
  { label: "Collection Rate", value: "94.2%", change: "+2.1%", trend: "up" },
];

const categoryData = [
  { name: "School Fees", billed: 120000, collected: 115200, outstanding: 4800, color: "#0A1F44" },
  { name: "Trips", billed: 8400, collected: 8160, outstanding: 240, color: "#E63946" },
  { name: "School Shop", billed: 6200, collected: 6020, outstanding: 180, color: "#457B9D" },
  { name: "Clubs", billed: 4800, collected: 4800, outstanding: 0, color: "#1D3557" },
  { name: "Events", billed: 2000, collected: 0, outstanding: 2000, color: "#F1FAEE" },
  { name: "Canteen", billed: 1000, collected: 1000, outstanding: 0, color: "#A8DADC" },
];

const outstandingFamilies = [
  { id: 1, family: "Johnson, P.", children: "Amara", amount: "£1,200", lastContact: "12 Apr", risk: "Low", status: "PENDING" },
  { id: 2, family: "Nkosi, B.", children: "Blake", amount: "£240", lastContact: "8 Apr", risk: "Low", status: "OVERDUE" },
  { id: 3, family: "Petrov, K.", children: "Elena", amount: "£2,440", lastContact: "Never", risk: "High", status: "CRITICAL" },
  { id: 4, family: "Smith, J.", children: "Leo, Sarah", amount: "£850", lastContact: "10 Apr", risk: "Medium", status: "OVERDUE" },
];

export default function AdminFinanceDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-8 px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-xl md:text-3xl font-[800] text-lns-navy tracking-tight uppercase">Financial Oversight</h1>
          <p className="text-xs md:text-base text-lns-mid-grey font-medium">Spring Term 2026 • Real-time Fiscal Management</p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none bg-white h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl">
            <Download size={14} className="mr-2" />
            Export Data
          </Button>
          <Link href="/admin/finance/settings">
            <Button className="flex-1 sm:flex-none h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl">
              Configure Billing
            </Button>
          </Link>
        </div>
      </div>

      {/* Real-Time Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {financeStats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm bg-white overflow-hidden relative">
            <CardContent className="pt-6 relative z-10">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-wider">{stat.label}</p>
                {stat.trend === "up" ? (
                  <ArrowUpRight size={14} className="text-lns-red" />
                ) : (
                  <TrendingDown size={14} className="text-green-600" />
                )}
              </div>
              <p className="text-2xl font-[900] text-lns-navy">{stat.value}</p>
              <div className="flex items-center mt-1">
                <span className={`text-[10px] font-bold ${stat.trend === "up" ? "text-lns-red" : "text-green-600"}`}>
                  {stat.change}
                </span>
                <span className="text-[10px] text-lns-mid-grey ml-1 font-medium italic truncate">vs last term</span>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <Wallet size={40} className="text-lns-navy" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-white border-none pb-2">
            <div>
              <CardTitle className="text-lns-navy">Category Allocation</CardTitle>
              <CardDescription>Fiscal distribution across school departments</CardDescription>
            </div>
            <Filter size={18} className="text-lns-mid-grey cursor-pointer" />
          </CardHeader>
          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F4F5F7" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#0A1F44', fontSize: 11, fontWeight: 700}} 
                  width={100}
                />
                <Tooltip 
                  cursor={{fill: '#F4F5F7'}}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-lns-navy p-3 rounded-xl border border-white/10 shadow-xl">
                          <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-wider mb-2">{data.name}</p>
                          <div className="space-y-1">
                            <div className="flex justify-between gap-4">
                              <span className="text-[10px] text-white/60">Billed</span>
                              <span className="text-[10px] text-white font-bold">£{data.billed.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-[10px] text-white/60">Collected</span>
                              <span className="text-[10px] text-white font-bold">£{data.collected.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-[10px] text-lns-red/80 font-bold">Outstanding</span>
                              <span className="text-[10px] text-lns-red font-bold font-black">£{data.outstanding.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="collected" radius={[0, 4, 4, 0]} barSize={24}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
                <Bar dataKey="outstanding" radius={[0, 4, 4, 0]} barSize={24} fill="#F4F5F7" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insight & Rapid Recovery */}
        <Card className="border-none shadow-sm bg-lns-navy text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-lns-red opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <CardHeader>
            <div className="flex items-center space-x-2 mb-1">
              <Zap size={16} className="text-lns-red" />
              <CardTitle className="text-white">AI Fiscal Intelligence</CardTitle>
            </div>
            <CardDescription className="text-white/60">Automated collection strategies initiated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex items-start mb-3">
                <AlertCircle size={18} className="text-lns-red mr-2 mt-0.5" />
                <div>
                  <p className="text-[11px] font-[900] text-white uppercase tracking-wider">Critical Flag</p>
                  <p className="text-xs text-white/70 leading-relaxed mt-1">
                    14 families have 2+ outstanding items. Automated reminders generated for your approval.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-white text-lns-navy hover:bg-white/90 font-bold text-[10px] h-9 rounded-lg uppercase tracking-wider">
                  Approve All
                </Button>
                <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10 font-bold text-[10px] h-9 rounded-lg uppercase tracking-wider">
                  Review Details
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest mb-3">Blockchain Integrity</p>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-2xl">
                <ShieldCheck size={20} className="text-green-500" />
                <div>
                  <p className="text-[11px] font-bold text-white">4,821 Records Sealed</p>
                  <p className="text-[10px] text-white/50">Chain Integrity: 100% </p>
                </div>
              </div>
            </div>

            <Link href="/admin/finance/statements" className="block mt-4">
              <Button className="w-full bg-lns-red text-white hover:bg-lns-red/90 h-12 rounded-xl font-[900] uppercase tracking-widest text-[10px]">
                Generate Annual Statements
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Outstanding Ledger */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Outstanding Ledger</CardTitle>
            <CardDescription>Accounts requiring administrative intervention</CardDescription>
          </div>
          <Button variant="outline" className="text-[10px] h-8 font-black uppercase tracking-widest rounded-lg">
            View All Account Records
          </Button>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-lns-light-grey">
                  <th className="px-6 py-4 text-left text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Family Account</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Dependents</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Balance Due</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Last Activity</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Quick Dispatch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lns-light-grey">
                {outstandingFamilies.map((family) => (
                  <tr key={family.id} className="hover:bg-lns-light-grey/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-lns-navy/5 flex items-center justify-center mr-3">
                          <User size={14} className="text-lns-navy" />
                        </div>
                        <span className="text-sm font-[700] text-lns-navy">{family.family}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-lns-mid-grey">{family.children}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-[900] text-lns-navy">{family.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-lns-mid-grey">{family.lastContact}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        family.status === "CRITICAL" ? "bg-lns-red/10 text-lns-red" : 
                        family.status === "OVERDUE" ? "bg-amber-100 text-amber-600" : 
                        "bg-blue-100 text-blue-600"
                      }`}>
                        {family.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right overflow-hidden">
                       <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-white hover:shadow-sm">
                            <Mail size={14} className="text-lns-mid-grey" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-white hover:shadow-sm">
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
    </div>
  );
}
