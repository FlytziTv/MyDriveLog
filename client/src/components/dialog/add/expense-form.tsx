import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  InputGroup,
  InputGroupInput,
  InputGroupLabel,
  InputGroupTextarea,
  NativeSelect,
} from "../../ui/InputGroup";

export function AddExpenseForm({
  onSuccess,
  onCancel,
  vehicles = [],
}: {
  onSuccess: () => void;
  onCancel: () => void;
  vehicles: { id: string; name: string }[];
}) {
  const { t } = useTranslation(["dialog", "common"]);

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    vehicle_id: "",
    date: new Date().toISOString().split("T")[0],
    mileage: "",
    location: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["amount", "mileage"].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const payload = {
        title: formData.location || "Dépense diverse",
        amount: formData.amount,
        category: formData.category,
        date: formData.date,
        mileage: formData.mileage || null,
        location: formData.location || null,
        notes: formData.notes || null,
      };

      const response = await fetch(
        `http://localhost:5000/api/expenses/${formData.vehicle_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) throw new Error("Erreur lors de l'ajout de la dépense");

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const SelectedCategories = [
    { value: "fuel", label: t("add_expense.select.category_option.fuel") },
    {
      value: "maintenance",
      label: t("add_expense.select.category_option.maintenance"),
    },
    {
      value: "insurance",
      label: t("add_expense.select.category_option.insurance"),
    },
    {
      value: "parking",
      label: t("add_expense.select.category_option.parking"),
    },
    { value: "tolls", label: t("add_expense.select.category_option.tolls") },
    {
      value: "washing",
      label: t("add_expense.select.category_option.washing"),
    },
    { value: "other", label: t("add_expense.select.category_option.other") },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <InputGroup>
          <InputGroupLabel>{t("add_expense.input.amount")}</InputGroupLabel>
          <InputGroupInput
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder={t("add_expense.input.amount_placeholder")}
            required
          />
        </InputGroup>

        <InputGroup>
          <InputGroupLabel>{t("add_expense.input.category")}</InputGroupLabel>
          <NativeSelect
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">
              {t("add_expense.input.category_placeholder")}
            </option>
            {SelectedCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </NativeSelect>
        </InputGroup>
      </div>

      <InputGroup>
        <InputGroupLabel>{t("add_expense.input.vehicle")}</InputGroupLabel>
        <NativeSelect
          name="vehicle_id"
          value={formData.vehicle_id}
          onChange={handleChange}
          required
        >
          <option value="">{t("add_expense.input.vehicle_placeholder")}</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </NativeSelect>
      </InputGroup>

      <div className="grid grid-cols-2 gap-4">
        <InputGroup>
          <InputGroupLabel>{t("add_expense.input.date")}</InputGroupLabel>
          <InputGroupInput
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            placeholder={t("add_expense.input.date_placeholder")}
            required
          />
        </InputGroup>

        <InputGroup>
          <InputGroupLabel>{t("add_expense.input.mileage")}</InputGroupLabel>
          <InputGroupInput
            name="mileage"
            type="number"
            value={formData.mileage}
            onChange={handleChange}
            placeholder={t("add_expense.input.mileage_placeholder")}
          />
        </InputGroup>
      </div>

      <InputGroup>
        <InputGroupLabel>{t("add_expense.input.location")}</InputGroupLabel>
        <InputGroupInput
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder={t("add_expense.input.location_placeholder")}
        />
      </InputGroup>

      <InputGroup>
        <InputGroupLabel>{t("add_expense.input.notes")}</InputGroupLabel>
        <InputGroupTextarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder={t("add_expense.input.notes_placeholder")}
        />
      </InputGroup>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-transparent hover:bg-foreground/10 border text-foreground font-medium py-2 px-6 rounded-md transition-colors duration-200 cursor-pointer"
        >
          {t("common:dialog_actions.cancel")}
        </button>
        <button
          type="submit"
          className="bg-foreground hover:bg-foreground/70 text-background font-medium py-2 px-6 rounded-md transition-colors disabled:cursor-not-allowed disabled:bg-foreground/50 disabled:opacity-50 duration-200 cursor-pointer"
        >
          {t("dialog:add_expense.submit")}
        </button>
      </div>
    </form>
  );
}
