import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label htmlFor={textareaId} className="text-sm font-medium text-[#a3a3a3]">{label}</label>}
        <textarea ref={ref} id={textareaId} className={cn("w-full bg-[#1a1a1a] border border-[#2f2f2f] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#737373]", "focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50", "transition-all duration-200 resize-y min-h-[100px]", error && "border-red-500/50", className)} {...props} />
        {error && <p className="text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="text-xs text-[#737373]">{hint}</p>}
      </div>
    );
  }
);
Texarea.displayName = "Textarea";
export { Textarea };
