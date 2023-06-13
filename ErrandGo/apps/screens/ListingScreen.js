import React from 'react';
import { StyleSheet,View,FlatList } from 'react-native';


import Screen from './Screen';
import Card from '../components/Card';
import colors from '../config/colors';
import route from '../navigation/route';



const listings = [

    {
     id:1,
     title:'Pick an item for me',
     price: '500',
     image: require('../assets/couch.jpg'),
     description: 'I  kinda need someone to take a package to a friend at tech junction'
    },
    {
     id:2,
     title:'Laundry',
     price: '100',
     image: require('../assets/jacket.jpg'),
     description: 'This is the first time I am working with this project'
    }
]

function ListingScreen({navigation}) {
    return (
        <Screen style={styles.screen}>

            <FlatList 
            data={listings}
            keyExtractor={listings => listings.id.toString() }
            renderItem={({item}) =>
             <Card title={item.title} 
             subtitle={'Ghc '+ item.price} 
             image={item.image}
             onPress={()=>navigation.navigate(route.LISTING_DETAILS,item)} /> } 
            />


        </Screen>
       
    );
}



const styles = StyleSheet.create({
    screen:{
        backgroundColor:colors.light,
        padding:15,
        
    }
    
})

export default ListingScreen;


