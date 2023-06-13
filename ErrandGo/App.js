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


const Tweets =  ({navigation}) => 
    (
    <Screen>
    <Text onPress={()=>navigation.navigate("TweetDetails",{name:"Pinto",id:"1"})}>
      My tweets
    </Text> 
      
    </Screen>

    );


const TweetDetails = ({route}) => (
  <Screen>
    <Text>
      Tweet Details {route.params.id}
    </Text>
  </Screen>

);

const Account = () => (
  <Screen>
    <Text>Account</Text>
  </Screen>
)


const AddItem = () => (
  <Screen>
    <Text>Adding Screen</Text>
  </Screen>
)


const Stack = createNativeStackNavigator();

const ListNavigator = () => (
  <Stack.Navigator
  screenOptions = {{
    headerStyle: {backgroundColor: "dodgerblue"},
    headerTintColor: "white",
  }}>

    <Stack.Screen  name="Tweets" component={Tweets}/>

    <Stack.Screen  name="TweetDetails" component={TweetDetails} options={({route}) => ({ title: route.params.id})}/>


  </Stack.Navigator>
)


const AddItemNavigator = () => (
  <Stack.Navigator
  screenOptions = {{
    headerStyle: {backgroundColor: "dodgerblue"},
    headerTintColor: "white",
  }}>

    <Stack.Screen  name="Tweets" component={Tweets}/>

    <Stack.Screen  name="TweetDetails" component={TweetDetails} options={({route}) => ({ title: route.params.id})}/>


  </Stack.Navigator>
)



const AccountNavigator = () => (
  <Stack.Navigator
  screenOptions = {{
    headerStyle: {backgroundColor: "dodgerblue"},
    headerTintColor: "white",
  }}>

    <Stack.Screen  name="Tweets" component={Tweets}/>

    <Stack.Screen  name="TweetDetails" component={TweetDetails} options={({route}) => ({ title: route.params.id})}/>


  </Stack.Navigator>
)


const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator 
  screenOptions ={{
    tabBarActiveBackgroundColor: 'dodgerblue',
    tabBarActiveTintColor: 'white',
    tabBarInactiveBackgroundColor: '#eee',
    tabBarInactiveTintColor:'black'
 
  }}>

    <Tab.Screen 
    name='Feed'
    component={ListNavigator}
    options={{
      tabBarIcon: ({size,color})=> <MaterialCommunityIcons name="home" color={color} size={size}/>
    }} />
    <Tab.Screen
    name='add'
    component={AddItemNavigator} 
    options={{
      tabBarIcon: ({size,color})=> <MaterialCommunityIcons name="plus" color={color} size={size}/>
    }}/>
    <Tab.Screen
    name='Account'
    component={AccountNavigator} 
    options={{
      tabBarIcon: ({size,color})=> <MaterialCommunityIcons name="account" color={color} size={size}/>
    }}/>

  </Tab.Navigator>
)




export default function App() {

  console.log("App Executed")

  return(

   <NavigationContainer theme={navigationTheme}>
    <AppNavigator/>
   </NavigationContainer>
  );
  
}
 

