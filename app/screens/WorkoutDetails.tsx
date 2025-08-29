import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'

const WorkoutDetails = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Pressable onPress={router.back}>
        <Text>WorkoutDetails</Text>
        <View>
          <Text>Workout Details Screen</Text>
          <Text>Workout ID: {id}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default WorkoutDetails