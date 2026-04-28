import { useEffect, useState } from "react";
import api from "../../services/api";

export default function OverviewWidget() {
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/interventions/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setStats(response.data);
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const costPercent =
    stats.last_month_cost > 0
      ? (
          ((stats.this_month_cost - stats.last_month_cost) /
            stats.last_month_cost) *
          100
        ).toFixed(1)
      : null;

  const interPercent =
    stats.last_month_interventions > 0
      ? (
          ((stats.this_month_interventions - stats.last_month_interventions) /
            stats.last_month_interventions) *
          100
        ).toFixed(1)
      : null;

  return (
    <div className="w-full bg-card-bg border border-app-border p-4 rounded-xl shadow-card flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h3 className="flex items-center gap-3 text-lg font-semibold text-app-text">
          Vue d'ensemble
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 flex flex-col gap-2 items-start bg-primary/10 py-4 px-5 rounded-lg">
          <p className="text-xs font-semibold text-primary">Distance totale</p>
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <p className="text-2xl font-bold text-app-text">12 345 km</p>
            {/* <span className="text-sm text-app-muted">—</span> */}
          </div>
          <p className="text-xs text-primary-hover">vs mois précédent</p>
        </div>

        <div className="col-span-1 flex flex-col gap-2 items-start bg-primary/10 py-4 px-5 rounded-lg">
          <p className="text-xs font-semibold text-primary">Dépenses ce mois</p>
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <p className="text-2xl font-bold text-app-text">
              {isLoading ? "0" : `${stats.this_month_cost || 0} €`}
            </p>
            {costPercent !== null && costPercent != 0 && (
              <span
                className={`text-sm ${costPercent > 0 ? "text-red-500" : "text-green-500"}`}
              >
                {costPercent > 0 ? "+" : ""}
                {costPercent}%
              </span>
            )}
          </div>
          <p className="text-xs text-primary-hover">vs mois précédent</p>
        </div>

        <div className="col-span-1 flex flex-col gap-2 items-start bg-primary/10 py-4 px-5 rounded-lg">
          <p className="text-xs font-semibold text-primary">Interventions</p>
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <p className="text-2xl font-bold text-app-text">
              {isLoading ? "0" : `${stats.this_month_interventions || 0}`}
            </p>
            {interPercent !== null && interPercent != 0 && (
              <span
                className={`text-sm ${interPercent > 0 ? "text-red-500" : "text-green-500"}`}
              >
                {interPercent > 0 ? "+" : ""}
                {interPercent}%
              </span>
            )}
          </div>
          <p className="text-xs text-primary-hover">Ce mois</p>
        </div>

        <div className="col-span-1 flex flex-col gap-2 items-start bg-red-500/10 py-4 px-5 rounded-lg">
          <p className="text-xs font-semibold text-red-500">Rappels à venir</p>
          <p className="text-2xl font-bold text-app-text">
            {isLoading ? "0" : `${stats.upcoming_reminders || 0}`}
          </p>
          <p className="text-xs text-primary-hover">
            Dans les 30 prochains jours
          </p>
        </div>
      </div>

      <div className="w-full bg-card-bg border border-app-border rounded-lg h-40 text-sm flex items-center justify-center text-app-muted">
        Aucun graphique disponible pour le moment
      </div>
    </div>
  );
}
