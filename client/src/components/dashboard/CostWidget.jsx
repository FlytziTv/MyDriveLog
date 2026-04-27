import { ChevronDown } from "lucide-react";

export default function CostWidget() {
  return (
    <div className="w-full bg-card-bg border border-app-border p-4 rounded-xl shadow-card flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h3 className="flex items-center gap-3 text-lg font-semibold text-app-text">
          Coût total
        </h3>

        <button className="text-xs text-primary flex flex-row items-center gap-2 px-3 py-1.5 border border-app-border rounded-md hover:bg-primary-light transition-colors duration-200">
          Ce mois-ci
          <ChevronDown size={12} />
        </button>
      </div>

      <div className="flex flex-col gap-1 items-start">
        <p className="text-2xl font-bold text-app-text">842.50 €</p>
        <p className="text-xs text-primary-hover">
          <span className=" text-red-500">+4%</span> par rapport au mois
          précédent
        </p>
      </div>
      <div className="w-full bg-card-bg border border-app-border rounded-lg h-20 text-sm flex items-center justify-center text-app-muted">
        Aucun graphique disponible pour le moment
      </div>
    </div>
  );
}
