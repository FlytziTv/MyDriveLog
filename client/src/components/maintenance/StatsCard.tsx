export function StatsMaintenance({
  title,
  amount,
}: {
  title: string;
  amount: string;
}) {
  return (
    <div className="flex flex-col gap-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm text-muted-foreground">{title}</h2>
        <p className="font-semibold tabular-nums text-3xl">{amount}</p>
      </div>
    </div>
  );
}
