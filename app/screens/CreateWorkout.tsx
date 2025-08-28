import React, { useState } from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { AddToExerciseButton } from '@/components/AddToWorkoutButton'
import { router } from 'expo-router'
import { CreateExerciseInput } from '@/components/CreateWorkoutInput'

const CreateWorkout = () => {
  const [ exerciseName, setExerciseName ] = useState("")
  const [ addWeight, setAddWeight ] = useState(false)
  const [ isSuperset, setIsSuperset ] = useState(false)
  const [ additionalWeight, setAdditionalWeight ] = useState("")
  const [ additionalExercise, setAdditionalExercise ] = useState("") 

  function handlePress(btnId: string){
    if(btnId === "btnSuperset"){
      setIsSuperset(!isSuperset)
    } 
    
    if(btnId === "btnWeight"){
      console.log("here")
      setAddWeight(!addWeight)
    }  
  } 

  function handleSaveWorkout(){
    const newWorkout = {
      name: exerciseName,
      isSuperset, 
      additionalWeight,
      additionalExercise
    }
    console.log("Workout data sent to SQLite", newWorkout)
  }

    function handleNumberInput(text:string){
    const numericValue = text.replace(/[^0-9.]/g, '')
    setAdditionalWeight(numericValue)
  }

  return (
    <View className="bg-[#030040] flex-1">
      <View className='flex gap-2'>
        <TextInput placeholder='Name your workout' className='bg-white'/>

        <CreateExerciseInput exerciseName={exerciseName} additionalWeight={addWeight} addSuperset={isSuperset} setExerciseName={setExerciseName} setAdditionalWeight={handleNumberInput} setAdditionalExercise={setAdditionalExercise}/>
        
        <AddToExerciseButton handler={() => handlePress('btnWeight')} description="Additional Weight?"/>
        <AddToExerciseButton handler={() => handlePress('btnSuperset')} description="Add Superset?"/>
        
        <Pressable onPress={handleSaveWorkout} className='bg-white'>
          <Text>
            Save Workout!
          </Text>
        </Pressable>
      </View>
      <View>
        <Text onPress={router.back} className='flex bg-slate-500 w-16 h-16 rounded-3xl text-center '>
          Go Back!
        </Text>
      </View>
    </View>
  )
}

export default CreateWorkout