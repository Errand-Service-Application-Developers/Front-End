import React from 'react';
import {  Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'


import Screen from './apps/screens/Screen';
import LoginScreen from './apps/screens/LoginScreen';
import RegisterScreen from './apps/screens/RegisterScreen';
import AuthNavigator from './apps/navigation/AuthNavigator';
import AppNavigator from './apps/navigation/AppNavigator';
import WelcomeScreen from './apps/screens/WelcomeScreen';
import navigationTheme from './apps/navigation/navigationTheme';





export default function App() {

  console.log("App Executed")

  return(

   <NavigationContainer theme={navigationTheme}>
    <AppNavigator/>
   </NavigationContainer>
  );
  
}
 

