import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginPage from './components/pages/LoginPage/LoginPage'
import HomePage from './components/pages/HomePage/HomePage'
import Info from './components/pages/HomePage/Info'
const Stack = createStackNavigator()

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          
        />
        <Stack.Screen name="Info" component={Info} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
