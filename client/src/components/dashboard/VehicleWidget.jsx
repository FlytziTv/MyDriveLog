import VehicleCar from "../card/VehicleCar";
import { useNavigate } from "react-router-dom";

export default function VehicleWidget({ vehicles }) {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-card-bg border border-app-border p-4 rounded-xl shadow-card flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h3 className="flex items-center gap-3 text-lg font-semibold text-app-text">
          Mes véhicules{" "}
          <span className="text-app-muted text-xs">
            {vehicles.length} vehicule{vehicles.length > 1 ? "s" : ""}
          </span>
        </h3>

        <button
          onClick={() => navigate("/vehicles")}
          className="text-sm text-primary px-4 py-1.5 border border-app-border rounded-md hover:bg-primary-light transition-colors duration-200"
        >
          Voir tout les véhicules
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {vehicles.slice(0, 3).map((vehicle) => (
          <VehicleCar key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}
