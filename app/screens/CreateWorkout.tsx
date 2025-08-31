import React from 'react'
import { useWorkoutSet } from '@/hooks/useWorkoutSet'
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import { router } from 'expo-router'
import { CreateSet } from '@/components/CreateSet'

const CreateWorkout = () => {
  const { handleSaveWorkout } = useWorkoutSet()

  return (
    <ScrollView className="bg-[#030040] flex flex-1 p-5 gap-14">
      <View className='flex gap-2'>
        <TextInput placeholder='Name your workout' className='bg-white rounded-lg'/>
        <View className='flex gap-8'>
          <CreateSet />
          <CreateSet />
          <CreateSet />
          <CreateSet />
        </View>
        <View>
          <Pressable onPress={handleSaveWorkout} className='bg-white'>
            <Text>
              Save Workout!
            </Text>
          </Pressable>
          <Text onPress={router.back} className='flex bg-slate-500 w-16 h-16 rounded-3xl text-center '>
            Go Back!
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateWorkout