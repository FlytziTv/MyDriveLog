import MiniaVehicleCard from "@/components/car/MiniaVehicleCard";
import { Plus } from "lucide-react";

const FakeVehicles = [
  {
    id: "1",
    name: "Ma Camry",
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    plate: "ABC-123",
    km: 50000,
  },
  {
    id: "2",
    name: "Ma Civic",
    brand: "Honda",
    model: "Civic",
    year: 2019,
    plate: "DEF-456",
    km: 30000,
  },
  {
    id: "3",
    name: "Ma Focus",
    brand: "Ford",
    model: "Focus",
    year: 2018,
    plate: "GHI-789",
    km: 40000,
  },
];

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

        <button className="w-10 h-10 rounded-lg hover:bg-neutral-100 flex items-center justify-center relative transition-colors">
          <Plus className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
        </button>
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
