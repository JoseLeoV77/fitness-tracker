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
  const handleWorkoutDone = () => {
    if (!isDaySelected) {
      console.log("no date selected")
      return;
    }

    const newMarkedDates = { ...markedDatesState };
    if (newMarkedDates[isDaySelected]) {
      delete newMarkedDates[isDaySelected];
    } else {
      newMarkedDates[isDaySelected] = {
        selected: true,
        selectedColor: "green",
      };
    }
    setMarkedDatesState(newMarkedDates);
  }
 

  const handleRestDay = () => {
    if (!isDaySelected) {
      return;
    }

     const newMarkedDates = { ...markedDatesState };
    if (newMarkedDates[isDaySelected]) {
      delete newMarkedDates[isDaySelected];
    } else {
      newMarkedDates[isDaySelected] = {
        selected: true,
        selectedColor: "red",
      };
    }
    setMarkedDatesState(newMarkedDates);
  }
  return { isDaySelected, markedDatesState, handleWorkoutDone, handleRestDay, setIsDaySelected }
}