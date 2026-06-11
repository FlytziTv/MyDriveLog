"use client";

import { useState } from "react";
import { DepenseCarFilter } from "@/lib/data";
import { resolveMeta } from "@/lib/category";
import MiniInterCard from "../Inter/MiniInterCard";
import DetailInterCard from "../Inter/DetailInterCard";
import { HistoryItem } from "@/types";

function filterHistory(items: HistoryItem[], filter: string) {
  switch (filter) {
    case "maintenance":
      return items.filter((i) => i.kind === "maintenance");
    case "expenses":
      return items.filter((i) => i.kind === "expense");
    default:
      return items;
  }
}

export default function HistoryCar({
  vehicleName,
  initialHistory,
}: {
  vehicleName: string;
  initialHistory: HistoryItem[];
}) {
  const [activeFilter, setActiveFilter] = useState("maintenance");
  const filtered = filterHistory(initialHistory, activeFilter);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {DepenseCarFilter.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter.value
                ? "bg-neutral-900 text-white"
                : "bg-transparent text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <p className="text-center text-neutral-500 text-sm py-4">
            Aucun historique trouvé.
          </p>
        ) : (
          filtered.map((item) => {
            const { label, icon } = resolveMeta(item);
            const formattedDate = new Date(item.date).toLocaleDateString(
              "fr-FR",
              {
                day: "numeric",
                month: "short",
              },
            );

            return item.kind === "maintenance" ? (
              <DetailInterCard
                key={item.id}
                icon={icon}
                type={label}
                vehicle={vehicleName}
                cost={item.cost}
                date={formattedDate}
                km={item.km ?? undefined}
              />
            ) : (
              <MiniInterCard
                key={item.id}
                icon={icon}
                type={label}
                data={formattedDate}
                cost={item.cost}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
