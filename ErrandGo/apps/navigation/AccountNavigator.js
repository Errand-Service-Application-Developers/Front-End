import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountScreen from '../screens/AccountScreen';
import MessagesScreen from '../screens/MessagesScreen';
import UserHistoryScreen from '../screens/UserHistoryScreen';
import UserHistoryItemDetails from '../screens/UserHistoryItemDetails';
import ReviewDetailsScreen from '../screens/ReviewDetailsScreen';




const Stack = createNativeStackNavigator();


const AccountNavigator = () => (
    <Stack.Navigator mode="modal" screenOptions={{headerShown:false}}>
        <Stack.Screen name='Account' component={AccountScreen}/>
        <Stack.Screen name='UserHistoryItemDetails' component={UserHistoryItemDetails}/>
        <Stack.Screen name='UserHistory' component={UserHistoryScreen} 
        options={{
            headerStyle: {backgroundColor:'#e5525f'},
            headerTintColor: "white",
            headerShown: true,
            title:'My Listings',
        }}/>
           <Stack.Screen name='Reviews' component={MessagesScreen} 
        options={{
            headerStyle: {backgroundColor:'#e5525f'},
            headerTintColor: "white",
            headerShown: true,
            title:' My Reviews', }}/>
         <Stack.Screen name='ReviewDetails' component={ReviewDetailsScreen} 
        options={{
            headerStyle: {backgroundColor:'#e5525f'},
            headerTintColor: "white",
            headerShown: true,
            title:' Review Details', }}/>
    </Stack.Navigator>
);


export default AccountNavigator;

