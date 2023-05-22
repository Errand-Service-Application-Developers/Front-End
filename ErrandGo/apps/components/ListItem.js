import React from 'react';
import { StyleSheet,View,Image,Text, TouchableHighlight } from 'react-native';
import  Swipeable from 'react-native-gesture-handler/Swipeable';


import AppText from './AppText';
import colors from '../config/colors';

function ListItem({image,title,subtitle,onPress,renderRightActions}) {
    return (
        <Swipeable renderRightActions={renderRightActions} >

          <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
            <View style={styles.container}>
            <Image style={styles.imagestyle} source={image} />
            <View>
              <AppText style={styles.title}>{title}</AppText>
              <AppText style={styles.subtitle}>{subtitle}</AppText>

            </View>

           </View>

        </TouchableHighlight>

        </Swipeable>
        
    );
}

export default ListItem;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        padding: 10
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