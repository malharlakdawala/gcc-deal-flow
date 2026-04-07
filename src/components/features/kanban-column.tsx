"use client";

import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

interface KanbanColumnProps {
  title: string;
  count: number;
  children: React.ReactNode;
  className?: string;
  placeholder?: boolean;
}

export function KanbanColumn({
  title,
  count,
  children,
  className,
  placeholder = false,
}: KanbanColumnProps) {
  return (
    <div
      className={cn(
        "flex-shrink-0 w-80 space-y-4",
        placeholder && "opacity-50",
        className
      )}
    >
      <div className="flex items-center justify-between px-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">
          {title}{" "}
          <span className="ml-2 text-on-surface-variant/30 font-mono">
            {count}
          </span>
        </span>
        {!placeholder && (
          <MoreHorizontal className="w-4 h-4 text-on-surface-variant/30" />
        )}
      </div>
      {children}
    </div>
  );
}
