import { chartColors } from "../lib/colors";
import type { ChartConfig } from "../components/ui/chart";

export const chartExpensesOverTime = [
  { month: "January", amount: 186, mobile: 80 },
  { month: "February", amount: 305, mobile: 200 },
  { month: "March", amount: 237, mobile: 120 },
  { month: "April", amount: 73, mobile: 190 },
  { month: "May", amount: 209, mobile: 130 },
  { month: "June", amount: 214, mobile: 140 },
];

export const chartExpensesOverTimeConfig = {
  desktop: {
    label: "Amount",
    color: "var(--color-sz-1)",
  },
} satisfies ChartConfig;

// -----------------------------

export const chartExpenseBreakdown = [
  { category: "fuel", amount: 275, fill: "var(--color-fuel)" },
  { category: "maintenance", amount: 200, fill: "var(--color-maintenance)" },
  { category: "insurance", amount: 187, fill: "var(--color-insurance)" },
  { category: "other", amount: 90, fill: "var(--color-other)" },
];

export const chartExpenseBreakdownConfig = {
  fuel: { label: "Fuel", color: chartColors.Fuel },
  maintenance: { label: "Maintenance", color: chartColors.Maintenance },
  insurance: { label: "Insurance", color: chartColors.Insurance },
  other: { label: "Other", color: chartColors.Other },
} satisfies ChartConfig;

// -----------------------------

export const chartMonthlytrends = [
  { month: "January", fuel: 186, Insurance: 80, Parking: 40 },
  { month: "February", fuel: 305, Insurance: 200, Parking: 50 },
  { month: "March", fuel: 237, Insurance: 120, Parking: 60 },
  { month: "April", fuel: 73, Insurance: 190, Parking: 50 },
  { month: "May", fuel: 209, Insurance: 130, Parking: 60 },
  { month: "June", fuel: 214, Insurance: 140, Parking: 70 },
];

export const chartMonthlytrendsConfig = {
  fuel: {
    label: "Fuel",
    color: chartColors.Fuel,
  },
  insurance: {
    label: "Insurance",
    color: chartColors.Insurance,
  },
  parking: {
    label: "Parking",
    color: chartColors.Parking,
  },
} satisfies ChartConfig;

// -----------------------------

export const chartCostTrends = [
  { month: "January", fuel: 186, maintenance: 80, insurance: 40 },
  {
    month: "February",
    fuel: 305,
    maintenance: 200,
    insurance: 50,
    parking: 30,
  },
  { month: "March", fuel: 237, maintenance: 120, insurance: 60, other: 330 },
  { month: "April", fuel: 73, maintenance: 190, insurance: 50 },
  { month: "May", fuel: 209, maintenance: 130, insurance: 60 },
  { month: "June", fuel: 214, maintenance: 140, insurance: 70, other: 30 },
];

export const chartCostTrendsConfig = {
  fuel: {
    label: "Fuel",
    color: chartColors.Fuel,
  },
  maintenance: {
    label: "Maintenance",
    color: chartColors.Maintenance,
  },
  insurance: {
    label: "Insurance",
    color: chartColors.Insurance,
  },
  parking: {
    label: "Parking",
    color: chartColors.Parking,
  },
  other: {
    label: "Other",
    color: chartColors.Other,
  },
} satisfies ChartConfig;
