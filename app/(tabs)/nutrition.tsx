import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { CreateButton } from '@/components/CreateWorkoutButton';

export default function nutrition() {
  return (
    <View className='flex-1'>
      <LinearGradient
        colors={["#030040", "#030014"]}
        style={{position: "absolute", left: 0, top: 0, bottom: 0, right: 0,
          height: "100%"
        }}
        start={{x:0, y:1}}
        end={{x:0, y:1}}
      ></LinearGradient>
      <Text>nutrition</Text>
      <CreateButton href='CreateRecipe' />
    </View>
  )
}