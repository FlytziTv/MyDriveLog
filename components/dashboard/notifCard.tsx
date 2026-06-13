import { NotifCardProps } from "@/types";
import { X } from "lucide-react";

export default function NotifCard({
  id,
  unread,
  icon,
  color,
  title,
  time,
  body,
  dismiss,
}: NotifCardProps) {
  const Icon = icon;

  return (
    <div
      className={`bg-white border rounded-xl p-4 flex items-start gap-3 transition-colors ${unread ? "border-neutral-400" : "border-neutral-200"}`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color.split(" ")[0]}`}
      >
        <Icon className={`w-5 h-5 ${color.split(" ")[1]}`} strokeWidth={1.5} />
      </div>
      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-sm font-semibold ${unread ? "font-semibold text-neutral-900" : "font-medium text-neutral-700"}`}
          >
            {title}
          </p>
          <div className="flex items-center gap-0.5 shrink-0">
            <span className="text-xs text-neutral-400">{time}</span>
            <button
              onClick={() => dismiss?.(id)}
              className="w-5 h-5 flex items-center justify-center text-neutral-300 hover:text-neutral-500 transition-colors"
            >
              <X className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
        <p className="text-[13px] text-neutral-500 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
