import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { Octicons, Ionicons } from '@expo/vector-icons'
import { GoBackHeaderButton } from '@/components/GoBackHeaderButton'

interface ExerciseDetail {
  name: string;
  reps: number;
  superset_id?: number
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
    <View className='bg-background flex-1 gap-8'>
      <View className='flex-row items-center justify-between p-4 pt-8 bg-background border-b-4 border-gray-600'>
        <GoBackHeaderButton />
      </View>

      <View>
        <Text className='text-gray-100 text-lg font-semibold mb-2 self-center'>Exercises in this workout:</Text>
        <ScrollView contentContainerClassName='flex gap-4'>
          {exercises.map((exercise, index) => (
            <View 
                key={index} 
                className='bg-green-600 p-4 rounded-xl shadow-md w-11/12 self-center' 
                style={{
                    borderLeftWidth: exercise.superset_id ? 5 : 0,
                    borderLeftColor: exercise.superset_id! ? '#FFD700' : 'transparent',
                }}
              >
                <Text className='text-white text-xl font-bold mb-1'>{exercise.name}</Text>
                <Text className='text-black text-base'>Target Reps: {exercise.reps}</Text>
              </View>
          ))}
        </ScrollView>
      </View>

      <View className='absolute bottom-12 self-center rounded-full bg-onyx border-t border-blue-100 p-4 flex-row justify-around items-center w-11/12'>
        <Pressable 
          className='flex-1 py-3 px-4 mr-2 bg-blue-600 rounded-full flex-row items-center justify-center shadow-lg' 
          onPress={() => handleViewProgress(workoutId)}
        >
          <Ionicons name="stats-chart-outline" size={20} color="white" className='mr-2'/>
          <Text className='text-white text-base font-semibold'>View Progress</Text>
        </Pressable>
        
        <Pressable 
          className='flex-1 py-3 px-4 ml-2 bg-green-500 rounded-full flex-row items-center justify-center shadow-lg' 
          onPress={handleStartWorkout}
        >
          <Ionicons name="play-circle-outline" size={20} color="white" className='mr-2'/>
          <Text className='text-white text-base font-bold'>Start Workout!</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default WorkoutDetails