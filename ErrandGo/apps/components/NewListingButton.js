import React from 'react';
import { StyleSheet,View,TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons'

function NewListingButton({onPress}) {
   return (
    <TouchableOpacity onPress={onPress}>

      <View style={styles.container}>
        <MaterialCommunityIcons name='plus-circle' color={colors.white} size={36} />

      </View>
    </TouchableOpacity>
   );
}


const styles = StyleSheet.create({
    container:{
        height:80,
        width: 80,
        borderRadius: 40,
        backgroundColor: colors.primary,
        bottom: 20,
        borderColor: colors.white,
        borderWidth: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },


})


export default NewListingButton;