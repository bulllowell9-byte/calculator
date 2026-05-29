"use client";

import {
  Calculator,
  Download,
  FileText,
  Printer,
  RotateCcw,
  Save,
  Share2,
  TrendingDown
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { amortizationToCsv, calculateMortgage, defaultInputs, MortgageInputs } from "@/lib/mortgage";
import { formatCurrency, formatMonths, formatNumber, formatPercent } from "@/utils/format";
import { cn } from "@/utils/cn";
import { InputField } from "./input-field";

const STORAGE_KEY = "refinance-calculator-inputs-v1";

function StatCard({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{value}</p>
      {helper ? <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helper}</p> : null}
    </div>
  );
}

export function RefinanceCalculator() {
  const [inputs, setInputs] = useLocalStorage<MortgageInputs>(STORAGE_KEY, defaultInputs);
  const [notice, setNotice] = useState("");
  const results = useMemo(() => calculateMortgage(inputs), [inputs]);

  const chartData = useMemo(
    () =>
      results.annualSummary.slice(0, 30).map((row) => ({
        year: `Yr ${row.year}`,
        principal: Math.round(row.principal),
        interest: Math.round(row.interest),
        balance: Math.round(row.balance)
      })),
    [results.annualSummary]
  );

  const comparisonData = [
    {
      name: "Current loan",
      monthly: Math.round(results.currentMonthlyPayment),
      interest: Math.round(results.currentTotalInterest)
    },
    {
      name: "Refinance",
      monthly: Math.round(results.newMonthlyPayment),
      interest: Math.round(results.newTotalInterest + inputs.closingCosts)
    }
  ];

  function updateField<K extends keyof MortgageInputs>(key: K, value: MortgageInputs[K]) {
    setInputs((current) => ({ ...current, [key]: Math.max(0, Number(value) || 0) }));
  }

  function reset() {
    setInputs(defaultInputs);
    setNotice("Calculator reset to sample values.");
  }

  async function shareResults() {
    const text = `Refinance estimate: ${formatCurrency(results.newMonthlyPayment)} new monthly payment, ${formatCurrency(
      results.monthlySavings
    )} monthly savings, break-even in ${formatMonths(results.breakEvenMonths)}.`;

    if (navigator.share) {
      await navigator.share({ title: "Refinance calculator result", text });
      return;
    }

    await navigator.clipboard.writeText(text);
    setNotice("Result copied to clipboard.");
  }

  function downloadCsv() {
    const blob = new Blob([amortizationToCsv(results.amortization)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "refinance-amortization-schedule.csv";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Amortization schedule downloaded.");
  }

  function printResults() {
    window.print();
  }

  const totalSavingsTone = results.totalLifetimeSavings >= 0 ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300";

  return (
    <section id="calculator" className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="New monthly payment"
            value={formatCurrency(results.newMonthlyPayment)}
            helper="Principal, interest, taxes, insurance, PMI"
          />
          <StatCard
            label="Monthly savings"
            value={formatCurrency(results.monthlySavings)}
            helper={results.monthlySavings >= 0 ? "Estimated payment reduction" : "Estimated payment increase"}
          />
          <StatCard
            label="Break-even point"
            value={Number.isFinite(results.breakEvenMonths) ? formatMonths(results.breakEvenMonths) : "No break-even"}
            helper="Time to recover closing costs"
          />
          <StatCard
            label="Lifetime savings"
            value={formatCurrency(results.totalLifetimeSavings)}
            helper="Interest savings minus closing costs"
          />
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">Payment and interest comparison</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Compare the current mortgage with the refinance scenario.
              </p>
            </div>
            <TrendingDown className="h-6 w-6 text-finance-600 dark:text-finance-300" aria-hidden="true" />
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `$${formatNumber(Number(value) / 1000)}k`} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar dataKey="monthly" name="Monthly payment" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="interest" name="Total interest/cost" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">Amortization summary</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Annual principal, interest, and remaining balance for the new loan.
              </p>
            </div>
            <button
              type="button"
              onClick={downloadCsv}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-finance-700 dark:bg-white dark:text-slate-950 dark:hover:bg-finance-100"
            >
              <Download className="h-4 w-4" />
              CSV
            </button>
          </div>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
                <defs>
                  <linearGradient id="balance" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.34} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} interval="preserveStartEnd" />
                <YAxis tickFormatter={(value) => `$${formatNumber(Number(value) / 1000)}k`} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Area type="monotone" dataKey="balance" name="Remaining balance" stroke="#2563eb" fill="url(#balance)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-950">
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">Mortgage comparison table</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-3">Metric</th>
                  <th className="px-5 py-3">Current mortgage</th>
                  <th className="px-5 py-3">Refinance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  ["Principal and interest", formatCurrency(results.currentPrincipalAndInterest), formatCurrency(results.newPrincipalAndInterest)],
                  ["Total monthly payment", formatCurrency(results.currentMonthlyPayment), formatCurrency(results.newMonthlyPayment)],
                  ["Interest rate", formatPercent(inputs.currentRate), formatPercent(inputs.newRate)],
                  ["Remaining term", `${inputs.remainingTermYears} years`, `${inputs.newTermYears} years`],
                  ["Total interest", formatCurrency(results.currentTotalInterest), formatCurrency(results.newTotalInterest)]
                ].map((row) => (
                  <tr key={row[0]} className="text-slate-700 dark:text-slate-200">
                    <td className="px-5 py-4 font-semibold">{row[0]}</td>
                    <td className="px-5 py-4">{row[1]}</td>
                    <td className="px-5 py-4">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">Refinance inputs</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Adjust the numbers to estimate savings.</p>
            </div>
            <Calculator className="h-6 w-6 text-finance-600 dark:text-finance-300" aria-hidden="true" />
          </div>

          <div className="mt-5 grid gap-4">
            <InputField id="currentBalance" label="Current loan balance" value={inputs.currentBalance} prefix="$" step={1000} onChange={(value) => updateField("currentBalance", value)} />
            <div className="grid grid-cols-2 gap-3">
              <InputField id="currentRate" label="Current rate" value={inputs.currentRate} suffix="%" step={0.125} onChange={(value) => updateField("currentRate", value)} />
              <InputField id="remainingTermYears" label="Remaining term" value={inputs.remainingTermYears} suffix="yr" step={1} onChange={(value) => updateField("remainingTermYears", value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField id="newRate" label="New rate" value={inputs.newRate} suffix="%" step={0.125} onChange={(value) => updateField("newRate", value)} />
              <InputField id="newTermYears" label="New term" value={inputs.newTermYears} suffix="yr" step={1} onChange={(value) => updateField("newTermYears", value)} />
            </div>
            <InputField id="closingCosts" label="Closing costs" value={inputs.closingCosts} prefix="$" step={100} onChange={(value) => updateField("closingCosts", value)} />
            <div className="grid grid-cols-2 gap-3">
              <InputField id="propertyTaxes" label="Property taxes" value={inputs.propertyTaxes} prefix="$" help="annual" step={100} onChange={(value) => updateField("propertyTaxes", value)} />
              <InputField id="insurance" label="Insurance" value={inputs.insurance} prefix="$" help="annual" step={50} onChange={(value) => updateField("insurance", value)} />
            </div>
            <InputField id="pmi" label="PMI" value={inputs.pmi} prefix="$" help="monthly optional" step={25} onChange={(value) => updateField("pmi", value)} />
          </div>

          <div className="mt-5 rounded-lg bg-finance-50 p-4 dark:bg-finance-950/30">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Estimated refinance outcome</p>
            <p className={cn("mt-2 text-3xl font-bold", totalSavingsTone)}>{formatCurrency(results.totalLifetimeSavings)}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Total lifetime savings after {formatCurrency(results.totalRefinanceCost)} in refinance costs.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button type="button" onClick={shareResults} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 transition hover:border-finance-300 hover:text-finance-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button type="button" onClick={printResults} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 transition hover:border-finance-300 hover:text-finance-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <Printer className="h-4 w-4" />
              Print
            </button>
            <button type="button" onClick={() => setNotice("Your calculation is saved locally in this browser.")} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 transition hover:border-finance-300 hover:text-finance-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <Save className="h-4 w-4" />
              Save
            </button>
            <button type="button" onClick={reset} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 transition hover:border-finance-300 hover:text-finance-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>

          {notice ? (
            <p className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300" role="status">
              {notice}
            </p>
          ) : null}

          <div className="mt-5 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            <FileText className="mt-0.5 h-4 w-4 shrink-0" />
            Estimates are for planning only and do not include lender-specific fees, credits, rate locks, or taxes beyond the inputs shown.
          </div>
        </div>
      </aside>
    </section>
  );
}
