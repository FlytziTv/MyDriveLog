"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  ReminderPeriod,
  DistanceUnit,
  Currency,
  Language,
  Theme,
} from "@prisma/client";

export async function updatePreferences(data: {
  notifMaintenanceReminder?: boolean;
  notifMileageAlert?: boolean;
  notifMonthlySummary?: boolean;
  notifNews?: boolean;
  reminderBefore?: ReminderPeriod;
  distanceUnit?: DistanceUnit;
  currency?: Currency;
  language?: Language;
  theme?: Theme;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Non autorisé");

  await prisma.preferences.upsert({
    where: { userId: session.user.id },
    update: data,
    create: { userId: session.user.id, ...data },
  });

  revalidatePath("/profile/preferences");
}
