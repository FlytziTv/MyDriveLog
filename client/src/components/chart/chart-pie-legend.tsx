"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";

const chartData = [
  { category: "fuel", visitors: 275, fill: "var(--color-fuel)" },
  { category: "maintenance", visitors: 200, fill: "var(--color-maintenance)" },
  { category: "insurance", visitors: 187, fill: "var(--color-insurance)" },
  { category: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  fuel: { label: "Fuel", color: "#8B5CF6" },
  maintenance: { label: "Maintenance", color: "#3B82F6" },
  insurance: { label: "Insurance", color: "#10B981" },
  other: { label: "Other", color: "#F59E0B" },
} satisfies ChartConfig;

export function ChartPieLegend() {
  return (
    <ChartContainer config={chartConfig} className="aspect-16/6">
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="category" hideLabel />}
        />
        <Pie data={chartData} dataKey="visitors" />
        <ChartLegend
          content={<ChartLegendContent nameKey="category" />}
          className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
