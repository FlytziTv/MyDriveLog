"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SegmentedControl from "@/components/ui/SegmentedControl";
import { SectionProfile } from "@/components/profile/Sections";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SelectBase } from "@/components/ui/Input";
import {
  pref_unit,
  pref_devise,
  pref_langue,
  pref_theme,
} from "@/lib/preferences";
import {
  DistanceUnit,
  Currency,
  Language,
  Theme,
  Preferences,
} from "@prisma/client";
import { updatePreferences } from "@/server/actions/preferences";

export default function PreferencesClient({
  preferences,
}: {
  preferences: Preferences | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [prefSettings, setPrefSettings] = useState({
    unite: preferences?.distanceUnit ?? "KM",
    langue: preferences?.language ?? "FR",
    devise: preferences?.currency ?? "EUR",
    theme: preferences?.theme ?? "SYSTEM",
  });

  async function handleSave() {
    setLoading(true);
    await updatePreferences({
      distanceUnit: prefSettings.unite as Preferences["distanceUnit"],
      language: prefSettings.langue as Preferences["language"],
      currency: prefSettings.devise as Preferences["currency"],
      theme: prefSettings.theme as Preferences["theme"],
    });
    setLoading(false);
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
          <h2 className="text-2xl font-bold text-neutral-900">Préférences</h2>
          <p className="text-xs text-neutral-400">
            Personnalisez votre expérience
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col gap-4">
          <SectionProfile title="Unité de distance">
            <SegmentedControl
              value={prefSettings.unite}
              options={pref_unit}
              onChange={(v) =>
                setPrefSettings((s) => ({ ...s, unite: v as DistanceUnit }))
              }
            />
          </SectionProfile>

          <SectionProfile title="Devise">
            <SegmentedControl
              value={prefSettings.devise}
              options={pref_devise}
              onChange={(v) =>
                setPrefSettings((s) => ({ ...s, devise: v as Currency }))
              }
            />
          </SectionProfile>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col gap-4">
          <SectionProfile title="Langue">
            <SelectBase
              value={prefSettings.langue}
              onChange={(e) =>
                setPrefSettings((s) => ({
                  ...s,
                  langue: e.target.value as Language,
                }))
              }
              options={pref_langue}
            />
          </SectionProfile>

          <SectionProfile title="Thème">
            <SegmentedControl
              value={prefSettings.theme}
              options={pref_theme}
              onChange={(v) =>
                setPrefSettings((s) => ({ ...s, theme: v as Theme }))
              }
            />
          </SectionProfile>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full h-10 bg-neutral-900 text-white rounded-xl text-sm font-medium disabled:opacity-40"
        >
          {loading ? "Enregistrement..." : "Enregistrer les préférences"}
        </button>
      </div>
    </>
  );
}
