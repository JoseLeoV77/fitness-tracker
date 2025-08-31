import { Pressable, Text } from 'react-native'
import React from 'react'

interface AddToExerciseButtonProps {
  handler: () => void,
  description: string
} 

export const AddToExerciseButton = ({ handler, description }: AddToExerciseButtonProps) => {
  return (
    <Pressable className='bg-white w-32 rounded-lg flex ' onPress={handler}>
      <Text className='text-center'>
        {description}
      </Text>
    </Pressable>
  )
}