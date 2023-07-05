import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';


import ListingScreen from '../screens/ListingScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import UserHistoryScreen from '../screens/UserHistoryScreen';
import UserHistoryItemDetails from '../screens/UserHistoryItemDetails';


const Stack = createNativeStackNavigator();




const FeedNavigator = () => (
    <Stack.Navigator mode="modal" screenOptions={{headerShown:false}}>
        <Stack.Screen name='Listings' component={ListingScreen}/>
        <Stack.Screen name='ListingDetails' component={ListingDetailsScreen} />
        <Stack.Screen name='UserHistoryItemDetails' component={UserHistoryItemDetails}/>
        <Stack.Screen name='UserHistory' component={UserHistoryScreen} 
        options={{
            headerStyle: {backgroundColor:'#e5525f'},
            headerTintColor: "white",
            headerShown: true,
            title: 'User Listings',
            
        }}/>

    </Stack.Navigator>
);


export default FeedNavigator;

