import { Settings } from "lucide-react";

export default function HistoriquePage() {
  return (
    <>
      {/* History Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Historique</h2>
          <p className="text-[14px] text-neutral-500">0 Interventions</p>
        </div>

        <button className="w-10 h-10 rounded-lg hover:bg-neutral-100 flex items-center justify-center relative transition-colors">
          <Settings className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
        </button>
      </div>
    </>
  );
}
