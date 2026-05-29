import { cn } from "@/utils/cn";

type AdSlotProps = {
  label?: string;
  className?: string;
  variant?: "banner" | "sidebar" | "inline";
};

export function AdSlot({ label = "Advertisement", className, variant = "banner" }: AdSlotProps) {
  return (
    <aside
      className={cn(
        "flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/80 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-500",
        variant === "banner" && "min-h-24",
        variant === "inline" && "min-h-28",
        variant === "sidebar" && "min-h-80",
        className
      )}
      aria-label={label}
    >
      {label}
    </aside>
  );
}
