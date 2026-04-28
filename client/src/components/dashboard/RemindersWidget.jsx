import { useEffect, useState } from "react";
import { FileText, Droplets, Wrench } from "lucide-react";
import api from "../../services/api";

const iconMap = {
  Vidange: Droplets,
  "Contrôle technique": FileText,
  default: Wrench,
};

export default function RemindersWidget({ vehicleId }) {
  const [reminders, setReminders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = vehicleId
          ? `/interventions/${vehicleId}`
          : `/interventions/recent`;

        const response = await api.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReminders(response.data);
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReminders();
  }, [vehicleId]);

  return (
    <div className="w-full bg-card-bg border border-app-border p-4 rounded-xl shadow-card flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h3 className="flex items-center gap-3 text-lg font-semibold text-app-text">
          Rappels à venir
        </h3>

        <a
          href="/reminders"
          className="text-sm text-blue-500 font-medium hover:underline"
        >
          Voir tout
        </a>
      </div>

      <div className="flex flex-col gap-1">
        {isLoading ? (
          <p className="text-sm text-app-muted p-4">Chargement...</p>
        ) : reminders.length > 0 ? (
          reminders.map((reminder) => (
            <RemindersCard key={reminder.id} reminder={reminder} />
          ))
        ) : (
          <p className="text-sm text-app-muted p-4">Aucun rappel à venir.</p>
        )}
      </div>
    </div>
  );
}

function RemindersCard({ reminder }) {
  const Icon = iconMap[reminder.title] || iconMap["default"];

  return (
    <div className="flex flex-row items-center justify-between p-2">
      <div className="flex flex-row items-center gap-4 p-2 ">
        <div className="h-12 w-12 flex items-center justify-center bg-orange-500/10 rounded-full">
          <Icon size={18} className="text-orange-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-app-text">{reminder.title}</p>
          <p className="text-xs text-app-muted">{reminder.vehicle_name}</p>
        </div>
      </div>
      <p className="text-sm font-semibold text-orange-500">
        {reminder.due_date
          ? new Date(reminder.due_date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : reminder.mileage_threshold
            ? `${reminder.mileage_threshold} km`
            : "—"}
      </p>
    </div>
  );
}
