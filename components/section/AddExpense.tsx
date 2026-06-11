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
import { ExpenseOptions } from "@/lib/category";
import { createExpense } from "@/server/actions/expense";
import { ExpenseCategory } from "@prisma/client";

export default function AddExpense({
  vehicles,
  onSuccess,
}: {
  vehicles: { id: string; name: string }[];
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    category: ExpenseOptions[0].value,
    vehicleId: vehicles[0]?.id ?? "",
    date: "",
    amount: "",
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
      await createExpense({
        vehicleId: form.vehicleId,
        category: form.category as ExpenseCategory,
        date: form.date,
        amount: parseFloat(form.amount),
        notes: form.notes || undefined,
      });
      onSuccess?.();
    } catch {
      setError("Une erreur est survenue.");
      setLoading(false);
    }
  }

  const isValid = form.vehicleId && form.date && form.amount;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto pb-26 flex flex-col gap-4 overflow-auto p-4 rounded-t-sm"
    >
      <GroupInput>
        <LabelBase label="Catégorie" />
        <SelectBase
          name="category"
          options={ExpenseOptions}
          value={form.category}
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
        <LabelBase label="Montant" />
        <InputUnit
          name="amount"
          type="number"
          min={0}
          placeholder="Montant de la dépense"
          unit="€"
          value={form.amount}
          onChange={handleChange}
        />
      </GroupInput>

      <GroupInput>
        <LabelBase label="Notes (optionnel)" />
        <TextareaBase
          name="notes"
          placeholder="Détails de la dépense"
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
          {loading ? "Ajout en cours..." : "Ajouter la dépense"}
        </button>
      </div>
    </form>
  );
}
