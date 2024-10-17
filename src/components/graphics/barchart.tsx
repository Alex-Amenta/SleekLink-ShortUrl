"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { barchartData } from "@/constants/barchart-data";



const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-1))",
  },
};

export function ClickCounterBarChart() {
  return (
    <article className="p-4 bg-white shadow-md dark:bg-white/5 rounded-lg">
      <h3 className="font-bold text-xl">Contador de Clicks</h3>
      <p className="text-black/80 dark:text-white/80">
        Mostrando el resultado de las URLs
      </p>
      <header className="my-5">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={barchartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="url"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <defs>
              <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="20%"
                  stopColor="var(--color-clicks)"
                  stopOpacity={1}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-clicks)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Bar
              dataKey="clicks"
              fill="url(#fillClicks)"
              fillOpacity={0.4}
              stroke="var(--color-clicks)"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </header>
      <footer>
        <div className="grid gap-2 justify-start text-sm w-full">
          <p className="flex items-center gap-2 font-medium leading-none">
            En tendencia ascendente en un 5.2% este mes
            <TrendingUp className="h-4 w-4" />
          </p>
          <p className="flex items-center gap-2 leading-none text-muted-foreground">
            Mostrando el total de visitantes en los últimos 6 meses
          </p>
        </div>
      </footer>
    </article>
  );
}
