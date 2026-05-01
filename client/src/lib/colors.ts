import { insightIcons, statusIcons } from "./icons";

export const chartColors = {
  Fuel: "#8B5CF6",
  Maintenance: "#3B82F6",
  Insurance: "#10B981",
  Parking: "#F59E0B",
  Other: "#6B7280",
};

export const insightColors = {
  info: {
    icon: insightIcons.info,
    bg: "bg-blue-50 border-blue-200 hover:shadow-blue-100",
    iconWrap: "bg-blue-100 text-blue-600",
    dot: "bg-blue-500",
    title: "text-blue-900",
  },
  warning: {
    icon: insightIcons.warning,
    bg: "bg-amber-50 border-amber-200 hover:shadow-amber-100",
    iconWrap: "bg-amber-100 text-amber-600",
    dot: "bg-amber-500",
    title: "text-amber-900",
  },
  success: {
    icon: insightIcons.success,
    bg: "bg-green-50 border-green-200 hover:shadow-green-100",
    iconWrap: "bg-green-100 text-green-600",
    dot: "bg-green-500",
    title: "text-green-900",
  },
  tip: {
    icon: insightIcons.tip,
    bg: "bg-purple-50 border-purple-200 hover:shadow-purple-100",
    iconWrap: "bg-purple-100 text-purple-600",
    dot: "bg-purple-500",
    title: "text-purple-900",
  },
};

export const MaintenanceStatusConfig = {
  upcoming: {
    icon: statusIcons.pending,
    bg: "bg-blue-50 border-blue-200",
    iconWrap: "bg-blue-100 text-blue-600",
    title: "text-blue-900",
    cost: "text-blue-900",
    meta: "text-blue-600",
  },
  done: {
    icon: statusIcons.success,
    bg: "bg-green-50 border-green-200",
    iconWrap: "bg-green-100 text-green-600",
    title: "text-green-900",
    cost: "text-green-900",
    meta: "text-green-600",
  },
  overdue: {
    icon: statusIcons.info,
    bg: "bg-red-50 border-red-200",
    iconWrap: "bg-red-100 text-red-600",
    title: "text-red-900",
    cost: "text-red-900",
    meta: "text-red-600",
  },
};
