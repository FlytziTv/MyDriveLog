import { Maintenance, Expense } from "@prisma/client";
import { HistoryItem } from "@/types";

export function formatToHistoryItems(
  maintenances: Maintenance[],
  expenses: Expense[],
): HistoryItem[] {
  return [
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
}
