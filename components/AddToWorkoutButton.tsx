import { Pressable, Text } from 'react-native'
import React from 'react'

interface AddToWorkoutButtonProps {
  handler: () => void,
  description: string
} 

export const AddToWorkoutButton = ({ handler, description }: AddToWorkoutButtonProps) => {
  return (
    <Pressable className='bg-white' onPress={handler}>
      <Text>
        {description}
      </Text>
    </Pressable>
  )
}