import React from 'react';
import { View, Text, ScrollView, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
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

  const placeholderText = "#6b7280"

  return (
    <ScrollView className="bg-background flex-1 p-5" contentContainerStyle={{ paddingBottom: 50 }}>
      <View className='flex gap-5'>

        <Text className="text-white text-3xl font-bold text-center">Create Workout</Text>

        <View className="gap-2">
            <Text className="text-white text-base font-semibold px-1">WORKOUT NAME</Text>
            <TextInput
              placeholder='e.g., Push Day A'
              placeholderTextColor={placeholderText}
              value={workoutName}
              onChangeText={setWorkoutName}
              className='bg-gray-800 border border-blue-300 rounded-lg p-4 text-white text-lg'
            />
        </View>

        <View className="gap-2">
          <Text className="text-white text-base font-semibold px-1">Exercises</Text>
          {exercises.length === 0 && 
          <View className="bg-gray-800 rounded-lg p-6 items-center justify-center border border-blue-300">
            <Text className="text-gray-300">Add an exercise to get started!</Text>
          </View>
          }

          {exercises.map((ex, index) => (
            <View key={ex.id} className="bg-gray-800 p-4 rounded-xl flex-row justify-between items-center">
              <View className="flex-1 mr-4">
                <Text className="text-white font-bold">{index + 1}. {ex.exerciseName}</Text>
                {ex.isSuperset && <Text className="text-gray-300">  + {ex.supersetExerciseName}</Text>}
              </View>
              <Pressable onPress={() => removeExercise(ex.id)}>
                <Text className="text-red-500 font-bold">Remove</Text>
              </Pressable>
            </View>
          ))}
        </View>

        <View className="bg-gray-800 rounded-xl p-4 mt-2 border border-blue-300">
          <Text className="text-white text-xl font-bold mb-4">Add New Exercise</Text>
          <AddExerciseForm onAddExercise={addExercise} />
        </View>

        <View className="gap-4 mt-8">
          <TouchableOpacity 
            onPress={handleSaveWorkout} 
            className='bg-blue-600 p-4 rounded-full flex-row justify-center items-center'
          >
            <Feather name="check" size={20} color="white" />
            <Text className="text-white text-center text-lg font-bold ml-2">
              Save Workout
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={router.back} 
            className='bg-gray-700 p-3 rounded-full'
          >
            <Text className='text-white text-center font-semibold'>
                Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateWorkout;