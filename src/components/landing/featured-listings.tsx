import Link from "next/link";
import { ArrowRight, MapPin, TrendingUp, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_BUSINESSES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const TYPE_LABELS: Record<string, string> = {
  saas: "SaaS", ecommerce: "E-commerce", "brick-and-mortar": "Brick & Mortar",
  service: "Service", manufacturing: "Manufacturing", franchise: "Franchise",
  content: "Content", marketplace: "Marketplace",
};

export function FeaturedListings() {
  const featured = MOCK_BUSINESSES.slice(0, 3);
  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 font-medium mb-3">Featured Listings</div>
            <h2 className="text-3xl font-bold text-white">Hand-picked opportunities</h2>
            <p className="mt-2 text-[#737373]">Verified financials. Active sellers. Ready to close.</p>
          </div>
          <Link href="/listings"><Button variant="outline" size="md" className="gap-1.5 shrink-0">View all listings <ArrowRight className="h-3.5 w-3.5" /></Button></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((biz) => (
            <Link key={biz.id} href={`/listings/${biz.slug}`} className="group">
              <div className="bg-[#111111] border border-[#2f2f2f] rounded-2xl overflow-hidden card-hover">
                <div className="h-44 bg-gradient-to-br from-[#1a1a1a] to-[#222] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center"><TrendingUp className="h-12 w-12 text-[#2a2a2a]" /></div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant={biz.status === "under-offer" ? "warning" : "accent"}>{biz.status === "under-offer" ? "Under Offer" : "Active"}</Badge>
                    <Badge variant="default">{TYPE_LABELS[biz.type] || biz.type}</Badge>
                  </div>
                  <button className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#0a0a0a]/60 hover:bg-[#0a0a0a]/80 transition-colors">
                    <Bookmark className={`h-4 w-4 ${biz.isSaved ? "fill-indigo-400 text-indigo-400" : "text-[#737373]"}`} />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">{biz.title}</h3>
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#737373]">
                    <MapPin className="h-3 w-3" /><span>{biz.location}</span><span className="text-[#3f3f3f]">·</span><span>{biz.industry}</span>
                  </div>
                  <p className="mt-3 text-xs text-[#737373] line-clamp-2 leading-relaxed">{biz.description}</p>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div><p className="text-[10px] text-[#737373] uppercase tracking-wider">Asking</p><p className="text-sm font-semibold text-white">{formatCurrency(biz.askingPrice, true)}</p></div>
                    <div><p className="text-[10px] text-[#737373] uppercase tracking-wider">Revenue</p><p className="text-sm font-semibold text-white">{formatCurrency(biz.revenue, true)}</p></div>
                    <div><p className="text-[10px] text-[#737373] uppercase tracking-wider">Multiple</p><p className="text-sm font-semibold text-white">{biz.multiple.toFixed(1)}x SDE</p></div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#1f1f1f] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {biz.tags.slice(0, 2).map((tag) => <span key={tag} className="px-2 py-0.5 rounded-full bg-[#1a1a1a] border border-[#2f2f2f] text-[10px] text-[#737373]">#{tag}</span>)}
                    </div>
                    <span className="text-xs text-[#737373]">{biz.viewCount.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
