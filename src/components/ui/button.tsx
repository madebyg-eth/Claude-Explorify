"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "destructive" | "success";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, fullWidth, children, disabled, ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed select-none";
    const variants = {
      primary: "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white focus:ring-indigo-500",
      secondary: "bg-[#2a2a2a] hover:bg-[#333] active:bg-[#222] text-white border border-[#3f3f3f] focus:ring-[#3f3f3f]",
      ghost: "hover:bg-[#1a1a1a] active:bg-[#222] text-[#a3a3a3] hover:text-white focus:ring-[#3f3f3f]",
      outline: "border border-[#3f3f3f] hover:border-indigo-500 hover:text-indigo-400 text-[#a3a3a3] focus:ring-indigo-500",
      destructive: "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white focus:ring-red-500",
      success: "bg-green-600 hover:bg-green-500 active:bg-green-700 text-white focus:ring-green-500",
    };
    const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-6 py-2.5 text-base", xl: "px-8 py-3.5 text-base" };
    return (
      <button ref={ref} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)} {...props}>
        {loading && (
          <svg className="animate-spin -ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export { Button };
