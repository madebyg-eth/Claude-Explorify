import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, icon, iconRight, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label htmlFor={inputId} className="text-sm font-medium text-[#a3a3a3]">{label}</label>}
        <div className="relative">
          {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]">{icon}</span>}
          <input
            ref={ref} id={inputId}
            className={cn("w-full bg-[#1a1a1a] border border-[#2f2f2f] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#737373]", "focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50", "transition-all duration-200", error && "border-red-500/50 focus:ring-red-500/30", icon && "pl-10", iconRight && "pr-10", className)}
            {...props}
          />
          {iconRight && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373]">{iconRight}</span>}
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="text-xs text-[#737373]">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
export { Input };
