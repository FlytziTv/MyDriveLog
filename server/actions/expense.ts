"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { ExpenseCategory } from "@prisma/client";

export async function createExpense(formData: {
  vehicleId: string;
  category: ExpenseCategory;
  date: string;
  amount: number;
  notes?: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Non autorisé");

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: formData.vehicleId, userId: session.user.id },
  });

  if (!vehicle) throw new Error("Véhicule introuvable");

  await prisma.expense.create({
    data: {
      vehicleId: formData.vehicleId,
      category: formData.category,
      date: new Date(formData.date),
      amount: formData.amount,
      notes: formData.notes,
    },
  });

  revalidatePath(`/vehicles/${formData.vehicleId}`);
  revalidatePath("/historique");
}
