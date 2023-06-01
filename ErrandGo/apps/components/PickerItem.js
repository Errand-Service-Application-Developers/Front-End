import React from 'react';
import { TouchableOpacity,StyleSheet, View,Text } from 'react-native';
import ListItemSeparator from './ListItemSeparator';


function PickerItem({label,onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>

            <View style={styles.textContainer}>
            <ListItemSeparator/>

            <Text style={styles.text}>
                {label}
            </Text>
            

            </View>
        </TouchableOpacity>
      
    );
}



const styles = StyleSheet.create({
    text:{
        padding:8,
        fontSize:16,
        fontWeight: '600',
    
    },
    textContainer:{
        borderBottomColor: 'transparent',

    }
})

export default PickerItem;