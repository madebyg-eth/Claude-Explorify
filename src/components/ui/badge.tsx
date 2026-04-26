import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "accent" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  const variants = {
    default: "bg-[#2a2a2a] text-[#a3a3a3] border border-[#3f3f3f]",
    success: "bg-green-500/10 text-green-400 border border-green-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    error: "bg-red-500/10 text-red-400 border border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    accent: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    outline: "bg-transparent text-[#a3a3a3] border border-[#3f3f3f]",
  };
  const sizes = { sm: "px-2 py-0.5 text-xs", md: "px-2.5 py-1 text-sm" };
  return (
    <span className={cn("inline-flex items-center gap-1 font-medium rounded-full", variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
