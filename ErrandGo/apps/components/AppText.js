import React from 'react';
import { Platform,Text , StyleSheet} from 'react-native';

function AppText({children}) {
    return (
        <Text style={styles.text}>{children}</Text>
    );
}

export default AppText;


const styles = StyleSheet.create({
    text:{
        fontSize: 19,
        fontWeight: '500',
        fontFamily: Platform.OS === 'ios' ? 'Avenir':'Roboto'
    }
    
})