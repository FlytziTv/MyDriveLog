export default function VehicleCard({ vehicle }) {
  return (
    <div className="w-full flex flex-col gap-0 rounded-lg border border-app-border">
      <div className="aspect-[16/9] w-full relative bg-surface-soft rounded-t-lg flex items-center justify-center border-b border-app-border overflow-hidden">
        {vehicle.cover_photo_url ? (
          <img
            src={vehicle.cover_photo_url}
            alt={vehicle.model}
            className="w-full h-full object-cover rounded-t-lg"
          />
        ) : (
          <p className="text-app-text/60 text-sm">Aucune image disponible</p>
        )}

        <div className="flex flex-row gap-1 items-center absolute bottom-3 right-3">
          {vehicle.fuel_type && <Badge text={vehicle.fuel_type} />}
          {vehicle.year && <Badge text={vehicle.year} />}
          {vehicle.license_plate && <Badge text={vehicle.license_plate} />}
        </div>
      </div>

      <div className="bg-card-bg flex flex-col gap-3 p-4 rounded-b-lg">
        <div className="flex flex-col items-start gap-0.5">
          <h3 className="text-sm font-bold text-app-text truncate max-w-[150px]">
            {vehicle.nickname || vehicle.model}
          </h3>
          <p className="text-xs text-app-muted font-medium">
            {vehicle.brand} {vehicle.model}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-app-border">
          <DataGrid
            label="Kilométrage"
            value={vehicle.current_mileage?.toLocaleString() || "0"}
          />
          <hr className="w-px h-8 bg-app-border" />
          <DataGrid
            label="Interventions"
            value={vehicle.interventions_count || 0}
          />
          <hr className="w-px h-8 bg-app-border" />
          <DataGrid
            label="Coût total"
            value={`${Number(vehicle.total_cost || 0).toFixed(0)} €`}
          />
        </div>
      </div>
    </div>
  );
}

function DataGrid({ label, value }) {
  return (
    <div className="w-full flex flex-col gap-0.5 items-center justify-center">
      <p className="text-xs text-app-muted">{label}</p>
      <span className="text-sm font-semibold text-app-text">{value}</span>
    </div>
  );
}

function Badge({ text }) {
  return (
    <div className="bg-white border border-gray-300 px-2 py-0.5 rounded shadow-sm text-[10px] font-bold text-gray-800 tracking-wider">
      {text}
    </div>
  );
}
