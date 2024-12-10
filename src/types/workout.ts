
export interface Exercise {
  name: string;
  sets: string; // Keep as string if input fields are text-based
  load: string; // Keep as string if input fields are text-based
}


export interface Workout {
  workoutType: string;
  timestamp: any;
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