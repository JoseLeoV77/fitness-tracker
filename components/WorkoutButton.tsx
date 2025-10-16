import { Pressable, Text, View } from "react-native"
interface WorkoutButtonProps {
  text: string,
  handler: () => void, 
  color: string
  hover?: string
}

export const WorkoutButton = ({text, handler, color, hover}: WorkoutButtonProps) => {

  return(
    <View>
      <Pressable className={`bg-${color}-600 w-28 rounded-xl p-2 hover:bg-${hover}-950`} onPress={handler}>
          <Text className="color-slate-50 text-center">{text}</Text>
        </Pressable>
    </View>
  )
}