import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'

interface CreateButtonProps {
  href: string
  addText: string
}

export const CreateButton = ({ href, addText }: CreateButtonProps) => {
  return (
    <Link href={`../screens/${href}`} asChild>
      <Pressable className='flex flex-col w-28 h-28 gap-2 items-center justify-center rounded-3xl p-4 bg-slate-100 border-2 border-blue-800'>
        <View className='bg-blue-900 w-11 h-11 flex items-center justify-center rounded-full p-3 active:scale-110 transform-cpu transition-all duration-100 ease-in hover:scale-110 '>
          <MaterialCommunityIcons name='plus-circle-outline' size={34} color={"rgb(255,255,255)"}/>
        </View>
        <Text className='text-center'>Add a {addText}!</Text>
      </Pressable>
    </Link>
  )
}