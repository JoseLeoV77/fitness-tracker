import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { router } from "expo-router";

export interface ExerciseTemplate {
  id: number; 
  exerciseName: string;
  targetSets: string;
  targetReps: string;
  additionalSets: string;
  additionalReps: string
  isSuperset: boolean;
  supersetExerciseName?: string;
}

export const useCreateWorkout = () => {
  const db = useSQLiteContext();
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState<ExerciseTemplate[]>([]);

  const addExercise = (exercise: Omit<ExerciseTemplate, 'id'>) => {
    if (!exercise.exerciseName) return; 
    const newExercise: ExerciseTemplate = { ...exercise, id: Date.now()};
    setExercises(prev => [...prev, newExercise]);
  };
  
  const removeExercise = (id: number) => {
    setExercises(prev => prev.filter(exercise => exercise.id !== id));
  };

  const handleSaveWorkout = async () => {
    if (!workoutName.trim() || exercises.length === 0) {
      alert("Please name your workout and add at least one exercise.");
      return;
    }

    try {
      await db.withTransactionAsync(async () => {
        const result = await db.runAsync('INSERT INTO workouts (name) VALUES (?)', workoutName.trim());
        const newWorkoutId = result.lastInsertRowId;

        for (const [index, exercise] of exercises.entries()) {
          const order = index + 1;

          let mainExerciseResult = await db.getFirstAsync<{ id: number }>('SELECT id FROM exercises WHERE name = ?', [exercise.exerciseName.trim()]);
          
          if (!mainExerciseResult) {
            const res = await db.runAsync('INSERT INTO exercises (name) VALUES (?)', [exercise.exerciseName.trim()]);
            mainExerciseResult = { id: res.lastInsertRowId };
          }
          const mainExerciseId = mainExerciseResult.id;

          if (exercise.isSuperset && exercise.supersetExerciseName?.trim()) {
            let superExResult = await db.getFirstAsync<{ id: number }>('SELECT id FROM exercises WHERE name = ?', [exercise.supersetExerciseName.trim()]);
             if (!superExResult) {
                const res = await db.runAsync('INSERT INTO exercises (name) VALUES (?)', [exercise.supersetExerciseName.trim()]);
                superExResult = { id: res.lastInsertRowId };
            }
            const supersetExerciseId = superExResult.id;
            const supersetId = Date.now() + index; 

            await db.runAsync(
                'INSERT INTO workouts_to_exercises (workout_id, exercise_id, `order`, superset_id, reps) VALUES (?, ?, ?, ?, ?)',
                [newWorkoutId, mainExerciseId, order, supersetId, exercise.targetReps]
            );

            await db.runAsync(
              'INSERT INTO workouts_to_exercises (workout_id, exercise_id, `order`, superset_id, reps) VALUES (?, ?, ?, ?, ?)',
              [newWorkoutId, supersetExerciseId, order, supersetId, exercise.additionalReps]
            );
          } else {
            await db.runAsync(
              'INSERT INTO workouts_to_exercises (workout_id, exercise_id, `order`, reps) VALUES (?, ?, ?, ?)',
              [newWorkoutId, mainExerciseId, order, exercise.targetReps]
            );
          }
        }
      });

      router.back();

    } catch (error) {
      console.error("Failed to save workout:", error);
      alert("An error occurred while saving the workout.");
    }
  };

  return {
    workoutName,
    setWorkoutName,
    exercises,
    addExercise,
    removeExercise,
    handleSaveWorkout,
  };
};