import HistoryCar from "@/components/car/HistoryCar";
import MiniStatsTabs from "@/components/car/MiniStatsTabs";
import { ArrowLeft, Car } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatToHistoryItems } from "@/lib/history-utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getPreferences } from "@/server/queries/preferences";

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Récupération sécurisée du véhicule et de son historique
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  // On récupère le véhicule AVEC ses maintenances et dépenses liées, en s'assurant que l'utilisateur est bien le propriétaire
  const vehicleData = await prisma.vehicle.findFirst({
    where: {
      id,
      userId: session?.user?.id, // Sécurité : la voiture DOIT appartenir à l'utilisateur connecté
    },
    include: { expenses: true, maintenances: true },
  });

  // Si pas de véhicule trouvé ou pas propriétaire, on peut afficher une erreur ou un message "Introuvable"
  if (!vehicleData) return <p>Introuvable</p>;

  // Tu passes juste les tableaux de relations de ce véhicule précis
  const vehicleHistory = formatToHistoryItems(
    vehicleData.maintenances,
    vehicleData.expenses,
  );

  // Calcul du total des dépenses + maintenances pour ce véhicule
  const total =
    (vehicleData.expenses.reduce((acc, item) => acc + item.amount, 0) ?? 0) +
    (vehicleData.maintenances.reduce(
      (acc, item) => acc + (item.cost ?? 0),
      0,
    ) ?? 0);

  // Récupération de la date de la dernière maintenance pour l'afficher dans les stats
  const lastMaintenance = await prisma.maintenance.findFirst({
    where: { vehicleId: id },
    orderBy: { date: "desc" },
    select: { date: true },
  });

  const preferences = await getPreferences();

  return (
    <>
      {/* Return page */}
      <div className="pb-4 flex items-center gap-4">
        <Link href="/vehicles">
          <ArrowLeft className="w-6 h-6 text-neutral-900" />
        </Link>
        <h2 className="text-[20px] font-semibold text-neutral-900">
          {vehicleData.name || "Nom du véhicule"}
        </h2>
      </div>

      {/* Image Car */}
      <div className="flex flex-col gap-4">
        <div className="relative h-44 bg-neutral-900 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Car className="w-16 h-16 text-neutral-700" strokeWidth={1.5} />
          </div>
        </div>

        <div className="flex flex-col gap-0">
          <h3 className="text-[20px] font-semibold text-neutral-900">
            {vehicleData.model || "Model du véhicule"}
          </h3>
          <p className="text-[14px] text-neutral-500">
            {vehicleData.year} · {vehicleData.plate}
          </p>
        </div>

        <MiniStatsTabs
          km={vehicleData.mileage}
          date={lastMaintenance?.date.toISOString().split("T")[0] ?? null}
          total={total}
          currency={preferences?.currency ?? "EUR"}
          distanceUnit={preferences?.distanceUnit ?? "KM"}
        />

        <HistoryCar
          vehicleName={vehicleData.name}
          initialHistory={vehicleHistory}
          currency={preferences?.currency ?? "EUR"}
          distanceUnit={preferences?.distanceUnit ?? "KM"}
        />
      </div>
    </>
  );
}
