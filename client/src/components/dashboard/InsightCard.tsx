import { insightColors } from "../../lib/colors";

interface InsightCardProps {
  type: "info" | "warning" | "success" | "tip";
  title: string;
  description: string;
}

export function InsightCard({ type, title, description }: InsightCardProps) {
  const {
    icon: Icon,
    bg,
    iconWrap,
    dot,
    title: titleColor,
  } = insightColors[type];

  return (
    <div
      className={`relative col-span-1 rounded-xl border px-5 py-4.5 flex flex-row gap-3.5 items-start overflow-hidden
        transition-all duration-200 cursor-default ${bg}`}
    >
      <span
        className={`absolute top-3.5 right-4 rounded-full ${dot}`}
        style={{ width: "7px", height: "7px" }}
      />

      <div
        className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${iconWrap}`}
      >
        <Icon size={17} />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className={`text-sm font-semibold leading-snug ${titleColor}`}>
          {title}
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}
