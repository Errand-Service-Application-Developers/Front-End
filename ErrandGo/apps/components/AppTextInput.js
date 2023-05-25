import React from 'react';
import { StyleSheet,TextInput,View,Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'



import Screen from '../screens/Screen';
import defaultStyles from '../config/styles';

function AppTextInput({icon,...otherProps}) {
    return (
        <Screen>

        <View style={styles.container}> 

        {icon && <MaterialCommunityIcons style={styles.icon} name={icon} size={20} color={defaultStyles.colors.grey} />}


        <TextInput style={defaultStyles.text} {...otherProps}  />

        </View>
        </Screen>
    );
}



const styles = StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor:defaultStyles.colors.light,
        padding: 15,
        borderRadius:25,
        flexDirection:'row',
        marginVertical: 10,
        
    },

    icon:{
        marginRight:10,

    },
    

})


export default AppTextInput;
