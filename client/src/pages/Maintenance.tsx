import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import DialogContent from "../components/layout/DialogContent";
import { HeaderDashboard } from "../components/layout/HeaderDashboard";
import { MiniStatsCard } from "../components/layout/MiniStatsCard";
import { BlockCard } from "../components/layout/BlockCard";
import { AllMaintenance } from "../components/maintenance/AllMaintenance";
import { SmartMessage } from "../components/maintenance/SmartMessage";
import Sidebar from "../components/layout/SideBar";
import { useTranslation, Trans } from "react-i18next";
import { AddTaskForm } from "../components/dialog/add/task-form";
import { useVehicles } from "../contexts/VehicleContext";

export default function Maintenance() {
  const { t } = useTranslation(["maintenance", "dialog"]);
  const [open, setOpen] = useState(false);
  const { vehicles } = useVehicles();

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

          <div className="w-full grid grid-cols-3 gap-4">
            <MiniStatsCard title={t("stats.upcoming")} amount="2" />
            <MiniStatsCard title={t("stats.overdue")} amount="1" />
            <MiniStatsCard title={t("stats.completed")} amount="1" />
          </div>

          <BlockCard title={t("maintenance_block.title")}>
            <AllMaintenance
              status="upcoming"
              task={t("maintenance_block.tasks.1")}
              vehicle="Toyota Camry"
              dueDate="2023-10-15"
              dueMileage={30000}
              estimatedCost={150}
            />
            <AllMaintenance
              status="overdue"
              task={t("maintenance_block.tasks.2")}
              vehicle="Honda Civic"
              dueDate="2023-09-20"
              dueMileage={25000}
              estimatedCost={100}
            />
            <AllMaintenance
              status="done"
              task={t("maintenance_block.tasks.3")}
              vehicle="Ford Mustang"
              dueDate="2023-10-01"
              dueMileage={28000}
              estimatedCost={50}
            />
          </BlockCard>

          <BlockCard title={t("reminders_block.title")}>
            <SmartMessage
              description={
                <Trans
                  i18nKey="reminders_block.messages.1"
                  ns="maintenance"
                  components={{ strong: <strong /> }}
                />
              }
              type="yellow"
            />
            <SmartMessage
              description={
                <Trans
                  i18nKey="reminders_block.messages.2"
                  ns="maintenance"
                  components={{ strong: <strong /> }}
                />
              }
              type="blue"
            />
          </BlockCard>

          <DialogContent title={t("dialog:add_task.title")}>
            <AddTaskForm
              vehicles={vehicles}
              onSuccess={() => setOpen(false)}
              onCancel={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog.Root>
      </div>
    </div>
  );
}
