import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const workout = () => {
  return (
    <View className='flex-1 bg-[#030040] '>
      <View className='flex p-4 justify-around gap-2 flex-row flex-wrap bg-[#030040] w-full'>
        <Pressable className='bg-slate-300 w-28'>
          <MaterialCommunityIcons name='plus-circle-outline' />
        </Pressable>
        <Pressable className='bg-slate-300 w-28'>
          <MaterialCommunityIcons name='plus-circle-outline' />
        </Pressable>

      </View>
    </View>
  )
}

export default workout