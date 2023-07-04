import React from 'react';
import { StyleSheet,View,TouchableWithoutFeedback,Text } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import moment from 'moment';



import colors from '../config/colors';
import AppText from './AppText';

function Card({title,subtitle,imageUrl="http://192.168.43.173:8000/media/help.jpg",onPress,postTime}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
            <Image style={styles.image} uri={imageUrl} />
            <View style={styles.detailscontainer}>
              <AppText style={styles.title} >{title}</AppText>
              <View style = {{flexDirection:'row'}}>
              
              <AppText style={styles.subtitle} >{subtitle}</AppText>
              
              <View style={{flexDirection:'row', alignContent:'center', alignItems:'center',justifyContent:'center'}}>
              <Text style={styles.postTime}> {moment(postTime).format('dddd')}</Text>

              <MaterialCommunityIcons name='timelapse' color={colors.grey}/>
              <Text style={styles.postTime}> {moment(postTime).format('HH:mm a')}</Text>

              </View>

              </View>
            </View>

        </View>
        
        </TouchableWithoutFeedback>
    );
}

export default Card;

const styles = StyleSheet.create({
    card:{
        backgroundColor: colors.white,
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: 10
    },
    image:{
        width:'100%',
        height: 150,
    },
    detailscontainer:{
        padding: 15
    },
    title:{
        marginBottom:8
    },
    subtitle:{
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 15,
        flex:1

    },
    postTime:{
        paddingRight: 5,
        fontSize: 12,
        color: colors.grey
    }

})