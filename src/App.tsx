import { Header } from "@/components/layout/Header";
import { WorkoutSummaryCard } from "@/components/dashboard/WorkoutSummaryCard";
import { WorkoutChart } from "@/components/dashboard/WorkoutChart";
import { WorkoutList } from "@/components/workouts/WorkoutList";
import { Workout, WorkoutSummary } from "@/types/workout";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from './firebase'
import { useEffect, useState } from "react";
import { useLatestQuery } from './lib/LatestQueryContest';



export function App() {
  const { latestQuery } = useLatestQuery();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [summary, setSummary] = useState<WorkoutSummary>({} as WorkoutSummary);
  const [isFloatingVisible, setFloatingVisible] = useState(false);
  

  const handleButtonClick = () => {
    setFloatingVisible(!isFloatingVisible);
  };

  



  useEffect(() => {
    const workoutsCollection = collection(db, "workouts");
    
    // Query the workouts collection and order by timestamp in descending order
    const workoutsQuery = query(workoutsCollection, orderBy("timestamp", "desc"));

    // Real-time snapshot listener
    const unsubscribe = onSnapshot(workoutsQuery, (snapshot) => {
      const fetchedWorkouts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Workout[];
      
      // Update workouts state
      setWorkouts(fetchedWorkouts);

      // Calculate live stats
      const totalWorkouts = fetchedWorkouts.length;
      const totalExercises = fetchedWorkouts.reduce(
        (sum, workout) => sum + workout.exercises.length,
        0
      );
      const totalDuration = fetchedWorkouts.reduce(
        (sum, workout) => sum + workout.duration,
        0
      );
      const totalLoad = fetchedWorkouts.reduce(
        (sum, workout) =>
          sum +
          workout.exercises.reduce(
            (exerciseSum, exercise) =>
              exerciseSum + Number(exercise.sets) * Number(exercise.load),
            0
          ),
        0
      );

      // Set the summary state with live stats
      setSummary({
        totalWorkouts,
        totalExercises,
        totalDuration,
        totalLoad,
      });
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  
  const recentWorkouts = workouts.slice(0, 2);
  // Get the rest of the workouts
  const restOfWorkouts = workouts.slice(2);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Header />
      <main className="container mx-auto max-w-screen px-4 py-8 space-y-8">
        <WorkoutSummaryCard summary={summary} />
        <div className="grid gap-8 md:grid-cols-2">
          <WorkoutChart />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-center md:text-left">Recent Workouts</h2>
            <WorkoutList workouts={recentWorkouts} />
          </div>
        </div>
          <div className="space-y-4">
            <WorkoutList workouts={restOfWorkouts} />
          </div>
      </main>
      <button
        onClick={handleButtonClick}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#281434] text-white rounded-full shadow-lg flex items-center justify-center z-50"
      >
        Query
      </button>
      {isFloatingVisible && latestQuery && (
        <div
          className="fixed bottom-24 right-8 w-96 p-4 mb-4 bg-gray-800 text-white rounded-lg shadow-lg z-50"
        >
          <h3 className="text-lg font-bold mb-2">Latest Firebase Query</h3>
          <pre className="text-sm whitespace-pre-wrap">{latestQuery}</pre>
        </div>
      )}

    </div>
  );
}

export default App;