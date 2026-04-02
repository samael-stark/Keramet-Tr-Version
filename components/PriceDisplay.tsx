"use client";

import { useEffect, useState } from "react";

export default function PriceDisplay({ basePrice }: { basePrice: number }) {
  const [currency, setCurrency] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [ratesLoaded, setRatesLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("currency");
    if (saved) setCurrency(saved);
  }, []);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("/api/exchange", { cache: "no-store" });
        const data = await res.json();
        setRates(data?.rates || {});
      } catch {
        setRates({});
      } finally {
        setRatesLoaded(true);
      }
    }

    fetchRates();
  }, []);

  const convertPrice = (usd: number) => {
    if (currency === "USD") return usd;
    const rate = rates[currency];
    if (!rate) return usd;
    return usd * rate;
  };

  const formatted = ratesLoaded
    ? `${currency} ${convertPrice(basePrice).toFixed(2)}`
    : `USD ${basePrice.toFixed(2)}`;

  return <>{formatted}</>;
}
