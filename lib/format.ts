import { Currency, DistanceUnit } from "@prisma/client";

const currencySymbols: Record<Currency, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

export function formatCurrency(amount: number, currency: Currency) {
  return `${amount.toLocaleString()} ${currencySymbols[currency]}`;
}

export function formatDistance(km: number, unit: DistanceUnit) {
  if (unit === "MILES") {
    const miles = Math.round(km * 0.621371);
    return `${miles.toLocaleString()} mi`;
  }
  return `${km.toLocaleString()} km`;
}
