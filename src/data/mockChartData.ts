import { useEffect, useState } from "react";
import { db } from "@/firebase"; // Assuming firebase is already set up
import { collection, getDocs } from "firebase/firestore";
import { ChartDataPoint } from "@/types/chart";

// Helper function to map full-day names to the short form
const dayMapping: { [key: string]: string } = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

export function useWeeklyWorkoutData() {
  const [weeklyWorkoutData, setWeeklyWorkoutData] = useState<ChartDataPoint[]>([
    { day: "Mon", workouts: 0 },
    { day: "Tue", workouts: 0 },
    { day: "Wed", workouts: 0 },
    { day: "Thu", workouts: 0 },
    { day: "Fri", workouts: 0 },
    { day: "Sat", workouts: 0 },
    { day: "Sun", workouts: 0 },
  ]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        // Replace 'workouts' with your collection name if it's different
        const workoutsRef = collection(db, "workouts");
        const querySnapshot = await getDocs(workoutsRef);

        // Initialize an object to track the count of workouts per day
        const workoutCount: { [key: string]: number } = {
          Mon: 0,
          Tue: 0,
          Wed: 0,
          Thu: 0,
          Fri: 0,
          Sat: 0,
          Sun: 0,
        };

        querySnapshot.forEach((doc) => {
          const workoutData = doc.data();
          const dayOfWeek = workoutData.day; // Assuming 'day' is like "Monday", "Tuesday", etc.
          const shortDay = dayMapping[dayOfWeek]; // Convert to short format

          if (shortDay && workoutCount[shortDay] !== undefined) {
            workoutCount[shortDay] += 1; // Increment count for the corresponding day
          }
        });

        // Convert the workoutCount object into an array that matches the structure expected by the chart
        const updatedWeeklyWorkoutData = Object.keys(workoutCount).map((day) => ({
          day,
          workouts: workoutCount[day],
        }));

        setWeeklyWorkoutData(updatedWeeklyWorkoutData);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  return weeklyWorkoutData;
}
