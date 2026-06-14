"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { SubscriptionPlan } from "@prisma/client";

// Change le plan d'abonnement de l'utilisateur connecté
export async function changePlan(plan: SubscriptionPlan) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Non autorisé");

  const renewsAt =
    plan === "PREMIUM"
      ? new Date(new Date().setMonth(new Date().getMonth() + 1))
      : null;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      plan,
      planRenewsAt: renewsAt,
    },
  });

  revalidatePath("/profile/subscriptions");
}

// Annule l'abonnement de l'utilisateur connecté
export async function cancelSubscription() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Non autorisé");

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      plan: "FREE",
      planRenewsAt: null,
    },
  });

  revalidatePath("/profile/subscriptions");
}
