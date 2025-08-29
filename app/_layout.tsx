import { Stack } from "expo-router";
import './global.css'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{headerShown: false}}
      />
      <Stack.Screen 
      name="screens/CreateWorkout" 
      options={{ 
        presentation: 'modal',
        title: 'Create Workout',
        headerShown:false }} />
      <Stack.Screen 
      name="screens/CreateRecipe" 
      options={{ 
        presentation: 'modal',
        title: 'Create Recipe',
        headerShown:false }} />
        <Stack.Screen 
      name="screens/WorkoutDetails" 
      options={{ 
        presentation: 'modal',
        title: 'WorkoutDetails',
        headerShown:false }} />
    </Stack>
  )
}
