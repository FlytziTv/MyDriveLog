import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Fonction helper pour centraliser la sécurité
async function getAuthenticatedUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Retourne l'ID de l'utilisateur si connecté, sinon null
  return session?.user?.id || null;
}

// Recupère toutes les dépenses de touts les véhicules de l'utilisateur connecté
export async function getAllExpensesForUser() {
  const userId = await getAuthenticatedUser();
  if (!userId) return [];

  return prisma.expense.findMany({
    where: {
      vehicle: {
        userId: userId,
      },
    },
    orderBy: { date: "desc" },
  });
}

// Récupère toutes les dépenses d'un véhicule en s'assurant que l'utilisateur est bien le propriétaire
export async function getExpensesByVehicleId(vehicleId: string) {
  const userId = await getAuthenticatedUser();
  if (!userId) return [];

  return prisma.expense.findMany({
    where: {
      vehicleId: vehicleId,
      // On s'assure que le véhicule appartient bien à l'utilisateur connecté
      vehicle: {
        userId: userId,
      },
    },
    orderBy: { date: "desc" },
  });
}

// Récupère une dépense par son ID en s'assurant que l'utilisateur est bien le propriétaire du véhicule associé
export async function getExpenseById(id: string) {
  const userId = await getAuthenticatedUser();
  if (!userId) return null;

  // On cherche la dépense ET on valide qu'elle appartient à l'utilisateur
  return prisma.expense.findFirst({
    where: {
      id: id,
      vehicle: {
        userId: userId,
      },
    },
  });
}
