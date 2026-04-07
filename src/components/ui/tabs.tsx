"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  label: string;
  value: string;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function Tabs({ items, value, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "inline-flex bg-surface-container-low rounded-[12px] p-1 gap-1",
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer",
            value === item.value
              ? "bg-surface-container-high text-on-surface"
              : "text-on-surface-variant hover:text-on-surface"
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export { Tabs };
export type { TabItem };
export default Tabs;
