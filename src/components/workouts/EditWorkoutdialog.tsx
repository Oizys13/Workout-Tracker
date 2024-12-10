import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useLatestQuery } from "../../lib/LatestQueryContest";

interface Exercise {
  name: string;
  sets: string;
  load: string;
}

interface Workout {
  id: string;
  workoutType?: string;
  day?: string;
  duration?: number;
  intensity?: string;
  notes?: string;
  exercises: Exercise[];
}

interface EditWorkoutDialogProps {
  workout: Workout | null;
  open: boolean;
  onClose: () => void;
}

export function EditWorkoutDialog({
  workout,
  open,
  onClose,
}: EditWorkoutDialogProps) {
  const { setLatestQuery } = useLatestQuery();
  const [exercises, setExercises] = useState<Exercise[]>(
    workout ? workout.exercises : [{ name: "", sets: "", load: "" }]
  );

  useEffect(() => {
    if (workout) {
      setExercises(workout.exercises);
    }
  }, [workout]);

  const handleAddExercise = () => {
    setExercises([...exercises, { name: "", sets: "", load: "" }]);
  };

  const handleExerciseChange = (
    index: number,
    field: "name" | "sets" | "load",
    value: string
  ) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!workout) {
      console.error("No workout to update.");
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);
      const updatedWorkout: Omit<Workout, "id"> = {
        workoutType: formData.get("workoutType")?.toString() || "",
        day: formData.get("day")?.toString() || "",
        duration: parseInt(formData.get("duration")?.toString() || "0", 10),
        intensity: formData.get("intensity")?.toString() || "",
        notes: formData.get("notes")?.toString() || "",
        exercises,
      };

      const workoutRef = doc(db, "workouts", workout.id);
      await updateDoc(workoutRef, updatedWorkout);
      setLatestQuery(
        `updateDoc(doc(db, "workouts", "${workout.id}"), ${JSON.stringify(
          updatedWorkout,
          null,
          2
        )})`
      );

      onClose();
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Workout</DialogTitle>
        </DialogHeader>
        <form className="space-y-6 pt-4" onSubmit={handleSave}>
          <div className="space-y-2">
            <Label htmlFor="workoutType">Workout Type</Label>
            <Select
              
              name="workoutType"
              defaultValue={workout?.workoutType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select workout type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Strength Training">Strength Training</SelectItem>
                <SelectItem value="Cardio">Cardio</SelectItem>
                <SelectItem value="HIIT">HIIT</SelectItem>
                <SelectItem value="Yoga">Yoga</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="day">Day</Label>
            <Select  name="day" defaultValue={workout?.day}>
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="tuesday">Tuesday</SelectItem>
                <SelectItem value="wednesday">Wednesday</SelectItem>
                <SelectItem value="thursday">Thursday</SelectItem>
                <SelectItem value="friday">Friday</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
                <SelectItem value="sunday">Sunday</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (min)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                placeholder="Enter duration"
                defaultValue={workout?.duration}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="intensity">Intensity</Label>
              <Select
                
                name="intensity"
                defaultValue={workout?.intensity}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select intensity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Exercises</Label>
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-2 items-center"
              >
                <Input
                  placeholder="Exercise Name"
                  value={exercise.name}
                  onChange={(e) =>
                    handleExerciseChange(index, "name", e.target.value)
                  }
                />
                <Input
                  placeholder="Sets"
                  type="number"
                  value={exercise.sets}
                  onChange={(e) =>
                    handleExerciseChange(index, "sets", e.target.value)
                  }
                />
                <Input
                  placeholder="Load (kg)"
                  type="number"
                  value={exercise.load}
                  onChange={(e) =>
                    handleExerciseChange(index, "load", e.target.value)
                  }
                />
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddExercise}>
              Add Exercise
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Add any notes about your workout..."
              className="h-24"
              defaultValue={workout?.notes}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
