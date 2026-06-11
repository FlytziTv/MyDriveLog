import { HistoryItem } from "@/types";

export function formatToHistoryItems(
  maintenances: any[],
  expenses: any[],
): HistoryItem[] {
  return [
    ...maintenances.map((m) => ({
      id: m.id,
      vehicleId: m.vehicleId,
      kind: "maintenance" as const,
      date: m.date instanceof Date ? m.date.toISOString() : m.date,
      cost: m.cost ?? 0,
      km: m.mileage ?? undefined,
      type: m.category ?? m.type, // Sécurité si le champ change
    })),
    ...expenses.map((e) => ({
      id: e.id,
      vehicleId: e.vehicleId,
      kind: "expense" as const,
      date: e.date instanceof Date ? e.date.toISOString() : e.date,
      cost: e.amount ?? 0,
      km: undefined,
      type: e.category,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // J'ai rajouté le tri par date directement ici, comme ça c'est fait une fois pour toutes !
}
