import { FileText, Droplets } from "lucide-react";

const fake = [
  {
    id: 1,
    title: "Vidange",
    type: "",
    icon: Droplets,
    vehicle: "Renault Clio",
    duekilo: 15000,
  },
  {
    id: 2,
    title: "Contrôle technique",
    type: "",
    icon: FileText,
    vehicle: "Peugeot 208",
    dueDate: "2024-07-30",
  },
];

export default function RappelWidget() {
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

      <div>
        {fake.slice(0, 3).map((vehicle) => (
          <InterventionCard key={vehicle.id} intervention={vehicle} />
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
        <div className="h-12 w-12 flex items-center justify-center bg-orange-500/10 rounded-full">
          <Icon size={18} className="text-orange-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-app-text">
            {intervention.title}
          </p>
          <p className="text-xs text-app-muted">{intervention.vehicle}</p>
        </div>
      </div>
      <p className="text-sm font-semibold text-orange-500">
        {intervention.dueDate || intervention.duekilo}
      </p>
    </div>
  );
}
