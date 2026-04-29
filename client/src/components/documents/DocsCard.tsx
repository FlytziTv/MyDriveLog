import { FileText, Download, ExternalLink } from "lucide-react";

export function DocsCard({
  children,
  title,
}: {
  children?: React.ReactNode;
  title: string;
}) {
  return (
    <div className="col-span-1 rounded-xl border bg-card flex flex-col p-6 gap-4 text-card-foreground shadow-sm">
      <div className="flex flex-row items-center justify-between">
        <h2 className="leading-none font-semibold">{title}</h2>
      </div>

      {children ? (
        children
      ) : (
        <div className=" h-64 w-full flex items-center justify-center border-dashed border rounded-md">
          <p className="text-sm text-muted-foreground">
            No documents available at this time.
          </p>
        </div>
      )}
    </div>
  );
}

export function DocsMessage({
  name,
  type,
  vehicle,
  date,
  size,
}: {
  name: string;
  type: string;
  vehicle: string;
  date: string;
  size: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors duration-300">
      <div className="flex flex-row items-center gap-4">
        <div className="rounded-lg bg-primary/10 p-3">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="font-medium">{name}</h4>
          <div className="flex gap-3 text-sm text-muted-foreground">
            <span>{type}</span>
            <span>•</span>
            <span>{vehicle}</span>
            <span>•</span>
            <span>{date}</span>
            <span>•</span>
            <span>{size}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="p-2 cursor-pointer text-primary hover:text-primary/40 rounded-md transition-colors duration-300">
          <ExternalLink size={20} />
        </button>
        <button className="p-2 cursor-pointer text-primary hover:text-primary/40 rounded-md transition-colors duration-300">
          <Download size={20} />
        </button>
      </div>
    </div>
  );
}
