import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'

interface TutorialModalProps {
  isVisible: boolean,
  onClose: () => void
}

const TutorialStep = ({ title, description }: { title: string; description: string }) => (
  <View className='flex-row items-start mb-6 w-full'>
    <View className='flex-1'>
      <Text className='text-base font-bold color-textPrimary mb-3'>{title}</Text>
      <Text className='text-base color-textSecondary leading-5'>{description}</Text>
    </View>
  </View>
);

export const TutorialModal = ({isVisible, onClose}: TutorialModalProps) => {
  return (
    <Modal animationType='fade' transparent={true} visible={isVisible}>
      <View className='flex-1 bg-[rgb(0,0,0,0.7)] justify-center items-center p-2'>
        <View className='w-full h-2/4 flex justify-center bg-surface rounded-3xl p-3 items-center border-x-2 border-border'>

          <Text className='text-xl font-bold color-textPrimary mb-3'>How it works: </Text>

          <TutorialStep
            title="Assign a Workout"
            description="First, tap on a day of the week above. Then, tap on any workout from your list below to assign it."
          />
          <TutorialStep
            title="Delete a Workout"
            description="Touch the workout previously created, then the `Delete a workout` button."
          />
          <TutorialStep
            title="Remove from Routine"
            description="Tap the 'remove' on an assigned day to set it as a rest day."
          />
          
          <Pressable className='bg-red-500 rounded-full w-12 h-12 flex justify-center justify-self-start' onPress={onClose}>
            <Text className='text-center color-white'>X</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
