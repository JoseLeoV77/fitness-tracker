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
    <View className='flex-1 bg-gray-900'>
      <Text>WorkoutProgress</Text>
      <GoBackHeaderButton />
    </View>
  )
}

export default WorkoutProgress