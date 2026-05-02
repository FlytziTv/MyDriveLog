import { useTranslation } from "react-i18next";

interface SelectedFuelTypes {
  value: string;
  label: string;
}

export const useSelectedFuelTypes = (): SelectedFuelTypes[] => {
  const { t } = useTranslation(["dialog", "common"]);

  return [
    { value: "gasoline", label: t("add_vehicle.select.fuel_option.gasoline") },
    { value: "diesel", label: t("add_vehicle.select.fuel_option.diesel") },
    { value: "electric", label: t("add_vehicle.select.fuel_option.electric") },
    { value: "hybrid", label: t("add_vehicle.select.fuel_option.hybrid") },
    { value: "other", label: t("add_vehicle.select.fuel_option.other") },
  ];
};
