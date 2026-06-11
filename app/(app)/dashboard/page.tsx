import StatsCard from "@/components/dashboard/StatsCard";
import { Bell, Car, TrendingUp } from "lucide-react";
import SectionDash from "../../../components/dashboard/SectionDash";
import { VehicleVerticalCard } from "@/components/car/MiniaVehicleCard";
import MiniInterCard from "@/components/Inter/MiniInterCard";
import { FakeHistory, FakeVehicles } from "@/lib/fake";
import { resolveMeta } from "@/lib/category";
import Link from "next/link";
import { getVehicles } from "@/server/queries/vehicle";

export default async function DashboardPage() {
  const vehicles = await getVehicles();

  // Calcule la somme totale des dépenses pour tous les véhicules
  const total = FakeVehicles.reduce((acc, vehicle) => {
    const vehicleHistory = FakeHistory.filter(
      (item) => item.vehicleId === vehicle.id,
    );
    return acc + vehicleHistory.reduce((sum, item) => sum + item.cost, 0);
  }, 0);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Dashboard</h2>
          <p className="text-[14px] text-neutral-500">Bonjour Alexis</p>
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
          value={`${total.toFixed(2)}€`}
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

      <SectionDash title="Activité récente">
        <div className="flex flex-col gap-2">
          {/* Affiche les 6 dernières activités (entretien + dépenses) de tous les véhicules */}
          {FakeHistory.slice(0, 6).map((item) => {
            const { label, icon } = resolveMeta(item);
            const vehicle = FakeVehicles.find((v) => v.id === item.vehicleId);

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
    </>
  );
}
