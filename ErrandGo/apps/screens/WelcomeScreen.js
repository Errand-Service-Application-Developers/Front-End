import React from 'react';
import { Image, ImageBackground,StyleSheet, Text, View } from 'react-native';


import AppButtons from '../components/AppButtons';

function WelcomeScreen(props) {
    return (
        <ImageBackground style={styles.background} source={require('../assets/background.jpg')}>
            <View style={styles.logoContainer}>

                <Image style={styles.logo} source={require('../assets/logo-red.png')} />
                <Text style={styles.tagline}> Let Me Do It </Text>
               
                
            </View>

            <View style={styles.buttoncontainer}>
                <AppButtons title='Login' />
                <AppButtons title='register' color='secondary' />
            </View>




        </ImageBackground>
       
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center',


    },

    logo:{
        width:100,
        height:100,
    },

    logoContainer:{
        position: 'absolute',
        top:70,
        alignItems: 'center',   
    

    },

    buttoncontainer:{
        width:'100%',
        padding: 20

    },
    tagline:{
        fontSize:20,
        fontWeight:'600',
        paddingTop: 10,
    },

    
})

   
    

    
