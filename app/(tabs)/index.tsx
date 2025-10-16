import { Pressable, Text, View } from "react-native";
import { WorkoutButton } from "@/components/WorkoutButton";
import { Calendar } from "react-native-calendars"; //Credit
import { useState, useCallback } from "react";
import { useWorkoutScheduler } from "@/hooks/useWorkoutScheduler";
import notifee from '@notifee/react-native';
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "expo-router";
import { CustomDay } from "@/components/CustomDay";

interface WorkoutProps {
  id: number;
  name: string;
}

export default function Index() {
  const db = useSQLiteContext()
  const [ workout, setWorkout ] = useState<{ name: string; order: number; }[]>([]);
  const [todayWorkout, setTodayWorkout] = useState<WorkoutProps | null>(null);
  const [ steps, setSteps ] = useState(0)
  const { isDaySelected, setIsDaySelected, markedDatesState, handleWorkoutDone, handleSelectDay, handleRestDay, setMarkedDatesState } = useWorkoutScheduler();

  const background = "#2b2b2b"

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
    <View className="flex justify-center items-center flex-1 gap-2 bg-background">

      <Calendar 
        dayComponent={({ date, state, marking, onPress}) => (
          <CustomDay date={date} state={state} />
        )}
        headerStyle={{
          backgroundColor: `${background}`,
          borderRadius: 10
        }}
        style={{
          backgroundColor: `${background}`,
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
          monthTextColor: "white",
          calendarBackground: `${background}`,

        }}
        enableSwipeMonths={true}
      />
      <Text className="color-slate-50">Todays workout is: {todayWorkout?.name || 'Rest Day!'}</Text>

      <View className="bg-onyx w-full h-76 flex">

        <View className="flex flex-row justify-center gap-2">
          <WorkoutButton handler={() => handleWorkoutDone(isDaySelected,todayWorkout?.id)} text={"Workout Done!"} color={"blue"} hover={"blue"} />
          <WorkoutButton handler={() => handleRestDay(isDaySelected)} text={"Rest"} color={"red"} hover={"red"}/>
        </View>
        
        <View className="flex flex-row justify-center gap-2">
          <Pressable onPress={() => onDisplayNotification()}>
            <Text className="color-white">Notification Test</Text>
          </Pressable>
          <Text className="color-slate-50">
            Steps Test
          </Text>
        </View>
        
      </View>
    </View>
  );
}
