import type { Metadata } from "next";

import { LegalPage } from "@/components/content/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact RefiWise about the mortgage refinance calculator website.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact RefiWise",
    description: "Contact information for RefiWise.",
    url: "/contact"
  }
};

export default function ContactPage() {
  return (
    <LegalPage title="Contact" description="Have a question about RefiWise or our mortgage refinance calculator?">
      <section>
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">General inquiries</h2>
        <p className="mt-2">
          Email: <a className="font-semibold text-finance-700 dark:text-finance-300" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Before you send</h2>
        <p className="mt-2">
          Please do not include Social Security numbers, full loan account numbers, bank information, or other sensitive
          personal financial details. We cannot provide personalized mortgage, tax, legal, or investment advice.
        </p>
      </section>
    </LegalPage>
  );
}
