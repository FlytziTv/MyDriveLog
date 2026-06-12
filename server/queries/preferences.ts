import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getPreferences() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) return null;

  // upsert : crée les préférences par défaut si elles n'existent pas encore
  return prisma.preferences.upsert({
    where: { userId: session.user.id },
    update: {},
    create: { userId: session.user.id },
  });
}
