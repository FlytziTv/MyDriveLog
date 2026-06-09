import { MiniInterCardProps } from "@/types";

export default function MiniInterCard({
  icon,
  type,
  data,
  cost,
}: MiniInterCardProps) {
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
            <p className="text-xs text-neutral-500 truncate">{data}</p>
          </div>

          {/* Prix */}
          <p className="text-base font-semibold text-neutral-900 shrink-0">
            {cost}€
          </p>
        </div>
      </div>
    </div>
  );
}
