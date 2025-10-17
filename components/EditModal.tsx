import { Modal, Text, View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import React from 'react'

interface editModalProps {
  isVisible: boolean,
  onClose: () => void,
  onDelete: (id: string) => void,
  workoutId: string
}

export const EditModal = ({isVisible, onClose, workoutId, onDelete}: editModalProps) => {
  const router = useRouter()

  function handlePress(){
    router.push(`/screens/WorkoutDetails?id=${workoutId}`)
    onClose()
  }

  return (
    <Modal visible={isVisible} animationType='fade' transparent={true}>
      <View className='flex-1 bg-[rgb(0,0,0,0.7)] justify-center items-center p-2 '>
        <View className='w-72 h-32 flex justify-center bg-surface rounded-3xl p-3 items-center border-x-2 border-border'>
          <View>
            <Pressable onPress={handlePress}>
              <Text className='color-textPrimary text-lg'>Edit  Workout</Text>
            </Pressable>
            <Pressable onPress={() => onDelete(workoutId)}>
              <Text>Icono</Text>
              <Text className='color-error text-lg'>Delete Workout</Text>
            </Pressable>
          </View>
          <Pressable onPress={onClose}>
            <Text className='color-textPrimary text-lg'>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
