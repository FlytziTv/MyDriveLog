import { useTranslation } from "react-i18next";
import {
  InputGroup,
  InputGroupInput,
  InputGroupLabel,
} from "../../ui/InputGroup";

export function AddVehicleForm({
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <InputGroup>
        <InputGroupLabel>{t("add_vehicle.input.name")}</InputGroupLabel>
        <InputGroupInput
          placeholder={t("add_vehicle.input.name_placeholder")}
        />
      </InputGroup>

      <InputGroup>
        <InputGroupLabel>{t("add_vehicle.input.model")}</InputGroupLabel>
        <InputGroupInput
          placeholder={t("add_vehicle.input.model_placeholder")}
        />
      </InputGroup>

      <div className="grid grid-cols-2 gap-4">
        <InputGroup>
          <InputGroupLabel>{t("add_vehicle.input.year")}</InputGroupLabel>
          <InputGroupInput
            type="date"
            placeholder={t("add_vehicle.input.year_placeholder")}
          />
        </InputGroup>

        <InputGroup>
          <InputGroupLabel>{t("add_vehicle.input.mileage")}</InputGroupLabel>
          <InputGroupInput
            type="number"
            placeholder={t("add_vehicle.input.mileage_placeholder")}
          />
        </InputGroup>
      </div>

      <InputGroup>
        <InputGroupLabel>
          {t("add_vehicle.input.purchase_date")}
        </InputGroupLabel>
        <InputGroupInput
          type="date"
          placeholder={t("add_vehicle.input.purchase_date_placeholder")}
        />
      </InputGroup>

      <InputGroup>
        <InputGroupLabel>
          {t("add_vehicle.input.purchase_price")}
        </InputGroupLabel>
        <InputGroupInput
          type="number"
          placeholder={t("add_vehicle.input.purchase_price_placeholder")}
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
          {t("dialog:add_vehicle.submit")}
        </button>
      </div>
    </form>
  );
}
