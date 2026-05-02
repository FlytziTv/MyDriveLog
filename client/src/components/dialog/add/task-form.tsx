import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  InputGroup,
  InputGroupInput,
  InputGroupLabel,
  NativeSelect,
} from "../../ui/InputGroup";

export function AddTaskForm({
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
    task: "",
    vehicle_id: "",
    due_date: new Date().toISOString().split("T")[0],
    mileage: "",
    estimated_cost: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["estimated_cost", "mileage"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const payload = {
        title: formData.task,
        description: formData.notes,
        category: formData.task,
        done_by: "Moi",
        mileage: formData.mileage,
        date: formData.due_date,
        cost: formData.estimated_cost,
      };

      const response = await fetch(
        `http://localhost:5000/api/maintenance/${formData.vehicle_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok)
        throw new Error("Erreur lors de l'ajout de l'entretien");

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const SelectedTask = [
    {
      value: "oil-change",
      label: t("add_task.select.category_option.oil-change"),
    },
    {
      value: "tire-rotation",
      label: t("add_task.select.category_option.tire-rotation"),
    },
    {
      value: "brake-inspection",
      label: t("add_task.select.category_option.brake-inspection"),
    },
    {
      value: "air-filter",
      label: t("add_task.select.category_option.air-filter"),
    },
    { value: "battery", label: t("add_task.select.category_option.battery") },
    {
      value: "alignment",
      label: t("add_task.select.category_option.alignment"),
    },
    {
      value: "inspection",
      label: t("add_task.select.category_option.inspection"),
    },
    { value: "other", label: t("add_task.select.category_option.other") },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <InputGroup>
        <InputGroupLabel>{t("add_task.input.task")}</InputGroupLabel>
        <NativeSelect
          name="task"
          value={formData.task}
          onChange={handleChange}
          required
        >
          <option value="">{t("add_task.input.task_placeholder")}</option>
          {SelectedTask.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </NativeSelect>
      </InputGroup>

      <InputGroup>
        <InputGroupLabel>{t("add_task.input.vehicle")}</InputGroupLabel>
        <NativeSelect
          name="vehicle_id"
          value={formData.vehicle_id}
          onChange={handleChange}
          required
        >
          <option value="">{t("add_task.input.vehicle_placeholder")}</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </NativeSelect>
      </InputGroup>

      <div className="grid grid-cols-2 gap-4">
        <InputGroup>
          <InputGroupLabel>{t("add_task.input.due_date")}</InputGroupLabel>
          <InputGroupInput
            name="due_date"
            type="date"
            value={formData.due_date}
            onChange={handleChange}
            placeholder={t("add_task.input.due_date_placeholder")}
            required
          />
        </InputGroup>

        <InputGroup>
          <InputGroupLabel>{t("add_task.input.mileage")}</InputGroupLabel>
          <InputGroupInput
            name="mileage"
            type="number"
            value={formData.mileage}
            onChange={handleChange}
            placeholder={t("add_task.input.mileage_placeholder")}
          />
        </InputGroup>
      </div>

      <InputGroup>
        <InputGroupLabel>{t("add_task.input.estimated_cost")}</InputGroupLabel>
        <InputGroupInput
          name="estimated_cost"
          type="number"
          value={formData.estimated_cost}
          onChange={handleChange}
          placeholder={t("add_task.input.estimated_cost_placeholder")}
        />
      </InputGroup>

      <InputGroup>
        <InputGroupLabel>{t("add_task.input.notes")}</InputGroupLabel>
        <InputGroupInput
          name="notes"
          type="text"
          value={formData.notes}
          onChange={handleChange}
          placeholder={t("add_task.input.notes_placeholder")}
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
          {t("dialog:add_task.submit")}
        </button>
      </div>
    </form>
  );
}
