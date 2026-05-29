import Link from "next/link";

import { footerNav, mainNav, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto_auto] lg:px-8">
        <div className="max-w-xl">
          <Link href="/" className="text-lg font-extrabold text-slate-950 dark:text-white">
            {siteConfig.name}
          </Link>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Free educational mortgage refinance tools for U.S. homeowners. Estimates are for planning purposes and are
            not loan offers, tax advice, or financial advice.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-950 dark:text-white">Tools</h2>
          <div className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-400">
            {mainNav.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-finance-700 dark:hover:text-finance-300">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-950 dark:text-white">Company</h2>
          <div className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-400">
            {footerNav.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-finance-700 dark:hover:text-finance-300">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 px-4 py-5 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
