import React,{ useState} from 'react';
import { FlatList, StyleSheet,View } from 'react-native';
import  Constants  from 'expo-constants';


import ListItem from '../components/ListItem';
import Screen from './Screen';
import screenRoute from '../navigation/route';

import ListItemSeparator from '../components/ListItemSeparator';
import colors from '../config/colors';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import listings from '../api/listings';

function UserMessagesScreen({navigation,route}) {

    
    
    const values = route.params;
    const userReviews = values['reviews']
    const [reviews,SetReviews]  = useState(userReviews);

    const handledelete = msg => {
        SetReviews(reviews.filter(m => m.id !== msg.id))

        listings.deleteReview(msg.item_id,msg.id);


    }

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
            renderRightActions={()=> (<ListItemDeleteAction onPress={()=> handledelete(item)}/>)}
        />)}

        ItemSeparatorComponent={ ListItemSeparator }
        />
        </Screen>
        
       
        
    );
}


const styles = StyleSheet.create({
    container:{
        paddingTop: Constants.statusBarHeight
    },
    displayStyle:{
        backgroundColor: colors.white
    }
 
})




export default UserMessagesScreen;