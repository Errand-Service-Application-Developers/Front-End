import React from 'react';
import { StyleSheet,View,TouchableWithoutFeedback,Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'react-native-expo-image-cache';
import moment from 'moment';
import Swipeable from 'react-native-gesture-handler/Swipeable';



import colors from '../config/colors';
import AppText from './AppText';

function CardWithDelete({title,subtitle,imageUrl,onPress,postTime, renderRightActions,onLongPress}) {
    return (
        <Swipeable renderRightActions={renderRightActions}>

        <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
        <View style={styles.card}>
            <Image style={styles.image} uri={imageUrl}/>
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
        </Swipeable>
    );
}

export default CardWithDelete;

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
        padding: 25
    },
    title:{
        marginBottom:12
    },
    subtitle:{
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 15,
        flex:1,
        marginTop: 6

    },
    postTime:{
        paddingRight: 5,
        fontSize: 12,
        color: colors.grey
    }

})