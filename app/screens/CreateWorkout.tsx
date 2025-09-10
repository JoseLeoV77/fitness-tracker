import React from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useCreateWorkout } from '@/hooks/useCreateWorkout';
import { AddExerciseForm } from '@/components/AddExerciseForm';

const CreateWorkout = () => {
  const {
    workoutName,
    setWorkoutName,
    exercises,
    addExercise,
    removeExercise,
    handleSaveWorkout,
  } = useCreateWorkout();

  return (
    <ScrollView className="bg-[#030040] flex-1 p-5" contentContainerStyle={{ paddingBottom: 50 }}>
      <View className='flex gap-5'>
        <TextInput
          placeholder='Name your workout (e.g., Push Day A)'
          placeholderTextColor="#999"
          value={workoutName}
          onChangeText={setWorkoutName}
          className='bg-white rounded-lg p-3 text-lg font-bold'
        />

        <View className="gap-2">
          <Text className="text-white text-xl font-bold">Exercises</Text>
          {exercises.length === 0 && <Text className="text-gray-400">No exercises added yet.</Text>}
          {exercises.map((ex, index) => (
            <View key={ex.id} className="bg-blue-900 p-3 rounded-lg flex-row justify-between items-center">
              <View>
                <Text className="text-white font-bold">{index + 1}. {ex.exerciseName}</Text>
                {ex.isSuperset && <Text className="text-gray-300">  + {ex.supersetExerciseName}</Text>}
              </View>
              <Pressable onPress={() => removeExercise(ex.id)}>
                <Text className="text-red-500 font-bold">Remove</Text>
              </Pressable>
            </View>
          ))}
        </View>

        <AddExerciseForm onAddExercise={addExercise} />

        <View className="gap-8 mt-5 flex items-center">
          <Pressable onPress={handleSaveWorkout} className='bg-green-500 p-2 rounded-lg w-32'>
            <Text className="text-white text-center text-lg font-bold">
              Save Workout!
            </Text>
          </Pressable>
          <Pressable onPress={router.back} className='bg-gray-600 p-2 rounded-lg w-32'>
            <Text className='text-white text-center font-semibold'>
              Go Back
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateWorkout;