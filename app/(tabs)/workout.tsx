import React, { useState } from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import { CreateButton } from '@/components/CreateButton'
import { RoutineSelector } from '@/components/RoutineSelector'
import { WorkoutCard } from '../../components/WorkoutCard'
import { router } from 'expo-router'

const Workout = () => {
  const [routine, setRoutine] = useState<Record<string, string | null>>({
    Mon: null,
    Tue: null,
    Wed: null,
    Thu: null,
    Fri: null,
    Sat: null,
    Sun: null,
  });
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const mockWorkouts = [
      { id: '1', name: 'Leg Day' },
      { id: '2', name: 'Upper Body' },
      { id: '3', name: 'Cardio' },
  ];
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  function getWorkoutName (id: string | null) {
    if (!id) {
      return undefined;
    }
    const workout = mockWorkouts.find(workout => workout.id === id);
    return workout ? workout.name : undefined;
  };

  function handleDayPress(day: string){
    setSelectedDay(day);
};

  function handleWorkoutPress (workoutId: string){
    if (selectedDay) {
        setRoutine({ ...routine, [selectedDay]: workoutId });
        setSelectedDay(null);
    } else {
        router.push(`/screens/WorkoutDetails?id=${workoutId}`);
    }
};

  return (
    <View className='flex-1 bg-[#030040] items-center'>
      <View className='flex flex-row gap-2 h-32 w-full items-center justify-center bg-slate-900 rounded-xl'>
        {daysOfWeek.map(day => (
        <RoutineSelector
            key={day}
            day={day}
            workoutName={getWorkoutName(routine[day])} 
            onPress={() => handleDayPress(day)}
            isSelected={selectedDay === day}
        />
        ))}
      </View>
      <FlatList 
        data={mockWorkouts} 
        renderItem={({ item }) => (<WorkoutCard id={item.id} name={item.name} onPress={() => handleWorkoutPress(item.id)}
        />)}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          padding: 12, 
          gap: 32, 
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: '#030040'
        }}
        ListEmptyComponent={()=> <Text className='color-white'>No workouts found.</Text>}
        ListFooterComponent={()=>(
          <View className='flex flex-row gap-2 '>
          <CreateButton href='CreateWorkout'/>
          <Text className='color-black bg-slate-300 w-16 h-14 flex items-center justify-center rounded-lg p-4'>Create a Workout! </Text>
        </View>
        )}
        />
    </View>
  )
}

export default Workout