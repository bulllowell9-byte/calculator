import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function LegalPage({ title, description, children }: LegalPageProps) {
  return (
    <main className="bg-slate-50 py-12 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-finance-700 dark:text-finance-300">RefiWise</p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">{title}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>
          <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600 dark:text-slate-300">{children}</div>
        </div>
      </div>
    </main>
  );
}
