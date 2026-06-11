"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

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
