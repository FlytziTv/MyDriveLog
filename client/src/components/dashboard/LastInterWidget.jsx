import { FileText, Droplets } from "lucide-react";

const fake = [
  {
    id: 1,
    title: "Vidange + Filtre à huile",
    type: "",
    icon: Droplets,
    date: "2024-06-15",
    vehicle: "Renault Clio",
    price: 1500,
  },
  {
    id: 2,
    title: "Contrôle technique",
    type: "",
    icon: FileText,
    date: "2024-07-30",
    vehicle: "Peugeot 208",
    price: 2000,
  },
];

export default function LastInterWidget() {
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

      <div>
        {fake.slice(0, 3).map((intervention) => (
          <InterventionCard key={intervention.id} intervention={intervention} />
        ))}
      </div>
    </div>
  );
}

function InterventionCard({ intervention }) {
  const Icon = intervention.icon;

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
          <p className="text-xs text-app-muted">{intervention.date}</p>
          <p className="text-xs text-app-muted">{intervention.vehicle}</p>
        </div>
      </div>
      <p className="text-sm text-app-text">{intervention.price} €</p>
    </div>
  );
}
