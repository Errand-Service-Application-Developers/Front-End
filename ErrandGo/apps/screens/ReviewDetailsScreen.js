import React from 'react';
import { StyleSheet,Text,TextInput,View, } from 'react-native';
import Screen from './Screen';
import colors from '../config/colors';
import moment from 'moment';


function ReviewDetailsScreen({route}) {

   const review = route.params
   return (
    <Screen>
        <View style={styles.container}>
        <TextInput multiline = {true} readOnly = {true} numberOfLines={3} style={{fontSize:14,color:colors.grey}}>
        Comment: {review.message}
        </TextInput>
       
        <View style={{flexDirection:'row'}}>
              <Text style={styles.postTime}>Time:</Text>
              <Text style={styles.postTime}> {moment(review.date_created).format('dddd')}</Text>
              <Text style={styles.postTime}>@{moment(review.date_created).format('HH:mm a')}</Text>

              
        </View>
    

        <Text style={styles.text}>By: {review.user.username}</Text>
        <Text style={styles.text}>contact: {review.user.phone}</Text>
        <Text style={styles.email}>Email: {review.user.email}</Text>

        
        


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
        paddingRight: 5,
        fontSize: 14,
        color: colors.grey,
        marginBottom: 10
    },
    container:{
        paddingLeft: 6,

    },
    email:{
        marginBottom: 10,
        fontSize: 14,
        color: colors.secondary
    }



})


export default ReviewDetailsScreen;