"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useClicksData from "@/hooks/useClicksData";

interface ClicksOverTimeChartProps {
  urlId: string;
}

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-1))",
  },
};

export function ClicksOverTimeChart({ urlId }: ClicksOverTimeChartProps) {
  const { chartData } = useClicksData(urlId);

  return (
    <article className="p-4 bg-white/10 shadow-md dark:bg-white/10 rounded-lg">
      <h3 className="font-bold text-xl">Contador de Clicks</h3>
      <p className="text-black/80 dark:text-white/80">
        Mostrando los clics a lo largo del tiempo
      </p>

      {chartData.length === 0 ? (
        <div
          className="min-h-[200px] flex justify-center items-center 
        text-black dark:text-white opacity-55"
        >
          No hay datos de clicks que mostrar.
        </div>
      ) : (
        <ResponsiveContainer className="my-5" width="100%" height="100%">
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} tickMargin={10} />
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
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      )}
    </article>
  );
}
