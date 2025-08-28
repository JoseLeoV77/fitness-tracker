import { Pressable, Text } from 'react-native'
import React from 'react'

interface AddToExerciseButtonProps {
  handler: () => void,
  description: string
} 

export const AddToExerciseButton = ({ handler, description }: AddToExerciseButtonProps) => {
  return (
    <Pressable className='bg-white' onPress={handler}>
      <Text>
        {description}
      </Text>
    </Pressable>
  )
}