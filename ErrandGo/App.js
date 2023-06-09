//import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Switch, Image,Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker'


import WelcomeScreen from './apps/screens/WelcomeScreen';
import Card from './apps/components/Card';
import ListingDetailsScreen from './apps/screens/ListingDetailsScreen';
import MessagesScreen from './apps/screens/MessagesScreen';
import Screen from './apps/screens/Screen';
import ListItemSeparator from './apps/components/ListItemSeparator';
import ListItemDeleteAction from './apps/components/ListItemDeleteAction';
import  Swipeable  from 'react-native-gesture-handler/Swipeable';
import AccountScreen from './apps/screens/AccountScreen';
import ListItem from './apps/components/ListItem';
import Icon from './apps/components/Icon';
import colors from './apps/config/colors';
import ListingScreen from './apps/screens/ListingScreen';
import AppTextInput from './apps/components/AppTextInput';
import AppPicker from './apps/components/AppPicker';
import AppText from './apps/components/AppText';
import LoginScreen from './apps/screens/LoginScreen';
import WelcomeScreen2 from './apps/screens/WelcomeScreen2';
import ListingEditScreen from './apps/screens/ListingEditScreen';
import ImageInput from './apps/components/ImageInput';
import ImageInputList from './apps/components/ImageInputList';


export default function App() {

  return(

    <ListingEditScreen/>
    
   
    
  );
  }

