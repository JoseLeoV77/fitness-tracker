import { Button, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { WorkoutButton } from "@/components/WorkoutButton";
import { Calendar } from "react-native-calendars"; //Credit
import { useState, useCallback } from "react";
import { useWorkoutScheduler } from "@/hooks/useWorkoutScheduler";
import notifee from '@notifee/react-native';
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "expo-router";

interface WorkoutProps {
  id: number;
  name: string;
}

export default function Index() {
  const db = useSQLiteContext()
  const [ workout, setWorkout ] = useState<{ name: string; order: number; }[]>([]);
  const [todayWorkout, setTodayWorkout] = useState<WorkoutProps | null>(null);
  const [ steps, setSteps ] = useState(0)
  const { isDaySelected, setIsDaySelected, markedDatesState, handleWorkoutDone, handleRestDay, setMarkedDatesState } = useWorkoutScheduler();

    useFocusEffect(
      useCallback(() => {
        async function fetchData() {
          try{
            const completedWorkouts = await db.getAllAsync<{ date: string, status: string }>(
            'SELECT date, status FROM completed_workouts')
            console.log(completedWorkouts)
            const newMarkedDates: Record<string, { selected: boolean; selectedColor: string }> = {}
            completedWorkouts.forEach(row => {
              newMarkedDates[row.date] = {
                selected: true, 
                selectedColor: row.status === 'done' ? 'green' : 'red' 
              }
            })
            setMarkedDatesState(newMarkedDates)
            const progressResult = await db.getFirstAsync<{ value: number }>(
            `SELECT value FROM user_progress WHERE key = 'last_completed_order'`
          );
            const lastCompletedOrder = progressResult ? progressResult.value : 0;

            const nextWorkoutResult = await db.getFirstAsync<WorkoutProps & { 'order': number }>(
            `SELECT W.id, W.name, RTW."order"
            FROM routines_to_workouts AS RTW
            JOIN workouts AS W ON RTW.workout_id = W.id
            WHERE RTW.routine_id IS NULL AND RTW."order" > ?
            ORDER BY RTW."order" ASC LIMIT 1`,
            [lastCompletedOrder]
          );

          if (!nextWorkoutResult) {
            const firstWorkout = await db.getFirstAsync<WorkoutProps & { 'order': number }>(
              `SELECT W.id, W.name, RTW."order"
              FROM routines_to_workouts AS RTW
              JOIN workouts AS W ON RTW.workout_id = W.id
              WHERE RTW.routine_id IS NULL
              ORDER BY RTW."order" ASC LIMIT 1`
            );
            setTodayWorkout(firstWorkout);
          } else {
            setTodayWorkout(nextWorkoutResult);
            }
          } catch (e) {
            console.log(e)
          }
        }
        fetchData();
      }, [db])); 

  async function onDisplayNotification() {
    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
      id: 'default', 
      name: 'Default Channel'
    })

    await notifee.displayNotification({
      title: "Workout: ",
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    })
  }
  
  return (
    <View className="flex justify-center items-center flex-1 gap-2">
      <LinearGradient
        colors={["#030014", "#030040"]}
        style={{position: "absolute", left: 0, top: 0, bottom: 0, right: 0,
          height: "100%"
        }}
        start={{x:0, y:1}}
        end={{x:0, y:1}}
      ></LinearGradient>
      <Calendar 
          headerStyle={{
            backgroundColor: "green",
            borderRadius: 10
          }}
          style={{
            backgroundColor: "green",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingBottom: 4,
            width: 400,
          }}
          showSixWeeks={true}
          onDayPress={day => {
            setIsDaySelected(day.dateString)
          }}
          markedDates={markedDatesState}
          theme={{
            monthTextColor: "white"
          }}
          enableSwipeMonths={true}
        />
      <Text className="color-slate-50">Todays workout is: {todayWorkout?.name || 'Loading...'}</Text>
        <WorkoutButton handler={() => handleWorkoutDone(isDaySelected,todayWorkout?.id)} text={"Workout Done!"} color={"blue"} hover={"blue"} />
        <WorkoutButton handler={() => handleRestDay(isDaySelected)} text={"Rest"} color={"red"} hover={"red"}/>
        <Button title="Display Notification" onPress={() => onDisplayNotification()}/>
        <Text className="color-slate-50">
          Steps Test
        </Text>
    </View>
  );
}
