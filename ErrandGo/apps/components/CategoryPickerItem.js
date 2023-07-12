import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';


import Icon from './Icon';

function CategoryPickerItem({item, onPress}) {
    return (

    <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
        <Icon backgroundColor={item.backgroundColor} name={item.icon} size={80}  />
        </TouchableOpacity>
        <Text style={styles.text}>{item.name}</Text>
    </View>
    );
}


const styles = StyleSheet.create({
    container:{
        paddingHorizontal:30,
        paddingVertical:18,
        alignItems: 'center',
        width:"33%"

    },
    text:{
        marginTop:5,
        fontWeight: "400",
        textAlign:"center",
        
    }
    
})
export default CategoryPickerItem;
