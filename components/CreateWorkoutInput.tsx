import { View, TextInput } from 'react-native'
import React from 'react'

interface CreateWorkoutInputProps {
  workoutName: string,
  additionalWeight: string
}

export const CreateWorkoutInput = ({workoutName, additionalWeight}: CreateWorkoutInputProps) => {
  return (
    <View>
      <TextInput
        className='bg-white w-2/3 rounded-md'
        value={workoutName}
      />
      <TextInput 
        className='bg-white w-2/3 rounded-md'
        value={additionalWeight}
      />
    </View>
  )
}
