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
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation(["dialog", "common"]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ... logique API
    onSuccess(); // ferme le dialog
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
    {
      value: "battery",
      label: t("add_task.select.category_option.battery"),
    },
    {
      value: "alignment",
      label: t("add_task.select.category_option.alignment"),
    },
    {
      value: "inspection",
      label: t("add_task.select.category_option.inspection"),
    },
    {
      value: "other",
      label: t("add_task.select.category_option.other"),
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <InputGroup>
        <InputGroupLabel>{t("add_task.input.task")}</InputGroupLabel>
        <NativeSelect>
          <option>{t("add_task.input.task_placeholder")}</option>
          {SelectedTask.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </NativeSelect>
      </InputGroup>

      <InputGroup>
        <InputGroupLabel>{t("add_task.input.vehicle")}</InputGroupLabel>
        <NativeSelect>
          <option>{t("add_task.input.vehicle_placeholder")}</option>
        </NativeSelect>
      </InputGroup>

      <div className="grid grid-cols-2 gap-4">
        <InputGroup>
          <InputGroupLabel>{t("add_task.input.due_date")}</InputGroupLabel>
          <InputGroupInput
            type="date"
            placeholder={t("add_task.input.due_date_placeholder")}
          />
        </InputGroup>

        <InputGroup>
          <InputGroupLabel>{t("add_task.input.mileage")}</InputGroupLabel>
          <InputGroupInput
            type="number"
            placeholder={t("add_task.input.mileage_placeholder")}
          />
        </InputGroup>
      </div>

      <InputGroup>
        <InputGroupLabel>{t("add_task.input.estimated_cost")}</InputGroupLabel>
        <InputGroupInput
          type="number"
          placeholder={t("add_task.input.estimated_cost_placeholder")}
        />
      </InputGroup>

      <InputGroup>
        <InputGroupLabel>{t("add_task.input.notes")}</InputGroupLabel>
        <InputGroupInput
          type="text"
          placeholder={t("add_task.input.notes_placeholder")}
        />
      </InputGroup>

      <div className="grid grid-cols-2 gap-4 ">
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
