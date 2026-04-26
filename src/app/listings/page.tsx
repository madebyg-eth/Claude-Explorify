"use client";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BusinessCard } from "@/components/listings/business-card";
import { FiltersPanel, SortBar } from "@/components/listings/filters-panel";
import { MOCK_BUSINESSES } from "@/lib/mock-data";
import type { SearchFilters } from "@/types";

export default function ListingsPage() {
  const [filters, setFilters] = useState<SearchFilters>({ sortBy: "newest" });
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const filtered = useMemo(() => {
    let results = [...MOCK_BUSINESSES];
    if (filters.query) {
      const q = filters.query.toLowerCase();
      results = results.filter((b) => b.title.toLowerCase().includes(q) || b.description.toLowerCase().includes(q) || b.industry.toLowerCase().includes(q) || b.tags.some((t) => t.includes(q)));
    }
    if (filters.type) results = results.filter((b) => b.type === filters.type);
    if (filters.industry) results = results.filter((b) => b.industry.toLowerCase().includes(filters.industry!.toLowerCase()));
    if (filters.location) results = results.filter((b) => b.location.toLowerCase().includes(filters.location!.toLowerCase()));
    if (filters.minAskingPrice) results = results.filter((b) => b.askingPrice >= filters.minAskingPrice!);
    if (filters.maxAskingPrice) results = results.filter((b) => b.askingPrice <= filters.maxAskingPrice!);
    switch (filters.sortBy) {
      case "price-asc": results.sort((a, b) => a.askingPrice - b.askingPrice); break;
      case "price-desc": results.sort((a, b) => b.askingPrice - a.askingPrice); break;
      case "revenue-desc": results.sort((a, b) => b.revenue - a.revenue); break;
      case "ebitda-desc": results.sort((a, b) => b.ebitda - a.ebitda); break;
      default: results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    return results;
  }, [filters]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="bg-[#080808] border-b border-[#1f1f1f] py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white">Browse Businesses</h1>
            <p className="mt-2 text-[#737373]">Discover {MOCK_BUSINESSES.length}+ verified businesses for sale</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <FiltersPanel filters={filters} onChange={(f) => { setFilters(f); setPage(1); }} resultCount={filtered.length} />
            <div className="flex-1 min-w-0">
              <SortBar filters={filters} onChange={(f) => { setFilters(f); setPage(1); }} resultCount={filtered.length} view={view} onViewChange={setView} />
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-4xl mb-4">🔍</p>
                  <h3 className="text-lg font-semibold text-white mb-2">No results found</h3>
                  <p className="text-sm text-[#737373]">Try adjusting your filters or search query.</p>
                </div>
              ) : (
                <>
                  <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" : "flex flex-col gap-4"}>
                    {paginated.map((biz) => <BusinessCard key={biz.id} business={biz} view={view} />)}
                  </div>
                  {hasMore && (
                    <div className="mt-10 text-center">
                      <button onClick={() => setPage((p) => p + 1)} className="px-6 py-2.5 rounded-lg bg-[#1a1a1a] border border-[#2f2f2f] text-sm text-[#a3a3a3] hover:text-white hover:border-[#3f3f3f] transition-all">
                        Load more ({filtered.length - paginated.length} remaining)
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
