import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const BUTTON_OUTER_CLIP = `polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)`;
const BUTTON_INNER_CLIP = `polygon(13px 0, calc(100% - 13px) 0, 100% 13px, 100% calc(100% - 13px), calc(100% - 13px) 100%, 13px 100%, 0 calc(100% - 13px), 0 13px)`;

export interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
}

export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, isLoading, variant = "primary", icon, children, disabled, ...props }, ref) => {
    const isPrimary = variant === "primary";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "group relative block w-full p-[2px] transition-all duration-300",
          !disabled && !isLoading && "hover:scale-[1.02]",
          isPrimary
            ? "bg-gradient-to-r from-brand-golden-yellow via-brand-orange to-brand-golden-yellow hover:drop-shadow-[0_0_18px_rgba(243,202,32,0.6)]"
            : "bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.3)]",
          (disabled || isLoading) && "opacity-80 cursor-not-allowed",
          className
        )}
        style={{ clipPath: BUTTON_OUTER_CLIP }}
        {...props}
      >
        <div
          className={cn(
            "flex w-full items-center justify-center gap-2 px-8 py-4 font-brand-heading text-base font-bold uppercase tracking-widest transition-colors duration-300 sm:text-lg",
            isPrimary
              ? "bg-brand-golden-yellow text-brand-navy group-hover:bg-brand-white"
              : "bg-brand-navy text-brand-white group-hover:bg-slate-800"
          )}
          style={{ clipPath: BUTTON_INNER_CLIP }}
        >
          <span>{children}</span>
          
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin ml-1" />
          ) : icon ? (
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              {icon}
            </span>
          ) : null}
        </div>
      </button>
    );
  }
);

CyberButton.displayName = "CyberButton";
