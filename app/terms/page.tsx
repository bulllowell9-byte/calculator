import type { Metadata } from "next";

import { LegalPage } from "@/components/content/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the RefiWise mortgage refinance calculator website.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Use | RefiWise",
    description: "Terms for using RefiWise tools and educational content.",
    url: "/terms"
  }
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" description="By using RefiWise, you agree to use the site for informational purposes only.">
      <section>
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Educational use</h2>
        <p className="mt-2">
          RefiWise provides calculators and educational content. We do not originate loans, provide loan commitments, or
          guarantee that any lender will offer specific rates or terms.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">No professional advice</h2>
        <p className="mt-2">
          Content on this site is not financial, tax, legal, or investment advice. Consult qualified professionals before
          making decisions based on your personal circumstances.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Acceptable use</h2>
        <p className="mt-2">
          You agree not to misuse the website, interfere with its operation, or rely on estimates as final lender
          disclosures.
        </p>
      </section>
    </LegalPage>
  );
}
