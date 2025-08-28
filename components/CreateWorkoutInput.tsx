import { View, TextInput } from 'react-native'
import React, { useState } from 'react'

interface CreateExerciseInputProps {
  exerciseName: string,
  setExerciseName: (text: string) => void,
  additionalWeight: boolean,
  addSuperset: boolean
  setAdditionalWeight: (text: string) => void,
  setAdditionalExercise: (text: string) => void
}

export const CreateExerciseInput = ({exerciseName, setExerciseName, additionalWeight, addSuperset, setAdditionalExercise, setAdditionalWeight }: CreateExerciseInputProps) => {

  return (
    <View>
      <TextInput
        className='bg-white w-2/3 rounded-md'
        value={exerciseName}
        onChangeText={setExerciseName}
      />
      {
        additionalWeight &&
        <TextInput 
          className='bg-white w-2/3 rounded-md'
          placeholder='1kg'
          onChangeText={setAdditionalWeight}
          keyboardType='numeric'
        />
      }
      {
        addSuperset &&
        <TextInput 
          className='bg-white w-2/3 rounded-md'
          onChangeText={setAdditionalExercise}
          placeholder='Add another exercise'
        />
      }
      
    </View>
  )
}
