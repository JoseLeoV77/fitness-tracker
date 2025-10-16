import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { router } from 'expo-router'

export const GoBackHeaderButton = () => {
  return (
    <Pressable onPress={router.back} className='p-2'>
      <Ionicons name="arrow-back" size={28} color="white" /> 
    </Pressable>
  )
}

