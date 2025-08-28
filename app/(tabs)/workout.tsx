import React from 'react'
import { View, Text } from 'react-native'
import { CreateButton } from '@/components/CreateWorkoutButton'

const workout = () => {

  const mockWorkouts = [
      { id: '1', name: 'Leg Day' },
      { id: '2', name: 'Upper Body' },
      { id: '3', name: 'Cardio' },
  ];


  return (
    <View className='flex-1 bg-[#030040]'>
      <View className='flex p-12 gap-12 flex-row flex-wrap bg-[#030040] w-full'>      
          {
            mockWorkouts.length > 0 
            ? mockWorkouts.map(workout => (
              <View className='bg-white p-4' key={workout.id}>
                <Text>
                  Workout Name here!
                </Text>
              </View>
            ))
            : null 
            
          }
        <View className='flex flex-row gap-2'>
          <CreateButton href='CreateWorkout'/>
          <Text className='color-white'>Create a Workout! </Text>
        </View>
      </View>
    </View>
  )
}

export default workout