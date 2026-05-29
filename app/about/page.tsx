import type { Metadata } from "next";

import { LegalPage } from "@/components/content/legal-page";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about RefiWise, a free educational mortgage refinance calculator and homeowner planning resource.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About RefiWise",
    description: "Free educational refinance calculator tools for U.S. homeowners.",
    url: "/about"
  }
};

export default function AboutPage() {
  return (
    <LegalPage
      title="About RefiWise"
      description="RefiWise helps homeowners estimate refinance payments, interest savings, closing costs, break-even timelines, and amortization schedules."
    >
      <section>
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Our purpose</h2>
        <p className="mt-2">
          We build simple, transparent mortgage calculators for educational planning. The goal is to make refinance math
          easier to understand before you compare lenders, request quotes, or speak with a licensed mortgage professional.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">How our tools work</h2>
        <p className="mt-2">
          Our calculator uses standard amortization formulas and user-provided inputs. Results are estimates and may
          differ from lender disclosures, APR calculations, escrow adjustments, tax treatment, or final closing costs.
        </p>
      </section>
    </LegalPage>
  );
}
