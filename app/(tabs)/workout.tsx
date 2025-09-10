import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'
import { CreateButton } from '@/components/CreateButton'
import { RoutineSelector } from '@/components/RoutineSelector'
import { WorkoutCard } from '../../components/WorkoutCard'
import { router } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'

interface WorkoutProps {
  id: number;
  name: string;
}

const Workout = () => {
  const db = useSQLiteContext()
  const [routine, setRoutine] = useState<Record<string, string | null>>({
    Mon: null,
    Tue: null,
    Wed: null,
    Thu: null,
    Fri: null,
    Sat: null,
    Sun: null,
  });
  const [ workouts, setWorkouts ] = useState<WorkoutProps[]>([])
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [ deleteWorkout, setDeleteWorkout ] = useState<boolean>(false) 

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    async function getWorkouts() {
      const fetchedWorkouts = await db.getAllAsync<WorkoutProps>('SELECT * from workouts')
      setWorkouts(fetchedWorkouts)
      console.log(fetchedWorkouts)
    }
    getWorkouts();
  }, [db]); 

  function getWorkoutName (id: number | null) {
    if (!id) {
      return undefined;
    }
    const workout = workouts.find(workout => workout.id === id);
    return workout ? workout.name : undefined;
  };

  function handleDayPress(day: string){
    setSelectedDay(day);
  };

  async function deleteFromWorkout (workoutId:string){
    try{
      await db.runAsync('DELETE FROM workouts WHERE id = (?)', [workoutId])
      const workoutsCopy = workouts
      const workoutToDelete = workoutsCopy.filter((workout)=> workout.id !== Number(workoutId))
      setWorkouts(workoutToDelete)
      setDeleteWorkout(false)
      } catch(err){
        console.log(err)
      }
  }

  async function handleWorkoutPress (workoutId: string){
    if (selectedDay) {
        setRoutine({ ...routine, [selectedDay]: workoutId });
        setSelectedDay(null);
        setDeleteWorkout(false)
    } else if (deleteWorkout) {
      deleteFromWorkout(workoutId)
    } else {
        router.push(`/screens/WorkoutDetails?id=${workoutId}`);
    }
};

  function handleWorkoutDelete (){
    setDeleteWorkout(!deleteWorkout)  
  }

  return (
    <View className='flex-1 bg-primaryblue items-center relative'>
      <View className='flex flex-row gap-2 h-32 w-full items-center justify-center bg-darkblue rounded-xl'>
        {daysOfWeek.map(day => (
        <RoutineSelector
            key={day}
            day={day}
            workoutName={getWorkoutName(parseInt(routine[day]!))} 
            onPress={() => handleDayPress(day)}
            isSelected={selectedDay === day}
        />
        ))}
      </View>
      <FlatList 
        data={workouts} 
        renderItem={({ item }) => (<WorkoutCard id={item.id} name={item.name} onPress={() => handleWorkoutPress(item.id.toString())}
        />)}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          padding: 12, 
          gap: 32, 
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: '#030040'
        }}
        ListEmptyComponent={()=> <Text className='color-white'>Create some workouts!</Text>}
        ListFooterComponent={()=>(
          <View className='flex flex-row gap-2 '>
          <CreateButton href='CreateWorkout'/>
        </View>
        )}
        />
        <Pressable className='color-slate-950 bg-red-300 w-16 h-16 flex items-center justify-center rounded-lg p-4 absolute top-3/4 left-3/4' onPress={handleWorkoutDelete}>
          <Text>
            Delete a workout
          </Text>
        </Pressable>
    </View>
  )
}

export default Workout