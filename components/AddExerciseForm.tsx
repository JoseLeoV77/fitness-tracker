import { View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { AddToExerciseButton } from './AddToWorkoutButton'; // Your button component
import { ExerciseTemplate } from '@/hooks/useCreateWorkout';

interface AddExerciseFormProps {
  onAddExercise: (exercise: Omit<ExerciseTemplate, 'id'>) => void;
}

export const AddExerciseForm = ({ onAddExercise }: AddExerciseFormProps) => {
  const [exerciseName, setExerciseName] = useState("");
  const [targetSets, setTargetSets] = useState("");
  const [targetReps, setTargetReps] = useState("");
  const [isSuperset, setIsSuperset] = useState(false);
  const [supersetExerciseName, setSupersetExerciseName] = useState("");

  const handlePressAdd = () => {
    onAddExercise({
      exerciseName,
      targetSets,
      targetReps,
      isSuperset,
      supersetExerciseName,
    });
    setExerciseName("");
    setTargetSets("");
    setTargetReps("");
    setIsSuperset(false);
    setSupersetExerciseName("");
  };

  return (
    <View className="gap-2 p-4 border border-gray-500 rounded-lg">
       <TextInput placeholder="Exercise Name" value={exerciseName} onChangeText={setExerciseName} className="bg-white p-2 rounded-md"/>
       <TextInput placeholder="Target Sets" value={targetSets} onChangeText={setTargetSets} keyboardType="numeric" className="bg-white p-2 rounded-md"/>
       <TextInput placeholder="Target Reps" value={targetReps} onChangeText={setTargetReps} keyboardType="numeric" className="bg-white p-2 rounded-md"/>
       {isSuperset && <TextInput placeholder="Superset Exercise" value={supersetExerciseName} onChangeText={setSupersetExerciseName} className="bg-white p-2 rounded-md"/>}
      
      <View className="flex-row gap-4">
        <AddToExerciseButton handler={() => setIsSuperset(!isSuperset)} description={isSuperset ? "Remove Superset" : "Add Superset"} />
        <AddToExerciseButton handler={handlePressAdd} description="Add Exercise to List" />
      </View>
    </View>
  );
};