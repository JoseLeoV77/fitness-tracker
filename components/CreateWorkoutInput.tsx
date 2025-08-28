import { View, TextInput } from 'react-native'
import React from 'react'

interface CreateWorkoutInputProps {
  workoutName: string,
  setWorkoutName: (text: string) => void,
  additionalWeight: boolean,
  addSuperset: boolean
}

export const CreateWorkoutInput = ({workoutName, setWorkoutName, additionalWeight, addSuperset }: CreateWorkoutInputProps) => {
  return (
    <View>
      <TextInput
        className='bg-white w-2/3 rounded-md'
        value={workoutName}
        onChangeText={setWorkoutName}
      />
      {
        additionalWeight &&
        <TextInput 
          className='bg-white w-2/3 rounded-md'
          placeholder='1kg'
        />
      }
      {
        addSuperset &&
        <TextInput 
          className='bg-white w-2/3 rounded-md'
          onChangeText={setWorkoutName}
          placeholder='Add another exercise'
        />
      }
      
    </View>
  )
}
