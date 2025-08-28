import { useState } from "react";


export const useWorkoutScheduler = () => {
  const [ isDaySelected, setIsDaySelected ] = useState<string | null>(null)
  const [markedDatesState, setMarkedDatesState] = useState<Record<string, { selected: boolean; selectedColor: string }>>({})
  

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