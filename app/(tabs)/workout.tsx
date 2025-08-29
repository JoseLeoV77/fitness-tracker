import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { CreateButton } from '@/components/CreateButton'
import RoutineSelector from '@/components/RoutineSelector'
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
    <View className='flex-1 bg-[#030040]'>
      <View className='flex flex-row'>
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
      <View className='flex p-12 gap-12 flex-row flex-wrap bg-[#030040] w-full'>      
          {
            mockWorkouts.length > 0 
            ? (mockWorkouts.map(workout => (
              <WorkoutCard 
              key={workout.id} 
              id={workout.id} 
              name={workout.name}
              onPress = {()=> handleWorkoutPress(workout.id)}
              />
            )))
            : (
              <Text className='color-white'>No workouts found.</Text>
            ) 
            
          }
        <View className='flex flex-row gap-2'>
          <CreateButton href='CreateWorkout'/>
          <Text className='color-white'>Create a Workout! </Text>
        </View>
      </View>
    </View>
  )
}

export default Workout