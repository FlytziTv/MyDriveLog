import MiniaVehicleCard from "@/components/car/MiniaVehicleCard";
import { FakeVehicles } from "@/lib/fake";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function VehiclesPage() {
  return (
    <>
      {/* Vehicles Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Mon Garage</h2>
          <p className="text-[14px] text-neutral-500">
            {FakeVehicles.length} Véhicules
          </p>
        </div>

        <Link
          href="/new"
          className="w-10 h-10 rounded-lg hover:bg-neutral-100 flex items-center justify-center relative transition-colors"
        >
          <Plus className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {FakeVehicles.map((vehicle) => (
          <MiniaVehicleCard
            key={vehicle.id}
            id={vehicle.id}
            name={vehicle.name}
            brand={vehicle.brand}
            model={vehicle.model}
            year={vehicle.year}
            plate={vehicle.plate}
            km={vehicle.km}
          />
        ))}
      </div>
    </>
  );
}
