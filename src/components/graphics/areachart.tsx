"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { areachartData } from "@/constants/areachart-data";

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-1))",
  },
};

export function ClicksAreaChart() {
  return (
    <article className="p-4 bg-white shadow-md dark:bg-white/5 rounded-lg">
      <h3 className="font-bold text-xl">Clicks a lo largo del tiempo</h3>
      <p className="text-black/80 dark:text-white/80">
        Mostrando el total de clics de los últimos 6 meses
      </p>
      <header className="my-5">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={areachartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-clicks)"
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-clicks)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="clicks"
              type="natural"
              fill="url(#fillClicks)"
              fillOpacity={0.4}
              stroke="var(--color-clicks)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </header>
      <footer>
        <div className="grid gap-2 justify-start text-sm w-full">
          <p className="flex items-center gap-2 font-medium leading-none">
            En tendencia ascendente en un 5.2% este mes{" "}
            <TrendingUp className="h-4 w-4" />
          </p>
          <p className="flex items-center gap-2 leading-none text-muted-foreground">
            Enero - Junio 2024
          </p>
        </div>
      </footer>
    </article>
  );
}
