import { QuestionCardProps } from "@/types";
import { ChevronDown } from "lucide-react";

export default function QuestionCard({
  title,
  content,
  open,
  setOpenSection,
  i,
}: QuestionCardProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpenSection(open ? null : i)}
        className="w-full p-4 flex items-center gap-3 text-left"
      >
        <p className="flex-1 text-sm font-medium text-neutral-900">{title}</p>
        <ChevronDown
          className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-neutral-100">
          <p className="text-xs text-neutral-600 leading-relaxed pt-3">
            {content}
          </p>
        </div>
      )}
    </div>
  );
}
