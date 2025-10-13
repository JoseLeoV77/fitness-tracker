import { View, TextInput, Text, Switch, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ExerciseTemplate } from '@/hooks/useCreateWorkout';

interface AddExerciseFormProps {
  onAddExercise: (exercise: Omit<ExerciseTemplate, 'id'>) => void;
}

export const AddExerciseForm = ({ onAddExercise }: AddExerciseFormProps) => {
  const [exerciseName, setExerciseName] = useState("");
  const [targetSets, setTargetSets] = useState("");
  const [targetReps, setTargetReps] = useState("");
  const [additionalSets, setAddSets] = useState("");
  const [additionalReps, setAddReps] = useState("");
  const [isSuperset, setIsSuperset] = useState(false);
  const [supersetExerciseName, setSupersetExerciseName] = useState("");

  const handlePressAdd = () => {
    onAddExercise({
      exerciseName,
      targetSets,
      targetReps,
      additionalSets,
      additionalReps,
      isSuperset,
      supersetExerciseName,
    });
    setExerciseName("")
    setTargetSets("")
    setTargetReps("")
    setAddSets("")
    setAddReps("")
    setIsSuperset(false)
    setSupersetExerciseName("")
  };

  const inputStyle = "bg-gray-700 border border-gray-600 rounded-lg p-3 text-white text-base";
  const labelStyle = "text-gray-400 text-sm font-semibold px-1";
  const placeholder = "#6b7280"

  return (
    <View className="gap-6 p-4">
      <View className='flex gap-4'>
        <Text className={labelStyle}>EXERCISE NAME</Text>
        <TextInput
          placeholder="e.g., Bench Press"
          placeholderTextColor={placeholder}
          value={exerciseName}
          onChangeText={setExerciseName}
          className={inputStyle}
        />
      </View>

       <View className="flex-row gap-4">
        <View className="flex-1 gap-2">
          <Text className={labelStyle}>SETS</Text>
          <TextInput
            placeholder="e.g., 3"
            placeholderTextColor={placeholder}
            value={targetSets}
            onChangeText={setTargetSets}
            keyboardType="numeric"
            className={inputStyle}
          />
        </View>
        <View className="flex-1 gap-2">
          <Text className={labelStyle}>REPS</Text>
          <TextInput
            placeholder="e.g., 8-12"
            placeholderTextColor={placeholder}
            value={targetReps}
            onChangeText={setTargetReps}
            keyboardType="numeric"
            className={inputStyle}
          />
        </View>
      </View>

      <View className="flex-row justify-between items-center bg-gray-700 rounded-lg p-3 mt-2">
        <Text className="text-white font-semibold">Add a Superset?</Text>
        <Switch
            trackColor={{ false: "#4b5563", true: "#3b82f6" }}
            thumbColor={isSuperset ? "#fff" : "#f4f4f5"}
            onValueChange={() => setIsSuperset(!isSuperset)}
            value={isSuperset}
        />
      </View>

       {isSuperset && (
       <View className="gap-5 p-4 border border-dashed border-gray-600 rounded-lg">
          <View className="gap-2">
            <Text className={labelStyle}>SUPERSET EXERCISE NAME</Text>
            <TextInput
              placeholder="e.g., Push Ups"
              placeholderTextColor={placeholder}
              value={supersetExerciseName}
              onChangeText={setSupersetExerciseName}
              className={inputStyle}
            />
          </View>
          <View className="flex-row gap-4">
            <View className="flex-1 gap-2">
              <Text className={labelStyle}>SETS</Text>
              <TextInput
                placeholder="e.g., 3"
                placeholderTextColor={placeholder}
                value={additionalSets}
                onChangeText={setAddSets}
                keyboardType="numeric"
                className={inputStyle}
              />
            </View>
            <View className="flex-1 gap-2">
              <Text className={labelStyle}>REPS</Text>
              <TextInput
                placeholder="e.g., 12-15"
                placeholderTextColor={placeholder}
                value={additionalReps}
                onChangeText={setAddReps}
                keyboardType="numeric"
                className={inputStyle}
              />
            </View>
          </View> 
        </View> 
        )  
       }
      
      <TouchableOpacity
        onPress={handlePressAdd}
        className="bg-blue-600 p-4 rounded-full flex-row justify-center items-center mt-4"
      >
        <Feather name="plus" size={20} color="white" />
        <Text className="text-white text-center font-bold text-base ml-2">Add to Workout</Text>
      </TouchableOpacity>
    </View>
  );
};