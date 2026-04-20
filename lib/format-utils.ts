// Utility functions for formatting values

export function formatCurrency(value: number | string): string {
  const num = typeof value === "string" ? Number.parseFloat(value.replace(/\s/g, "")) : value
  if (isNaN(num)) return ""
  return num.toLocaleString("pt-PT", { maximumFractionDigits: 0 }).replace(/,/g, " ")
}

export function parseCurrency(value: string): number {
  const cleaned = value.replace(/\s/g, "").replace(/,/g, ".")
  const num = Number.parseFloat(cleaned)
  return isNaN(num) ? 0 : num
}

export function formatArea(value: number): string {
  return value.toLocaleString("pt-PT", { maximumFractionDigits: 0 }).replace(/,/g, " ")
}
