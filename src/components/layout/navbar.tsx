"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, TrendingUp, Bell, ChevronDown, LogOut, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/listings", label: "Browse" },
  { href: "/sell", label: "Sell" },
  { href: "/buy", label: "Buy" },
  { href: "/valuation", label: "Valuation" },
  { href: "/escrow", label: "Escrow" },
];

interface NavbarProps {
  user?: { name: string; email: string; avatar?: string } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full glass border-b border-[#2f2f2f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">Explori<span className="text-indigo-400">fy</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-2 text-sm font-medium text-[#a3a3a3] hover:text-white rounded-lg hover:bg-[#1a1a1a] transition-all duration-200">{link.label}</Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <button className="relative p-2 rounded-lg hover:bg-[#1a1a1a] text-[#737373] hover:text-white transition-colors">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                </button>
                <div className="relative">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#1a1a1a] transition-colors">
                    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">{user.name.charAt(0).toUpperCase()}</div>
                    <span className="text-sm text-[#a3a3a3]">{user.name.split(" ")[0]}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-[#737373]" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-[#111111] border border-[#2f2f2f] rounded-xl shadow-2xl overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-[#2f2f2f]">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-[#737373] truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link href="/dashboard" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#a3a3a3] hover:text-white hover:bg-[#1a1a1a] transition-colors" onClick={() => setUserMenuOpen(false)}><LayoutDashboard className="h-4 w-4" /> Dashboard</Link>
                        <Link href="/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#a3a3a3] hover:text-white hover:bg-[#1a1a1a] transition-colors" onClick={() => setUserMenuOpen(false)}><User className="h-4 w-4" /> Profile</Link>
                        <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-[#1a1a1a] transition-colors"><LogOut className="h-4 w-4" /> Sign Out</button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
                <Link href="/auth/register"><Button variant="primary" size="sm">Get Started</Button></Link>
              </>
            )}
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-[#1a1a1a] text-[#737373] hover:text-white transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#2f2f2f] bg-[#0a0a0a]">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-3 text-sm font-medium text-[#a3a3a3] hover:text-white rounded-lg hover:bg-[#1a1a1a] transition-colors" onClick={() => setMobileOpen(false)}>{link.label}</Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-[#2f2f2f] mt-2">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}><Button variant="secondary" fullWidth size="md">Dashboard</Button></Link>
                  <Button variant="ghost" fullWidth size="md">Sign Out</Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)}><Button variant="secondary" fullWidth size="md">Sign In</Button></Link>
                  <Link href="/auth/register" onClick={() => setMobileOpen(false)}><Button variant="primary" fullWidth size="md">Get Started</Button></Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
