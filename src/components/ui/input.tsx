"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full bg-surface-container-lowest border border-white/5 text-on-surface rounded-[12px] transition-all duration-200 placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30",
  {
    variants: {
      variant: {
        default: "px-4 py-2.5",
        currency: "pl-16 pr-4 py-2.5 font-mono tabular-nums",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  currencyPrefix?: string;
}

function Input({
  className,
  variant,
  label,
  error,
  currencyPrefix = "USD",
  id,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm text-on-surface-variant font-medium"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {variant === "currency" && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-mono text-sm">
            {currencyPrefix}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            inputVariants({ variant }),
            error && "border-error/50 focus:ring-error/30",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}

export { Input, inputVariants };
export default Input;
