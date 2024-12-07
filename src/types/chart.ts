export interface ChartDataPoint {
  day: string;
  workouts: number;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload: ChartDataPoint;
  }>;
  label?: string;
}