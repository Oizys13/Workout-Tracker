export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface Workout {
  id: string;
  date: string;
  name: string;
  exercises: Exercise[];
  duration: number;
  intensity?: 'low' | 'medium' | 'high';
  notes?: string;
  type: 'strength' | 'cardio' | 'hiit' | 'yoga' | 'other';
}

export interface WorkoutSummary {
  totalWorkouts: number;
  totalExercises: number;
  totalDuration: number;
  totalLoad: number;
}

export interface NewWorkoutFormData {
  type: Workout['type'];
  duration: number;
  intensity: Workout['intensity'];
  notes?: string;
}