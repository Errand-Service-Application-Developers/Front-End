import React, { useState } from 'react';
import { StyleSheet,View,Text,TouchableOpacity } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import Constants  from 'expo-constants';



import AppText from '../components/AppText';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import useCurrentUser from '../hooks/useCurrentUser';
import screenRoute from '../navigation/route';
import TaskAcceptButton from '../components/TaskAcceptButton';
import TaskStatusButton from '../components/TaskStatusButton';
import listingsApi from '../api/listings';

function ListingDetailsScreen({ navigation,route }) {

    const {user} = useAuth();


    const [request, setRequest] = useState(" ACCEPT ");
    const listing = route.params
    const poster = useCurrentUser(listing.user_id);
    const status = listing.task_status
    
  
    const handleRequest = async () => {
        if ( status === 'COMPLETED')
           return;
        else if ( status === 'IN PROGRESS')
           return;


        await listingsApi.makeRequest(listing.id,listing.user_id)
        setRequest("REQUEST SENT");
        



    }
    return (
        <View style={styles.screen}>
             <Image style={styles.image} uri={ listing.image_url }/>
             <View style={styles.detailscontainer}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                    <AppText style={styles.title}>{listing.title}</AppText>
                    </View>
                <AppText style={styles.price}>Ghc {listing.price}</AppText>
                </View>
                <Text style={styles.description}>{listing.description}</Text>

            <View style={{marginBottom:8, marginTop: 8}}>
                <TaskStatusButton title={status}/>
            </View>

            <View style={{flexDirection: 'row',alignContent:'center',alignItems:'center'}}>


           <View style={{flex: 1}}>
            <TouchableOpacity onPress={()=>navigation.navigate(screenRoute.MESSAGES,{'reviews':listing.reviews,'item_id':listing.id})}>
                <Text style={{fontSize: 17,color:colors.primary,paddingLeft: 5,fontWeight: '400'}}>Reviews</Text>
            </TouchableOpacity>
            </View>
            
            {
             user.user_id === poster.id ?
             null :
            <View style={styles.AcceptButton}>
            <TaskAcceptButton title={request} onPress={()=> handleRequest()}/>
            </View>
            }

            </View>

            </View>
             <View style={styles.itemcontainer}>
             <ListItem image={require('../assets/profile.jpg')} title={poster.username}
             subtitle={poster.post_count + " tasks"} 
             showChevrons 
             style={styles.style}
             onPress={()=>navigation.navigate(screenRoute.USER_HISTORY,poster)} />

             </View>


            


        </View>
        
    );
}

export default ListingDetailsScreen;

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height:'40%',

    },
    detailscontainer:{
        padding: 5
        
    },
    title: {
        marginBottom:15,
        color: colors.black,
        fontWeight: 'bold'
    },
    price:{
        color:colors.primary,
        fontWeight: 'bold',
    },
    description:{
        fontWeight: '300',
        color: colors.grey,
        textAlign:'left',

    },
    itemcontainer: {
        marginVertical: 10
    },
    phone:{
        fontSize: 15,
        fontWeight: '500',
    
    },
    screen:{
        backgroundColor: colors.light,
        flex: 1
    },
    separator:{
        backgroundColor: '1B1BC#9',  
        marginTop: 3
    },
    reviews:{
        width: '40%',
        justifyContent:'center',
        marginTop: 20,
       
    },
    style:{
        borderRadius: 25,
    },
    design:{
        width: '100%',
        height: Constants.statusBarHeight + Constants.statusBarHeight + Constants.statusBarHeight,
        backgroundColor: colors.primary,
        justifyContent:'flex-end',
        alignItems:'center',

    },
    contact:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        gap: 10
        
    },
    phone:{
        fontSize: 15,
        fontWeight: '500',
    
    },
    AcceptButton:{
        width: '50%',

    }
   
})