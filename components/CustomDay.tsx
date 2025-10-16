import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

export function CustomDay({ date, state }) {
  return (
    <TouchableOpacity className='bg-onyx p-2 w-12 h-12 items-center rounded-lg'>
      <Text className={`${state === 'disable' ? "color-white": "color-gray-200"} text-lg`}>{date.day}</Text>
    </TouchableOpacity>
  )
}
