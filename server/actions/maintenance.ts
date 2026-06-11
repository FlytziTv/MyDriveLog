"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { MaintenanceType } from "@prisma/client";

export async function createMaintenance(formData: {
  vehicleId: string;
  type: MaintenanceType;
  date: string;
  mileage: number;
  cost?: number;
  garage?: string;
  notes?: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Non autorisé");

  // Vérifie que le véhicule appartient bien à l'utilisateur
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: formData.vehicleId, userId: session.user.id },
  });

  if (!vehicle) throw new Error("Véhicule introuvable");

  await prisma.maintenance.create({
    data: {
      vehicleId: formData.vehicleId,
      type: formData.type,
      date: new Date(formData.date),
      mileage: formData.mileage,
      cost: formData.cost,
      garage: formData.garage,
      notes: formData.notes,
    },
  });

  revalidatePath(`/vehicles/${formData.vehicleId}`);
  revalidatePath("/historique");
}
