import { SubscriptionCardProps } from "@/types";
import { Check } from "lucide-react";

export default function SubscriptionCard({
  title,
  description,
  price,
  priceAnnual,
  features,
  actif,
}: SubscriptionCardProps) {
  return (
    <div
      className={`bg-white border rounded-xl flex flex-col gap-4 p-4 relative ${actif ? "border-neutral-900" : "border-neutral-200"}`}
    >
      {/* Badge */}
      {actif && (
        <div className="absolute top-2 rotate-20 right-0 px-2 py-0.5 bg-neutral-900 rounded-full">
          <span className="text-[11px] font-semibold text-white">ACTUEL</span>
        </div>
      )}

      <div className="flex items-center justify-between ">
        {/* Info plan */}
        <div className="flex flex-col gap-0">
          <p className="text-base font-semibold text-neutral-900">{title}</p>
          <p className="text-xs text-neutral-500">{description}</p>
        </div>
        {/* Prix */}
        <div className="text-right">
          <p className="text-[20px] font-semibold text-neutral-900">
            {price} €
            <span className="text-[13px] font-normal text-neutral-400">
              /mois
            </span>
          </p>
          {priceAnnual && (
            <p className="text-[11px] text-neutral-400">
              ou {priceAnnual} €/an
            </p>
          )}
        </div>
      </div>

      {/* Fonctionnalités */}
      <div className="flex flex-col gap-2">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${actif ? "bg-neutral-900" : "bg-neutral-100"}`}
            >
              <Check
                size={10}
                className={`${actif ? "text-white" : "text-neutral-400"}`}
              />
            </div>
            <span className="text-xs text-neutral-600">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
