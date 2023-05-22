//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import WelcomeScreen from './apps/screens/WelcomeScreen';
import Card from './apps/components/Card';
import ListingDetailsScreen from './apps/screens/ListingDetailsScreen';
import MessagesScreen from './apps/screens/MessagesScreen';
import Screen from './apps/screens/Screen';
import ListItemSeparator from './apps/components/ListItemSeparator';
import ListItemDeleteAction from './apps/components/ListItemDeleteAction';
import  Swipeable  from 'react-native-gesture-handler/Swipeable';

export default function App() {
  console.log('App Executed');

  return(
    <MessagesScreen/>
    
  );
}


//<ListingDetailsScreen title='Buy Me Food From Campus' subtitle='$20' image={require('./apps/assets/woman.jpg')} />
