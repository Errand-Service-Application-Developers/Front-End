import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import  Constants  from 'expo-constants';


import ListItem from '../components/ListItem';
import Screen from './Screen';


import ListItemSeparator from '../components/ListItemSeparator';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import colors from '../config/colors';


function MessagesScreen(props) {
    

    const messages = [
        { 
            id: 1,
            title: 'First title',
            description: 'First description',
            image: require('../assets/man.png')
        },
        { 
            id: 2,
            title: 'Second title',
            description: 'Second description',
            image: require('../assets/mosh.jpg')
        }
    ]



    return (
        <Screen>
        
        <FlatList  
        data={messages}
        keyExtractor={message => message.id.toString()}
        renderItem={({ item }) =>
         (<ListItem 
            title={item.title} 
            subtitle={item.description} 
            image={item.image} 
            onPress={()=> console.log('Message clicked',item)} 
            renderRightActions={ListItemDeleteAction}  />)}

        ItemSeparatorComponent={ ListItemSeparator }/>

        </Screen>
        

       

        
       
        
    );
}


const styles = StyleSheet.create({
    container:{
        paddingTop: Constants.statusBarHeight
    }
})




export default MessagesScreen;