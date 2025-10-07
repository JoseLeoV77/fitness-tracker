import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";


export const useWorkoutScheduler = () => {
  const [ isDaySelected, setIsDaySelected ] = useState<string | null>(null)
  const [markedDatesState, setMarkedDatesState] = useState<Record<string, { selected: boolean; selectedColor: string }>>({})
  const db = useSQLiteContext()

  useFocusEffect(
    useCallback(() => {
      async function fetchProgress() {
        try {
          const results = await db.getAllAsync('SELECT * FROM user_progress')
          console.log('userProgress results: ', results)
        } catch (e) {
          console.log(e)
        }
      }
      fetchProgress()
    }, 
    [db]))
  
    const handleWorkoutDone = async (date: string | null, workoutId: number | undefined) => {
        if (!date || !workoutId) {
      console.log("No date or workout selected");
      return;
    }
    
    try {
      await db.runAsync(
        'INSERT OR REPLACE INTO completed_workouts (date, workout_id, status) VALUES (?, ?, ?)',
        [date, workoutId, 'done']
      );

      const workoutOrderResult = await db.getFirstAsync<{ 'order': number }>(
        'SELECT "order" FROM routines_to_workouts WHERE workout_id = ?',
        [workoutId]
      );
      if (workoutOrderResult) {
        await db.runAsync(
          'INSERT OR REPLACE INTO user_progress ("key", "value") VALUES (?, ?)',
          ['last_completed_order', workoutOrderResult.order]
        );
      }
      
      setMarkedDatesState(prev => ({
        ...prev,
        [date]: { selected: true, selectedColor: 'green' }
      }));
    } catch (e) {
      console.error("Failed to mark workout as done:", e);
    }
  }
 
  const handleSelectDay = (date: string) => {
    setIsDaySelected(date);
  };

  const handleRestDay = async (date: string | null) => {
    if (!isDaySelected) {
      return;
    }
    try {
      await db.runAsync(
        'INSERT OR REPLACE INTO completed_workouts (date, workout_id, status) VALUES (?, ?, ?)',
        [date, null, 'rest']
      );

      setMarkedDatesState(prev => ({
        ...prev, [date!]: { selected: true, selectedColor: 'red' }
      }));
    } catch (e) {
      console.error("Failed to mark rest day:", e);
    }
  }
  return { isDaySelected, markedDatesState, handleWorkoutDone, handleSelectDay, handleRestDay, setIsDaySelected, setMarkedDatesState }
}