import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import ListingScreen from '../screens/ListingScreen';
import ListingEditScreen from '../screens/ListingEditScreen';
import AccountScreen from '../screens/AccountScreen';
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import NewListingButton from '../components/NewListingButton';
import route from './route';


const Tab = createBottomTabNavigator();

const AppNavigator = () => (

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
)


export default AppNavigator;