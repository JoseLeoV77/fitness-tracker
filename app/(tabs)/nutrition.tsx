import { View, Text } from 'react-native'
import React from 'react'
import { CreateButton } from '@/components/CreateButton';

export default function nutrition() {
  return (
    <View className='flex-1 bg-background'>
      <Text>nutrition</Text>
      <CreateButton href='CreateRecipe' />
    </View>
  )
}