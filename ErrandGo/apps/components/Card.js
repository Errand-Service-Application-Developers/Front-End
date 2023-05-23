import React from 'react';
import { StyleSheet,View,Image } from 'react-native';



import colors from '../config/colors';
import AppText from './AppText';

function Card({title,subtitle,image}) {
    return (
        <View style={styles.card}>
            <Image style={styles.image} source={image} />
            <View style={styles.detailscontainer}>
              <AppText style={styles.title}>{title}</AppText>
              <AppText style={styles.subtitle}>{subtitle}</AppText>
            </View>

        </View>
        
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
        height: 160,
    },
    detailscontainer:{
        padding: 15
    },
    title:{
        marginBottom:8
    },
    subtitle:{
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: 15

    }
    
})