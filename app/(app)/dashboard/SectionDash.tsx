import { SectionDashProps } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SectionDash({
  title,
  link,
  textLink,
  children,
}: SectionDashProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
        {link && textLink && (
          <Link
            href={link}
            className="text-[14px] text-neutral-500 font-medium flex items-center gap-1 hover:text-neutral-900 transition-colors"
          >
            {textLink} <ChevronRight size={16} />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
