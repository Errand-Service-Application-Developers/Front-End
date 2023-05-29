import React from 'react';
import { StyleSheet,View,Image, SafeAreaView, Text } from 'react-native';
import Constants  from 'expo-constants';


import AppText from '../components/AppText';
import defaultStyles from '../config/styles';
import AppButtons from '../components/AppButtons';
import colors from '../config/colors';

function WelcomeScreen2(props) {
    return (
        <SafeAreaView style={styles.screen}>
            <Image style={styles.imagecontainer} source={require('../assets/GIRL.jpg')}></Image>

            <View style={styles.container}>
                <View style ={{ marginVertical: 20, justifyContent:'center', alignItems:'center'}}>
                 <AppText  style={styles.text}>HELP A FRIEND!</AppText>
                 <View style={styles.textContainer}>
                    <Text style={{color:defaultStyles.colors.blue}}>Just Post it and consider it done</Text>
                 </View>
                </View>
                <View style={styles.buttoncontainer}>
                <AppButtons title='Login'color='primary2'/>
                <AppButtons title='Register' color='secondary2'/>
            </View>
            </View>
            

        </SafeAreaView>
        
    );
}

export default WelcomeScreen2;

const styles = StyleSheet.create({
    imagecontainer:{
        width:'100%',
        height:'50%'

    },
    
    container:{

        justifyContent:'center',
        alignItems:'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent:'flex-end',
        backgroundColor: defaultStyles.colors.offwhite,
        marginVertical: 5

    },
   
    buttoncontainer:{
        
        borderRadius:10,
        padding: 20,
        width: "100%",
    },
    text:{
        fontSize:18,
        fontWeight: "bold",
        color: defaultStyles.colors.blue,
        fontStyle: 'italic',

    },
    textContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:15,
        

    },
    screen:{
        backgroundColor: defaultStyles.colors.blue, 
        flex:1,
        paddingTop: Constants.statusBarHeight

    }

})