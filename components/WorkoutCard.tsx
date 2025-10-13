import { Pressable, Text, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react'

interface WorkoutCardProp {
  id: number,
  name: string
  onPress: (workoutId: number) => void;
}

export function WorkoutCard({id, name, onPress}: WorkoutCardProp) {
  return (
    <View className='relative'>
      <Pressable className='bg-blue-200 w-28 h-28 flex items-center justify-center rounded-3xl p-4 border-2 border-border' onPress={() => onPress(id)}>
        <Text className='text-black text-base font-medium'>{name}</Text>
      </Pressable>
      <View className='absolute p-2 bg-white rounded-full top-0.5 right-0.5'>
        <FontAwesome5 name="pencil-alt" size={19} color="blue"/>
      </View>
    </View>
  )
}