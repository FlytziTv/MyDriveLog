import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Le helper pour centraliser la session et la sécurité
async function getAuthenticatedUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user?.id || null;
}

// Récupère toutes les maintenances de touts les véhicules de l'utilisateur connecté
export async function getAllMaintenancesForUser() {
  const userId = await getAuthenticatedUser();
  if (!userId) return [];

  return prisma.maintenance.findMany({
    where: {
      vehicle: {
        userId: userId,
      },
    },
    orderBy: { date: "desc" },
  });
}

// Récupère toutes les maintenances d'un véhicule en s'assurant que l'utilisateur est bien le propriétaire
export async function getMaintenancesByVehicleId(vehicleId: string) {
  const userId = await getAuthenticatedUser();
  if (!userId) return [];

  return prisma.maintenance.findMany({
    where: {
      vehicleId: vehicleId,
      // Sécurité : On vérifie que le véhicule appartient bien à l'utilisateur connecté
      vehicle: {
        userId: userId,
      },
    },
    orderBy: { date: "desc" },
  });
}

// Récupère une maintenance par son ID en s'assurant que l'utilisateur est bien le propriétaire du véhicule associé
export async function getMaintenanceById(id: string) {
  const userId = await getAuthenticatedUser();
  if (!userId) return null;

  // Sécurité : findFirst permet de valider la relation avec l'utilisateur
  return prisma.maintenance.findFirst({
    where: {
      id: id,
      vehicle: {
        userId: userId,
      },
    },
  });
}
