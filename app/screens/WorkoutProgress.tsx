import { View, Text, Pressable } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite'

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
    <View>
      <Text>WorkoutProgress</Text>
      <Pressable onPress={router.back} className='w-14 h-14 bg-red-50'>
        <Text>Go back</Text>
      </Pressable>
    </View>
  )
}

export default WorkoutProgress