import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mock-data";

export function Testimonials() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-medium mb-4">★ 4.9/5 from 800+ reviews</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Trusted by dealmakers</h2>
          <p className="mt-4 text-[#737373] max-w-xl mx-auto">Thousands of buyers and sellers have closed deals on Explorify. Here&apos;s what they say.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.id} className="p-6 bg-[#111111] border border-[#2f2f2f] rounded-2xl flex flex-col gap-4 hover:border-[#3f3f3f] transition-all duration-300" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-sm text-[#a3a3a3] leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#2f2f2f]">
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white shrink-0">{t.avatar}</div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-[#737373]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🔒", label: "SOC 2 Type II", sub: "Certified Security" },
            { icon: "🏦", label: "FDIC Insured", sub: "Escrow Accounts" },
            { icon: "⚖️", label: "Legal Compliance", sub: "All 50 US States" },
            { icon: "🛡️", label: "E&O Insurance", sub: "$5M Coverage" },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="p-4 bg-[#111111] border border-[#2f2f2f] rounded-xl flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <div><p className="text-sm font-medium text-white">{label}</p><p className="text-xs text-[#737373]">{sub}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
