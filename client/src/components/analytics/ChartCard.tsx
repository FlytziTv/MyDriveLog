export function ChartCard({ title }: { title: string }) {
  return (
    <div className="col-span-1 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="leading-none font-semibold">{title}</h2>
        </div>
      </div>
      {/* Chart component goes here */}
      <div className="mt-4 h-64 w-full flex items-center justify-center border-dashed border rounded-md">
        <p className="text-sm text-muted-foreground">
          Graph unavailable at this time
        </p>
      </div>
    </div>
  );
}
