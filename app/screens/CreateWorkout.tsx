import React, { useState } from 'react'

import { View, Text, TextInput, Pressable } from 'react-native'
import { router } from 'expo-router'
import { CreateWorkoutInput } from '@/components/CreateWorkoutInput'

const CreateWorkout = () => {
  const [ workoutName, setWorkoutName ] = useState("")
  const [addWeight, setAddWeight ] = useState("0")

  return (
    <View className="bg-[#030040] flex-1">
      <View className='flex gap-2'>
        <CreateWorkoutInput workoutName={workoutName} additionalWeight={addWeight} />
        <Pressable>
          Save Workout!
        </Pressable>
      </View>
      <View>
        <Text onPress={router.back} className='flex bg-slate-500 w-16 h-16 rounded-3xl text-center '>
          Go Back!
        </Text>
      </View>
    </View>
  )
}

export default CreateWorkout