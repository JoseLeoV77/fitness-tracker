import { Pressable, Text } from 'react-native'
import React from 'react'
interface RoutineSelectorProps{
  day: string,
  isSelected: boolean, 
  onPress: () => void
  workoutName?: string
} 

export const DaySelector = ({day, workoutName, onPress, isSelected}: RoutineSelectorProps) => {
  return (
    <Pressable className={`bg-surface flex w-[80] p-3 rounded-xl justify-center items-center h-16 border-border border-2 ${isSelected ? 'border-green-100 border-x-2 transform: scale-105' : 'bg-primaryVariant'}`} onPress={onPress}>
      <Text className='color-textPrimary text-base font-semibold'>{day}</Text>
      <Text className='color-textPrimary text-base font-semibold text-center'>{workoutName || 'FREE'}</Text>
    </Pressable>
  )
}
