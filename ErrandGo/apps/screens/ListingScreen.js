import React from 'react';
import { StyleSheet,View,FlatList } from 'react-native';


import Screen from './Screen';
import Card from '../components/Card';
import colors from '../config/colors';



const listings = [

    {
     id:1,
     title:'Pick an item for me',
     price: '500',
     image: require('../assets/couch.jpg')  
    },
    {
     id:2,
     title:'Laundry',
     price: '100',
     image: require('../assets/jacket.jpg')  
    }
]

function ListingScreen(props) {
    return (
        <Screen style={styles.screen}>

            <FlatList 
            data={listings}
            keyExtractor={listings => listings.id.toString() }
            renderItem={({item}) => <Card title={item.title} subtitle={'$'+ item.price} image={item.image} /> } 
            />


        </Screen>
       
    );
}



const styles = StyleSheet.create({
    screen:{
        backgroundColor:colors.light,
        padding:15,
        flex:1
    }
    
})

export default ListingScreen;


