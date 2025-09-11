import React from 'react'
import { Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'

interface CreateButtonProps {
  href: string
}

export const CreateButton = ({ href }: CreateButtonProps) => {
  return (
    <Link href={`../screens/${href}`} asChild>
      <Pressable className='bg-slate-300 w-12 h-12 flex items-center justify-center rounded-full p-3 active:scale-110 transform-cpu transition-all duration-100 ease-in'>
        <MaterialCommunityIcons name='plus-circle-outline' size={24}/>
      </Pressable>
    </Link>
  )
}