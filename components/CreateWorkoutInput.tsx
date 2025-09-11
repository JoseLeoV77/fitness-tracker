import { View, TextInput } from 'react-native'
import React from 'react'

interface CreateExerciseInputProps {
  exerciseName: string;
  setExerciseName: (text: string) => void;
  targetSets: string;
  setTargetSets: (text: string) => void;
  targetReps: string;
  setTargetReps: (text: string) => void;
  isSuperset: boolean;
  supersetExerciseName: string;
  setSupersetExerciseName: (text: string) => void;
}

export const CreateExerciseInput = ({exerciseName,
  setExerciseName,
  targetSets,
  setTargetSets,
  targetReps,
  setTargetReps,
  isSuperset,
  supersetExerciseName,
  setSupersetExerciseName }: CreateExerciseInputProps) => {

  return (
    <View>
      <TextInput
        className='bg-white p-2 w-full rounded-md'
        value={exerciseName}
        onChangeText={setExerciseName}
        placeholder='Exercise Name (e.g., Bench Press)'
      />
      <TextInput
        className='bg-white p-2 w-full rounded-md'
        value={targetSets}
        onChangeText={setTargetSets}
        placeholder='Number of Sets (e.g., 3)'
        keyboardType='numeric'
      />
      <TextInput
        className='bg-white p-2 w-full rounded-md'
        value={targetReps}
        onChangeText={setTargetReps}
        placeholder='Target Reps (e.g., 8-12)'
        keyboardType='numeric' // Or default if you allow ranges like "8-12"
      />

      {isSuperset && (
        <TextInput
          className='bg-white p-2 w-full rounded-md mt-2 border border-blue-400'
          value={supersetExerciseName}
          onChangeText={setSupersetExerciseName}
          placeholder='Superset with (e.g., Dumbbell Flys)'
        />
      )}
    </View>
  )
}
