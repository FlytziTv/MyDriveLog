import { Maintenance, Expense, SubscriptionPlan } from "@prisma/client";
import { HistoryItem } from "@/types";

export function formatToHistoryItems(
  maintenances: Maintenance[],
  expenses: Expense[],
  plan: SubscriptionPlan = "PREMIUM",
): HistoryItem[] {
  const items: HistoryItem[] = [
    ...maintenances.map((m) => ({
      id: m.id,
      vehicleId: m.vehicleId,
      kind: "maintenance" as const,
      date: m.date.toISOString(),
      cost: m.cost ?? 0,
      km: m.mileage ?? undefined,
      type: m.type,
    })),
    ...expenses.map((e) => ({
      id: e.id,
      vehicleId: e.vehicleId,
      kind: "expense" as const,
      date: e.date.toISOString(),
      cost: e.amount,
      km: undefined,
      type: e.category,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (plan === "FREE") {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    return items.filter((item) => new Date(item.date) >= sixMonthsAgo);
  }

  return items;
}
