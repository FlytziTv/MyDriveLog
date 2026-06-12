import { getAllMaintenancesForUser } from "@/server/queries/maintenance";
import { getAllExpensesForUser } from "@/server/queries/expense";
import HistoriqueClient from "@/components/SectionClient/HistoriqueClient";
import { formatToHistoryItems } from "@/lib/history-utils";
import { getVehicles } from "@/server/queries/vehicle";
import { getPreferences } from "@/server/queries/preferences";

export default async function HistoriquePage() {
  const [maintenances, expenses, vehicles, preferences] = await Promise.all([
    getAllMaintenancesForUser(),
    getAllExpensesForUser(),
    getVehicles(),
    getPreferences(),
  ]);

  // Utilisation de la fonction centralisée
  const initialHistory = formatToHistoryItems(maintenances, expenses);

  return (
    <HistoriqueClient
      initialHistory={initialHistory}
      vehicles={vehicles}
      currency={preferences?.currency ?? "EUR"}
      distanceUnit={preferences?.distanceUnit ?? "KM"}
    />
  );
}
