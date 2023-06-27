import React from 'react';
import { StyleSheet,View,TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native-expo-image-cache'



import colors from '../config/colors';
import AppText from './AppText';

function Card({title,subtitle,imageUrl,onPress}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
            <Image style={styles.image} uri={imageUrl} />
            <View style={styles.detailscontainer}>
              <AppText style={styles.title} >{title}</AppText>
              <AppText style={styles.subtitle} >{subtitle}</AppText>
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
        fontSize: 15

    }
    
})