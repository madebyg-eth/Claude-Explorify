"use client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label htmlFor={selectId} className="text-sm font-medium text-[#a3a3a3]">{label}</label>}
        <div className="relative">
          <select ref={ref} id={selectId} className={cn("w-full appearance-none bg-[#1a1a1a] border border-[#2f2f2f] rounded-lg px-3 py-2.5 text-sm text-white", "focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50", "transition-all duration-200 pr-10 cursor-pointer", error && "border-red-500/50", className)} {...props}>
            {placeholder && <option value="" className="text-[#737373] bg-[#1a1a1a]">{placeholder}</option>}
            {options.map((opt) => <option key={opt.value} value={opt.value} className="bg-[#1a1a1a]">{opt.label}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#737373] pointer-events-none" />
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="text-xs text-[#737373]">{hint}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
export { Select };
