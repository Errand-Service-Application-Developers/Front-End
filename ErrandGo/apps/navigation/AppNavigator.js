import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'


import ListingEditScreen from '../screens/ListingEditScreen';
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import NewListingButton from '../components/NewListingButton';
import route from './route';
import AuthContext from '../auth/context';
import expoPushTokenApi from '../api/expoPushToken';


const Tab = createBottomTabNavigator();



const AppNavigator = () => {
    const {user} = useContext(AuthContext)

    //useEffect(()=> {
    //    registerForPushNotifications();
    //},[])

    const registerForPushNotifications = async () => {

        try {

            const pushToken = await Notifications.getExpoPushTokenAsync();
            expoPushTokenApi.register(user.user_id,pushToken.data);

        } catch (error) {

            
            
        }


    }
    
    return (

    <Tab.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={FeedNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={ListingEditScreen}
        options={({ navigation }) => ({
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={size + 8} />
          ),
          tabBarButton: () => <NewListingButton onPress={() => navigation.navigate('Add')} />,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={AccountNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Always reset to the Account screen when Profile tab is pressed
            navigation.navigate('Profile', {
              screen: 'Account',
            });
          },
        })}
      />
    </Tab.Navigator>
);
};

export default AppNavigator;