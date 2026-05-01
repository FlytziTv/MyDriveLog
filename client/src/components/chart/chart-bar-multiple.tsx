"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import {
  chartMonthlytrends,
  chartMonthlytrendsConfig,
} from "../../fake/DataChart";

export function ChartBarMultiple() {
  return (
    <ChartContainer className="aspect-16/6" config={chartMonthlytrendsConfig}>
      <BarChart accessibilityLayer data={chartMonthlytrends}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="fuel" fill="var(--color-fuel)" radius={4} />
        <Bar dataKey="Insurance" fill="var(--color-insurance)" radius={4} />
        <Bar dataKey="Parking" fill="var(--color-parking)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
