import { insightIcons } from "./icons";

export const chartColors = [
  { label: "Fuel", color: "#8B5CF6" },
  { label: "Maintenance", color: "#3B82F6" },
  { label: "Insurance", color: "#10B981" },
  { label: "Parking", color: "#F59E0B" },
  { label: "Other", color: "#6B7280" },
];

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
