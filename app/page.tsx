import type { Metadata } from "next";
import Link from "next/link";

import { AdSlot } from "@/components/ads/ad-slot";
import { RefinanceCalculator } from "@/components/calculator/refinance-calculator";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Refinance Calculator - Estimate Your Mortgage Savings",
    description:
      "Use RefiWise to calculate refinance monthly payments, mortgage savings, closing costs, break-even points, and amortization schedules.",
    alternates: {
      canonical: "/"
    },
    openGraph: {
      title: "Refinance Calculator - Estimate Your Mortgage Savings",
      description:
        "Estimate refinance payments, monthly savings, lifetime interest savings, break-even timelines, and amortization schedules.",
      url: "/",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "Refinance Calculator - Estimate Your Mortgage Savings",
      description: "Calculate refinance payments, interest savings, break-even timelines, and amortization schedules."
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
  },
  {
    question: "What costs should I include in a refinance calculator?",
    answer:
      "Include lender fees, title fees, appraisal costs, recording charges, discount points, and other closing costs. Your official Loan Estimate may show additional prepaid items."
  },
  {
    question: "Should I refinance into a shorter loan term?",
    answer:
      "A shorter term can reduce lifetime interest but may raise the monthly payment. Compare monthly cash flow, total interest, and your long-term plans before choosing."
  }
];

const benefits = [
  {
    title: "Payment-first clarity",
    text: "See estimated principal, interest, taxes, insurance, PMI, and monthly savings in one calculator."
  },
  {
    title: "Break-even guidance",
    text: "Compare closing costs with monthly savings to estimate how long it may take to recover refinance expenses."
  },
  {
    title: "Amortization-ready",
    text: "Review the payoff curve and download a CSV schedule for spreadsheet planning."
  }
];

const educationSections = [
  {
    title: "What is refinancing?",
    text:
      "Refinancing replaces your existing mortgage with a new loan. Homeowners often refinance to lower their interest rate, reduce monthly payments, switch loan terms, remove mortgage insurance, or access home equity."
  },
  {
    title: "How refinancing works",
    text:
      "A lender pays off your current mortgage and creates a new loan with its own rate, term, payment, and closing costs. The best refinance decisions compare both monthly cash flow and total cost over time."
  },
  {
    title: "When to refinance",
    text:
      "Refinancing may make sense when market rates fall, your credit improves, you want to shorten the loan term, you plan to stay beyond the break-even point, or you need a more stable payment structure."
  },
  {
    title: "Break-even point explanation",
    text:
      "The break-even point is the time required for monthly savings to offset refinance closing costs. For example, if closing costs are $6,000 and the payment drops by $250 per month, the break-even point is about 24 months."
  }
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: siteConfig.name,
  url: siteConfig.url,
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
      <main>
        <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-finance-200 bg-finance-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-finance-700 dark:border-finance-800 dark:bg-finance-950/40 dark:text-finance-300">
                Free U.S. mortgage refinance calculator
              </p>
              <h1 className="mt-5 text-4xl font-extrabold tracking-normal text-slate-950 dark:text-white sm:text-5xl">
                Refinance Calculator – Estimate Your Mortgage Savings
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Calculate monthly payments, interest savings, and break-even timelines for refinancing your mortgage.
              </p>
              <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                  No signup required
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                  Local browser save
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                  CSV amortization
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#calculator"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-finance-700 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-finance-800"
                >
                  Start calculating
                </Link>
                <Link
                  href="#refinance-guide"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 shadow-sm transition hover:border-finance-300 hover:text-finance-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  Read refinance guide
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">Designed for refinance decisions</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Compare your current loan against a new rate, term, closing cost estimate, and escrow assumptions before
                  you request lender quotes.
                </p>
              </div>
              <AdSlot variant="sidebar" className="hidden lg:flex" label="Premium finance ad" />
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-10 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 md:grid-cols-3">
              {benefits.map((item) => (
                <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <h2 className="text-lg font-bold text-slate-950 dark:text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <AdSlot className="mb-8" label="Top banner ad" />
          <RefinanceCalculator />
        </div>

        <section id="refinance-guide" className="border-y border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-finance-700 dark:text-finance-300">
                  Homeowner education
                </p>
                <h2 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">Mortgage refinance guide</h2>
              </div>

              <div className="grid gap-5">
                {educationSections.map((item) => (
                  <article key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                    <h3 className="text-xl font-bold text-slate-950 dark:text-white">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{item.text}</p>
                  </article>
                ))}
              </div>

              <AdSlot variant="inline" label="In-content finance ad" />

              <div className="grid gap-5 md:grid-cols-2">
                <article className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h2 className="text-xl font-bold text-slate-950 dark:text-white">Refinance pros and cons</h2>
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
                  <h2 className="text-lg font-bold text-slate-950 dark:text-white">Planning checklist</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Compare APR, closing costs, monthly savings, break-even timing, and how long you expect to keep the
                    home before refinancing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-finance-700 py-12 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h2 className="text-3xl font-extrabold">Ready to compare refinance options?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-finance-100">
                Use the calculator before collecting lender quotes so you know which numbers matter most.
              </p>
            </div>
            <Link
              href="#calculator"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-6 text-sm font-bold text-finance-800 shadow-sm transition hover:bg-finance-50"
            >
              Calculate savings
            </Link>
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
