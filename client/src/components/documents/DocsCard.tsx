import { documentIcons, actionIcons } from "../../lib/icons";

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
    <div className="group flex items-center justify-between px-4 py-3 rounded-xl border border-border hover:border-primary/20 hover:bg-primary/2 transition-all duration-200">
      <div className="flex items-center gap-3 min-w-0">
        <div className="shrink-0 rounded-lg bg-primary/8 p-2.5 group-hover:bg-primary/15 transition-colors duration-200">
          <documentIcons.file className="h-4 w-4 text-primary" />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <h4 className="text-sm font-medium truncate">{name}</h4>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>{type}</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="truncate">{vehicle}</span>
            <span className="text-muted-foreground/40">·</span>
            <span>{date}</span>
            <span className="text-muted-foreground/40">·</span>
            <span>{size}</span>
          </div>
        </div>
      </div>

      <div className="shrink-0 flex gap-0.5 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-150 cursor-pointer">
          <actionIcons.external size={15} />
        </button>
        <button className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-150 cursor-pointer">
          <actionIcons.download size={15} />
        </button>
      </div>
    </div>
  );
}
