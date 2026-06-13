import { NotificationType } from "@prisma/client";
import {
  Wrench,
  Fuel,
  DollarSign,
  Calendar,
  Zap,
  LucideIcon,
} from "lucide-react";

export const NotificationMeta: Record<
  NotificationType,
  { icon: LucideIcon; color: string }
> = {
  MAINTENANCE_DUE: { icon: Wrench, color: "bg-amber-50 text-amber-600" },
  MILEAGE_ALERT: { icon: Fuel, color: "bg-blue-50 text-blue-600" },
  MONTHLY_SUMMARY: { icon: DollarSign, color: "bg-green-50 text-green-600" },
  CONTROL_TECHNIQUE: { icon: Calendar, color: "bg-purple-50 text-purple-600" },
  NEWS: { icon: Zap, color: "bg-neutral-100 text-neutral-600" },
};
