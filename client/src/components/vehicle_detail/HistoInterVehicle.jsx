import { ChevronDown } from "lucide-react";

export default function HistoInterVehicle({ interventions }) {
  return (
    <div className="col-span-2 bg-card-bg border border-app-border p-4 rounded-xl shadow-card flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h3 className="flex items-center gap-3 text-lg font-semibold text-app-text">
          Interventions réalisées
        </h3>

        <button className="text-xs text-primary flex flex-row items-center gap-2 px-3 py-1.5 border border-app-border rounded-md hover:bg-primary-light transition-colors duration-200">
          Ce mois-ci
          <ChevronDown size={12} />
        </button>
      </div>

      {interventions.length === 0 ? (
        <p className="text-sm text-app-muted">Aucune intervention</p>
      ) : (
        interventions.map((intervention) => (
          <CardHistory key={intervention.id} intervention={intervention} />
        ))
      )}
    </div>
  );
}

function CardHistory({ intervention }) {
  return (
    <div className="flex justify-between items-center bg-app-bg border border-app-border hover:bg-surface-hover transition-all duration-300 px-4 py-2 rounded-lg">
      <div>
        <p className="text-sm font-medium">{intervention.title}</p>
        <p className="text-xs text-app-muted">
          {new Date(intervention.intervention_date).toLocaleDateString(
            "fr-FR",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            },
          )}
        </p>
      </div>
      <p className="text-sm font-medium">{intervention.cost} €</p>
    </div>
  );
}
