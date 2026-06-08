import {
  SectionIconProfileProps,
  SectionProfileProps,
  SectionProfileSupportProps,
} from "@/types";
import { ChevronRight } from "lucide-react";

function SectionProfile({ title, children }: SectionProfileProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h3 className="text-xs font-semibold text-neutral-500 px-1">{title}</h3>
      {children}
    </div>
  );
}

function SectionItemIcon({ icon, title, subtitle }: SectionIconProfileProps) {
  const Icon = icon;

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 flex items-center gap-3 hover:border-neutral-300 transition-colors cursor-pointer">
      <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
        <Icon className="text-neutral-700" size={18} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <p className="text-sm font-medium text-neutral-900">{title}</p>
        <p className="text-xs text-neutral-500">{subtitle}</p>
      </div>
      <ChevronRight size={18} className=" text-neutral-300 shrink-0" />
    </div>
  );
}

function SectionItem({ title }: SectionProfileSupportProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl px-4 py-3 flex items-center gap-3 hover:border-neutral-300 transition-colors cursor-pointer">
      <p className="flex-1 text-sm font-medium text-neutral-900">{title}</p>
      <ChevronRight size={18} className=" text-neutral-300 shrink-0" />
    </div>
  );
}

export { SectionItemIcon, SectionItem, SectionProfile };
