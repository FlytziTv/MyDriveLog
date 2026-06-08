import StatsCard from "@/components/dashboard/StatsCard";
import { Bell, Car, TrendingUp } from "lucide-react";
import SectionDash from "./SectionDash";
import { VehicleVerticalCard } from "@/components/car/MiniaVehicleCard";
import MiniInterCard from "@/components/Inter/MiniInterCard";

export default function DashboardPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Dashboard</h2>
          <p className="text-[14px] text-neutral-500">Bonjour Alexis</p>
        </div>
        <button className="w-10 h-10 rounded-lg hover:bg-neutral-100 flex items-center justify-center relative transition-colors">
          <Bell className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard icon={Car} value="5" label="Véhicules" />
        <StatsCard icon={TrendingUp} value="939€" label="Ce mois" />
      </div>

      <SectionDash title="Véhicules" link="/vehicles" textLink="Voir tous">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          <VehicleVerticalCard
            id="1"
            name="Véhicule 1"
            brand="Marque 1"
            model="Modèle 1"
            year={2020}
            plate="ABC-123"
            km={50000}
          />

          <VehicleVerticalCard
            id="1"
            name="Véhicule 1"
            brand="Marque 1"
            model="Modèle 1"
            year={2020}
            plate="ABC-123"
            km={500}
          />
        </div>
      </SectionDash>

      <SectionDash title="Activité récente">
        <div className="flex flex-col gap-2">
          <MiniInterCard
            icon={Car}
            type="Entretien"
            vehicle="Véhicule 1"
            cost={150}
            date="2023-10-15"
          />
        </div>
      </SectionDash>
    </>
  );
}
