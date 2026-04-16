export type Currency = "USD" | "TRY" | "EUR" | "GBP" | "AED";

const STORAGE_KEY = "currency";

export const rates: Record<Currency, number> = {
  USD: 1,
  TRY: 32,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67,
};

export function getCurrency(): Currency {
  if (typeof window === "undefined") return "USD";
  const saved = localStorage.getItem(STORAGE_KEY) as Currency | null;
  return saved && saved in rates ? saved : "USD";
}

export function setCurrency(currency: Currency) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, currency);
  window.dispatchEvent(new Event("currencyUpdated"));
}

export function convertPrice(basePriceUSD: number, currency: Currency): number {
  const rate = rates[currency] ?? 1;
  return basePriceUSD * rate;
}

export function formatPrice(amount: number, currency: Currency): string {
  switch (currency) {
    case "TRY":
      return `TRY ${amount.toFixed(2)}`;
    case "EUR":
      return `EUR ${amount.toFixed(2)}`;
    case "GBP":
      return `GBP ${amount.toFixed(2)}`;
    case "AED":
      return `AED ${amount.toFixed(2)}`;
    case "USD":
    default:
      return `USD ${amount.toFixed(2)}`;
  }
}
