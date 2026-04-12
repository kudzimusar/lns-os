"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
  sticky?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
}

export function DataTable<T extends { id: string | number }>({ 
  data, 
  columns, 
  title 
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {title && (
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-black text-lns-navy tracking-tight">{title}</h3>
          <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-lns-mid-grey">
            <MoreHorizontal size={20} />
          </button>
        </div>
      )}

      <div className="tablet-table-wrapper flex-1 overflow-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="bg-gray-50/50">
            <tr>
              {columns.map((col, idx) => (
                <th 
                  key={idx}
                  className={cn(
                    "px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey border-b border-gray-100 whitespace-nowrap",
                    col.sticky && "sticky-col border-r border-gray-100",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-gray-50/50 transition-colors group h-14"
              >
                {columns.map((col, idx) => {
                  const content = typeof col.accessor === "function" 
                    ? col.accessor(item) 
                    : (item[col.accessor] as React.ReactNode);
                  
                  return (
                    <td 
                      key={idx}
                      className={cn(
                        "px-6 py-3 text-[13px] font-medium text-lns-navy whitespace-nowrap",
                        col.sticky && "sticky-col border-r border-gray-100 shadow-[2px_0_5px_rgba(0,0,0,0.02)]",
                        col.className
                      )}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sticky Pagination Footer - Section 11 Spec */}
      <div className="p-4 bg-gray-50/80 backdrop-blur-md border-t border-gray-100 flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
          Displaying {data.length} Nodes
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-white border border-gray-200 rounded-lg text-lns-navy disabled:opacity-30" disabled>
            <ChevronLeft size={16} />
          </button>
          <div className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-lns-navy">
            1 / 1
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-lg text-lns-navy disabled:opacity-30" disabled>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
