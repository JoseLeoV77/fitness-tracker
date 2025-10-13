import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const TabIcon = ({focused, title, icon, vectorIcons}: any) => {
    const NARROW_SCREEN_FIX_CLASS = "sm-max:translate-y-[6.5px]"


  if(focused){
    return (
      <View className={`bg-bgOrange flex flex-row h-full w-full min-w-[112px] min-h-14 justify-center items-center gap-2 rounded-full ${NARROW_SCREEN_FIX_CLASS}`}>
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
    <View className={`flex flex-row justify-center items-center h-full gap-2 ${NARROW_SCREEN_FIX_CLASS}`} >
        {
          vectorIcons === "MaterialIcons" 
          ? <MaterialIcons name={icon} size={24} className="color-slate-50"/> 
          : <FontAwesome5 name={icon} size={24} className="color-slate-50"/>
        }
      <Text className="color-slate-50">{title}</Text>
    </View>
  )
}  
