import React, { useState, useCallback } from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'
import { CreateButton } from '@/components/CreateButton'
import { DaySelector } from '@/components/DaySelector'
import { WorkoutCard } from '../../components/WorkoutCard'
import { router, useFocusEffect } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { TutorialModal } from '@/components/TutorialModal'
import { TutorialButton } from '@/components/TutorialButton'
import { EditModal } from '@/components/EditModal'

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
  const [editModal, setIsEditModal ] = useState<boolean>(false)
  const [longPressId, setLongPressId ] = useState<string>("")

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  
  
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
        } catch (err) {
          console.log("Failed to fetch data: ", err)
        }
      }
      fetchData();
    }, [db])); 

  function getWorkoutName (id: number | null) {
    if (!id) return undefined

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
    } else {
        router.push(`/screens/WorkoutDetails?id=${workoutId}`);
    }
  };

  function handleLongPress (workoutId: string){
    setLongPressId(workoutId)
    setIsEditModal(true) 
  }

  async function handleRemoveFromRoutine(order: number){
      try {
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

  function closeEditModal(){
    setIsEditModal(false)
  }
  return (
    <View className='flex-1 bg-background items-center'>
      
      <View className='flex flex-row self-start mt-2 p-4 pt-3 relative'>
        <Text className='text-2xl font-bold color-white'>My Plan</Text>
      </View>
        <TutorialButton handleTutorialPress={handleTutorialPress}/>

      <View className='flex flex-wrap flex-row px-3 py-2 bg-onyx w-11/12 p-2 justify-center rounded-lg border-2 border-blue-300'>
        {daysOfWeek.map(day => (
        <View key={day} className='flex gap-2'>
          {routine[day] &&
          <Pressable className='bg-white h-16 border-2 border-orange-500 p-2 text-center w-18 justify-center rounded' onPress={() => handleRemoveFromRoutine(daysOfWeek.indexOf(day) + 1 )}>
            <Text className='text-center'>Remove</Text>
          </Pressable>
          }
          <DaySelector
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
            onLongPress={() => handleLongPress(item.id.toString())}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          padding: 12, 
          gap: 32, 
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: 'background'
        }}
        ListEmptyComponent={()=> <Text className='color-white'>Create some workouts!</Text>}
        ListFooterComponent={()=>(
          <View className='flex flex-col w-28 h-28 gap-2 items-center justify-center rounded-3xl p-4 bg-slate-100 border-2 border-blue-800'>
            <CreateButton href='CreateWorkout'/>
            <Text className='text-center'>Add a Workout!</Text>
          </View>
        )}
        />
      <EditModal isVisible={editModal} onClose={closeEditModal} workoutId={longPressId} onDelete={() => deleteFromWorkout(longPressId)}/>
      <TutorialModal isVisible={modal} onClose={handleCloseTutorial} />
    </View>
  )
}

export default Workout
