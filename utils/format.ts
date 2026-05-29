export function formatCurrency(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatNumber(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatPercent(value: number) {
  return `${formatNumber(value, 3)}%`;
}

export function formatMonths(months: number) {
  if (!Number.isFinite(months) || months <= 0) {
    return "Immediate";
  }

  const rounded = Math.ceil(months);
  const years = Math.floor(rounded / 12);
  const remainder = rounded % 12;

  if (years === 0) {
    return `${rounded} mo`;
  }

  if (remainder === 0) {
    return `${years} yr`;
  }

  return `${years} yr ${remainder} mo`;
}
