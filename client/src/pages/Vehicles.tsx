import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslation } from "react-i18next";
import { HeaderDashboard } from "../components/layout/HeaderDashboard";
import Sidebar from "../components/layout/SideBar";
import { VehicleCard } from "../components/vehicles/VehicleCard";
import DialogContent from "../components/layout/DialogContent";

export default function VehiclesPage() {
  const { t } = useTranslation(["vehicles", "dialog"]);
  const [open, setOpen] = useState(false);

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
            {/* Vehicle cards will go here */}
            <VehicleCard
              name="jeep "
              model="Trackhawk"
              year={2021}
              image="https://cdn-hednb.nitrocdn.com/yYolPsxkHfeoqRKSyqGQlaFpLZMHhVYI/assets/images/optimized/rev-9cddd2c/hpe-photos.s3.us-east-2.amazonaws.com/wp-content/uploads/20220316132050/hennessey-hpe900-jeep-trackhawk-1-scaled.webp"
              mileage={94000}
              totalCost={110000}
            />
            <VehicleCard
              name="BMW M3"
              model="Serie 3"
              year={2021}
              image="https://spicymotor.fr/wp-content/uploads/jet-form-builder/f7ffbf22afdd9e39127c07c589338a72/2023/12/DSC8738-scaled.jpg"
              mileage={32000}
              totalCost={150000}
            />
            <VehicleCard
              name="BMW M3"
              model="Serie 3"
              year={2021}
              image="https://spicymotor.fr/wp-content/uploads/jet-form-builder/f7ffbf22afdd9e39127c07c589338a72/2023/12/DSC8738-scaled.jpg"
              mileage={32000}
              totalCost={150000}
            />
            <VehicleCard
              name="BMW M3"
              model="Serie 3"
              year={2021}
              mileage={32000}
              totalCost={150000}
            />
          </div>

          <DialogContent title={t("dialog:add_vehicle.title")}></DialogContent>
        </Dialog.Root>
      </div>
    </div>
  );
}
