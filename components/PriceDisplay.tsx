"use client";

export default function PriceDisplay({
  basePrice,
}: {
  basePrice: number;
}) {
  const formatted = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(basePrice);

  return <>{formatted}</>;
}
