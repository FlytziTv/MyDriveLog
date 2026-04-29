import { TrendingDown, TrendingUp, TrendingUpDown } from "lucide-react";

export function MiniStatsCard({
  title,
  amount,
  pourcentage,
}: {
  title: string;
  amount: string;
  pourcentage?: string;
}) {
  return (
    <div className="flex flex-col gap-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm text-muted-foreground">{title}</h2>
          <p className="font-semibold tabular-nums text-3xl">{amount}</p>
        </div>
        {pourcentage && <PourcentageCard pourcentage={pourcentage} />}
      </div>
    </div>
  );
}

function PourcentageCard({ pourcentage }: { pourcentage: string }) {
  const Icon =
    pourcentage > "0"
      ? TrendingUp
      : pourcentage < "0"
        ? TrendingDown
        : TrendingUpDown;

  return (
    <span className="inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 border-border text-foreground ">
      <Icon size={12} />
      {pourcentage}%
    </span>
  );
}
