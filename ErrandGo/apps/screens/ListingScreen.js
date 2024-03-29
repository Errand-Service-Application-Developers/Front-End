import React, { useEffect, useState } from 'react';
import { StyleSheet,View,FlatList } from 'react-native';


import Screen from './Screen';
import Card from '../components/Card';
import colors from '../config/colors';
import route from '../navigation/route';
import listingApi from '../api/listings';
import AppText from '../components/AppText';
import AppButtons from '../components/AppButtons';
import ActivityIndicator from '../components/ActivityIndicator';





function ListingScreen({navigation}) {


    
const [listings,setListings] = useState([]);
const [error,setError] = useState(false);
const [loading,setLoading] = useState(false);
const [refreshing,setRefreshing] = useState(false);

useEffect(() =>{
    loadListings();

},[])


const loadListings = async () => {
    setLoading(true);
    const response = await listingApi.getListings();
    setLoading(false);

    if (!response.ok)
        return setError(true);

    setError(false);
    setListings(response.data);
    
}

    return (
    <>
        <ActivityIndicator visible ={loading} />
        <Screen style={styles.screen}>
             {error && <>
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <AppText>Couldn't retrieve posts from server</AppText>
            <View style={{padding:10}}>
            <AppButtons title='Retry' onPress={loadListings} color='primary'/>
            </View>

            </View>
            </>}

            

            <FlatList 
            data={listings}
            keyExtractor={listings => listings.id.toString() }
            renderItem={({item}) => 
                <Card title={item.title}
                subtitle={'Ghc '+item.price} 
                imageUrl= {(item.image_url)}
                postTime={item.date_created}
                onPress={()=>navigation.navigate(route.LISTING_DETAILS,item)} /> 
           
            }
            refreshing = {refreshing}
            onRefresh={ ()=> {loadListings();}}
            
            /> 

       


        </Screen>
</>
       
    );
}



const styles = StyleSheet.create({
    screen:{
        backgroundColor:colors.light,
        padding:15,
        
    }
    
})

export default ListingScreen;


