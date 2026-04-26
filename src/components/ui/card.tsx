import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  border?: boolean;
}

export function Card({ className, hover = false, padding = "md", border = true, children, ...props }: CardProps) {
  const paddings = { none: "", sm: "p-4", md: "p-6", lg: "p-8" };
  return (
    <div className={cn("rounded-xl bg-[#111111]", border && "border border-[#2f2f2f]", hover && "card-hover cursor-pointer", paddings[padding], className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 mb-4", className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold text-white", className)} {...props}>{children}</h3>;
}

export function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-[#737373]", className)} {...props}>{children}</p>;
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center pt-4 mt-4 border-t border-[#2f2f2f]", className)} {...props}>{children}</div>;
}
