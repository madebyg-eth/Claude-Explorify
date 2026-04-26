"use client";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Calculator, TrendingUp, Download, Info, Zap } from "lucide-react";

const INDUSTRY_MULTIPLES: Record<string, { sde: number; ebitda: number; label: string }> = {
  saas: { sde: 4.5, ebitda: 6.0, label: "SaaS" },
  ecommerce: { sde: 3.5, ebitda: 4.0, label: "E-commerce" },
  service: { sde: 3.0, ebitda: 3.5, label: "Service Business" },
  content: { sde: 4.0, ebitda: 5.0, label: "Content / Media" },
  marketplace: { sde: 6.0, ebitda: 8.0, label: "Marketplace" },
  "brick-and-mortar": { sde: 2.8, ebitda: 3.0, label: "Brick & Mortar" },
  franchise: { sde: 3.2, ebitda: 3.8, label: "Franchise" },
  manufacturing: { sde: 4.0, ebitda: 5.0, label: "Manufacturing" },
  healthcare: { sde: 3.5, ebitda: 4.5, label: "Healthcare" },
};

export default function ValuationPage() {
  const [businessType, setBusinessType] = useState("saas");
  const [revenue, setRevenue] = useState("800000");
  const [ebitda, setEbitda] = useState("400000");
  const [sde, setSde] = useState("450000");
  const [growthRate, setGrowthRate] = useState("20");
  const [yearsProjection, setYearsProjection] = useState("5");
  const [expenses, setExpenses] = useState("350000");

  const industry = INDUSTRY_MULTIPLES[businessType] || INDUSTRY_MULTIPLES.saas;
  const rev = parseFloat(revenue) || 0;
  const ebitdaVal = parseFloat(ebitda) || 0;
  const sdeVal = parseFloat(sde) || 0;
  const growth = parseFloat(growthRate) / 100 || 0;
  const years = parseInt(yearsProjection) || 5;
  const expVal = parseFloat(expenses) || 0;

  const valuationRange = useMemo(() => ({
    conservativeSDE: Math.round(sdeVal * (industry.sde * 0.75)),
    midSDE: Math.round(sdeVal * industry.sde),
    premiumSDE: Math.round(sdeVal * (industry.sde * 1.35)),
    conservativeEBITDA: Math.round(ebitdaVal * (industry.ebitda * 0.75)),
    midEBITDA: Math.round(ebitdaVal * industry.ebitda),
    premiumEBITDA: Math.round(ebitdaVal * (industry.ebitda * 1.35)),
  }), [sdeVal, ebitdaVal, industry]);

  const projections = useMemo(() => Array.from({ length: years }, (_, i) => {
    const yr = i + 1;
    const projRev = rev * Math.pow(1 + growth, yr);
    const projExp = expVal * Math.pow(1.08, yr);
    const projEbitda = projRev - projExp;
    const projNetProfit = projEbitda * 0.75;
    return { year: `Year ${yr}`, revenue: Math.round(projRev), expenses: Math.round(projExp), ebitda: Math.round(projEbitda), netProfit: Math.round(projNetProfit), roi: Math.round((projNetProfit / valuationRange.midSDE) * 100) };
  }), [rev, expVal, growth, years, valuationRange.midSDE]);

  const comparables = useMemo(() => [
    { name: "Similar Business A", askingPrice: Math.round(valuationRange.midSDE * 0.9), multiple: industry.sde * 0.9, revenue: Math.round(rev * 0.85) },
    { name: "Similar Business B", askingPrice: Math.round(valuationRange.midSDE * 1.1), multiple: industry.sde * 1.1, revenue: Math.round(rev * 1.15) },
    { name: "Similar Business C", askingPrice: Math.round(valuationRange.midSDE * 0.95), multiple: industry.sde, revenue: Math.round(rev * 0.95) },
    { name: "Your Business", askingPrice: valuationRange.midSDE, multiple: industry.sde, revenue: rev, highlight: true },
  ], [valuationRange, industry, rev]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-[#0a0a0a]">
        <div className="bg-[#080808] border-b border-[#1f1f1f] py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-2"><Calculator className="h-5 w-5 text-indigo-400" /><h1 className="text-3xl font-bold text-white">Financial Modeling & Valuation</h1></div>
            <p className="text-[#737373]">Industry-benchmarked valuations, revenue projections, and ROI analysis</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-5">
              <Card>
                <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2"><Zap className="h-4 w-4 text-indigo-400" /> Business Inputs</h2>
                <div className="space-y-4">
                  <Select label="Business Type" value={businessType} onChange={(e) => setBusinessType(e.target.value)} options={Object.entries(INDUSTRY_MULTIPLES).map(([v, { label }]) => ({ value: v, label }))} />
                  <Input label="Annual Revenue" type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} hint="Last 12 months" />
                  <Input label="EBITDA" type="number" value={ebitda} onChange={(e) => setEbitda(e.target.value)} hint="Earnings before interest, tax, D&A" />
                  <Input label="SDE (Owner Earnings)" type="number" value={sde} onChange={(e) => setSde(e.target.value)} hint="Primary valuation basis" />
                  <Input label="Annual Expenses" type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} hint="Total operating costs" />
                  <Input label="YoY Growth Rate (%)" type="number" value={growthRate} onChange={(e) => setGrowthRate(e.target.value)} hint="Expected annual growth" />
                  <Input label="Projection Years" type="number" value={yearsProjection} onChange={(e) => setYearsProjection(e.target.value)} hint="1–10 years" />
                </div>
              </Card>
              <Card className="bg-indigo-500/5 border-indigo-500/20">
                <div className="flex items-center gap-2 mb-3"><Info className="h-4 w-4 text-indigo-400" /><h3 className="text-sm font-semibold text-white">Industry Benchmarks</h3></div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-[#737373]">Avg. SDE Multiple</span><span className="text-white">{industry.sde.toFixed(1)}x</span></div>
                  <div className="flex justify-between"><span className="text-[#737373]">Avg. EBITDA Multiple</span><span className="text-white">{industry.ebitda.toFixed(1)}x</span></div>
                  <div className="flex justify-between"><span className="text-[#737373]">Industry</span><span className="text-indigo-400">{industry.label}</span></div>
                  <div className="flex justify-between"><span className="text-[#737373]">Avg. Days to Close</span><span className="text-white">54</span></div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-semibold text-white">Valuation Range</h2>
                  <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Export Report</Button>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[
                    { label: "Conservative", value: valuationRange.conservativeSDE, sub: "75% of market", color: "text-[#a3a3a3]" },
                    { label: "Market Rate", value: valuationRange.midSDE, sub: `${industry.sde.toFixed(1)}x SDE`, color: "text-indigo-300", highlight: true },
                    { label: "Premium", value: valuationRange.premiumSDE, sub: "135% of market", color: "text-green-400" },
                  ].map(({ label, value, sub, color, highlight }) => (
                    <div key={label} className={`p-4 rounded-xl border text-center ${highlight ? "bg-indigo-600/10 border-indigo-500/30" : "bg-[#1a1a1a] border-[#2f2f2f]"}`}>
                      <p className="text-xs text-[#737373] mb-1">{label}</p>
                      <p className={`text-xl font-bold ${color}`}>{formatCurrency(value, true)}</p>
                      <p className="text-xs text-[#737373] mt-1">{sub}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "EBITDA Conservative", value: valuationRange.conservativeEBITDA },
                    { label: "EBITDA Market Rate", value: valuationRange.midEBITDA },
                    { label: "EBITDA Premium", value: valuationRange.premiumEBITDA },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-3 bg-[#1a1a1a] border border-[#2f2f2f] rounded-xl text-center">
                      <p className="text-[10px] text-[#737373] mb-1">{label}</p>
                      <p className="text-sm font-semibold text-white">{formatCurrency(value, true)}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <h2 className="text-base font-semibold text-white mb-4">Revenue & Profit Projection</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projections}>
                      <defs>
                        <linearGradient id="revGr" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                        <linearGradient id="ebitdaGr" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} /><stop offset="95%" stopColor="#22c55e" stopOpacity={0} /></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                      <XAxis dataKey="year" tick={{ fill: "#737373", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#737373", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                      <Tooltip contentStyle={{ background: "#111", border: "1px solid #2f2f2f", borderRadius: "8px", color: "#fff", fontSize: 12 }} formatter={(v: unknown) => [`$${((v as number) / 1000).toFixed(0)}K`]} />
                      <Legend formatter={(v) => <span style={{ color: "#a3a3a3", fontSize: 12 }}>{v}</span>} />
                      <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" fill="url(#revGr)" strokeWidth={2} />
                      <Area type="monotone" dataKey="ebitda" name="EBITDA" stroke="#22c55e" fill="url(#ebitdaGr)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <Card>
                <h2 className="text-base font-semibold text-white mb-4">Annual ROI on Asking Price</h2>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projections}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                      <XAxis dataKey="year" tick={{ fill: "#737373", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#737373", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                      <Tooltip contentStyle={{ background: "#111", border: "1px solid #2f2f2f", borderRadius: "8px", color: "#fff", fontSize: 12 }} formatter={(v: unknown) => [`${v}%`, "ROI"]} />
                      <Bar dataKey="roi" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <Card>
                <h2 className="text-base font-semibold text-white mb-4">Market Comparables</h2>
                <div className="space-y-3">
                  {comparables.map((comp) => (
                    <div key={comp.name} className={`flex items-center justify-between p-3 rounded-xl border ${ (comp as { highlight?: boolean }).highlight ? "border-indigo-500/30 bg-indigo-500/5" : "border-[#2f2f2f] bg-[#1a1a1a]"}`}>
                      <div>
                        <p className="text-sm font-medium text-white flex items-center gap-2">{comp.name}{(comp as { highlight?: boolean }).highlight && <Badge variant="accent" size="sm">You</Badge>}</p>
                        <p className="text-xs text-[#737373]">Revenue: {formatCurrency(comp.revenue, true)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">{formatCurrency(comp.askingPrice, true)}</p>
                        <p className="text-xs text-[#737373]">{comp.multiple.toFixed(1)}x SDE</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
