import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getVehicles() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return [];

  return prisma.vehicle.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function getVehicleById(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  return prisma.vehicle.findUnique({
    where: { id, userId: session.user.id },
  });
}
