import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'

interface TutorialModalProps {
  isVisible: boolean,
  onClose: () => void
}

export const TutorialModal = ({isVisible, onClose}: TutorialModalProps) => {
  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
      <View className='flex-1 bg-transparent justify-center items-center'>
        <View className='h-72 w-80 bg-orange-400 rounded-xl flex items-center gap-4'>
          <Text className='font-bold'>This will be improved: </Text>
          <View className='w-4/5 gap-2'>
            <View>
              <Text className='font-bold color-black text-base text-center'>To delete a Workout.</Text>
              <Text className='font-bold color-black text-base text-justify'>Touch the workout previously created, then the `Delete a workout` button.</Text>
            </View>
            <View>
              <Text className='font-bold color-black text-base text-center'>To add it to the rountine slots.</Text>
              <Text className='font-bold color-black text-base text-justify'>Click the slot you want it to be in the routine, then click workout.</Text>
            </View>
          </View>
          <Pressable className='bg-blue-950 rounded-full w-12 h-12 flex justify-center justify-self-start' onPress={onClose}>
            <Text className='text-center color-white'>X</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
