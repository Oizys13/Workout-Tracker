import { Dumbbell } from "lucide-react";
import { NewWorkoutDialog } from "@/components/workouts/NewWorkoutDialog";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-full px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-6 w-6 text-pink-500" />
            <span className="font-bold">FitTrack</span>
          </div>
          <NewWorkoutDialog />
        </div>
      </div>
    </header>
  );
}