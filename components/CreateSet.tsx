import { View, Text, Pressable } from 'react-native'
import { CreateExerciseInput } from './CreateWorkoutInput'
import { AddToExerciseButton } from './AddToWorkoutButton'
import { useWorkoutSet } from '@/hooks/useWorkoutSet'
import React from 'react' 

export const CreateSet = () => {
  const {
    exerciseName,
    addWeight,
    isSuperset,
    setExerciseName,
    setAdditionalExercise,
    handlePress,
    handleNumberInput,
  } = useWorkoutSet();

  return (
    <View className='flex gap-2'>

        <CreateExerciseInput exerciseName={exerciseName} additionalWeight={addWeight} addSuperset={isSuperset} setExerciseName={setExerciseName} setAdditionalWeight={handleNumberInput} setAdditionalExercise={setAdditionalExercise}/>
        <View className='flex flex-row gap-4'>
          <AddToExerciseButton handler={() => handlePress('btnWeight')} description="Additional Weight"/>
          <AddToExerciseButton handler={() => handlePress('btnSuperset')} description="Add Superset"/>  
        </View>
      </View>
  )
}
