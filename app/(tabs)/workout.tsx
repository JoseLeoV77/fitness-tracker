import React from 'react'
import { View } from 'react-native'
import { CreateWorkoutButton } from '@/components/CreateWorkoutButton'

const workout = () => {
  return (
    <View className='flex-1 bg-[#030040]'>
      <View className='flex p-4 justify-around gap-2 flex-row flex-wrap bg-[#030040] w-full'>      
        <CreateWorkoutButton />
      </View>
    </View>
  )
}

export default workout