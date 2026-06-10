"use client";

import { useState } from "react";
import { DepenseCarFilter } from "@/lib/data";
import { FakeHistory } from "@/lib/fake";
import { HistoryItem } from "@/types";
import { resolveMeta } from "@/lib/category";
import MiniInterCard from "../Inter/MiniInterCard";
import DetailInterCard from "../Inter/DetailInterCard";

// Permet de filtrer les interventions selon le type sélectionné (entretien, dépense)
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
  id,
  vehicleName,
}: {
  id: string;
  vehicleName: string;
}) {
  const [activeFilter, setActiveFilter] = useState("maintenance");
  const filtered = filterHistory(
    FakeHistory.filter((item) => item.vehicleId === id),
    activeFilter,
  );

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
        {filtered.map((item) => {
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
              km={item.km}
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
        })}
      </div>
    </div>
  );
}
