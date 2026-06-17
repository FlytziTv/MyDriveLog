import { formatCurrency, formatDistance } from "@/lib/format";
import { MiniStatsCarProps, StatProfileProps } from "@/types";

export default function MiniStatsTabs({
  km,
  date,
  total,
  currency,
  distanceUnit,
}: MiniStatsCarProps) {
  return (
    <div className=" border-y border-neutral-200 p-4 flex flex-row items-center justify-around">
      <Stats value={formatDistance(km, distanceUnit)} label="Kilomètres" />

      <div className="w-px bg-neutral-200 self-stretch my-1" />

      <Stats
        value={
          date
            ? new Date(date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
              })
            : "Aucune"
        }
        label="Dernière"
      />

      <div className="w-px bg-neutral-200 self-stretch my-1" />

      <Stats value={formatCurrency(total, currency)} label="Total" />
    </div>
  );
}

function Stats({ value, label }: StatProfileProps) {
  return (
    <div className="w-25 flex flex-col gap-0 items-center justify-center text-center">
      <p className="text-lg font-bold text-neutral-900">{value}</p>
      <p className="text-xs text-neutral-500">{label}</p>
    </div>
  );
}
