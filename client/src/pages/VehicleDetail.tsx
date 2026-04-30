import { useState, useEffect } from "react";
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
  nickname: string;
  brand: string;
  model: string;
  year: number;
  license_plate: string;
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

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await api.get(`/vehicles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehicle(response.data);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      }
    };
    fetchVehicle();
  }, [id, token]);

  if (!vehicle) return <p>Chargement...</p>;

  return (
    // <div>
    //   <h1>{vehicle.nickname}</h1>
    //   // affiche les autres infos ici
    // </div>

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
                <div className="aspect-video h-38 rounded-lg ">
                  {/* no image */}
                  <div className="w-full h-full flex items-center border justify-center text-app-text/40 text-sm rounded-lg">
                    {t("common:indisponible_message.images")}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-2 items-center">
                    <h2 className="text-2xl font-semibold">
                      {vehicle.nickname}
                    </h2>
                    {/* <span className="text-xs font-light text-green-600 bg-green-600/10 px-2.5 py-1 rounded-full">
                      Active
                    </span> */}
                  </div>

                  <div className="flex flex-row gap-2 items-center text-sm text-muted-foreground">
                    {vehicle.model} ・ {vehicle.brand} ・ {vehicle.year}
                  </div>

                  <div className="flex flex-row gap-6 ">
                    <MiniStats
                      label={t("info.vin")}
                      value="5YJ3E1EA9MF123456"
                    />
                    <MiniStats
                      label={t("info.license_plate")}
                      value={vehicle.license_plate}
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
                amount="24,500 km"
              />
              <MiniStatsCard title={t("stats.total_spent")} amount="$8,450" />
              <MiniStatsCard title={t("stats.this_month")} amount="$710" />
              <MiniStatsCard
                title={t("stats.avg_cost_per_month")}
                amount="$520"
              />
            </div>

            <div className="w-full flex flex-col gap-4">
              <NavTabs />
              <Outlet />
            </div>
          </div>

          <DialogContent title={t("dialog:add_expense.title")}>
            <AddExpenseForm
              onSuccess={() => setOpen(false)}
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
