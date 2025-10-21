import { View, Text, Pressable } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite'
import { GoBackHeaderButton } from '@/components/GoBackHeaderButton'

const WorkoutProgress = () => {
  
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const [ workoutLogs, setWorkoutLogs ] = useState()
  const workoutId = Number(id)

  useEffect(() => {
    async function getWorkoutLogs(){
      try{

        const WorkoutLogTest = await db.getAllAsync(`SELECT * FROM workout_logs WHERE workout_id = (?)`, [workoutId])
        setWorkoutLogs(WorkoutLogTest)
      } catch(err){
        console.log(err)
      }
    }
    getWorkoutLogs()
  }, [db])

  console.log(workoutLogs)
  return (
    <View className='flex-1 bg-background'>
      <View className='flex-row items-center justify-between p-4 pt-8 bg-background border-b-4 border-gray-600'>
        <GoBackHeaderButton />
      </View>
      <Text className='text-white text-2xl'>WorkoutProgress</Text>
      <View>
        <Pressable className='flex flex-row w-full justify-end px-4'>
          <Text className='text-white text-base border-2 border-onyx rounded-lg'> KG/LB </Text>
        </Pressable>
      </View>
      <View className='flex flex-row gap-2 border-y-4 h-52 border-white'>
        <View>
          <Text className='text-white'>PUSH UP</Text>
        </View>
        <View className='flex-row gap-2 h-1/3'>
          <View className='flex-row gap-2 border-2 border-surface rounded-full bg-onyx p-1'>
            <Pressable className='text-white'>
              <Text className='text-white'>-</Text>
            </Pressable>
            <Text className='text-white'>SETS</Text>
            <Pressable className='text-white'>
              <Text className='text-white'>+</Text>
            </Pressable>
          </View>
          <View className='flex-row gap-2 border-2 border-surface rounded-full bg-onyx p-1'>
            <Pressable className='text-white'>
              <Text className='text-white'>-</Text>
            </Pressable>
              <Text className='text-white'>REPS</Text>
            <Pressable className='text-white'>
              <Text className='text-white'>+</Text>
            </Pressable>
          </View>
          <View className='flex-row gap-2 border-2 border-surface rounded-full bg-onyx p-1'>
            <Pressable className='text-white'>
              <Text className='text-white'>-</Text>
            </Pressable>
              <Text className='text-white'>Weight</Text>
            <Pressable className='text-white'>
              <Text className='text-white'>+</Text>
            </Pressable>
          </View>
      </View>
      </View>
      
    </View>
  )
}

export default WorkoutProgress
