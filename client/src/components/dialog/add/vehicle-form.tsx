import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  InputGroup,
  InputGroupInput,
  InputGroupLabel,
  NativeSelect,
} from "../../ui/InputGroup";
import { useSelectedFuelTypes } from "../../../lib/add_config";

export function AddVehicleForm({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation(["dialog", "common"]);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    license_plate: "",
    vin: "",
    year: new Date().getFullYear(), // Par défaut, l'année en cours
    fuel_type: "",
    purchase_date: "",
    purchase_price: 0,
    purchase_mileage: 0,
    current_mileage: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Conversion en nombre pour les champs numériques
      [name]: [
        "year",
        "purchase_price",
        "purchase_mileage",
        "current_mileage",
      ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout");
      }

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <InputGroup>
        <InputGroupLabel>{t("add_vehicle.input.name")}</InputGroupLabel>
        <InputGroupInput
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={t("add_vehicle.input.name_placeholder")}
        />
      </InputGroup>

      <div className="grid grid-cols-2 gap-4">
        <InputGroup>
          <InputGroupLabel>{t("add_vehicle.input.brand")}</InputGroupLabel>
          <InputGroupInput
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder={t("add_vehicle.input.brand_placeholder")}
          />
        </InputGroup>

        <InputGroup>
          <InputGroupLabel>{t("add_vehicle.input.model")}</InputGroupLabel>
          <InputGroupInput
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder={t("add_vehicle.input.model_placeholder")}
          />
        </InputGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputGroup>
          <InputGroupLabel>
            {t("add_vehicle.input.license_plate")}
          </InputGroupLabel>
          <InputGroupInput
            name="license_plate"
            value={formData.license_plate}
            onChange={handleChange}
            placeholder={t("add_vehicle.input.license_plate_placeholder")}
          />
        </InputGroup>

        <InputGroup>
          <InputGroupLabel>{t("add_vehicle.input.vin")}</InputGroupLabel>
          <InputGroupInput
            name="vin"
            value={formData.vin}
            onChange={handleChange}
            placeholder={t("add_vehicle.input.vin_placeholder")}
          />
        </InputGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputGroup>
          <InputGroupLabel>{t("add_vehicle.input.year")}</InputGroupLabel>
          <InputGroupInput
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder={t("add_vehicle.input.year_placeholder")}
          />
        </InputGroup>

        <InputGroup>
          <InputGroupLabel>{t("add_vehicle.input.fuel")}</InputGroupLabel>
          <NativeSelect
            name="fuel_type"
            value={formData.fuel_type}
            onChange={handleChange}
          >
            <option>{t("add_vehicle.input.fuel_placeholder")}</option>
            {useSelectedFuelTypes().map((fuelType) => (
              <option key={fuelType.value} value={fuelType.value}>
                {fuelType.label}
              </option>
            ))}
          </NativeSelect>
        </InputGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputGroup>
          <InputGroupLabel>
            {t("add_vehicle.input.purchase_date")}
          </InputGroupLabel>
          <InputGroupInput
            type="date"
            name="purchase_date"
            value={formData.purchase_date}
            onChange={handleChange}
            placeholder={t("add_vehicle.input.purchase_date_placeholder")}
          />
        </InputGroup>

        <InputGroup>
          <InputGroupLabel>
            {t("add_vehicle.input.purchase_price")}
          </InputGroupLabel>
          <InputGroupInput
            type="number"
            name="purchase_price"
            value={formData.purchase_price}
            onChange={handleChange}
            placeholder={t("add_vehicle.input.purchase_price_placeholder")}
          />
        </InputGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputGroup>
          <InputGroupLabel>
            {t("add_vehicle.input.purchase_mileage")}
          </InputGroupLabel>
          <InputGroupInput
            type="number"
            name="purchase_mileage"
            value={formData.purchase_mileage}
            onChange={handleChange}
            placeholder={t("add_vehicle.input.purchase_mileage_placeholder")}
          />
        </InputGroup>

        <InputGroup>
          <InputGroupLabel>
            {t("add_vehicle.input.current_mileage")}
          </InputGroupLabel>
          <InputGroupInput
            type="number"
            name="current_mileage"
            value={formData.current_mileage}
            onChange={handleChange}
            placeholder={t("add_vehicle.input.current_mileage_placeholder")}
          />
        </InputGroup>
      </div>

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
