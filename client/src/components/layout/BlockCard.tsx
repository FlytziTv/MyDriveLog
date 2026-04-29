export function BlockCard({
  children,
  title,
  description,
}: {
  children?: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="col-span-1 rounded-xl border bg-card flex flex-col p-6 gap-4 text-card-foreground shadow-sm">
      <div className="flex flex-col gap-1">
        <h2 className="leading-none font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {children ? (
        children
      ) : (
        <div className=" h-64 w-full flex items-center justify-center border-dashed border rounded-md">
          <p className="text-sm text-muted-foreground">
            Currently unavailable.
          </p>
        </div>
      )}
    </div>
  );
}
