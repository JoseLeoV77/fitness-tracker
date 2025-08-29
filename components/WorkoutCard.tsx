import { Pressable, Text } from 'react-native'
import React from 'react'

interface WorkoutCardProp {
  id: string,
  name: string
  onPress: (workoutId: string) => void;
}

export function WorkoutCard({id, name, onPress}: WorkoutCardProp) {
  return (
    <Pressable  className={`bg-slate-300 w-28 h-28 flex items-center justify-center rounded-lg p-4 `} onPress={() => onPress(id)}>
      <Text>{name}</Text>
    </Pressable>
  )
}