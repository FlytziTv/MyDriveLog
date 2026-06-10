import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";
import { GroupInput, InputBase, LabelBase } from "@/components/ui/Input";

export default function AddVehicle() {
  return (
    <>
      {/* Return page */}
      <div className="pb-4 flex items-center gap-4">
        <Link href="/vehicles">
          <ArrowLeft className="w-6 h-6 text-neutral-900" />
        </Link>
        <h2 className="text-[20px] font-semibold text-neutral-900">
          Nouveau véhicule
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        {/* Image */}
        <div className="relative h-44 bg-transparent border-3 border-dashed border-neutral-300 rounded-xl overflow-hidden cursor-pointer hover:bg-neutral-200/50 transition-colors duration-200">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400">
            <Camera size={56} strokeWidth={1.5} />
            Ajouter une photo
          </div>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-2 relative">
          <GroupInput>
            <LabelBase label="Nom du véhicule" />
            <InputBase type="text" placeholder="Nom du véhicule (Pseudo)" />
          </GroupInput>

          <GroupInput>
            <LabelBase label="Marque" />
            <InputBase type="text" placeholder="Marque du véhicule" />
          </GroupInput>

          <GroupInput>
            <LabelBase label="Modèle" />
            <InputBase type="text" placeholder="Modèle du véhicule" />
          </GroupInput>

          <GroupInput>
            <LabelBase label="Année" />
            <InputBase
              type="number"
              min={1899}
              max={new Date().getFullYear() + 1}
              placeholder="Année du véhicule"
            />
          </GroupInput>

          <GroupInput>
            <LabelBase label="Immatriculation" />
            <InputBase type="text" placeholder="Immatriculation du véhicule" />
          </GroupInput>

          <GroupInput>
            <LabelBase label="Kilométrage actuel" />
            <InputBase
              type="number"
              min={0}
              placeholder="Kilométrage actuel du véhicule"
            />
          </GroupInput>

          <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-neutral-100 max-w-[430px] mx-auto">
            <button
              // disabled={!form.subject || !form.message || !form.email}
              className="w-full h-10 bg-neutral-900 text-white rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              Ajouter le véhicule
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
