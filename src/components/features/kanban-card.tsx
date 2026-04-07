"use client";

import { cn } from "@/lib/utils";
import { Send, FileText, Eye, CheckCircle, AlertTriangle } from "lucide-react";

interface TeamMember {
  initials: string;
  color: string;
}

interface KanbanCardProps {
  clientCode: string;
  projectName: string;
  dealValue: string;
  daysInStage: number;
  aiVelocity: "on-track" | "at-risk" | "behind";
  aiVelocityLabel: string;
  team?: TeamMember[];
  statusIcon?: "check" | "warning";
  className?: string;
}

export function KanbanCard({
  clientCode,
  projectName,
  dealValue,
  daysInStage,
  aiVelocity,
  aiVelocityLabel,
  team = [],
  statusIcon,
  className,
}: KanbanCardProps) {
  const velocityColorMap = {
    "on-track": "text-tertiary",
    "at-risk": "text-error",
    behind: "text-secondary",
  } as const;

  const dotColorMap = {
    "on-track": "bg-tertiary",
    "at-risk": "bg-error",
    behind: "bg-secondary",
  } as const;

  return (
    <div
      className={cn(
        "bg-surface-container-low p-5 rounded-xl border border-white/5 hover:border-primary/20 transition-all cursor-pointer group relative overflow-hidden",
        className
      )}
    >
      {statusIcon === "check" && (
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
      )}

      <div className="flex justify-between items-start mb-3">
        <div className="bg-surface-container-highest/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-on-surface-variant font-mono">
          {clientCode}
        </div>
        {statusIcon === "check" && (
          <CheckCircle className="w-[18px] h-[18px] text-tertiary fill-tertiary" />
        )}
        {statusIcon === "warning" && (
          <AlertTriangle className="w-[18px] h-[18px] text-error fill-error" />
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-on-surface font-semibold text-sm mb-1">
          {projectName}
        </h3>
        <p className="text-primary text-xs font-mono">{dealValue}</p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex -space-x-2">
          {team.map((member, i) => (
            <div
              key={i}
              className={cn(
                "w-6 h-6 rounded-full border-2 border-surface-container-low flex items-center justify-center text-[8px] font-bold",
                member.color
              )}
            >
              {member.initials}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Send className="w-4 h-4 text-on-surface-variant/40 hover:text-primary transition-colors" />
          {statusIcon === "check" ? (
            <FileText className="w-4 h-4 text-on-surface-variant/40 hover:text-primary transition-colors" />
          ) : (
            <Eye className="w-4 h-4 text-on-surface-variant/40 hover:text-primary transition-colors" />
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-on-surface-variant/40">
          {daysInStage} days in stage
        </span>
        <span
          className={cn(
            "text-[10px] flex items-center gap-1",
            velocityColorMap[aiVelocity]
          )}
        >
          <span
            className={cn("w-1.5 h-1.5 rounded-full", dotColorMap[aiVelocity])}
          />
          AI Velocity: {aiVelocityLabel}
        </span>
      </div>
    </div>
  );
}
