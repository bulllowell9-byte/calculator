import type { Metadata } from "next";

import { LegalPage } from "@/components/content/legal-page";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important mortgage refinance calculator disclaimer and limitations.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: "Disclaimer | RefiWise",
    description: "Important limitations for RefiWise mortgage calculator estimates.",
    url: "/disclaimer"
  }
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      description="RefiWise estimates are designed to support planning and education, not to replace lender disclosures or professional guidance."
    >
      <section>
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Estimate limitations</h2>
        <p className="mt-2">
          Results depend on the information you enter and simplified assumptions. Actual refinance costs, APR, prepaid
          items, escrow requirements, lender credits, taxes, and insurance may vary.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">No lender relationship</h2>
        <p className="mt-2">
          RefiWise is not a lender, broker, credit counselor, or financial advisor. Using this site does not create a
          lender-client or advisor-client relationship.
        </p>
      </section>
    </LegalPage>
  );
}
