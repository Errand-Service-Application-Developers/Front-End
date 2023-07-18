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

    useEffect(()=> {
        registerForPushNotifications();
    },[])

    const registerForPushNotifications = async () => {

        try {

            const pushToken = await Notifications.getExpoPushTokenAsync();
            expoPushTokenApi.register(user.user_id,pushToken.data);

        } catch (error) {

            console.log("Error getting Push token",error)
            
        }


    }
    
    return (

    <Tab.Navigator 
    screenOptions={{ headerShown:false }}>
        <Tab.Screen name='Feed' 
        component={FeedNavigator}
        options={{tabBarIcon:({color,size})=> <MaterialCommunityIcons name='home' color={color} size={size}/>}}

        />

        <Tab.Screen 
        name='ListingEdit' 
        component={ListingEditScreen}
        options={({navigation})=> ({ tabBarButton: () => <NewListingButton onPress={()=> navigation.navigate(route.LISTING_EDIT) }/>
             })}/>

        <Tab.Screen 
        name='Account' 
        component={AccountNavigator}
        options={{tabBarIcon:({color,size})=> <MaterialCommunityIcons name='account' color={color} size={size}/>}}
        />
    </Tab.Navigator>
);
};

export default AppNavigator;