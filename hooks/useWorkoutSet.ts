import  { useState } from "react";

export const useWorkoutSet = () => {
  const [exerciseName, setExerciseName] = useState("");
  const [addWeight, setAddWeight] = useState(false);
  const [isSuperset, setIsSuperset] = useState(false);
  const [additionalWeight, setAdditionalWeight] = useState("");
  const [additionalExercise, setAdditionalExercise] = useState("");

  function handlePress(btnId: string){
    if(btnId === "btnSuperset"){
      setIsSuperset(!isSuperset)
    } 
    
    if(btnId === "btnWeight"){
      console.log("here")
      setAddWeight(!addWeight)
    }  
  } 
  
  function handleSaveWorkout(){
    const newWorkout = {
      name: exerciseName,
      isSuperset, 
      additionalWeight,
      additionalExercise
    }
    console.log("Workout data sent to SQLite", newWorkout)
  }
  
    function handleNumberInput(text:string){
    const numericValue = text.replace(/[^0-9.]/g, '')
    setAdditionalWeight(numericValue)
  }

  return {
    exerciseName,
    addWeight,
    isSuperset,
    additionalWeight,
    additionalExercise,
    setExerciseName,
    setAdditionalExercise,
    handlePress,
    handleSaveWorkout,
    handleNumberInput,
  };
};