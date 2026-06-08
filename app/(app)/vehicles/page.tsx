import { Plus } from "lucide-react";

export default function VehiclesPage() {
  return (
    <>
      {/* Vehicles Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Mon Garage</h2>
          <p className="text-[14px] text-neutral-500">0 Véhicules</p>
        </div>

        <button className="w-10 h-10 rounded-lg hover:bg-neutral-100 flex items-center justify-center relative transition-colors">
          <Plus className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
        </button>
      </div>
    </>
  );
}
