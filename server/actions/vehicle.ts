"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const FREE_VEHICLE_LIMIT = 1;

export async function createVehicle(formData: {
  brand: string;
  model: string;
  year: number;
  plate?: string;
  mileage: number;
  name: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Non autorisé");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true },
  });

  if (user?.plan === "FREE") {
    const count = await prisma.vehicle.count({
      where: { userId: session.user.id },
    });

    if (count >= FREE_VEHICLE_LIMIT) {
      throw new Error(
        `Limite de ${FREE_VEHICLE_LIMIT} véhicules atteinte. Passez en Premium pour en ajouter davantage.`,
      );
    }
  }

  await prisma.vehicle.create({
    data: {
      ...formData,
      userId: session.user.id,
    },
  });

  revalidatePath("/vehicles");
}

export async function deleteVehicle(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Non autorisé");

  await prisma.vehicle.delete({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/vehicles");
}
