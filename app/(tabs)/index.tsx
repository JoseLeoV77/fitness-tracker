import { Button, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { WorkoutButton } from "@/components/WorkoutButton";
import { Calendar } from "react-native-calendars"; //Credit
import { useState } from "react";
import { useWorkoutScheduler } from "@/hooks/useWorkoutScheduler";
import notifee from '@notifee/react-native';

export default function Index() {
  const [ workout, setWorkout ] = useState(["Push", "Pull", "L", "Rest"]);
  const [ steps, setSteps ] = useState(0)
  

  const { setIsDaySelected, markedDatesState, handleWorkoutDone, handleRestDay } = useWorkoutScheduler();

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
      <Text className="color-slate-50">Todays workout is: {workout[0]}</Text>
        <WorkoutButton handler={handleWorkoutDone} text={"Workout Done!"} color={"blue"} hover={"blue"} />
        <WorkoutButton handler={handleRestDay} text={"Rest"} color={"red"} hover={"red"}/>
        <Button title="Display Notification" onPress={() => onDisplayNotification()}/>
        <Text className="color-slate-50">
          Steps Test
        </Text>
    </View>
  );
}
