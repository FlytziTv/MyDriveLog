"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { chartCostTrendsConfig, chartCostTrends } from "../../fake/DataChart";

export function ChartBarStacked() {
  return (
    <ChartContainer className="aspect-16/6" config={chartCostTrendsConfig}>
      <BarChart accessibilityLayer data={chartCostTrends}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="fuel"
          stackId="a"
          fill="var(--color-fuel)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="maintenance"
          stackId="a"
          fill="var(--color-maintenance)"
          radius={[4, 4, 0, 0]}
        />
        <Bar dataKey="insurance" stackId="a" fill="var(--color-insurance)" />
        <Bar dataKey="parking" stackId="a" fill="var(--color-parking)" />
        <Bar dataKey="other" stackId="a" fill="var(--color-other)" />
      </BarChart>
    </ChartContainer>
  );
}
