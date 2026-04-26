import Link from "next/link";
import { TrendingUp, Globe, Network, GitFork } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Browse Listings", href: "/listings" },
    { label: "Sell a Business", href: "/sell" },
    { label: "Buy a Business", href: "/buy" },
    { label: "Valuation Tool", href: "/valuation" },
    { label: "Escrow Service", href: "/escrow" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Press", href: "/press" },
    { label: "Careers", href: "/careers" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Security", href: "/security" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#1f1f1f] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">Explori<span className="text-indigo-400">fy</span></span>
            </Link>
            <p className="text-sm text-[#737373] leading-relaxed max-w-xs">The premier marketplace for buying and selling businesses. Secure, transparent, and built for serious dealmakers.</p>
            <div className="flex items-center gap-3 mt-6">
              {[{ icon: Globe, href: "#" }, { icon: Network, href: "#" }, { icon: GitFork, href: "#" }].map(({ icon: Icon, href }) => (
                <a key={href} href={href} className="w-9 h-9 rounded-lg bg-[#1a1a1a] border border-[#2f2f2f] flex items-center justify-center text-[#737373] hover:text-white hover:border-[#3f3f3f] transition-all">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-[#737373]">All systems operational</span>
            </div>
          </div>
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-white mb-4">{section}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-sm text-[#737373] hover:text-[#a3a3a3] transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#737373]">&copy; {new Date().getFullYear()} Explorify, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded bg-[#1a1a1a] border border-[#2f2f2f] text-xs text-[#737373]">🔒 SOC 2 Type II</div>
            <div className="px-2.5 py-1 rounded bg-[#1a1a1a] border border-[#2f2f2f] text-xs text-[#737373]">🏦 FDIC Insured Escrow</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
