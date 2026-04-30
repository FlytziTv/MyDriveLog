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
            placeholder={t("add_expense.input.amount_placeholder")}
          />
        </InputGroup>

        <InputGroup>
          <InputGroupLabel>{t("add_expense.input.category")}</InputGroupLabel>
          <NativeSelect>
            <option>{t("add_expense.input.category_placeholder")}</option>
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
        <NativeSelect>
          <option>{t("add_expense.input.vehicle_placeholder")}</option>
        </NativeSelect>
      </InputGroup>

      <div className="grid grid-cols-2 gap-4">
        <InputGroup>
          <InputGroupLabel>{t("add_expense.input.date")}</InputGroupLabel>
          <InputGroupInput
            type="date"
            placeholder={t("add_expense.input.date_placeholder")}
          />
        </InputGroup>

        <InputGroup>
          <InputGroupLabel>{t("add_expense.input.mileage")}</InputGroupLabel>
          <InputGroupInput
            type="number"
            placeholder={t("add_expense.input.mileage_placeholder")}
          />
        </InputGroup>
      </div>

      <InputGroup>
        <InputGroupLabel>{t("add_expense.input.location")}</InputGroupLabel>
        <InputGroupInput
          placeholder={t("add_expense.input.location_placeholder")}
        />
      </InputGroup>

      <InputGroup>
        <InputGroupLabel>{t("add_expense.input.notes")}</InputGroupLabel>
        <InputGroupTextarea
          placeholder={t("add_expense.input.notes_placeholder")}
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
          {t("dialog:add_expense.submit")}
        </button>
      </div>
    </form>
  );
}
