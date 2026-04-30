import { useState, useEffect, useCallback } from "react";
import api from "../services/api"; // vérifie que ton api.ts existe
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslation } from "react-i18next";
import { HeaderDashboard } from "../components/layout/HeaderDashboard";
import Sidebar from "../components/layout/SideBar";
import { VehicleCard } from "../components/vehicles/VehicleCard";
import DialogContent from "../components/layout/DialogContent";
import { AddVehicleForm } from "../components/dialog/add/vehicle-form";

type Vehicle = {
  id: string;
  nickname: string;
  brand: string;
  model: string;
  year: number;
  cover_photo_url: string | null;
  current_mileage: number;
  total_cost: string;
  interventions_count: string;
  reminders_count: string;
};

export default function VehiclesPage() {
  const { t } = useTranslation(["vehicles", "dialog"]);
  const [open, setOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const fetchVehicles = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/vehicles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <div className="flex-1 px-6 py-4 flex flex-col gap-6 overflow-y-auto">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <HeaderDashboard
            title={t("title")}
            description={t("subtitle")}
            buttonText={t("button")}
            onButtonClick={() => setOpen(true)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                id={vehicle.id}
                name={vehicle.nickname}
                model={vehicle.model}
                year={vehicle.year}
                image={vehicle.cover_photo_url ?? undefined}
                mileage={vehicle.current_mileage}
                totalCost={Number(vehicle.total_cost)}
              />
            ))}
          </div>

          <DialogContent title={t("dialog:add_vehicle.title")}>
            <AddVehicleForm
              onSuccess={() => {
                fetchVehicles();
                setOpen(false);
              }}
              onCancel={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog.Root>
      </div>
    </div>
  );
}
