import React from 'react'
import { Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'

export const CreateWorkoutButton = () => {
  return (
    <Link href={"../screens/CreateWorkout"} asChild>
      <Pressable className='bg-slate-300 w-28'>
        <MaterialCommunityIcons name='plus-circle-outline' />
      </Pressable>
    </Link>
  )
}