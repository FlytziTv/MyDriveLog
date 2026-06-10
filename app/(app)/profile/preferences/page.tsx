"use client";

import { useState } from "react";

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

export default function Page() {
  const [prefSettings, setPrefSettings] = useState({
    unite: "km",
    langue: "fr",
    devise: "EUR",
    theme: "light",
  });

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
        {/* Unités Preferences */}

        <div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col gap-4">
          {/* Unité de distance */}
          <SectionProfile title="Unité de distance">
            <SegmentedControl
              value={prefSettings.unite}
              options={pref_unit}
              onChange={(v) => setPrefSettings((s) => ({ ...s, unite: v }))}
            />
          </SectionProfile>

          {/* Devise */}
          <SectionProfile title="Devise">
            <SegmentedControl
              value={prefSettings.devise}
              options={pref_devise}
              onChange={(v) => setPrefSettings((s) => ({ ...s, devise: v }))}
            />
          </SectionProfile>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col gap-4">
          {/* Langue */}
          <SectionProfile title="Langue">
            <SelectBase
              value={prefSettings.langue}
              onChange={(e) =>
                setPrefSettings((s) => ({ ...s, langue: e.target.value }))
              }
              options={pref_langue}
            />
          </SectionProfile>

          {/* Devise */}
          <SectionProfile title="Thème">
            <SegmentedControl
              value={prefSettings.theme}
              options={pref_theme}
              onChange={(v) => setPrefSettings((s) => ({ ...s, theme: v }))}
            />
          </SectionProfile>
        </div>

        <button className="w-full h-10 bg-neutral-900 text-white rounded-xl text-sm font-medium">
          Enregistrer les préférences
        </button>
      </div>
    </>
  );
}
