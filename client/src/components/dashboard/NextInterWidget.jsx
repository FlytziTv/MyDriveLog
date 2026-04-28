import { useEffect, useState } from "react";
import { FileText, Droplets, Wrench } from "lucide-react";
import api from "../../services/api";

const iconMap = {
  Vidange: Droplets,
  "Contrôle technique": FileText,
  default: Wrench,
};

export default function NextInterWidget({ vehicleId }) {
  const [interventions, setInterventions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterventions = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = vehicleId
          ? `/interventions/${vehicleId}`
          : `/interventions/recent`;
        const response = await api.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInterventions(response.data);
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterventions();
  }, [vehicleId]);

  return (
    <div className="w-full bg-card-bg border border-app-border p-4 rounded-xl shadow-card flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h3 className="flex items-center gap-3 text-lg font-semibold text-app-text">
          Dernière intervention
        </h3>

        <a
          href="/interventions"
          className="text-sm text-blue-500 font-medium hover:underline"
        >
          Voir tout
        </a>
      </div>

      <div className="flex flex-col gap-1">
        {isLoading ? (
          <p className="text-sm text-app-muted p-4">Chargement...</p>
        ) : interventions.length > 0 ? (
          interventions.map((intervention) => (
            <InterventionCard
              key={intervention.id}
              intervention={intervention}
            />
          ))
        ) : (
          <p className="text-sm text-app-muted p-4">
            Aucune intervention récente.
          </p>
        )}
      </div>
    </div>
  );
}

function InterventionCard({ intervention }) {
  const Icon = iconMap[intervention.title] || iconMap["default"];

  return (
    <div className="flex flex-row items-center justify-between p-2">
      <div className="flex flex-row items-center gap-4 p-2 ">
        <div className="h-12 w-12 flex items-center justify-center bg-primary/10 rounded-full">
          <Icon size={18} className="text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-app-text">
            {intervention.title}
          </p>
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
          <p className="text-xs text-app-muted">{intervention.vehicle_name}</p>
        </div>
      </div>
      <p className="text-sm text-app-text">{intervention.cost} €</p>
    </div>
  );
}
