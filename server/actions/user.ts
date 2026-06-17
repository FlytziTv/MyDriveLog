"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updatePersonalInfo(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) throw new Error("Non autorisé");

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      name: `${data.firstName} ${data.lastName}`, // garde "name" cohérent pour Better Auth
    },
  });

  revalidatePath("/profile/personal-info");
  revalidatePath("/profile");
}

export async function deleteAccount() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) throw new Error("Non autorisé");

  await prisma.user.delete({
    where: { id: session.user.id },
  });
}
