import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getUserStats() {
  // Récupération sécurisée de l'utilisateur
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Si pas de session ou pas d'utilisateur, on retourne des stats à 0
  if (!session?.user?.id) {
    return { vehiclesCount: 0, interventionsCount: 0 };
  }

  // On peut maintenant utiliser l'ID de l'utilisateur pour faire nos requêtes sécurisées
  const userId = session.user.id;

  // On compte tout en parallèle de manière ultra performante
  const [vehiclesCount, maintenancesCount, expensesCount] = await Promise.all([
    prisma.vehicle.count({
      where: { userId },
    }),
    prisma.maintenance.count({
      where: { vehicle: { userId } },
    }),
    prisma.expense.count({
      where: { vehicle: { userId } },
    }),
  ]);

  return {
    vehiclesCount,
    // Le total des entretiens + dépenses (ce qui remplace FakeHistory.length)
    interventionsCount: maintenancesCount + expensesCount,
  };
}
