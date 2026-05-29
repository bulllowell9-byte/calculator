import Link from "next/link";

import { mainNav } from "@/lib/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="RefiWise home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-finance-700 text-sm font-black text-white shadow-sm">
            RW
          </span>
          <span className="text-base font-extrabold text-slate-950 dark:text-white">RefiWise</span>
        </Link>

        <nav
          className="hidden items-center gap-5 text-sm font-semibold text-slate-600 dark:text-slate-300 lg:flex"
          aria-label="Primary navigation"
        >
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-finance-700 dark:hover:text-finance-300">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#calculator"
            className="hidden h-10 items-center justify-center rounded-lg bg-finance-700 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-finance-800 sm:inline-flex"
          >
            Calculate
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <nav
        className="flex gap-4 overflow-x-auto border-t border-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:border-slate-800 dark:text-slate-400 lg:hidden"
        aria-label="Mobile navigation"
      >
        {mainNav.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 transition hover:text-finance-700 dark:hover:text-finance-300">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
