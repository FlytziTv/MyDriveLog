import DetailInterCard from "@/components/Inter/DetailInterCard";
import { SectionProfile } from "@/components/profile/Sections";
import { HistoryFilter } from "@/lib/data";
import { Settings } from "lucide-react";

const FakeHistory = [
  {
    id: 1,
    icon: Settings,
    type: "Révision",
    vehicle: "Toyota Corolla",
    cost: 150,
    date: "15/05/2024",
    km: 25000,
  },
  {
    id: 2,
    icon: Settings,
    type: "Changement de pneus",
    vehicle: "Honda Civic",
    cost: 200,
    date: "10/04/2024",
    km: 30000,
  },
  {
    id: 3,
    icon: Settings,
    type: "Vidange",
    vehicle: "Ford Focus",
    cost: 80,
    date: "05/03/2024",
    km: 15000,
  },
];

export default function HistoriquePage() {
  return (
    <>
      {/* History Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Historique</h2>
          <p className="text-[14px] text-neutral-500">
            {FakeHistory.length} Interventions
          </p>
        </div>

        <button className="w-10 h-10 rounded-lg hover:bg-neutral-100 flex items-center justify-center relative transition-colors">
          <Settings className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
        </button>
      </div>

      {/* Filter Pills */}
      <div className=" border-b border-neutral-100">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {HistoryFilter.map((filter, i) => (
            <button
              key={filter.value}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors ${
                i === 0
                  ? "bg-neutral-900 text-white"
                  : "bg-transparent text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* History Items */}
      <SectionProfile title="Mai 2024">
        {/* Example of a history item */}
        {FakeHistory.map((item) => (
          <DetailInterCard
            key={item.id}
            icon={item.icon}
            type={item.type}
            vehicle={item.vehicle}
            cost={item.cost}
            date={item.date}
            km={item.km}
          />
        ))}
      </SectionProfile>
    </>
  );
}
