import HistoryCar from "@/components/car/HistoryCar";
import MiniStatsTabs from "@/components/car/MiniStatsTabs";
import { FakeHistory, FakeVehicles } from "@/lib/fake";
import { ArrowLeft, Car } from "lucide-react";
import Link from "next/link";

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = FakeVehicles.find((v) => v.id === id);
  // const vehicle = await prisma.vehicle.findUnique({ where: { id } });

  if (!vehicle) return <p>Véhicule introuvable</p>;

  // Permet le calcul du total des dépenses pour ce véhicule
  const vehicleHistory = FakeHistory.filter((item) => item.vehicleId === id);
  const total = vehicleHistory.reduce((acc, item) => acc + item.cost, 0);
  // const vehicleHistory = await prisma.vehicle.findUnique({
  //   where: { id },
  //   include: {
  //     expenses: true,
  //     maintenances: true,
  //   },
  // });
  //
  // const total =
  //   (vehicleHistory?.expenses.reduce((acc, item) => acc + item.amount, 0) ?? 0) +
  //   (vehicleHistory?.maintenances.reduce((acc, item) => acc + (item.cost ?? 0), 0) ?? 0);

  // Permet de récupérer la date du dernier entretien
  const lastMaintenance =
    FakeHistory.filter(
      (item) => item.vehicleId === id && item.kind === "maintenance",
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
      ?.date ?? null;
  // const lastMaintenance = await prisma.maintenance.findFirst({
  //   where: { vehicleId: id },
  //   orderBy: { date: "desc" },
  //   select: { date: true },
  // });
  // lastMaintenance?.date ?? null

  return (
    <>
      {/* Return page */}
      <div className="pb-4 flex items-center gap-4">
        <Link href="/vehicles">
          <ArrowLeft className="w-6 h-6 text-neutral-900" />
        </Link>
        <h2 className="text-[20px] font-semibold text-neutral-900">
          {vehicle.name || "Nom du véhicule"}
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
            {vehicle.model || "Model du véhicule"}
          </h3>
          <p className="text-[14px] text-neutral-500">
            {vehicle.year} · {vehicle.plate}
          </p>
        </div>

        <MiniStatsTabs km={vehicle.km} date={lastMaintenance} total={total} />

        <HistoryCar id={id} />
      </div>
    </>
  );
}
