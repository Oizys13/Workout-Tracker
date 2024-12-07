import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Clock, TrendingUp, Activity } from "lucide-react";
import { WorkoutSummary } from "@/types/workout";

interface WorkoutSummaryCardProps {
  summary: WorkoutSummary;
}

export function WorkoutSummaryCard({ summary }: WorkoutSummaryCardProps) {
  const stats = [
    {
      title: "Total Workouts",
      value: summary.totalWorkouts,
      icon: Dumbbell,
      color: "text-pink-500",
    },
    {
      title: "Total Exercises",
      value: summary.totalExercises,
      icon: Activity,
      color: "text-purple-500",
    },
    {
      title: "Total Hours",
      value: (summary.totalDuration / 60).toFixed(1),
      icon: Clock,
      color: "text-pink-400",
    },
    {
      title: "Total Weight Lifted",
      value: `${summary.totalLoad} Kg`,
      icon: TrendingUp,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-background/50 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}