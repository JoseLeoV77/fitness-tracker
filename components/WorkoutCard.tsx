import { Pressable, Text, View } from 'react-native'
import React from 'react'

interface WorkoutCardProp {
  id: number,
  name: string
  onPress: (workoutId: number) => void;
  onLongPress: (workoutId: number) => void;
}

export function WorkoutCard({id, name, onPress, onLongPress}: WorkoutCardProp) {
  return (
    <View>
      <Pressable className='bg-blue-200 w-28 h-28 flex items-center justify-center rounded-3xl p-4 border-2 border-border' onPress={() => onPress(id)} onLongPress={() => onLongPress(id)}>
        <Text className='text-black text-base font-medium'>{name}</Text>
      </Pressable>
    </View>
  )
}