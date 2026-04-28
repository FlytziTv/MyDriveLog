import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import api from "../../services/api";

export default function CostWidget({ vehicleId }) {
  const [costs, setCosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = vehicleId ? `/reminders/${vehicleId}` : `/reminders/recent`;

        const response = await api.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setCosts(response.data);
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCosts();
  }, [vehicleId]);

  const percent =
    costs.last_month > 0
      ? (
          ((costs.this_month - costs.last_month) / costs.last_month) *
          100
        ).toFixed(1)
      : null;

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
        <p className="text-2xl font-bold text-app-text">
          {isLoading ? "0.00" : `${costs.this_month || "0.00"} €`}
        </p>
        <p className="text-xs text-primary-hover">
          {percent !== null ? (
            <span className={percent > 0 ? "text-red-500" : "text-green-500"}>
              {percent > 0 ? "+" : ""}
              {percent}%
            </span>
          ) : (
            <span className="text-app-muted">Pas de données précédentes</span>
          )}
        </p>
      </div>
      <div className="w-full bg-card-bg border border-app-border rounded-lg h-20 text-sm flex items-center justify-center text-app-muted">
        Aucun graphique disponible pour le moment
      </div>
    </div>
  );
}
