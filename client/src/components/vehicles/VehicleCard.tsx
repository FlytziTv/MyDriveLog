export function VehicleCard({
  name,
  model,
  year,
  image,
  mileage,
  totalCost,
}: {
  name: string;
  model: string;
  year: number;
  image?: string;
  mileage: number;
  totalCost: number;
}) {
  return (
    <div className="col-span-1 rounded-xl border bg-card text-card-foreground shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-500">
      <div className="h-45 bg-muted relative overflow-hidden rounded-t-xl">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-t-xl "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image available
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground ">
            {model} • {year}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <VehicleStats
            label="Mileage"
            value={`${mileage.toLocaleString()} km`}
          />

          <VehicleStats
            label="Total Cost"
            value={`${totalCost.toLocaleString()} €`}
          />
        </div>
      </div>
    </div>
  );
}

function VehicleStats({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
