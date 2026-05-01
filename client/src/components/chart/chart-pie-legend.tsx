"use client";

import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  chartExpenseBreakdown,
  chartExpenseBreakdownConfig,
} from "../../fake/DataChart";

export function ChartPieLegend() {
  return (
    <ChartContainer
      config={chartExpenseBreakdownConfig}
      className="aspect-16/6"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="category" hideLabel />}
        />
        <Pie data={chartExpenseBreakdown} dataKey="amount" />
        <ChartLegend
          content={<ChartLegendContent nameKey="category" />}
          className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
