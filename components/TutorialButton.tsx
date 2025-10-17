import { Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'



export function TutorialButton({handleTutorialPress} : { handleTutorialPress: () => void}) {

  return (
    <Pressable
        className={'w-6 h-6 flex items-center justify-center rounded-full absolute top-5 right-4 bg-white shadow-indigo-400 active:scale-110 transform-cpu transition-all duration-100 ease-in hover:scale-110'}
        onPress={handleTutorialPress}
    >
        <FontAwesome 
            name='question-circle' 
            size={35} 
            color={"background"} 
            style={{borderColor: "gray", borderWidth: 2, borderRadius: 100, padding: 2, width: 42, textAlign: "center"}}
        />
    </Pressable>
  )
}