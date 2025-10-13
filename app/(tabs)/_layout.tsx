import React from 'react'
import { Tabs } from 'expo-router'
import { TabIcon } from '@/components/TabIcon'

const _layout = () => {
  const colorDarkBlue = "#030014";

  return (
    <Tabs 
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: colorDarkBlue,
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colorDarkBlue
        }
      }}
    >
      <Tabs.Screen 
      name='index' 
      options={{
        title: 'Home', 
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <TabIcon focused={focused} title="Home" icon="house-user" vectorIcons="FontAwesome5"/>
        )
      }} />
      <Tabs.Screen 
      name='workout' 
      options={{
        title: 'Workout', 
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <TabIcon  focused={focused} title="Workout" icon="sports" vectorIcons="MaterialIcons"/>
        )
      }} />
      <Tabs.Screen 
      name='nutrition' 
      options={{
        title: 'Nutrition', 
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <TabIcon focused={focused} title="Nutrition" icon="food-bank" vectorIcons="MaterialIcons"/>
        )
      }} />
    </Tabs> 
  )
}

export default _layout