import React, { useEffect, useState } from 'react';
import { StyleSheet,View,FlatList } from 'react-native';


import Screen from './Screen';
import Card from '../components/Card';
import colors from '../config/colors';
import route from '../navigation/route';
import listingApi from '../api/listings'





function ListingScreen({navigation}) {


    
const [listings,setListings] = useState([]);
const [error,setError] = useState(false);

useEffect(() =>{
    loadListings();

},[])


const loadListings = async () => {
    const response = await listingApi.getListings();

    if (!response.ok)
        return setError(true);

    setError(false);
    setListings(response.data);
    
}


    return (
        <Screen style={styles.screen}>
             {error && <>
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <AppText>Couldn't retrieve posts from server</AppText>
            <View style={{padding:10}}>
            <AppButtons title='Retry' onPress={loadListings} color='grey'/>
            </View>

            </View>
            </>}

            <FlatList 
            data={listings}
            keyExtractor={listings => listings.id.toString() }
            renderItem={({item}) =>
             <Card title={item.title} 
             subtitle={'Ghc '+ item.price} 
             imageUrl ={item.images[0].url}
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


