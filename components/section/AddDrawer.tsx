"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import SegmentedControl from "../ui/SegmentedControl";
import {
  LabelBase,
  InputBase,
  SelectBase,
  TextareaBase,
  GroupInput,
  InputUnit,
} from "../ui/Input";
import { ExpenseOptions, MaintenanceOptions } from "@/lib/category";
import { VehicleOptions } from "@/lib/fake";

const typeInter = [
  { value: "maintenance", label: "Entretien" },
  { value: "expense", label: "Dépense" },
];

export default function AddDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [TypeInter, setTypeInter] = useState("maintenance");

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        {/* <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-w-[430px] max-h-[82vh] rounded-t-[10px]"> */}
        <Drawer.Content className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white rounded-t-2xl outline-none">
          {/* Title & type */}
          <div className="w-full mx-auto overflow-auto p-4 rounded-t-sm border-b border-gray-200">
            <Drawer.Handle />
            {/* Title */}
            <div className="flex flex-col gap-2">
              <Drawer.Title className="font-bold text-lg text-gray-900 mt-4">
                {TypeInter === "maintenance"
                  ? "Nouvelle intervention"
                  : "Nouvelle dépense"}
              </Drawer.Title>
              <SegmentedControl
                value={TypeInter}
                options={typeInter}
                onChange={(v) => setTypeInter(v)}
              />
            </div>
          </div>

          {TypeInter === "maintenance" ? (
            <form className="w-full mx-auto pb-26 flex flex-col gap-4 overflow-auto p-4 rounded-t-sm">
              <GroupInput>
                <LabelBase label="Type" />
                <SelectBase options={MaintenanceOptions} />
              </GroupInput>

              <GroupInput>
                <LabelBase label="Véhicule" />
                <SelectBase options={VehicleOptions} />
              </GroupInput>

              <GroupInput>
                <LabelBase label="Date" />
                <InputBase type="date" />
              </GroupInput>

              <GroupInput>
                <LabelBase label="Kilométrage" />
                <InputUnit
                  type="number"
                  min={0}
                  placeholder="Kilométrage au moment de l'intervention"
                  unit="km"
                />
              </GroupInput>

              <GroupInput>
                <LabelBase label="Montant" />
                <InputUnit
                  type="number"
                  min={0}
                  placeholder="Montant de l'intervention"
                  unit="€"
                />
              </GroupInput>

              <GroupInput>
                <LabelBase label="Garage (optionnel)" />
                <InputBase placeholder="Nom du garage" />
              </GroupInput>

              <GroupInput>
                <LabelBase label="Notes (optionnel)" />
                <TextareaBase placeholder="Détails de l'intervention" />
              </GroupInput>

              <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-neutral-100 max-w-[430px] mx-auto">
                <button
                  // disabled={!form.subject || !form.message || !form.email}
                  className="w-full h-10 bg-neutral-900 text-white rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  Ajouter l&apos;intervention
                </button>
              </div>
            </form>
          ) : (
            <form className="w-full mx-auto pb-26 flex flex-col gap-4 overflow-auto p-4 rounded-t-sm">
              <GroupInput>
                <LabelBase label="Catégorie" />
                <SelectBase options={ExpenseOptions} />
              </GroupInput>

              <GroupInput>
                <LabelBase label="Véhicule" />
                <SelectBase options={VehicleOptions} />
              </GroupInput>

              <GroupInput>
                <LabelBase label="Date" />
                <InputBase type="date" />
              </GroupInput>

              <GroupInput>
                <LabelBase label="Montant" />
                <InputUnit
                  type="number"
                  min={0}
                  placeholder="Montant de la dépense"
                  unit="€"
                />
              </GroupInput>

              <GroupInput>
                <LabelBase label="Notes (optionnel)" />
                <TextareaBase placeholder="Détails de l'intervention" />
              </GroupInput>

              <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-neutral-100 max-w-[430px] mx-auto">
                <button
                  // disabled={!form.subject || !form.message || !form.email}
                  className="w-full h-10 bg-neutral-900 text-white rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  Ajouter la dépense
                </button>
              </div>
            </form>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
