"use client";
import { cn } from "@/lib/utils";
import { createContext, useContext, useState } from "react";

interface TabsContextValue { activeTab: string; setActiveTab: (tab: string) => void; }
const TabsContext = createContext<TabsContextValue>({ activeTab: "", setActiveTab: () => {} });

export function Tabs({ defaultTab, children, className }: { defaultTab: string; children: React.ReactNode; className?: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("flex flex-col gap-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex gap-1 p-1 bg-[#1a1a1a] rounded-lg border border-[#2f2f2f] w-fit", className)}>{children}</div>;
}

export function TabTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;
  return (
    <button onClick={() => setActiveTab(value)} className={cn("px-4 py-2 text-sm font-medium rounded-md transition-all duration-200", isActive ? "bg-indigo-600 text-white shadow-sm" : "text-[#737373] hover:text-[#a3a3a3] hover:bg-[#222]", className)}>
      {children}
    </button>
  );
}

export function TabContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  return <div className={cn("animate-fade-in", className)}>{children}</div>;
}
