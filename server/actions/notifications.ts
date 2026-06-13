"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function dismissNotification(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Non autorisé");

  await prisma.notification.delete({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/notifications");
}

export async function markAsRead(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Non autorisé");

  await prisma.notification.update({
    where: { id, userId: session.user.id },
    data: { unread: false },
  });

  revalidatePath("/notifications");
}
