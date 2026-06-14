import { getAllMaintenancesForUser } from "@/server/queries/maintenance";
import { getAllExpensesForUser } from "@/server/queries/expense";
import HistoriqueClient from "@/components/SectionClient/HistoriqueClient";
import { formatToHistoryItems } from "@/lib/history-utils";
import { getVehicles } from "@/server/queries/vehicle";
import { getPreferences } from "@/server/queries/preferences";
import { getSubscription } from "@/server/queries/subscription";

export default async function HistoriquePage() {
  const [maintenances, expenses, vehicles, preferences, subscription] =
    await Promise.all([
      getAllMaintenancesForUser(),
      getAllExpensesForUser(),
      getVehicles(),
      getPreferences(),
      getSubscription(),
    ]);

  // Utilisation de la fonction centralisée
  const initialHistory = formatToHistoryItems(
    maintenances,
    expenses,
    subscription?.plan,
  );

  return (
    <HistoriqueClient
      initialHistory={initialHistory}
      vehicles={vehicles}
      currency={preferences?.currency ?? "EUR"}
      distanceUnit={preferences?.distanceUnit ?? "KM"}
    />
  );
}
