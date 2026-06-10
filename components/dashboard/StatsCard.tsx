import { StatCardProps } from "../../types";

export default function StatsCard({ icon, value, label }: StatCardProps) {
  const Icon = icon;

  return (
    <div className="bg-white border border-neutral-200 flex flex-row gap-1 rounded-xl p-4 relative overflow-hidden">
      {/* Content */}
      <div className="flex flex-col gap-2 w-full min-w-0">
        <p className="text-xs text-neutral-400 ">{label}</p>
        <p className="text-xl font-semibold text-neutral-900 leading-none truncate">
          {value}
        </p>
      </div>

      {/* Icon */}
      <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
        <Icon size={16} className="text-neutral-500" strokeWidth={1.5} />
      </div>
    </div>
  );
}
