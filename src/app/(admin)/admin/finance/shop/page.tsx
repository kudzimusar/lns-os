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
  ShoppingBag, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  QrCode,
  Tag
} from "lucide-react";

const shopProducts = [
  { id: "PROD-001", name: "Year 8 Mathematics Textbooks", category: "TEXTBOOK", price: "£42.00", stock: 85, status: "ACTIVE" },
  { id: "PROD-002", name: "School Blazer (Navy)", category: "UNIFORM", price: "£35.00", stock: 12, status: "LOW_STOCK" },
  { id: "PROD-003", name: "Science Safety Goggles", category: "EQUIPMENT", price: "£8.50", stock: 120, status: "ACTIVE" },
  { id: "PROD-004", name: "Graduation Gown Rental", category: "EVENT", price: "£15.00", stock: null, status: "ACTIVE" },
];

const pendingOrders = [
  { id: "ORD-991", family: "Johnson, P.", items: "Mathematics Textbooks (3)", date: "Today", method: "COLLECTION", status: "READY" },
  { id: "ORD-988", family: "Smith, L.", items: "School Blazer (1)", date: "Yesterday", method: "COLLECTION", status: "PENDING" },
  { id: "ORD-985", family: "Garcia, M.", items: "Goggles (2)", date: "11 Apr", method: "DELIVERY", status: "SHIPPED" },
];

export default function AdminFinanceShopPage() {
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
          <h1 className="text-xl md:text-3xl font-[800] text-lns-navy tracking-tight uppercase">School Shop & Inventory</h1>
          <p className="text-xs md:text-base text-lns-mid-grey font-medium">Manage products, stock levels, and fulfilment queues</p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none bg-white h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl">
            <Package size={14} className="mr-2" />
            Fulfilment Queue
          </Button>
          <Button className="flex-1 sm:flex-none h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl bg-lns-navy text-white px-8">
            <Plus size={14} className="mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Inventory Table */}
         <Card className="lg:col-span-2 border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="py-4 border-b border-lns-light-grey flex flex-row items-center justify-between">
               <CardTitle className="text-sm">Product Catalogue</CardTitle>
               <div className="flex space-x-2">
                  <div className="relative">
                     <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-lns-mid-grey" size={14} />
                     <input type="text" placeholder="Search..." className="pl-8 pr-4 py-1.5 bg-lns-light-grey rounded-lg text-xs outline-none w-40" />
                  </div>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg"><Filter size={14} /></Button>
               </div>
            </CardHeader>
            <CardContent className="px-0">
               <table className="w-full">
                  <thead>
                    <tr className="bg-lns-light-grey/30">
                       <th className="px-6 py-4 text-left text-[9px] font-black text-lns-mid-grey uppercase tracking-widest">Product</th>
                       <th className="px-6 py-4 text-center text-[9px] font-black text-lns-mid-grey uppercase tracking-widest">Price</th>
                       <th className="px-6 py-4 text-center text-[9px] font-black text-lns-mid-grey uppercase tracking-widest">Stock</th>
                       <th className="px-6 py-4 text-center text-[9px] font-black text-lns-mid-grey uppercase tracking-widest">Status</th>
                       <th className="px-6 py-4 text-right text-[9px] font-black text-lns-mid-grey uppercase tracking-widest">Command</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-lns-light-grey">
                     {shopProducts.map((p) => (
                       <tr key={p.id} className="hover:bg-lns-light-grey/10 transition-colors group">
                          <td className="px-6 py-4">
                             <div className="flex items-center">
                                <div className="p-2 bg-lns-navy/5 rounded-xl mr-3 text-lns-navy"><Tag size={16} /></div>
                                <div>
                                   <p className="text-sm font-bold text-lns-navy">{p.name}</p>
                                   <p className="text-[9px] font-black text-lns-mid-grey uppercase">{p.category}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                             <span className="text-sm font-black text-lns-navy">{p.price}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                             <span className={`text-xs font-bold ${p.stock && p.stock < 20 ? 'text-lns-red' : 'text-lns-mid-grey'}`}>
                                {p.stock === null ? '∞' : p.stock}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                             <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                p.status === "ACTIVE" ? "bg-green-100 text-green-600" : "bg-lns-red/10 text-lns-red"
                             }`}>
                                {p.status.replace('_', ' ')}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full opacity-40 group-hover:opacity-100"><MoreVertical size={14} /></Button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </CardContent>
         </Card>

         {/* Fulfilment Sidebar */}
         <div className="space-y-6">
            <Card className="border-none shadow-sm bg-lns-navy text-white">
               <CardHeader className="pb-2 border-b border-white/10">
                  <div className="flex items-center justify-between">
                     <CardTitle className="text-xs text-white uppercase tracking-widest font-black">Fulfilment Queue</CardTitle>
                     <span className="text-[10px] bg-lns-red text-white px-2 py-0.5 rounded-md font-black">3 NEW</span>
                  </div>
               </CardHeader>
               <CardContent className="pt-6 space-y-4">
                  {pendingOrders.map((order) => (
                    <div key={order.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                       <div className="flex justify-between items-start mb-2">
                          <div>
                             <p className="text-[9px] font-black text-lns-mid-grey uppercase tracking-widest">{order.id} • {order.date}</p>
                             <h4 className="text-sm font-bold text-white">{order.family}</h4>
                          </div>
                          <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                             order.status === "READY" ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/50"
                          }`}>{order.status}</span>
                       </div>
                       <p className="text-[11px] text-white/60 mb-4">{order.items}</p>
                       <div className="flex gap-2">
                          <Button className="flex-1 h-8 bg-white text-lns-navy hover:bg-white/90 text-[9px] font-black uppercase tracking-widest rounded-lg">
                             <CheckCircle2 size={12} className="mr-1.5" />
                             Process
                          </Button>
                          {order.method === "COLLECTION" ? (
                             <Button variant="outline" size="icon" className="h-8 w-8 border-white/20 text-white hover:bg-white/10 rounded-lg">
                                <QrCode size={12} />
                             </Button>
                          ) : (
                             <Button variant="outline" size="icon" className="h-8 w-8 border-white/20 text-white hover:bg-white/10 rounded-lg">
                                <Truck size={12} />
                             </Button>
                          )}
                       </div>
                    </div>
                  ))}
               </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white overflow-hidden p-6 text-center">
               <div className="w-12 h-12 bg-lns-navy/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-lns-navy">
                  <Download size={24} />
               </div>
               <h4 className="text-sm font-black text-lns-navy uppercase tracking-widest mb-1">Stock Report</h4>
               <p className="text-[11px] text-lns-mid-grey font-medium mb-4">Generate end-of-week inventory reconciliation</p>
               <Button className="w-full h-11 bg-lns-light-grey text-lns-navy hover:bg-lns-navy hover:text-white transition-all text-[10px] font-black uppercase tracking-widest rounded-xl">
                  Export Log
               </Button>
            </Card>
         </div>
      </div>
    </div>
  );
}
