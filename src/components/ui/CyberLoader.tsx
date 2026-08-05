import { cn } from "@/lib/utils";

interface CyberLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const CyberLoader = ({ className, size = "md" }: CyberLoaderProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-[3px]",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Background Track */}
      <div
        className={cn(
          "absolute rounded-full border-brand-golden-yellow/20",
          sizeClasses[size]
        )}
      />
      {/* Spinning Core */}
      <div
        className={cn(
          "animate-spin rounded-full border-t-brand-golden-yellow border-r-brand-golden-yellow/50 border-b-transparent border-l-transparent drop-shadow-[0_0_10px_rgba(255,184,0,0.8)]",
          sizeClasses[size]
        )}
      />
      {/* Inner glowing dot for larger sizes */}
      {size !== "sm" && (
        <div className="absolute w-1.5 h-1.5 bg-brand-golden-yellow rounded-full animate-pulse drop-shadow-[0_0_5px_rgba(255,184,0,1)]" />
      )}
    </div>
  );
};
