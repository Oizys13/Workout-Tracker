import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase'

export function NewWorkoutDialog() {
  const [open, setOpen] = useState(false);
  const [exercises, setExercises] = useState([
    { name: "", sets: "", load: "" },
  ]);
  const handleAddExercise = () => {
    setExercises([...exercises, { name: "", sets: "", load: "" }]);
  };
  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };
  const handleSave = async (e) => {
    e.preventDefault()
    
    try {
      const workoutData = {
        workoutType: e.target.workoutType.value, // Replace with proper field IDs
        day: e.target.day.value, // Replace with proper field IDs
        duration: parseInt(e.target.duration.value, 10),
        intensity: e.target.intensity.value, // Replace with proper field IDs
        notes: e.target.notes.value,
        exercises,
        timestamp: new Date(), // Optional: Add a timestamp
      };
      
      

      // Save to Firestore
      await addDoc(collection(db, 'workouts'), workoutData);

      // Optionally close the dialog
      setOpen(false);

      console.log('Workout saved successfully!');
      setExercises([{ name: "", sets: "", load: "" }]); // Reset exercises

    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Log Workout</DialogTitle>
        </DialogHeader>
        <form className="space-y-6 pt-4" onSubmit={handleSave}>
          <div className="space-y-2">
            <Label htmlFor="workoutType">Workout Type</Label>
            <Select id="workoutType" name="workoutType">
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
            <Label htmlFor="workoutDay">Day</Label>
            <Select id="day" name="day">
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="intensity">Intensity</Label>
              <Select id="intensity" name="intensity">
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
              <div key={index} className="grid grid-cols-3 gap-2 items-center">
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
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Workout</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}