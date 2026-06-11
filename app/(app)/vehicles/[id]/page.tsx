import HistoryCar from "@/components/car/HistoryCar";
import MiniStatsTabs from "@/components/car/MiniStatsTabs";
import { ArrowLeft, Car } from "lucide-react";
import Link from "next/link";
import { getVehicleById } from "@/server/queries/vehicle";
import { prisma } from "@/lib/prisma";

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) return <p>Véhicule introuvable</p>;

  const vehicleData = await prisma.vehicle.findUnique({
    where: { id },
    include: {
      expenses: true,
      maintenances: true,
    },
  });

  const total =
    (vehicleData?.expenses.reduce((acc, item) => acc + item.amount, 0) ?? 0) +
    (vehicleData?.maintenances.reduce(
      (acc, item) => acc + (item.cost ?? 0),
      0,
    ) ?? 0);

  const lastMaintenance = await prisma.maintenance.findFirst({
    where: { vehicleId: id },
    orderBy: { date: "desc" },
    select: { date: true },
  });

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

        <MiniStatsTabs
          km={vehicle.mileage}
          date={lastMaintenance?.date.toISOString().split("T")[0] ?? null}
          total={total}
        />

        <HistoryCar id={id} vehicleName={vehicle.name} />
      </div>
    </>
  );
}
