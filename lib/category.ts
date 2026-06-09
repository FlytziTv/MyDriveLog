import {
  Droplets,
  CircleDot,
  ClipboardList,
  Disc,
  BatteryCharging,
  Link,
  Filter,
  ShieldCheck,
  Wrench,
  Fuel,
  ShieldHalf,
  SquareParking,
  ArrowRightLeft,
  TriangleAlert,
  Sparkles,
  CircleEllipsis,
} from "lucide-react";
import { MaintenanceType, ExpenseCategory } from "@prisma/client";
import { CategoryProps, HistoryItem } from "@/types";

export function resolveMeta(item: HistoryItem) {
  return item.kind === "maintenance"
    ? MaintenanceMeta[item.type as MaintenanceType]
    : ExpenseMeta[item.type as ExpenseCategory];
}

export const MaintenanceMeta: Record<MaintenanceType, CategoryProps> = {
  OIL_CHANGE: { label: "Vidange", icon: Droplets },
  TIRE_CHANGE: { label: "Changement de pneus", icon: CircleDot },
  REVISION: { label: "Révision", icon: ClipboardList },
  BRAKE: { label: "Freins", icon: Disc },
  BATTERY: { label: "Batterie", icon: BatteryCharging },
  BELT: { label: "Courroie", icon: Link },
  FILTER: { label: "Filtre", icon: Filter },
  CONTROL: { label: "Contrôle technique", icon: ShieldCheck },
  OTHER: { label: "Autre", icon: Wrench },
};

export const ExpenseMeta: Record<ExpenseCategory, CategoryProps> = {
  FUEL: { label: "Carburant", icon: Fuel },
  INSURANCE: { label: "Assurance", icon: ShieldHalf },
  PARKING: { label: "Parking", icon: SquareParking },
  TOLL: { label: "Péage", icon: ArrowRightLeft },
  FINE: { label: "Amende", icon: TriangleAlert },
  WASH: { label: "Lavage", icon: Sparkles },
  OTHER: { label: "Autre", icon: CircleEllipsis },
};
