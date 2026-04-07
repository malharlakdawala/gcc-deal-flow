"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DonutSegment {
  value: number;
  color: string;
  label: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function DonutChart({
  segments,
  size = 160,
  strokeWidth = 24,
  className,
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const center = size / 2;

  const segmentData = segments.reduce<{ segmentLength: number; dashOffset: number }[]>((acc, segment) => {
    const offset = acc.reduce((sum, s) => sum + s.segmentLength, 0);
    const segmentLength = (segment.value / total) * circumference;
    acc.push({ segmentLength, dashOffset: circumference - offset });
    return acc;
  }, []);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((segment, i) => {
          const { segmentLength, dashOffset } = segmentData[i];

          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`}
            />
          );
        })}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-on-surface font-mono text-2xl tabular-nums"
          style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums" }}
        >
          {total.toLocaleString()}
        </text>
      </svg>
      <div className="flex flex-wrap gap-3 justify-center">
        {segments.map((segment, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-on-surface-variant">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: segment.color }}
            />
            {segment.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export { DonutChart };
export type { DonutSegment };
export default DonutChart;
