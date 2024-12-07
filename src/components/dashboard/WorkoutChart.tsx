import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from "recharts";
import { ChartContainer } from "@/components/charts/ChartContainer";
import { CustomTooltip } from "@/components/charts/CustomTooltip";
import { useWeeklyWorkoutData, weeklyWorkoutData } from "@/data/mockChartData";

const chartConfig = {
  margin: { top: 5, right: 5, bottom: 5, left: 0 },
  axisStyle: {
    stroke: "#888888",
    tickLine: false,
    axisLine: false,
  },
  lineStyle: {
    stroke: "#e879f9",
    strokeWidth: 2,
    dot: {
      fill: "#e879f9",
      strokeWidth: 2,
    },
    activeDot: {
      r: 6,
      fill: "#e879f9",
    },
  },
};

export function WorkoutChart() {
  const weeklyWorkoutData = useWeeklyWorkoutData();
  return (
    <ChartContainer title="Weekly Activity">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={weeklyWorkoutData} margin={chartConfig.margin}>
          <XAxis 
            {...chartConfig.axisStyle}
            dataKey="day"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            {...chartConfig.axisStyle}
            tickFormatter={String}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="workouts"
            {...chartConfig.lineStyle}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}