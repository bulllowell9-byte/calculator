import type { Metadata } from "next";

import { LegalPage } from "@/components/content/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the RefiWise privacy policy for this mortgage refinance calculator website.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | RefiWise",
    description: "Privacy information for RefiWise users.",
    url: "/privacy-policy"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains what information may be collected when you use RefiWise."
    >
      <section>
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Information you enter</h2>
        <p className="mt-2">
          Calculator inputs are processed in your browser. Saved calculator values are stored locally on your device and
          are not submitted to us through the calculator.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Analytics and advertising</h2>
        <p className="mt-2">
          We may use analytics and advertising partners, including Google AdSense, to measure site performance and display
          relevant ads. These services may use cookies or similar technologies according to their own policies.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Contact</h2>
        <p className="mt-2">
          For privacy questions, contact us through the contact page. Do not send sensitive personal or financial
          information through ordinary email.
        </p>
      </section>
    </LegalPage>
  );
}
