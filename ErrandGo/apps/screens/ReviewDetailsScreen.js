import React, { useState } from 'react';
import { StyleSheet,Text,TextInput,View,FlatList} from 'react-native';



import Screen from './Screen';
import colors from '../config/colors';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReplyItem from '../components/ReplyItem';
import ListItemSeparator from '../components/ListItemSeparator';
import screenRoute from '../navigation/route';


function ReviewDetailsScreen({route,navigation}) {

   const [refreshing,setRefreshing] = useState(false);

   const review = route.params

   const [replies,setReplies] = useState([]);

   return (
    <Screen>
        <View style={styles.container}>
        <Text style={{fontSize:14,color:colors.grey,fontWeight:'500'}}>
        Comment: {review.message}
        </Text>
       
        <View style={{flexDirection:'row',paddingTop: 5}}>
              <Text style={styles.postTime}>{moment(review.date_created).format('dddd')}</Text>
              <Text style={styles.postTime}>@{moment(review.date_created).format('HH:mm a')}</Text>     
        </View>
        <Text style={{color: colors.primary}} onPress={()=> navigation.navigate(screenRoute.NEW_REPLY,review)}>reply here</Text>


        <Text style={styles.email} onPress={()=> setReplies(review.replies)}>show replies</Text>

        <FlatList 
            data={replies}
            keyExtractor={reply => reply.id.toString() }
            renderItem={({item}) => 
                <ReplyItem 
                message={item.reply}
                replier={item.user.username} 
                time= {item.date_created}
                /> 
            }
            ItemSeparatorComponent={ListItemSeparator}
            refreshing = {refreshing}
            onRefresh={ ()=> console.log("wait")}
            
            /> 
                
        </View>
    </Screen>
     
   );
}


const styles = StyleSheet.create({

    text:{
        marginBottom: 10,
        fontSize: 14,
        color: colors.grey

    },
    postTime:{
        fontSize: 14,
        color: colors.grey,
        marginBottom: 10
    },
    container:{
        paddingLeft: 10,
       

    },
    email:{
        marginBottom: 10,
        paddingTop: 20,
        fontSize: 14,
        color: '#337AB7'
    }



})


export default ReviewDetailsScreen;