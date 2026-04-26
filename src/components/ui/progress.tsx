import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: "accent" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Progress({ value, max = 100, label, showValue = false, color = "accent", size = "md", className }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const colors = { accent: "bg-indigo-500", success: "bg-green-500", warning: "bg-amber-500", error: "bg-red-500" };
  const sizes = { sm: "h-1", md: "h-2", lg: "h-3" };
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {(label || showValue) && (
        <div className="flex justify-between text-xs text-[#737373]">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={cn("w-full bg-[#2a2a2a] rounded-full overflow-hidden", sizes[size])}>
        <div className={cn("rounded-full transition-all duration-500", colors[color], sizes[size])} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
