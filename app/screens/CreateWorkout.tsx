import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { AddToWorkoutButton } from '@/components/AddToWorkoutButton'
import { router } from 'expo-router'
import { CreateWorkoutInput } from '@/components/CreateWorkoutInput'

const CreateWorkout = () => {
  const [ workoutName, setWorkoutName ] = useState("")
  const [ addWeight, setAddWeight ] = useState(false)
  const [ isSuperset, setIsSuperset ] = useState(false)

  function handlePress(btnId: string){
    if(btnId === "btnSuperset"){
      setIsSuperset(!isSuperset)
    } 
    
    if(btnId === "btnWeight"){
      console.log("here")
      setAddWeight(!addWeight)
    }  
  } 

  return (
    <View className="bg-[#030040] flex-1">
      <View className='flex gap-2'>
        <CreateWorkoutInput workoutName={workoutName} additionalWeight={addWeight} addSuperset={isSuperset} setWorkoutName={setWorkoutName}/>
        <AddToWorkoutButton handler={() => handlePress('btnWeight')} description="Additional Weight?"/>
         <AddToWorkoutButton handler={() => handlePress('btnSuperset')} description="Add Superset?"/>
        <Pressable>
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