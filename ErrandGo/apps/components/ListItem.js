import React from 'react';
import { StyleSheet,View,Image,Text, TouchableHighlight } from 'react-native';
import  Swipeable from 'react-native-gesture-handler/Swipeable';


import AppText from './AppText';
import colors from '../config/colors';

function ListItem({image,title,subtitle,onPress,renderRightActions,IconComponent}) {
    return (
        <Swipeable renderRightActions={renderRightActions} >

          <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
            <View style={styles.container}>
            {IconComponent}    
            {image && <Image style={styles.imagestyle} source={image} />}
            <View style={styles.detailsContainer}>
              <AppText style={styles.title}>{title}</AppText>
              {subtitle && <AppText style={styles.subtitle}>{subtitle}</AppText>}

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

    detailsContainer:{

        marginLeft: 10,
        justifyContent: 'center'
    },

    imagestyle:{
        width:70,
        height:70,
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