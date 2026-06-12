import StatsCard from "@/components/dashboard/StatsCard";
import { Bell, Car, TrendingUp } from "lucide-react";
import SectionDash from "../../../components/dashboard/SectionDash";
import { VehicleVerticalCard } from "@/components/car/MiniaVehicleCard";
import MiniInterCard from "@/components/Inter/MiniInterCard";
import { resolveMeta } from "@/lib/category";
import Link from "next/link";
import { getVehicles } from "@/server/queries/vehicle";
import { getAllMaintenancesForUser } from "@/server/queries/maintenance";
import { getAllExpensesForUser } from "@/server/queries/expense";
import { formatToHistoryItems } from "@/lib/history-utils";
import { getCurrentUser } from "@/server/queries/user";

export default async function DashboardPage() {
  // Récupère les données nécessaires pour le dashboard
  const [vehicles, maintenances, expenses] = await Promise.all([
    getVehicles(),
    getAllMaintenancesForUser(),
    getAllExpensesForUser(),
  ]);

  // Calcule le total des dépenses du mois en cours
  const globalHistory = formatToHistoryItems(maintenances, expenses);

  // Filtre les éléments de l'historique pour ne garder que ceux du mois en cours
  const now = new Date();
  const currentMonthExpenses = globalHistory.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getMonth() === now.getMonth() &&
      itemDate.getFullYear() === now.getFullYear()
    );
  });

  // Calcule le total des coûts pour le mois en cours
  const totalCeMois = currentMonthExpenses.reduce(
    (acc, item) => acc + (item.cost ?? 0),
    0,
  );

  const user = await getCurrentUser();

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Dashboard</h2>
          <p className="text-[14px] text-neutral-500">
            Bonjour{" "}
            {user?.firstName || user?.name?.split(" ")[0] || "Utilisateur"} !
          </p>
        </div>
        <Link
          href="/notifications"
          className="w-10 h-10 rounded-lg hover:bg-neutral-100 flex items-center justify-center relative transition-colors"
        >
          <Bell className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </Link>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard icon={Car} value={vehicles.length} label="Véhicules" />
        <StatsCard
          icon={TrendingUp}
          value={`${totalCeMois.toFixed(2)}€`}
          label="Ce mois"
        />
      </div>

      {vehicles.length > 0 && (
        <SectionDash title="Véhicules" link="/vehicles" textLink="Voir tous">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {vehicles.slice(0, 3).map((vehicle) => (
              <VehicleVerticalCard
                key={vehicle.id}
                id={vehicle.id}
                name={vehicle.name}
                brand={vehicle.brand}
                model={vehicle.model}
                year={vehicle.year}
                plate={vehicle.plate ?? undefined}
                km={vehicle.mileage}
              />
            ))}
          </div>
        </SectionDash>
      )}

      {globalHistory.length > 0 && (
        <SectionDash title="Activité récente">
          <div className="flex flex-col gap-2">
            {/* Affiche les 6 dernières activités (entretien + dépenses) de tous les véhicules */}
            {globalHistory.slice(0, 6).map((item) => {
              const { label, icon } = resolveMeta(item);
              const vehicle = vehicles.find((v) => v.id === item.vehicleId);

              return (
                <MiniInterCard
                  key={item.id}
                  icon={icon}
                  type={label}
                  data={`${vehicle?.name ?? "Véhicule inconnu"} · ${new Date(
                    item.date,
                  ).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                  })}`}
                  cost={item.cost}
                />
              );
            })}
          </div>
        </SectionDash>
      )}
    </>
  );
}
