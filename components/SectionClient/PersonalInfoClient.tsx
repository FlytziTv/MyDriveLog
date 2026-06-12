"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GroupInput, InputBase, LabelBase } from "@/components/ui/Input";
import { SectionProfile } from "@/components/profile/Sections";
import { ArrowLeft, Camera } from "lucide-react";
import Link from "next/link";
import { updatePersonalInfo } from "@/server/actions/user";

const InfoItems = [
  { label: "Prénom", key: "firstName" as const, type: "text" },
  { label: "Nom", key: "lastName" as const, type: "text" },
  { label: "Email", key: "email" as const, type: "email" },
  { label: "Téléphone", key: "phone" as const, type: "tel" },
];

export default function PersonalInfoClient({
  user,
}: {
  user: {
    firstName: string | null;
    lastName: string | null;
    email: string;
    phone: string | null;
  };
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState({
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.email,
    phone: user.phone ?? "",
  });

  async function save() {
    setLoading(true);
    await updatePersonalInfo(draft);
    setLoading(false);
    setEditing(false);
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

        <div className="flex flex-row items-center justify-between gap-0">
          <h2 className="text-2xl font-bold text-neutral-900">Mon profil</h2>
          <button
            onClick={() => (editing ? save() : setEditing(true))}
            disabled={loading}
            className={`h-8 px-3.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              editing
                ? "bg-neutral-900 text-white"
                : "bg-neutral-200 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {loading ? "..." : editing ? "Enregistrer" : "Modifier"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center my-2">
        <div className="relative">
          <div className="w-20 h-20 shrink-0 rounded-full bg-neutral-900 flex items-center justify-center text-xl font-semibold text-white">
            {draft.firstName[0]}
            {draft.lastName[0]}
          </div>
          {editing && (
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-neutral-900 rounded-full flex items-center justify-center border-2 border-white cursor-pointer">
              <Camera size={14} className="text-white" strokeWidth={2} />
            </div>
          )}
        </div>
        {!editing && (
          <p className="text-lg font-semibold text-neutral-900">
            {draft.firstName} {draft.lastName}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {InfoItems.map((field) => (
          <GroupInput key={field.key}>
            <LabelBase label={field.label} />
            <InputBase
              type={field.type}
              value={draft[field.key]}
              onChange={(e) =>
                setDraft({ ...draft, [field.key]: e.target.value })
              }
              disabled={!editing}
            />
          </GroupInput>
        ))}
      </div>

      <SectionProfile title="Zone de danger">
        <div className="bg-white border border-red-100 rounded-xl p-4 flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium text-neutral-900">
              Supprimer mon compte
            </p>
            <p className="text-xs text-neutral-500">
              Cette action est irréversible
            </p>
          </div>
          <button className="h-8 px-3 border border-red-300 bg-red-500/10 text-red-600 rounded-lg text-[12px] font-medium cursor-pointer hover:bg-red-500/20 transition-colors duration-300">
            Supprimer
          </button>
        </div>
      </SectionProfile>
    </>
  );
}
