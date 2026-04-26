"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_BUSINESSES } from "@/lib/mock-data";

const industries = ["All Industries", "Technology", "E-commerce", "Marketing", "Fitness", "Media", "HR Tech", "Finance"];
const locations = ["All Locations", "Remote", "New York, NY", "Austin, TX", "Chicago, IL", "Denver, CO", "Los Angeles, CA"];

export function Hero() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (industry) params.set("industry", industry);
    if (location) params.set("location", location);
    window.location.href = `/listings?${params.toString()}`;
  };

  const featuredCount = MOCK_BUSINESSES.filter((b) => b.status === "active").length;

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-violet-900/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>{featuredCount} active listings — new businesses added daily</span>
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white">
            Buy and sell <span className="text-gradient-accent">profitable</span><br className="hidden sm:block" /> businesses with confidence
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#a3a3a3] max-w-2xl mx-auto leading-relaxed">
            Explorify connects serious buyers with vetted business owners. Verified financials, secure escrow, and expert support — every deal, every step.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-[#737373]">
            {[{ icon: Shield, label: "FDIC-Insured Escrow" }, { icon: TrendingUp, label: "Verified Financials" }, { icon: Zap, label: "Avg. 54-Day Close" }].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5"><Icon className="h-3.5 w-3.5 text-indigo-500" /><span>{label}</span></div>
            ))}
          </div>
        </div>

        <div className="mt-10 max-w-3xl mx-auto">
          <div className="glass rounded-2xl p-3 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#737373]" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} placeholder="Search businesses, industries, keywords..." className="w-full pl-10 pr-3 py-3 bg-[#1a1a1a] rounded-xl text-sm text-white placeholder:text-[#737373] border border-[#2f2f2f] focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all" />
              </div>
              <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="appearance-none px-3 py-3 bg-[#1a1a1a] rounded-xl text-sm text-[#a3a3a3] border border-[#2f2f2f] focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all cursor-pointer sm:w-44">
                {industries.map((i) => <option key={i} value={i === "All Industries" ? "" : i} className="bg-[#1a1a1a]">{i}</option>)}
              </select>
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="appearance-none px-3 py-3 bg-[#1a1a1a] rounded-xl text-sm text-[#a3a3a3] border border-[#2f2f2f] focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all cursor-pointer sm:w-44">
                {locations.map((l) => <option key={l} value={l === "All Locations" ? "" : l} className="bg-[#1a1a1a]">{l}</option>)}
              </select>
              <Button variant="primary" size="lg" onClick={handleSearch} className="shrink-0 gap-1.5">Search <ArrowRight className="h-4 w-4" /></Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 px-1">
              <span className="text-xs text-[#737373] self-center">Popular:</span>
              {["SaaS", "E-commerce", "< $1M", "Under Offer"].map((tag) => (
                <button key={tag} onClick={() => { if (tag === "SaaS") setQuery("SaaS"); else if (tag === "E-commerce") setQuery("e-commerce"); }} className="px-2.5 py-1 rounded-lg bg-[#1a1a1a] border border-[#2f2f2f] text-xs text-[#737373] hover:text-white hover:border-[#3f3f3f] transition-all">{tag}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/listings"><Button variant="secondary" size="lg">Browse All Listings</Button></Link>
          <Link href="/sell"><Button variant="outline" size="lg">List Your Business</Button></Link>
        </div>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[{ value: "$1.2B+", label: "Total Deal Volume" }, { value: "2,400+", label: "Businesses Sold" }, { value: "54 days", label: "Avg. Time to Close" }, { value: "98.2%", label: "Buyer Satisfaction" }].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-white">{value}</div>
              <div className="mt-1 text-xs text-[#737373]">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
