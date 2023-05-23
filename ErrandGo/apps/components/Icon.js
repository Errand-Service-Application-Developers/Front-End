import React from 'react';
import { StyleSheet,Text,View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'



import colors from '../config/colors';
import AppText from './AppText';

function Icon({name = 'email',size=40,backgroundColor='#000',iconColor='#fff'}) {
    return (
        <View style={{
            width:size,
            height:size,
            borderRadius:size/2,
            backgroundColor,
            justifyContent:'center',
            alignItems:'center'   }}> 

          <MaterialCommunityIcons name={name} size = {size/2} color={iconColor}/>

        </View>
       
        
    );
}




export default Icon;