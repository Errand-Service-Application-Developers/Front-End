import React,{ useState} from 'react';
import { FlatList, StyleSheet } from 'react-native';
import  Constants  from 'expo-constants';


import ListItem from '../components/ListItem';
import Screen from './Screen';
import screenRoute from '../navigation/route';

import ListItemSeparator from '../components/ListItemSeparator';

function MessagesScreen({navigation,route}) {

    
    const reviews = route.params


    return (
        <Screen>
        
        <FlatList  
        data={reviews}
        keyExtractor={review => review.id.toString()}
        renderItem={({ item }) =>
         (<ListItem 
            title={item.user.username} 
            subtitle={item.message} 
            onPress={()=> navigation.navigate(screenRoute.REVIEW_DETAILS, item)} 
            showChevrons
        />)}

        ItemSeparatorComponent={ ListItemSeparator }
        />

        </Screen>
        
       
        
    );
}


const styles = StyleSheet.create({
    container:{
        paddingTop: Constants.statusBarHeight
    }
})




export default MessagesScreen;