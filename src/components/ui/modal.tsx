"use client";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Modal({ open, onClose, title, description, children, size = "md", className }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative w-full bg-[#111111] border border-[#2f2f2f] rounded-2xl shadow-2xl animate-fade-in", sizes[size], className)}>
        {(title || description) && (
          <div className="flex items-start justify-between p-6 border-b border-[#2f2f2f]">
            <div>
              {title && <h2 className="text-lg font-semibold text-white">{title}</h2>}
              {description && <p className="text-sm text-[#737373] mt-1">{description}</p>}
            </div>
            <button onClick={onClose} className="ml-4 p-1.5 rounded-lg hover:bg-[#2a2a2a] text-[#737373] hover:text-white transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
