import { CalendarDays, Car, ExternalLink, IdCard, MapPin } from "lucide-react";
import Link from "next/link";
import { MiniaVehicleCardProps } from "../../types";

export default function MiniaVehicleCard({
  id,
  name,
  brand,
  model,
  year,
  plate,
  km,
}: MiniaVehicleCardProps) {
  return (
    <Link
      href={`/vehicles/${id}`}
      className="relative group bg-white border border-neutral-200 rounded-xl p-4 cursor-pointer hover:border-neutral-300 transition-colors duration-300 flex flex-col items-start gap-4"
    >
      <div className="flex flex-row items-center gap-4 w-full flex-1 min-w-0 pr-6">
        {/* Vehicle Icon */}
        <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center shrink-0">
          <Car className="w-7 h-7 text-neutral-400" strokeWidth={1.5} />
        </div>

        {/* Vehicle Details */}
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <h3 className="text-base font-semibold text-neutral-900 truncate">
            {name}
          </h3>
          <p className="text-xs text-neutral-500 truncate">
            {brand} · {model}
          </p>
        </div>
      </div>

      <div className="flex flex-row flex-wrap items-center gap-4">
        {/* Plate */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <IdCard size={14} />
          {plate}
        </div>

        {/* Year */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <CalendarDays size={14} />
          {year}
        </div>

        {/* Kilometerage */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <MapPin size={14} />
          {km.toLocaleString()} km
        </div>
      </div>

      <ExternalLink
        size={14}
        className="absolute top-4 right-4 text-neutral-200 shrink-0 group-hover:text-neutral-400 transition-colors duration-300"
      />
    </Link>
  );
}

export function VehicleVerticalCard({
  id,
  name,
  brand,
  model,
  year,
  plate,
  km,
}: MiniaVehicleCardProps) {
  return (
    <Link
      href={`/vehicles/${id}`}
      className="w-[260px] shrink-0 flex flex-col gap-4 bg-white border border-neutral-200 rounded-xl p-4 cursor-pointer hover:border-neutral-300 transition-colors"
    >
      <div className="w-full h-32 bg-neutral-100 rounded-lg flex items-center justify-center">
        <Car className="w-12 h-12 text-neutral-400" strokeWidth={1.5} />
      </div>

      {/* Vehicle Details */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <h3 className="text-base font-semibold text-neutral-900 truncate">
          {name}
        </h3>
        <p className="text-xs text-neutral-500 truncate">
          {brand} · {model}
        </p>
      </div>

      <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
        {/* Plate */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <IdCard size={14} />
          {plate}
        </div>

        {/* Year */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <CalendarDays size={14} />
          {year}
        </div>

        {/* Kilometerage */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <MapPin size={14} />
          {km.toLocaleString()} km
        </div>
      </div>
    </Link>
  );
}
