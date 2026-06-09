import { notif_preferences } from "@/lib/preferences";
import { ArrowLeft } from "lucide-react";
import { SectionProfile } from "@/components/profile/Sections";
import Link from "next/link";

export default function Notification() {
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
          {group.context.map((item, i) => {
            return (
              <div
                key={item.title + i}
                className="bg-white border border-neutral-200 rounded-xl p-4 flex items-center gap-3"
              >
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-sm font-medium text-neutral-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-neutral-500">{item.description}</p>
                </div>
              </div>
            );
          })}
        </SectionProfile>
      ))}

      <SectionProfile title="Délais de rappel">
        <div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col gap-2">
          <p className="text-sm font-medium text-neutral-900">
            Rappeler avant l&apos;échéance
          </p>
          <div className="flex flex-wrap flex-row gap-2">
            {["7 jours", "14 jours", "1 mois"].map((delay) => (
              <button
                key={delay}
                className={`h-9 px-4 rounded-lg text-[13px] font-medium border transition-colors ${delay === "14 jours" ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"}`}
              >
                {delay}
              </button>
            ))}
          </div>
        </div>
      </SectionProfile>
    </>
  );
}
