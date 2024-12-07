import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Workout } from "@/types/workout";
import { CalendarDays, Clock } from "lucide-react";
import { X } from "lucide-react"; // Import the 'X' icon from lucide-react
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteDoc, doc } from "firebase/firestore"; // Import deleteDoc and doc from Firestore
import { db } from "../../firebase";
import { EditWorkoutDialog } from "./EditWorkoutdialog";

interface WorkoutListProps {
  workouts: Workout[];
}

function formatTimestamp(timestamp: any): string {
  if (!timestamp) return "N/A";
  const date = timestamp.toDate(); // Convert Firestore timestamp to JS Date
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function WorkoutList({ workouts }: WorkoutListProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState<Workout | null>(null);

  const handleCardClick = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  const handleCloseDialog = () => {
    setSelectedWorkout(null);
  };

  const handleDeleteClick = (workout: Workout) => {
    setWorkoutToDelete(workout);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (workoutToDelete) {
      try {
        // Reference to the workout document in Firestore
        const workoutDocRef = doc(db, "workouts", workoutToDelete.id);
        
        // Delete the workout document from Firestore
        await deleteDoc(workoutDocRef);

        console.log("Workout deleted successfully!");

        // Optionally close the dialog
        setOpenDeleteDialog(false);

        // Optionally update the UI to reflect the deleted workout (could be via state or re-fetching workouts)
      } catch (error) {
        console.error("Error deleting workout:", error);
      }
    }
    setOpenDeleteDialog(false);
    setWorkoutToDelete(null); // Reset the state after deletion
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setWorkoutToDelete(null);
  };

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <Card
          key={workout.id}
          className="bg-background/50 backdrop-blur-lg hover:bg-background/70 transition-colors cursor-pointer relative"
          onClick={() => handleCardClick(workout)}
        >
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-muted-foreground hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the card click from triggering when closing the dialog
              handleDeleteClick(workout);
            }}
          >
            <X className="h-4 w-4" />
          </button>

          <CardHeader>
            <CardTitle className="text-lg font-semibold">{workout.workoutType}</CardTitle>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CalendarDays className="mr-1 h-4 w-4" />
                {formatTimestamp(workout.timestamp)}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {workout.duration} min
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {workout.exercises.map((exercise) => (
                <div key={exercise.id} className="flex justify-between items-center text-sm">
                  <span>{exercise.name}</span>
                  <span className="text-muted-foreground">
                    {exercise.sets} × {exercise.reps} @ {exercise.load}kg
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this workout?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel}>Cancel</Button>
            <Button className="bg-red-500 text-white" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EditWorkoutDialog */}
      {selectedWorkout && (
        <EditWorkoutDialog
          workout={selectedWorkout}
          open={Boolean(selectedWorkout)}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
}
