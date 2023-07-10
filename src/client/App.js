import { Fragment } from 'react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import StagePage from './components/pages/StagePage';
import MazePage from './components/pages/MazePage';

const Stack = createNativeStackNavigator();
//const Tab = createBottomTabNavigator();

export default function App() {
  const mazePages = [];
  for (let i = 1; i <= 21; i++){
    mazePages.push(
      <Stack.Screen key={`MazePage${i}`} name={`MazePage${i}`}>
        {(props) => <MazePage {...props} stage = { i } />}
      </Stack.Screen>
    );
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="StagePage" component={StagePage} />
        <Fragment>{ mazePages }</Fragment>
      </Stack.Navigator>
    </NavigationContainer>
    
/*
      <Tab.Navigator>
        <Tab.Screen name="LoginPage" component={ LoginPage }/>
        <Tab.Screen name="HomePage" component={ HomePage }/>
        <Tab.Screen name="StagePage" component={ StagePage }/>
      </Tab.Navigator>

      <Drawer.Navigator initialRouteName="Home">
        <Stack.Screen name="LoginPage" component={ LoginPage }/>
        <Stack.Screen name="HomePage" component={ HomePage }/>
        <Stack.Screen name="StagePage" component={ StagePage }/>
      </Drawer.Navigator>
*/
/*
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
*/
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
