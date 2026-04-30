import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface VehicleCardProps {
  id: string;
  name: string;
  model: string;
  year: number;
  image?: string;
  mileage: number;
  totalCost: number;
}

export function VehicleCard({
  id,
  name,
  model,
  year,
  image,
  mileage,
  totalCost,
}: VehicleCardProps) {
  const { t } = useTranslation("vehicles");
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/vehicles/${id}`)}
      className="col-span-1 rounded-xl border bg-card text-card-foreground shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-500"
    >
      <div className="h-45 bg-muted relative overflow-hidden rounded-t-xl">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-t-xl "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            {t("common:indisponible_message.images")}
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
            label={t("vehicles:card.mileage")}
            value={`${mileage.toLocaleString()} km`}
          />

          <VehicleStats
            label={t("vehicles:card.totalCost")}
            value={`${totalCost.toLocaleString()} €`}
          />
        </div>
      </div>
    </button>
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
