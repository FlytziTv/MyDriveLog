"use client";

import { useState } from "react";
import DetailInterCard from "@/components/Inter/DetailInterCard";
import { SectionProfile } from "@/components/profile/Sections";
import { HistoryFilter } from "@/lib/data";
import { Settings } from "lucide-react";
import { MaintenanceMeta, ExpenseMeta } from "@/lib/category";
import { FakeHistory } from "@/lib/fake";
import { ExpenseCategory, MaintenanceType } from "@prisma/client";
import { HistoryItem } from "@/types";

// Fonction pour résoudre les métadonnées d'un item d'historique
function resolveMeta(item: HistoryItem) {
  return item.kind === "maintenance"
    ? MaintenanceMeta[item.type as MaintenanceType]
    : ExpenseMeta[item.type as ExpenseCategory];
}

// Fonction pour filtrer l'historique en fonction du filtre actif
function filterHistory(items: HistoryItem[], filter: string) {
  switch (filter) {
    case "maintenance":
      return items.filter((i) => i.kind === "maintenance");
    case "expenses":
      return items.filter((i) => i.kind === "expense");
    case "this_month": {
      const now = new Date();
      return items.filter((i) => {
        const [, month, year] = i.date.split("/").map(Number);
        return month === now.getMonth() + 1 && year === now.getFullYear();
      });
    }
    default:
      return items;
  }
}

// Fonction pour grouper les items d'historique par mois et année
function groupByMonth(items: HistoryItem[]) {
  // Tri des items par date (du plus récent au plus ancien)
  const sorted = [...items].sort((a, b) => {
    const [dA, mA, yA] = a.date.split("/").map(Number);
    const [dB, mB, yB] = b.date.split("/").map(Number);
    return (
      new Date(yB, mB - 1, dB).getTime() - new Date(yA, mA - 1, dA).getTime()
    );
  });

  // Groupement par mois et année
  return sorted.reduce<Record<string, HistoryItem[]>>((acc, item) => {
    const [, month, year] = item.date.split("/").map(Number);
    const key = new Date(year, month - 1).toLocaleDateString("fr-FR", {
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
            return (
              <DetailInterCard
                key={item.id}
                icon={icon}
                type={label}
                vehicle={item.vehicle}
                cost={item.cost}
                date={item.date}
                km={item.km}
              />
            );
          })}
        </SectionProfile>
      ))}
    </>
  );
}
