import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const TabIcon = ({focused, title, icon, vectorIcons}: any) => {
  
  if(focused){
    return (
      <View style={{backgroundColor: "orange"}} className="flex flex-row w-full min-w-[112px] min-h-16 justify-center gap-2 items-center rounded-full">
        {
          vectorIcons === "MaterialIcons" 
          ? <MaterialIcons name={icon} size={24}/> 
          : <FontAwesome5 name={icon} size={24}/>
        }
        <Text className="color-slate-950">{title}</Text>
      </View>
    )
  }

  return(
    <View className="flex flex-row justify-center items-center
    gap-2">
        {
          vectorIcons === "MaterialIcons" 
          ? <MaterialIcons name={icon} size={24} className="color-slate-50"/> 
          : <FontAwesome5 name={icon} size={24} className="color-slate-50"/>
        }
      <Text className="color-slate-50">{title}</Text>
    </View>
  )
}  
