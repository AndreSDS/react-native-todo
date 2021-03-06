import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { MainScreen } from './screens/MainScreen'
import { AboutScreen } from './screens/AboutScreen'
import { Sidebar } from './components/Sidebar'

export function AppRoutes() {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={(props: any) => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000',
        gestureEnabled: false
      }}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  )
}
