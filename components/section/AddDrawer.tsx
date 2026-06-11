"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import SegmentedControl from "../ui/SegmentedControl";
import AddExpense from "./AddExpense";
import AddMaintenance from "./AddMaintenance";

const typeInter = [
  { value: "maintenance", label: "Entretien" },
  { value: "expense", label: "Dépense" },
];

export default function AddDrawer({
  open,
  setOpen,
  vehicles,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  vehicles: { id: string; name: string }[];
}) {
  const [TypeInter, setTypeInter] = useState("maintenance");

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        {/* <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-w-[430px] max-h-[82vh] rounded-t-[10px]"> */}
        <Drawer.Content className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white rounded-t-2xl outline-none">
          {/* Title & type */}
          <div className="w-full mx-auto overflow-auto p-4 rounded-t-sm border-b border-gray-200">
            <Drawer.Handle />
            {/* Title */}
            <div className="flex flex-col gap-2">
              <Drawer.Title className="font-bold text-lg text-gray-900 mt-4">
                {TypeInter === "maintenance"
                  ? "Nouvelle intervention"
                  : "Nouvelle dépense"}
              </Drawer.Title>
              <SegmentedControl
                value={TypeInter}
                options={typeInter}
                onChange={(v) => setTypeInter(v)}
              />
            </div>
          </div>

          {TypeInter === "maintenance" ? (
            <AddMaintenance
              vehicles={vehicles}
              onSuccess={() => setOpen(false)}
            />
          ) : (
            <AddExpense vehicles={vehicles} onSuccess={() => setOpen(false)} />
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
