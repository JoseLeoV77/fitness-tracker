import { Pressable, Text } from 'react-native'
import React from 'react'
interface RoutineSelectorProps{
  day: string,
  isSelected: boolean, 
  onPress: () => void
  workoutName?: string
} 

const RoutineSelector = ({day, workoutName, onPress, isSelected}: RoutineSelectorProps) => {
  return (
    <Pressable className={`bg-white p-4 ${isSelected ? 'border-2 border-yellow-500' : ''}`} onPress={onPress}>
      <Text>{day}</Text>
      <Text>{workoutName || 'FREE'}</Text>
    </Pressable>
  )
}

export default RoutineSelector