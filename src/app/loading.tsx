import { CyberLoader } from "@/components/ui/CyberLoader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        <CyberLoader size="lg" />
        <div className="font-brand-heading text-brand-golden-yellow text-sm md:text-base tracking-[0.3em] uppercase animate-pulse drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]">
          System Initializing...
        </div>
      </div>
    </div>
  );
}
