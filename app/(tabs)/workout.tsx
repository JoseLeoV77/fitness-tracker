import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'
import { CreateButton } from '@/components/CreateButton'
import { RoutineSelector } from '@/components/RoutineSelector'
import { WorkoutCard } from '../../components/WorkoutCard'
import { router, useFocusEffect } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { TutorialModal } from '@/components/TutorialModal'

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
  const [modal, setIsModalOpen] = useState<boolean>(false)

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try{
          const fetchedWorkouts = await db.getAllAsync<WorkoutProps>('SELECT * from workouts')
          setWorkouts(fetchedWorkouts)

          const fetchedRoutine = await db.getAllAsync<{ 'order': number, workout_id: number }>('SELECT "order", workout_id FROM routines_to_workouts WHERE routine_id IS NULL');
          
          const newRoutine: Record<string, string | null> = { Mon: null, Tue: null, Wed: null, Thu: null, Fri: null, Sat: null, Sun: null };
          fetchedRoutine.forEach(row => {
            const day = daysOfWeek[row.order - 1];
            newRoutine[day] = row.workout_id.toString();
          });
          setRoutine(newRoutine);
        } catch (e) {
          console.log(e)
        }
      }
      fetchData();
    }, [db])); 

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
      setWorkouts(prev => prev.filter((workout)=> workout.id !== Number(workoutId)))
      setDeleteWorkout(false)
      } catch(err){
        console.log(err)
      }
  }

  async function handleWorkoutPress (workoutId: string){

    if (selectedDay) {
      const order = daysOfWeek.indexOf(selectedDay) + 1
      setRoutine(prev => ({ ...prev, [selectedDay]: workoutId }));
      if(order > 0){
        try{
          await db.runAsync('INSERT OR REPLACE INTO routines_to_workouts ("order", workout_id) VALUES (?, ?)', [order, workoutId])
          } catch (e){
            console.log(e)
          }
        }
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

  async function handleRemoveFromRoutine(order: number){
      try {
        console.log('hR', order)
      await db.runAsync(
        'DELETE FROM routines_to_workouts WHERE "order" = ? AND routine_id IS NULL',
        [order]
      );

      const day = daysOfWeek[order - 1];
      setRoutine(prev => ({ ...prev, [day]: null }));
    } catch (err) {
      console.error("Failed to remove from routine:", err);
    }
  }

  function handleTutorialPress(){
    setIsModalOpen(true)
  }

  function handleCloseTutorial(){
    setIsModalOpen(false)
  }

  console.log('routine: ',routine)

  return (
    <View className='flex-1 bg-primaryblue items-center relative'>
      <View className='flex flex-row gap-2 h-40 w-full items-center justify-center bg-darkblue rounded-xl'>
        {daysOfWeek.map(day => (
        <View key={day} className='flex gap-2'>
          {routine[day] &&
          <Pressable className='bg-white h-16 border-2 border-orange-500 p-2 text-center w-20 justify-center rounded' onPress={() => handleRemoveFromRoutine(daysOfWeek.indexOf(day) + 1 )}>
            <Text className='text-center'>Remove</Text>
          </Pressable>
          }
          <RoutineSelector
              day={day}
              workoutName={getWorkoutName(parseInt(routine[day]!))} 
              onPress={() => handleDayPress(day)}
              isSelected={selectedDay === day}
          />
        </View>
        ))}
      </View>
      <FlatList 
        data={workouts} 
        renderItem={({ item }) => (
          <WorkoutCard 
            id={item.id} 
            name={item.name} 
            onPress={() => handleWorkoutPress(item.id.toString())}
          />
        )}
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
        <Pressable className='color-slate-950 bg-gray-300 w-12 h-12 flex items-center justify-center rounded-full p-4 absolute top-2/4 left-3/4' onPress={handleTutorialPress}>
          <Text>
            ?
          </Text>
        </Pressable>
        <TutorialModal isVisible={modal} onClose={handleCloseTutorial}/>
    </View>
  )
}

export default Workout