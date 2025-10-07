import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite'
import { Platform } from "react-native";
import * as FileSystem from 'expo-file-system';
import './global.css'

import { schema } from '../db/schema.js';

export const DATABASE_NAME = 'fitness_v5'

async function initDb(db: any) {
  try {
    if(Platform.OS === 'web'){
      await db.execAsync(schema)
    } else {
      const schemaSql = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + 'db/schema.sql'
      );
      await db.execAsync(schemaSql);
    }
  } catch (error) {
    console.error("Failed to initialize database", error);
  }
}


export default function RootLayout() {

  return (
    <SQLiteProvider 
    databaseName={DATABASE_NAME}
    onInit={initDb}
    options={{ enableChangeListener: true }}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="screens/CreateWorkout" 
          options={{ 
            presentation: 'modal',
            title: 'Create Workout',
            headerShown:false 
          }} 
        />
        <Stack.Screen 
          name="screens/CreateRecipe" 
          options={{ 
            presentation: 'modal',
            title: 'Create Recipe',
            headerShown:false 
          }} />
        <Stack.Screen 
          name="screens/WorkoutDetails" 
          options={{ 
            presentation: 'modal',
            title: 'WorkoutDetails',
            headerShown:false 
          }} />
        <Stack.Screen 
          name="screens/WorkoutProgress"
          options={{
            presentation: 'modal',
            title: 'WorkoutProgress',
            headerShown: false
          }}
        /> 
      </Stack>
    </SQLiteProvider>
  )
}
