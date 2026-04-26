"use client";
import { useState } from "react";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { SearchFilters, BusinessType } from "@/types";

const BUSINESS_TYPES: { value: BusinessType; label: string }[] = [
  { value: "saas", label: "SaaS" }, { value: "ecommerce", label: "E-commerce" },
  { value: "service", label: "Service" }, { value: "brick-and-mortar", label: "Brick & Mortar" },
  { value: "content", label: "Content" }, { value: "marketplace", label: "Marketplace" },
  { value: "franchise", label: "Franchise" },
];
const INDUSTRIES = ["Technology", "Retail", "Marketing", "Fitness", "Media", "Finance", "Healthcare", "Food & Beverage", "Real Estate"];
const LOCATIONS = ["Remote", "New York, NY", "Austin, TX", "Chicago, IL", "Denver, CO", "Los Angeles, CA", "San Francisco, CA"];
const PRICE_RANGES = [
  { label: "Any", min: 0, max: 0 }, { label: "Under $500K", min: 0, max: 500000 },
  { label: "$500K – $1M", min: 500000, max: 1000000 }, { label: "$1M – $3M", min: 1000000, max: 3000000 },
  { label: "$3M – $10M", min: 3000000, max: 10000000 }, { label: "$10M+", min: 10000000, max: 0 },
];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" }, { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" }, { value: "revenue-desc", label: "Revenue: High to Low" },
  { value: "ebitda-desc", label: "EBITDA: High to Low" },
];

interface FiltersPanelProps { filters: SearchFilters; onChange: (filters: SearchFilters) => void; resultCount: number; }

export function FiltersPanel({ filters, onChange, resultCount }: FiltersPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeFilterCount = [filters.type, filters.industry, filters.location, filters.minAskingPrice, filters.query].filter(Boolean).length;
  const reset = () => onChange({ sortBy: filters.sortBy });

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-xs font-semibold text-[#737373] uppercase tracking-wider mb-3">Business Type</h4>
        <div className="flex flex-wrap gap-2">
          {BUSINESS_TYPES.map(({ value, label }) => (
            <button key={value} onClick={() => onChange({ ...filters, type: filters.type === value ? undefined : value })} className={cn("px-2.5 py-1 rounded-lg text-xs font-medium border transition-all", filters.type === value ? "bg-indigo-600 border-indigo-500 text-white" : "bg-[#1a1a1a] border-[#2f2f2f] text-[#737373] hover:text-white hover:border-[#3f3f3f]")}>{label}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-[#737373] uppercase tracking-wider mb-3">Asking Price</h4>
        <div className="flex flex-col gap-1.5">
          {PRICE_RANGES.map(({ label, min, max }) => (
            <button key={label} onClick={() => onChange({ ...filters, minAskingPrice: min || undefined, maxAskingPrice: max || undefined })} className={cn("text-left px-3 py-2 rounded-lg text-xs transition-all", filters.minAskingPrice === min && (filters.maxAskingPrice === max || (!max && !filters.maxAskingPrice)) ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30" : "hover:bg-[#1a1a1a] text-[#737373] hover:text-white")}>{label}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-[#737373] uppercase tracking-wider mb-3">Industry</h4>
        <div className="flex flex-col gap-1">
          {INDUSTRIES.map((ind) => (
            <button key={ind} onClick={() => onChange({ ...filters, industry: filters.industry === ind ? undefined : ind })} className={cn("text-left px-3 py-1.5 rounded-lg text-xs transition-all", filters.industry === ind ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30" : "hover:bg-[#1a1a1a] text-[#737373] hover:text-white")}>{ind}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-[#737373] uppercase tracking-wider mb-3">Location</h4>
        <div className="flex flex-col gap-1">
          {LOCATIONS.map((loc) => (
            <button key={loc} onClick={() => onChange({ ...filters, location: filters.location === loc ? undefined : loc })} className={cn("text-left px-3 py-1.5 rounded-lg text-xs transition-all", filters.location === loc ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30" : "hover:bg-[#1a1a1a] text-[#737373] hover:text-white")}>{loc}</button>
          ))}
        </div>
      </div>
      {activeFilterCount > 0 && <button onClick={reset} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"><X className="h-3.5 w-3.5" /> Clear all filters ({activeFilterCount})</button>}
    </div>
  );

  return (
    <>
      <div className="lg:hidden flex items-center justify-between mb-4">
        <p className="text-sm text-[#737373]">{resultCount} results</p>
        <Button variant="secondary" size="sm" onClick={() => setMobileOpen(true)} className="gap-1.5">
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
      </div>
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Filters</h3>
            {activeFilterCount > 0 && <button onClick={reset} className="text-xs text-[#737373] hover:text-red-400 transition-colors">Clear ({activeFilterCount})</button>}
          </div>
          <FiltersContent />
        </div>
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-[#111111] border-l border-[#2f2f2f] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-[#2f2f2f]">
              <h3 className="font-semibold text-white">Filters</h3>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-[#1a1a1a] text-[#737373]"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-4"><FiltersContent /></div>
            <div className="p-4 border-t border-[#2f2f2f]"><Button variant="primary" fullWidth onClick={() => setMobileOpen(false)}>Show {resultCount} Results</Button></div>
          </div>
        </div>
      )}
    </>
  );
}

interface SortBarProps { filters: SearchFilters; onChange: (filters: SearchFilters) => void; resultCount: number; view: "grid" | "list"; onViewChange: (v: "grid" | "list") => void; }

export function SortBar({ filters, onChange, resultCount, view, onViewChange }: SortBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <div className="flex items-center gap-2">
        <Input placeholder="Search listings..." value={filters.query || ""} onChange={(e) => onChange({ ...filters, query: e.target.value || undefined })} icon={<Search className="h-4 w-4" />} className="w-56" />
        <p className="text-sm text-[#737373] hidden sm:block">{resultCount} results</p>
      </div>
      <div className="flex items-center gap-2">
        <select value={filters.sortBy || "newest"} onChange={(e) => onChange({ ...filters, sortBy: e.target.value as SearchFilters["sortBy"] })} className="appearance-none bg-[#1a1a1a] border border-[#2f2f2f] rounded-lg px-3 py-2 text-sm text-[#a3a3a3] focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer">
          {SORT_OPTIONS.map(({ value, label }) => <option key={value} value={value} className="bg-[#1a1a1a]">{label}</option>)}
        </select>
        <div className="flex rounded-lg border border-[#2f2f2f] overflow-hidden">
          {(["grid", "list"] as const).map((v) => (
            <button key={v} onClick={() => onViewChange(v)} className={cn("px-3 py-2 text-xs transition-colors", view === v ? "bg-indigo-600 text-white" : "bg-[#1a1a1a] text-[#737373] hover:text-white")}>
              {v === "grid" ? "⊞" : "☰"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
