import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900/40 to-violet-900/20 border border-indigo-500/20 p-12 lg:p-20 text-center">
          <div className="absolute inset-0 bg-[#0a0a0a]/60" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-700/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-indigo-400" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white max-w-2xl mx-auto leading-tight">Ready to buy or sell your next business?</h2>
            <p className="mt-6 text-[#a3a3a3] max-w-lg mx-auto text-lg">Join 12,000+ entrepreneurs who trust Explorify for their most important deals. No broker fees. Full control.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register"><Button variant="primary" size="xl" className="gap-2">Start for Free <ArrowRight className="h-5 w-5" /></Button></Link>
              <Link href="/listings"><Button variant="secondary" size="xl">Browse Listings</Button></Link>
            </div>
            <p className="mt-6 text-xs text-[#737373]">No credit card required · Free to list · Success fee only on close</p>
          </div>
        </div>
      </div>
    </section>
  );
}
