import { useVehicles } from "../contexts/VehicleContext";
import { useState, useEffect, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import DialogContent from "../components/layout/DialogContent";
import { HeaderDashboard } from "../components/layout/HeaderDashboard";
import { AddExpenseForm } from "../components/dialog/add/expense-form";
import { useParams, NavLink, Outlet } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/layout/SideBar";
import { useTranslation } from "react-i18next";
import { MiniStatsCard } from "../components/layout/MiniStatsCard";

type Vehicle = {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  license_plate: string;
  vin: string;
  cover_photo_url: string | null;
  current_mileage: number;
  total_cost: string;
  interventions_count: string;
  reminders_count: string;
};

export default function VehicleDetail() {
  const { t } = useTranslation(["vehicle_detail", "common"]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const token = localStorage.getItem("token");

  const { vehicles, refreshVehicles } = useVehicles();

  const fetchVehicle = useCallback(async () => {
    try {
      const response = await api.get(`/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicle(response.data);
    } catch (error) {
      console.error("Error fetching vehicle:", error);
    }
  }, [id, token]);

  useEffect(() => {
    fetchVehicle();
  }, [fetchVehicle]);

  const handleExpenseAdded = async () => {
    setOpen(false);
    await fetchVehicle();
    await refreshVehicles();
  };

  if (!vehicle)
    return <p className="p-6 text-muted-foreground">Chargement...</p>;

  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <div className="py-4 px-6 bg-linear-to-br from-primary/10 via-purple-500/5 to-background border-b border-border">
            <HeaderDashboard
              title={t("title")}
              description={t("subtitle")}
              button={false}
            />

            <div className="flex flex-row items-start justify-between mt-6 ">
              <div className="flex flex-row gap-4">
                <div className="aspect-video h-38 rounded-lg overflow-hidden bg-muted">
                  {vehicle.cover_photo_url ? (
                    <img
                      src={vehicle.cover_photo_url}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center border justify-center text-app-text/40 text-sm rounded-lg">
                      {t("common:indisponible_message.images")}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-2 items-center">
                    <h2 className="text-2xl font-semibold">{vehicle.name} </h2>
                  </div>

                  <div className="flex flex-row gap-2 items-center text-sm text-muted-foreground">
                    {vehicle.model} ・ {vehicle.brand} ・ {vehicle.year}
                  </div>

                  <div className="flex flex-row gap-6 ">
                    <MiniStats
                      label={t("info.vin")}
                      value={vehicle.vin || "Non renseigné"}
                    />
                    <MiniStats
                      label={t("info.license_plate")}
                      value={vehicle.license_plate || "Non renseigné"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6 px-6 py-4">
            <div className="w-full grid grid-cols-4 gap-4">
              <MiniStatsCard
                title={t("stats.current_mileage")}
                amount={`${vehicle.current_mileage?.toLocaleString("fr-FR") || 0} km`}
              />
              <MiniStatsCard
                title={t("stats.total_spent")}
                amount={`${Number(vehicle.total_cost || 0).toFixed(2)} €`}
              />
              <MiniStatsCard
                title={t("stats.interventions")}
                amount={`${vehicle.interventions_count || 0}`}
              />
              <MiniStatsCard
                title={t("stats.reminders")}
                amount={`${vehicle.reminders_count || 0}`}
              />
            </div>

            <div className="w-full flex flex-col gap-4">
              <NavTabs />
              <Outlet />
            </div>
          </div>

          {/* MODALE D'AJOUT */}
          <DialogContent title={t("dialog:add_expense.title")}>
            <AddExpenseForm
              vehicles={vehicles}
              onSuccess={handleExpenseAdded}
              onCancel={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog.Root>
      </div>
    </div>
  );
}

function MiniStats({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function NavTabs() {
  const tabClass = ({ isActive }: { isActive: boolean }) =>
    "text-base font-medium border-b-2 py-2 px-3 transition-colors duration-200 cursor-pointer " +
    (isActive
      ? "text-foreground border-foreground"
      : "text-foreground/60 hover:text-foreground border-transparent hover:border-foreground/60");

  return (
    <div className="flex flex-row gap-6 items-center justify-start border-b">
      <NavLink to="." end className={tabClass}>
        Overview
      </NavLink>
      <NavLink to="expenses" className={tabClass}>
        Expenses
      </NavLink>
      <NavLink to="maintenance" className={tabClass}>
        Maintenance
      </NavLink>
      <NavLink to="documents" className={tabClass}>
        Documents
      </NavLink>
    </div>
  );
}
