"use client";
import { useState } from "react";
import Link from "next/link";
import { TrendingUp, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    if (email && password) { window.location.href = "/dashboard"; }
    else { setError("Please enter your email and password."); }
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
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="mt-2 text-sm text-[#737373]">Sign in to your Explorify account</p>
          </div>
          <div className="bg-[#111111] border border-[#2f2f2f] rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-2 gap-3 mb-6">
              {["Google", "LinkedIn"].map((provider) => (
                <button key={provider} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1a1a1a] border border-[#2f2f2f] text-sm text-[#a3a3a3] hover:text-white hover:border-[#3f3f3f] transition-all">
                  {provider === "Google" ? "G" : "in"} Continue with {provider}
                </button>
              ))}
            </div>
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#2f2f2f]" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-[#111111] px-3 text-[#737373]">or continue with email</span></div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" icon={<Mail className="h-4 w-4" />} required />
              <Input label="Password" type={showPwd ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" icon={<Lock className="h-4 w-4" />} iconRight={<button type="button" onClick={() => setShowPwd(!showPwd)} className="hover:text-white transition-colors">{showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>} required />
              {error && <p className="text-xs text-red-400">{error}</p>}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-[#737373] cursor-pointer"><input type="checkbox" className="rounded border-[#3f3f3f] bg-[#1a1a1a]" /> Remember me</label>
                <Link href="/auth/forgot" className="text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</Link>
              </div>
              <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>Sign In</Button>
            </form>
            <p className="mt-6 text-center text-sm text-[#737373]">Don&apos;t have an account?{" "}<Link href="/auth/register" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">Create one free</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
