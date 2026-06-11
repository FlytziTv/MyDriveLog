import { getAllMaintenancesForUser } from "@/server/queries/maintenance";
import { getAllExpensesForUser } from "@/server/queries/expense";
import HistoriqueClient from "@/components/History/HistoriqueClient";
import { formatToHistoryItems } from "@/lib/history-utils";
import { getVehicles } from "@/server/queries/vehicle";

export default async function HistoriquePage() {
  const [maintenances, expenses] = await Promise.all([
    getAllMaintenancesForUser(),
    getAllExpensesForUser(),
  ]);

  // Récupération des véhicules pour afficher les noms dans l'historique
  const vehicles = await getVehicles();

  // Utilisation de la fonction centralisée
  const initialHistory = formatToHistoryItems(maintenances, expenses);

  return (
    <HistoriqueClient initialHistory={initialHistory} vehicles={vehicles} />
  );
}
