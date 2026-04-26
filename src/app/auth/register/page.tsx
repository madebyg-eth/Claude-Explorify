"use client";
import { useState } from "react";
import Link from "next/link";
import { TrendingUp, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ROLES = [
  { value: "buyer", label: "I want to Buy", emoji: "🛍️", desc: "Browse and acquire businesses" },
  { value: "seller", label: "I want to Sell", emoji: "🏢", desc: "List and sell your business" },
  { value: "both", label: "Both", emoji: "⚡", desc: "Buy and sell on the platform" },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2.5 w-fit">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"><TrendingUp className="h-4 w-4 text-white" /></div>
          <span className="font-bold text-white text-lg tracking-tight">Explori<span className="text-indigo-400">fy</span></span>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2].map((s) => <div key={s} className={cn("w-8 h-1.5 rounded-full transition-all", s <= step ? "bg-indigo-500" : "bg-[#2a2a2a]")} />)}
          </div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">{step === 1 ? "How will you use Explorify?" : "Create your account"}</h1>
            <p className="mt-2 text-sm text-[#737373]">{step === 1 ? "Select your primary role" : "Enter your details to get started"}</p>
          </div>
          <div className="bg-[#111111] border border-[#2f2f2f] rounded-2xl p-8 shadow-2xl">
            {step === 1 ? (
              <div className="space-y-3">
                {ROLES.map(({ value, label, emoji, desc }) => (
                  <button key={value} onClick={() => setRole(value)} className={cn("w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all", role === value ? "border-indigo-500 bg-indigo-500/10" : "border-[#2f2f2f] bg-[#1a1a1a] hover:border-[#3f3f3f]")}>
                    <span className="text-2xl">{emoji}</span>
                    <div><p className="text-sm font-medium text-white">{label}</p><p className="text-xs text-[#737373]">{desc}</p></div>
                    <div className={cn("ml-auto w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center", role === value ? "border-indigo-500 bg-indigo-500" : "border-[#3f3f3f]")}>
                      {role === value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
                <Button variant="primary" fullWidth size="lg" disabled={!role} onClick={() => setStep(2)} className="mt-2">Continue</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" icon={<User className="h-4 w-4" />} required />
                <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" icon={<Mail className="h-4 w-4" />} required />
                <Input label="Password" type={showPwd ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" icon={<Lock className="h-4 w-4" />} iconRight={<button type="button" onClick={() => setShowPwd(!showPwd)} className="hover:text-white transition-colors">{showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>} hint="Must be at least 8 characters" required />
                <div className="text-xs text-[#737373]">By creating an account, you agree to our <Link href="/terms" className="text-indigo-400 hover:text-indigo-300">Terms of Service</Link> and <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</Link>.</div>
                <div className="flex gap-3">
                  <Button type="button" variant="secondary" onClick={() => setStep(1)}>Back</Button>
                  <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>Create Account</Button>
                </div>
              </form>
            )}
            <p className="mt-6 text-center text-sm text-[#737373]">Already have an account?{" "}<Link href="/auth/login" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
