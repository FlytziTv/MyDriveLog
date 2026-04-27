import { useNavigate } from "react-router-dom";

export default function VehicleCar({ vehicle }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/vehicles/${vehicle.id}`)}
      className="cursor-pointer border border-app-border rounded-lg hover:bg-surface-hover transition-colors duration-200"
    >
      <div className="w-full h-40 bg-surface-soft flex items-center justify-center p-2 rounded-t-lg relative">
        {vehicle.image && (
          <img
            src={vehicle.image}
            alt={vehicle.model}
            className="w-full h-full object-cover rounded-t-lg"
          />
        )}
        {!vehicle.image && (
          <p className="text-app-text/60 text-sm">Aucune image disponible</p>
        )}
      </div>

      <div className="flex flex-col w-full p-3 gap-3 rounded-b-lg bg-card-bg">
        <div>
          <h4 className="text-sm font-medium text-app-text">{vehicle.model}</h4>
          <p className="text-xs text-app-muted">
            {vehicle.brand} ・ {vehicle.year} ・ {vehicle.current_mileage} km
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <StatsVehicleCard
            label="Puissance"
            text={`${vehicle.horsepower || 0} ch`}
          />

          <StatsVehicleCard label="Places" text={`${vehicle.seats || 0}`} />

          <StatsVehicleCard
            label="Coffre"
            text={`${vehicle.trunk_volume || 0} L`}
          />
        </div>
      </div>
    </div>
  );
}

function StatsVehicleCard({ label, text }) {
  return (
    <div className="flex flex-col gap-0.5 items-center">
      <p className="text-sm font-medium text-app-text">{text}</p>

      <p className="text-xs text-app-text/60">{label}</p>
    </div>
  );
}
