import type { Metadata } from "next";
import Link from "next/link";

import { AdSlot } from "@/components/ads/ad-slot";
import { RefinanceCalculator } from "@/components/calculator/refinance-calculator";
import { JsonLd } from "@/components/seo/json-ld";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Refinance Calculator - Estimate Your Mortgage Savings",
    description:
      "Calculate monthly payments, interest savings, refinance costs, and break-even timelines with a modern mortgage refinance calculator.",
    openGraph: {
      title: "Refinance Calculator - Estimate Your Mortgage Savings",
      description:
        "Estimate your refinance payment, monthly savings, lifetime interest savings, and break-even point.",
      url: "/",
      type: "website"
    }
  };
}

const faq = [
  {
    question: "Is refinancing worth it?",
    answer:
      "Refinancing can be worth it when the monthly savings, lower rate, shorter term, or cash-flow benefit outweigh the closing costs and time needed to break even."
  },
  {
    question: "What is a refinance break-even point?",
    answer:
      "The break-even point is the number of months it takes for monthly savings to recover refinance closing costs."
  },
  {
    question: "Does this refinance calculator include taxes and insurance?",
    answer:
      "Yes. You can enter annual property taxes, annual insurance, and optional monthly PMI to estimate a fuller monthly housing payment."
  },
  {
    question: "Can refinancing increase total interest?",
    answer:
      "Yes. A lower monthly payment can still increase lifetime interest if the new loan term is much longer than the remaining term on the current mortgage."
  }
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Refinance Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  description:
    "A mortgage refinance calculator for estimating monthly payments, refinance savings, closing costs, break-even timelines, and amortization schedules.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Refinance payment calculator",
    "Mortgage refinance savings calculator",
    "Break-even calculator",
    "Amortization schedule CSV export"
  ],
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  }
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="text-base font-bold text-slate-950 dark:text-white" aria-label="Refinance calculator home">
            RefiWise
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300 md:flex" aria-label="Primary navigation">
            <Link href="#calculator" className="transition hover:text-finance-700 dark:hover:text-finance-300">
              Calculator
            </Link>
            <Link href="#guide" className="transition hover:text-finance-700 dark:hover:text-finance-300">
              Guide
            </Link>
            <Link href="#faq" className="transition hover:text-finance-700 dark:hover:text-finance-300">
              FAQ
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_72%)] dark:border-slate-800 dark:bg-[linear-gradient(180deg,#082f49_0%,#020617_72%)]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-finance-700 dark:text-finance-300">
                Mortgage refinance calculator
              </p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-normal text-slate-950 dark:text-white sm:text-5xl">
                Refinance Calculator – Estimate Your Mortgage Savings
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Calculate monthly payments, interest savings, and break-even timelines for refinancing your mortgage.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#calculator"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-finance-700 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-finance-800"
                >
                  Start calculating
                </Link>
                <Link
                  href="#guide"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 shadow-sm transition hover:border-finance-300 hover:text-finance-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  Read refinance guide
                </Link>
              </div>
            </div>
            <AdSlot variant="sidebar" className="hidden lg:flex" label="Premium finance ad" />
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <AdSlot className="mb-8" label="Top banner ad" />
          <RefinanceCalculator />
        </div>

        <section id="guide" className="border-y border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
            <div className="space-y-8">
              <article className="max-w-none space-y-4 text-slate-600 dark:text-slate-300">
                <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white">What is refinancing?</h2>
                <p className="leading-7">
                  Refinancing replaces your existing mortgage with a new home loan. Homeowners often refinance to lower
                  their interest rate, reduce their monthly payment, change loan terms, remove mortgage insurance, or
                  access equity through a cash-out refinance.
                </p>
                <h2 className="pt-4 text-2xl font-extrabold text-slate-950 dark:text-white">How refinancing works</h2>
                <p className="leading-7">
                  A lender pays off your current mortgage and issues a new loan with its own rate, term, monthly payment,
                  and closing costs. The strongest refinance decisions compare payment savings with the total cost of the
                  new loan over time.
                </p>
              </article>

              <AdSlot variant="inline" label="In-content finance ad" />

              <div className="grid gap-5 md:grid-cols-2">
                <article className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h2 className="text-xl font-bold text-slate-950 dark:text-white">Pros and cons</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    <li>Lower monthly payment when rates or loan terms improve.</li>
                    <li>Potential lifetime interest savings with a lower rate or shorter term.</li>
                    <li>Closing costs can delay or erase savings if you sell too soon.</li>
                    <li>Extending the term may increase total interest paid.</li>
                  </ul>
                </article>
                <article className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h2 className="text-xl font-bold text-slate-950 dark:text-white">Refinance tips</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    <li>Compare APR, not just the advertised interest rate.</li>
                    <li>Ask whether lender credits increase the rate.</li>
                    <li>Check your break-even point against how long you plan to stay.</li>
                    <li>Run both 15-year and 30-year options before choosing.</li>
                  </ul>
                </article>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <AdSlot variant="sidebar" label="Sidebar ad" />
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                  <h2 className="text-lg font-bold text-slate-950 dark:text-white">High-intent calculator keywords</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Built for refinance calculator, mortgage refinance calculator, refinance savings calculator, and
                    refinance payment calculator search intent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-slate-50 py-12 dark:bg-slate-950">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">Refinance calculator FAQ</h2>
            <div className="mt-6 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
              {faq.map((item) => (
                <details key={item.question} className="group p-5">
                  <summary className="cursor-pointer list-none text-base font-bold text-slate-950 dark:text-white">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
