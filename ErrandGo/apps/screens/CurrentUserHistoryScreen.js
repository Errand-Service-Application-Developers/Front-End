import React, { useEffect, useState } from 'react';
import { StyleSheet,View,FlatList } from 'react-native';

import Screen from './Screen';
import Card from '../components/Card';
import colors from '../config/colors';
import screenRoute from '../navigation/route';
import listingApi from '../api/listings';
import AppText from '../components/AppText';
import AppButtons from '../components/AppButtons';
import ActivityIndicator from '../components/ActivityIndicator';
import CardWithDelete from '../components/CardWithDelete';
import ListItemDeleteAction from '../components/ListItemDeleteAction';



function CurrentUserHistoryScreen({ navigation,route }) {

const user = route.params;

const [listings,setListings] = useState([]);
const [accept,SetAccept] = useState("ACCEPT")
const [error,setError] = useState(false);
const [loading,setLoading] = useState(false);
const [refreshing,setRefreshing] = useState(false);

useEffect(() =>{
    loadListings();

},[])



const loadListings = async () => {
    setLoading(true);
    const response = await listingApi.getUserOwnedRequests(user.id);
    setLoading(false);

    if (!response.ok)
        return setError(true);

    setError(false);
    setListings(response.data);

}

const handledelete = item => {
    setListings(listings.filter(m => m.id !== item.id))

    listingApi.deleteTask(item.id);

}

const handleDecline = request =>{
    setListings(listings.filter(m => m.id !== request.id))

    listingApi.deleteRequest(request.id);

}

const handleAccept = (request) =>{
    setListings(listings.filter(m => m.id !== request.id));

    listingApi.UpdateRequestStatus(request.id,"ACCEPTED");
    listingApi.UpdateTaskStatus(request.task.id,"IN PROGRESS");

    SetAccept("ACCEPTED")
    

}

   return (


    <Screen style={styles.screen}>
            {error && <>
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <AppText>Couldn't retrieve user posts from server</AppText>
            <View style={{padding:10}}>
            <AppButtons title='Retry' onPress={loadListings} color='primary'/>
            </View>

            </View>
            </>}

            <ActivityIndicator visible ={loading} />
            

            <FlatList 
            data={listings}
            keyExtractor={listings => listings.id.toString() }
            renderItem={({item}) => 
                <CardWithDelete title={item.task.title} 
                imageUrl= {item.task.image_url}
                task_status={ item.task.task_status}
                RequesterTitle={item.requester.username}
                Requestersubtitle={item.requester.phone}
                email={ item.requester.email}
                AcceptRequest={()=>handleAccept(item)}
                DeclineRequest={()=>handleDecline(item)}
                ACCEPTED={accept}
                onPress={()=>navigation.navigate(screenRoute.USER_TASK_DETAILS,item)} 
                renderRightActions={()=> (<ListItemDeleteAction onPress={()=> handledelete(item.task)}/>)}    /> 
           
            }
            refreshing = {refreshing}
            onRefresh={ ()=> {loadListings();}}
            
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


export default CurrentUserHistoryScreen;


