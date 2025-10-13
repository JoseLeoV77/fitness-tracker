import { Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'



export function TutorialButton({handleTutorialPress} : { handleTutorialPress: () => void}) {
  const DEEP_BLUE = "#4C95E6"

  return (
    <Pressable
        className={'w-10 h-10 flex items-center justify-center rounded-full absolute top-3 right-4 bg-white shadow-indigo-400 active:scale-110 transform-cpu transition-all duration-100 ease-in hover:scale-110'}
        onPress={handleTutorialPress}
    >
        <FontAwesome 
            name='question-circle' 
            size={32} 
            color={DEEP_BLUE} 
        />
    </Pressable>
  )
}