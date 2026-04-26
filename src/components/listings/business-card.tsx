"use client";
import Link from "next/link";
import { MapPin, TrendingUp, Bookmark, Eye, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, cn } from "@/lib/utils";
import type { Business } from "@/types";
import { useState } from "react";

const TYPE_LABELS: Record<string, string> = { saas: "SaaS", ecommerce: "E-commerce", "brick-and-mortar": "Brick & Mortar", service: "Service", manufacturing: "Manufacturing", franchise: "Franchise", content: "Content", marketplace: "Marketplace" };
const TYPE_COLORS: Record<string, string> = { saas: "bg-blue-500/10 text-blue-400", ecommerce: "bg-emerald-500/10 text-emerald-400", "brick-and-mortar": "bg-amber-500/10 text-amber-400", service: "bg-purple-500/10 text-purple-400", content: "bg-rose-500/10 text-rose-400", marketplace: "bg-cyan-500/10 text-cyan-400" };

interface BusinessCardProps { business: Business; view?: "grid" | "list"; }

export function BusinessCard({ business: biz, view = "grid" }: BusinessCardProps) {
  const [saved, setSaved] = useState(biz.isSaved ?? false);

  if (view === "list") {
    return (
      <div className="bg-[#111111] border border-[#2f2f2f] rounded-xl p-5 card-hover group">
        <div className="flex gap-5">
          <div className="hidden sm:flex w-20 h-20 shrink-0 rounded-xl bg-[#1a1a1a] border border-[#2f2f2f] items-center justify-center">
            <TrendingUp className="h-8 w-8 text-[#2f2f2f]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <Badge variant={biz.status === "under-offer" ? "warning" : "accent"} size="sm">{biz.status === "under-offer" ? "Under Offer" : "Active"}</Badge>
                  <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium", TYPE_COLORS[biz.type] || "bg-[#1a1a1a] text-[#737373]")}>{TYPE_LABELS[biz.type] || biz.type}</span>
                </div>
                <Link href={`/listings/${biz.slug}`}><h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">{biz.title}</h3></Link>
                <div className="flex items-center gap-3 mt-1 text-xs text-[#737373]">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{biz.location}</span>
                  <span>{biz.industry}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{biz.employees} emp.</span>
                </div>
              </div>
              <button onClick={(e) => { e.preventDefault(); setSaved(!saved); }} className="p-1.5 rounded-lg hover:bg-[#1a1a1a] transition-colors shrink-0">
                <Bookmark className={cn("h-4 w-4", saved ? "fill-indigo-400 text-indigo-400" : "text-[#737373]")} />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-4">
              {[{ label: "Asking Price", value: formatCurrency(biz.askingPrice, true) }, { label: "Revenue", value: formatCurrency(biz.revenue, true) }, { label: "EBITDA", value: formatCurrency(biz.ebitda, true) }, { label: "Multiple", value: `${biz.multiple.toFixed(1)}x` }].map(({ label, value }) => (
                <div key={label}><p className="text-[10px] text-[#737373] uppercase tracking-wider">{label}</p><p className="text-sm font-semibold text-white">{value}</p></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] border border-[#2f2f2f] rounded-2xl overflow-hidden card-hover group flex flex-col">
      <div className="h-40 bg-gradient-to-br from-[#1a1a1a] to-[#1e1e1e] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center"><TrendingUp className="h-10 w-10 text-[#2a2a2a]" /></div>
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge variant={biz.status === "under-offer" ? "warning" : "accent"} size="sm">{biz.status === "under-offer" ? "Under Offer" : "Active"}</Badge>
          <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium border border-transparent", TYPE_COLORS[biz.type] || "bg-[#1a1a1a] text-[#737373]")}>{TYPE_LABELS[biz.type] || biz.type}</span>
        </div>
        <button onClick={(e) => { e.preventDefault(); setSaved(!saved); }} className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#0a0a0a]/60 hover:bg-[#0a0a0a]/80 transition-colors">
          <Bookmark className={cn("h-4 w-4", saved ? "fill-indigo-400 text-indigo-400" : "text-[#737373]")} />
        </button>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/listings/${biz.slug}`} className="block"><h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1 text-sm">{biz.title}</h3></Link>
        <div className="flex items-center gap-1.5 mt-1 text-xs text-[#737373]"><MapPin className="h-3 w-3" /><span className="truncate">{biz.location} · {biz.industry}</span></div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[{ label: "Asking", value: formatCurrency(biz.askingPrice, true) }, { label: "Revenue", value: formatCurrency(biz.revenue, true) }, { label: "EBITDA", value: formatCurrency(biz.ebitda, true) }, { label: "Multiple", value: `${biz.multiple.toFixed(1)}x SDE` }].map(({ label, value }) => (
            <div key={label} className="p-2.5 bg-[#1a1a1a] rounded-lg"><p className="text-[10px] text-[#737373] uppercase tracking-wider">{label}</p><p className="text-sm font-bold text-white">{value}</p></div>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-[#1f1f1f] flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {biz.tags.slice(0, 2).map((tag) => <span key={tag} className="px-2 py-0.5 rounded-full bg-[#1a1a1a] border border-[#2f2f2f] text-[10px] text-[#737373]">#{tag}</span>)}
          </div>
          <div className="flex items-center gap-1 text-xs text-[#737373]"><Eye className="h-3 w-3" /><span>{biz.viewCount >= 1000 ? `${(biz.viewCount / 1000).toFixed(1)}k` : biz.viewCount}</span></div>
        </div>
      </div>
    </div>
  );
}
