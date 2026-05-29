export type MortgageInputs = {
  currentBalance: number;
  currentRate: number;
  remainingTermYears: number;
  newRate: number;
  newTermYears: number;
  closingCosts: number;
  propertyTaxes: number;
  insurance: number;
  pmi: number;
};

export type AmortizationRow = {
  month: number;
  year: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
};

export type MortgageResults = {
  currentPrincipalAndInterest: number;
  newPrincipalAndInterest: number;
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  currentTotalInterest: number;
  newTotalInterest: number;
  totalInterestSavings: number;
  totalLifetimeSavings: number;
  breakEvenMonths: number;
  totalRefinanceCost: number;
  newLoanAmount: number;
  currentPayoffTotal: number;
  refinancePayoffTotal: number;
  amortization: AmortizationRow[];
  annualSummary: Array<{
    year: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
};

export const defaultInputs: MortgageInputs = {
  currentBalance: 325000,
  currentRate: 6.75,
  remainingTermYears: 24,
  newRate: 5.875,
  newTermYears: 30,
  closingCosts: 6200,
  propertyTaxes: 5200,
  insurance: 1800,
  pmi: 0
};

export function monthlyPrincipalAndInterest(principal: number, annualRate: number, termYears: number) {
  const months = Math.max(1, Math.round(termYears * 12));
  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return principal / months;
  }

  const factor = Math.pow(1 + monthlyRate, months);
  return principal * ((monthlyRate * factor) / (factor - 1));
}

export function buildAmortization(principal: number, annualRate: number, termYears: number): AmortizationRow[] {
  const rows: AmortizationRow[] = [];
  const months = Math.max(1, Math.round(termYears * 12));
  const monthlyRate = annualRate / 100 / 12;
  const payment = monthlyPrincipalAndInterest(principal, annualRate, termYears);
  let balance = principal;
  let cumulativeInterest = 0;

  for (let month = 1; month <= months && balance > 0.01; month += 1) {
    const interest = balance * monthlyRate;
    const principalPaid = Math.min(payment - interest, balance);
    balance = Math.max(0, balance - principalPaid);
    cumulativeInterest += interest;

    rows.push({
      month,
      year: Math.ceil(month / 12),
      payment,
      principal: principalPaid,
      interest,
      balance,
      cumulativeInterest
    });
  }

  return rows;
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResults {
  const currentPrincipalAndInterest = monthlyPrincipalAndInterest(
    inputs.currentBalance,
    inputs.currentRate,
    inputs.remainingTermYears
  );
  const newPrincipalAndInterest = monthlyPrincipalAndInterest(inputs.currentBalance, inputs.newRate, inputs.newTermYears);
  const monthlyEscrow = (inputs.propertyTaxes + inputs.insurance) / 12 + inputs.pmi;
  const currentMonthlyPayment = currentPrincipalAndInterest + monthlyEscrow;
  const newMonthlyPayment = newPrincipalAndInterest + monthlyEscrow;
  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;

  const currentAmortization = buildAmortization(inputs.currentBalance, inputs.currentRate, inputs.remainingTermYears);
  const newAmortization = buildAmortization(inputs.currentBalance, inputs.newRate, inputs.newTermYears);

  const currentTotalInterest = currentAmortization.reduce((sum, row) => sum + row.interest, 0);
  const newTotalInterest = newAmortization.reduce((sum, row) => sum + row.interest, 0);
  const totalInterestSavings = currentTotalInterest - newTotalInterest;
  const totalLifetimeSavings = totalInterestSavings - inputs.closingCosts;
  const breakEvenMonths = monthlySavings > 0 ? inputs.closingCosts / monthlySavings : Number.POSITIVE_INFINITY;
  const currentPayoffTotal = currentPrincipalAndInterest * inputs.remainingTermYears * 12;
  const refinancePayoffTotal = newPrincipalAndInterest * inputs.newTermYears * 12 + inputs.closingCosts;

  const annualSummary = newAmortization.reduce<MortgageResults["annualSummary"]>((summary, row) => {
    const latest = summary[summary.length - 1];

    if (!latest || latest.year !== row.year) {
      summary.push({
        year: row.year,
        principal: row.principal,
        interest: row.interest,
        balance: row.balance
      });
      return summary;
    }

    latest.principal += row.principal;
    latest.interest += row.interest;
    latest.balance = row.balance;
    return summary;
  }, []);

  return {
    currentPrincipalAndInterest,
    newPrincipalAndInterest,
    currentMonthlyPayment,
    newMonthlyPayment,
    monthlySavings,
    currentTotalInterest,
    newTotalInterest,
    totalInterestSavings,
    totalLifetimeSavings,
    breakEvenMonths,
    totalRefinanceCost: inputs.closingCosts,
    newLoanAmount: inputs.currentBalance,
    currentPayoffTotal,
    refinancePayoffTotal,
    amortization: newAmortization,
    annualSummary
  };
}

export function amortizationToCsv(rows: AmortizationRow[]) {
  const header = ["Month", "Year", "Payment", "Principal", "Interest", "Remaining Balance", "Cumulative Interest"];
  const body = rows.map((row) => [
    row.month,
    row.year,
    row.payment.toFixed(2),
    row.principal.toFixed(2),
    row.interest.toFixed(2),
    row.balance.toFixed(2),
    row.cumulativeInterest.toFixed(2)
  ]);

  return [header, ...body].map((line) => line.join(",")).join("\n");
}
