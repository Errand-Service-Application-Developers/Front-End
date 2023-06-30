import React, { useState } from 'react';
import {  Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'


import Screen from './apps/screens/Screen';
import LoginScreen from './apps/screens/LoginScreen';
import RegisterScreen from './apps/screens/RegisterScreen';
import AuthNavigator from './apps/navigation/AuthNavigator';
import AppNavigator from './apps/navigation/AppNavigator';
import WelcomeScreen from './apps/screens/WelcomeScreen';
import navigationTheme from './apps/navigation/navigationTheme';



import OfflineNotice from './apps/components/OfflineNotice';
import AuthContext from './apps/auth/context';



export default function App() {

  console.log("App Executed")
  const [user,setUser] = useState();

  


  return (

    <AuthContext.Provider value={{user, setUser}}>
    <OfflineNotice/>
    <NavigationContainer theme={navigationTheme}>
     {user? <AppNavigator/>: <AuthNavigator/>}
    </NavigationContainer>

    </AuthContext.Provider >
  );
  
}
 

