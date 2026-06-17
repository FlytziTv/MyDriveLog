"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notif_preferences, reminder_periods } from "@/lib/preferences";
import { ArrowLeft } from "lucide-react";
import { SectionProfile } from "@/components/profile/Sections";
import Link from "next/link";
import { updatePreferences } from "@/server/actions/preferences";
import { Preferences } from "@prisma/client";

export default function NotificationsClient({
  preferences,
}: {
  preferences: Preferences | null;
}) {
  const router = useRouter();
  const [settings, setSettings] = useState({
    notifMaintenanceReminder: preferences?.notifMaintenanceReminder ?? true,
    notifMileageAlert: preferences?.notifMileageAlert ?? true,
    notifMonthlySummary: preferences?.notifMonthlySummary ?? true,
    notifNews: preferences?.notifNews ?? false,
    reminderBefore: preferences?.reminderBefore ?? "FOURTEEN_DAYS",
  });

  async function toggle(key: keyof typeof settings) {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    await updatePreferences({ [key]: updated[key] } as Partial<Preferences>);
    router.refresh();
  }

  async function setReminder(value: string) {
    setSettings((s) => ({
      ...s,
      reminderBefore: value as Preferences["reminderBefore"],
    }));
    await updatePreferences({
      reminderBefore: value as Preferences["reminderBefore"],
    });
    router.refresh();
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <Link
          href="/profile"
          className="flex items-center gap-2 text-neutral-500"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-sm">Retour</span>
        </Link>

        <div className="flex flex-col gap-0">
          <h2 className="text-2xl font-bold text-neutral-900">Notifications</h2>
          <p className="text-xs text-neutral-400">
            Gérez vos rappels et alertes
          </p>
        </div>
      </div>

      {notif_preferences.map((group, index) => (
        <SectionProfile key={index} title={group.group}>
          {group.context.map((item) => (
            <div
              key={item.key}
              className="bg-white border border-neutral-200 rounded-xl p-4 flex items-center gap-3"
            >
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm font-medium text-neutral-900">
                  {item.title}
                </p>
                <p className="text-xs text-neutral-500">{item.description}</p>
              </div>
              <button
                onClick={() => toggle(item.key)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  settings[item.key] ? "bg-neutral-900" : "bg-neutral-200"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings[item.key] ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </SectionProfile>
      ))}

      <SectionProfile title="Délais de rappel">
        <div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col gap-2">
          <p className="text-sm font-medium text-neutral-900">
            Rappeler avant l&apos;échéance
          </p>
          <div className="flex flex-wrap flex-row gap-2">
            {reminder_periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setReminder(period.value)}
                className={`h-9 px-4 rounded-lg text-[13px] font-medium border transition-colors ${
                  settings.reminderBefore === period.value
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </SectionProfile>
    </>
  );
}
