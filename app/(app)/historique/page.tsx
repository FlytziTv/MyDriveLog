"use client";

import { useState } from "react";
import DetailInterCard from "@/components/Inter/DetailInterCard";
import { SectionProfile } from "@/components/profile/Sections";
import { HistoryFilter } from "@/lib/data";
import { Settings } from "lucide-react";
import { resolveMeta } from "@/lib/category";
import { FakeHistory, FakeVehicles } from "@/lib/fake";
import { HistoryItem } from "@/types";
import MiniInterCard from "@/components/Inter/MiniInterCard";

// Permet de filtrer les interventions selon le type sélectionné (entretien, dépense, ce mois ci)
function filterHistory(items: HistoryItem[], filter: string) {
  switch (filter) {
    case "maintenance":
      return items.filter((i) => i.kind === "maintenance");
    case "expenses":
      return items.filter((i) => i.kind === "expense");
    case "this_month": {
      const now = new Date();
      return items.filter((i) => {
        const date = new Date(i.date);
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      });
    }
    default:
      return items;
  }
}

// Permet de grouper les interventions par mois et année pour un affichage plus lisible dans l'historique
function groupByMonth(items: HistoryItem[]) {
  const sorted = [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return sorted.reduce<Record<string, HistoryItem[]>>((acc, item) => {
    const date = new Date(item.date);
    const key = date.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });

    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

export default function HistoriquePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const filtered = filterHistory(FakeHistory, activeFilter);
  const grouped = groupByMonth(filtered);

  return (
    <>
      {/* History Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Historique</h2>
          <p className="text-[14px] text-neutral-500">
            {filtered.length} Interventions
          </p>
        </div>

        <button className="w-10 h-10 rounded-lg hover:bg-neutral-100 flex items-center justify-center relative transition-colors">
          <Settings className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {HistoryFilter.map((filter) => (
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

      {/* History Items */}
      {Object.entries(grouped).map(([month, items]) => (
        <SectionProfile key={month} title={month}>
          {items.map((item) => {
            const { label, icon } = resolveMeta(item);
            const vehicle = FakeVehicles.find((v) => v.id === item.vehicleId);
            const vehicleName = vehicle?.name ?? "Véhicule inconnu";
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
                data={`${vehicleName} · ${formattedDate}`}
                cost={item.cost}
              />
            );
          })}
        </SectionProfile>
      ))}
    </>
  );
}
