import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { Octicons } from '@expo/vector-icons'

interface ExerciseDetail {
  name: string;
  reps: number;
}

const WorkoutDetails = () => {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const [ exercises, setExercises ] = useState<ExerciseDetail[]>([])
  const [ workoutLog, setWorkoutLog ] = useState([])
  const workoutId = Number(id)

  useEffect(()=>{
    async function getWorkouts() {
      const workoutList = await db.getAllAsync<ExerciseDetail>(`SELECT E.name, W.reps, W.superset_id
      FROM workouts_to_exercises AS W 
      JOIN exercises AS E 
      ON W.exercise_id == E.id 
      WHERE W.workout_id == ?`, [workoutId])
      setExercises(workoutList)
    }
  
    if(workoutId){
      getWorkouts();
    }
  },[workoutId, db])
  console.log(exercises)
  const handleStartWorkout = async () => {
    try {
      await db.runAsync('INSERT INTO workout_logs (workout_id) VALUES (?)', [workoutId])
     
    } catch (err) {
      console.log(err)
    } 
  }

  const handleViewProgress = async (wId:number) => {
    router.push(`/screens/WorkoutProgress?id=${wId}`)
  }

  return (
    <View className='bg-primaryblue flex-1'>
      <Text>WorkoutDetails</Text>
      <View>
        {exercises.map((exercises, index) => (
          <View key={index} className='color-white'>
            <Text className='color-white'>Exercise: {exercises.name}</Text>
            <Text className='color-white'>Target Reps: {exercises.reps}</Text>
          </View>
        ))}
      </View>
      <Pressable className='w-14 h-14 bg-red-50' onPress={handleStartWorkout}>
        <Text>Start Workout! </Text>
      </Pressable>
      <Pressable onPress={router.back} className='w-14 h-14 bg-red-50'>
        <Text>Go back</Text>
      </Pressable>
      <Pressable 
        onPress={() => handleViewProgress(workoutId)} 
        className='flex flex-col w-14 h-14 bg-red-50'>
        <Text>
          <Octicons name='history' />
          View Progress
        </Text>
      </Pressable>
    </View>
  )
}

export default WorkoutDetails