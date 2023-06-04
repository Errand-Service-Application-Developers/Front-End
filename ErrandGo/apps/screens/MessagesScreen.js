import React,{ useState} from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import  Constants  from 'expo-constants';


import ListItem from '../components/ListItem';
import Screen from './Screen';


import ListItemSeparator from '../components/ListItemSeparator';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import colors from '../config/colors';


const userMessages = [
    { 
        id: 1,
        title: 'First title',
        description: 'First description, so you took the rice and rode away tosky leaving the ball in the floor after the church so that the voting should be done on where',
        image: require('../assets/man.png')
    },
    { 
        id: 2,
        title: 'Second title',
        description: 'Second description,machala and the beast is going to repressnt Ghana at the total womens program this coming friday o thursday so prepare for d day',
        image: require('../assets/mosh.jpg')
    },
    { 
        id: 3,
        title: 'Third title',
        description: 'Ibrahim Lincoln once said, Democracy is for the people, by the people and with the people. So stop autocracy and adopt decomcracy',
        image: require('../assets/mosh.jpg')
    },
    { 
        id: 4,
        title: 'fourth title',
        description: 'fourth description',
        image: require('../assets/woman.jpg')
    },
    
    

]


function MessagesScreen(props) {

    const [messages,setMessages]= useState(userMessages);
    const [refreshing,setrefreshing] = useState(false);





    const handledelete = message => {
        //delete message from list
        const newMessages =  messages.filter(m => m.id !== message.id)
        setMessages(newMessages)

    }





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
            showChevrons
            onPress={()=> console.log('Message clicked',item)} 
            renderRightActions={()=> <ListItemDeleteAction onPress={()=> handledelete(item)}/>}  />)}

        ItemSeparatorComponent={ ListItemSeparator }
        refreshing = {refreshing} 
        onRefresh={ () => {setMessages
        ([ {id:5,
            title: 'NEW TITLES YET TO COME',
            description:'all new messages will be displayed here in the future when we connect to the server',
            image: require('../assets/mosh.jpg') }])}}   />

        </Screen>
        

       

        
       
        
    );
}


const styles = StyleSheet.create({
    container:{
        paddingTop: Constants.statusBarHeight
    }
})




export default MessagesScreen;