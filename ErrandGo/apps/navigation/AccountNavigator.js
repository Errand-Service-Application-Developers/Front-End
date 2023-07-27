import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountScreen from '../screens/AccountScreen';
import MessagesScreen from '../screens/MessagesScreen';
import UserHistoryScreen from '../screens/UserHistoryScreen';
import UserHistoryItemDetails from '../screens/UserHistoryItemDetails';
import ReviewDetailsScreen from '../screens/ReviewDetailsScreen';
import UserMessagesScreen from '../screens/UserMessagesScreen';
import CurrentUserHistoryScreen from '../screens/CurrentUserHistoryScreen';
import UserTaskDetails from '../screens/UserTaskDetails';




const Stack = createNativeStackNavigator();


const AccountNavigator = () => (
    <Stack.Navigator mode="modal" screenOptions={{headerShown:false}}>
        <Stack.Screen name='Account' component={AccountScreen}/>
        <Stack.Screen name='UserHistoryItemDetails' component={UserHistoryItemDetails}/>
        <Stack.Screen name = 'UserTaskDetails'component={UserTaskDetails} />
        <Stack.Screen name='CurrentUserHistory' component={CurrentUserHistoryScreen} 
        options={{
            headerStyle: {backgroundColor:'#e5525f'},
            headerTintColor: "white",
            headerShown: true,
            title:'My Listings',
        }}/>
           <Stack.Screen name='Reviews' component={UserMessagesScreen} 
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

