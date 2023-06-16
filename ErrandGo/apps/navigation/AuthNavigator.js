import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => (

    <Stack.Navigator  options={{headerShown:false}} screenOptions={{ headerShown:false}}>
        
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/> 
        <Stack.Screen name="Register" component={RegisterScreen}/>

    </Stack.Navigator>
)


export default AuthNavigator;