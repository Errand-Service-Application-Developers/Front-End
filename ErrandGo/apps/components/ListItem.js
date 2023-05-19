import React from 'react';
import { StyleSheet,View,Image,Text } from 'react-native';


import AppText from './AppText';
import colors from '../config/colors';

function ListItem({image,title,subtitle}) {
    return (
        <View style={styles.container}>
            <Image style={styles.imagestyle} source={image} />
            <View>
              <AppText style={styles.title}>{title}</AppText>
              <AppText style={styles.subtitle}>{subtitle}</AppText>

            </View>

        </View>
        
    );
}

export default ListItem;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
    },

    imagestyle:{
        width:70,
        height:70,
        marginRight:10,
        borderRadius: 35
    },

    title:{
        marginBottom:8,
        fontWeight: '500',
        fontSize: 17

    },
     
    subtitle: {
        color: colors.grey,
        fontSize: 14,
    },
    
})