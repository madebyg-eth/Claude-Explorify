import { Search, MessageSquare, FileCheck, Shield } from "lucide-react";

const ICONS: Record<string, React.ElementType> = { Search, MessageSquare, FileCheck, Shield };

const steps = [
  { step: "01", title: "List or Browse", description: "Sellers create verified listings with audited financials. Buyers use powerful filters to find their ideal acquisition target.", icon: "Search" },
  { step: "02", title: "Connect & Negotiate", description: "Sign NDAs digitally, access data rooms, and negotiate via secure messaging. Built-in LOI templates streamline the process.", icon: "MessageSquare" },
  { step: "03", title: "Due Diligence", description: "Work through our structured DD checklist. Share P&Ls, tax returns, and contracts securely through our encrypted document vault.", icon: "FileCheck" },
  { step: "04", title: "Close with Escrow", description: "Funds are held in FDIC-insured escrow and released in milestones. E-sign all documents in one place. We verify every step.", icon: "Shield" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 font-medium mb-4">Simple Process</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">From listing to close in <span className="text-gradient-accent">54 days</span></h2>
          <p className="mt-4 text-[#737373] max-w-xl mx-auto">Our structured process and dedicated support team guide you through every milestone.</p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-16 left-[calc(12.5%+2px)] right-[calc(12.5%+2px)] h-px bg-gradient-to-r from-transparent via-[#2f2f2f] to-transparent" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = ICONS[step.icon];
              return (
                <div key={step.step} className="flex flex-col items-center text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-[#2f2f2f] flex items-center justify-center group-hover:border-indigo-500/40 group-hover:bg-indigo-500/5 transition-all duration-300">
                      <Icon className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">{i + 1}</span>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-[#737373] mb-2">{step.step}</div>
                  <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-[#737373] leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
