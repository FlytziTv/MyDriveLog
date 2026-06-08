import { DetailInterCardProps } from "@/types";
import { Calendar, MapPin } from "lucide-react";

export default function DetailInterCard({
  icon,
  type,
  vehicle,
  cost,
  date,
  km,
}: DetailInterCardProps) {
  const Icon = icon;
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 hover:border-neutral-300 flex flex-col gap-4 transition-colors">
      <div className="flex flex-row items-center gap-4">
        {/* Icon Container */}
        <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
          <Icon size={20} className="text-neutral-700" strokeWidth={1.5} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex items-start justify-between gap-4">
          {/* Details */}
          <div className="flex flex-col gap-0 min-w-0 flex-1">
            <p className="text-sm font-medium text-neutral-900 truncate">
              {type}
            </p>
            <p className="text-xs text-neutral-500 truncate">{vehicle}</p>
          </div>

          {/* Prix */}
          <p className="text-base font-semibold text-neutral-900 shrink-0">
            {cost}€
          </p>
        </div>
      </div>

      {/* Date and Kilometers */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[12px] text-neutral-500">
          <Calendar size={14} />
          {date}
        </div>

        <div className="flex items-center gap-1.5 text-[12px] text-neutral-500">
          <MapPin size={14} />
          {km.toLocaleString()} km
        </div>
      </div>
    </div>
  );
}
