"use client";

import { useState } from "react";
import {
  LabelBase,
  InputBase,
  SelectBase,
  TextareaBase,
  GroupInput,
  InputUnit,
} from "../ui/Input";
import { MaintenanceOptions } from "@/lib/category";
import { getVehicles } from "@/server/queries/vehicle";
import { createMaintenance } from "@/server/actions/maintenance";
import { MaintenanceType } from "@prisma/client";

export default function AddMaintenance({
  vehicles,
  onSuccess,
}: {
  vehicles: { id: string; name: string }[];
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    type: MaintenanceOptions[0].value,
    vehicleId: vehicles[0]?.id ?? "",
    date: "",
    mileage: "",
    cost: "",
    garage: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createMaintenance({
        vehicleId: form.vehicleId,
        type: form.type as MaintenanceType,
        date: form.date,
        mileage: parseInt(form.mileage),
        cost: form.cost ? parseFloat(form.cost) : undefined,
        garage: form.garage || undefined,
        notes: form.notes || undefined,
      });
      onSuccess?.();
    } catch {
      setError("Une erreur est survenue.");
      setLoading(false);
    }
  }

  const isValid = form.vehicleId && form.date && form.mileage;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto pb-26 flex flex-col gap-4 overflow-auto p-4 rounded-t-sm"
    >
      <GroupInput>
        <LabelBase label="Type" />
        <SelectBase
          name="type"
          options={MaintenanceOptions}
          value={form.type}
          onChange={handleChange}
        />
      </GroupInput>

      <GroupInput>
        <LabelBase label="Véhicule" />
        <SelectBase
          name="vehicleId"
          options={vehicles.map((v) => ({ value: v.id, label: v.name }))}
          value={form.vehicleId}
          onChange={handleChange}
        />
      </GroupInput>

      <GroupInput>
        <LabelBase label="Date" />
        <InputBase
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
      </GroupInput>

      <GroupInput>
        <LabelBase label="Kilométrage" />
        <InputUnit
          name="mileage"
          type="number"
          min={0}
          placeholder="Kilométrage au moment de l'intervention"
          unit="km"
          value={form.mileage}
          onChange={handleChange}
        />
      </GroupInput>

      <GroupInput>
        <LabelBase label="Montant" />
        <InputUnit
          name="cost"
          type="number"
          min={0}
          placeholder="Montant de l'intervention"
          unit="€"
          value={form.cost}
          onChange={handleChange}
        />
      </GroupInput>

      <GroupInput>
        <LabelBase label="Garage (optionnel)" />
        <InputBase
          name="garage"
          placeholder="Nom du garage"
          value={form.garage}
          onChange={handleChange}
        />
      </GroupInput>

      <GroupInput>
        <LabelBase label="Notes (optionnel)" />
        <TextareaBase
          name="notes"
          placeholder="Détails de l'intervention"
          value={form.notes}
          onChange={handleChange}
        />
      </GroupInput>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-neutral-100 max-w-[430px] mx-auto">
        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full h-10 bg-neutral-900 text-white rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          {loading ? "Ajout en cours..." : "Ajouter l'intervention"}
        </button>
      </div>
    </form>
  );
}
