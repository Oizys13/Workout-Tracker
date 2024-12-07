import { CustomTooltipProps } from "@/types/chart";

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-2 shadow-lg">
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm text-pink-400">
        {`${payload[0].value} workouts`}
      </p>
    </div>
  );
}