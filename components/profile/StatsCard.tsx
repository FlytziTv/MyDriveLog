import { StatProfileProps } from "@/types";

export function StatProfile({ value, label }: StatProfileProps) {
  return (
    <div className="flex flex-col gap-0 items-center justify-center text-center">
      <p className="text-lg font-bold text-neutral-900">{value}</p>
      <p className="text-xs text-neutral-500">{label}</p>
    </div>
  );
}
