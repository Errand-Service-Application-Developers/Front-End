import React from 'react';
import { StyleSheet,View,Image,Text } from 'react-native';


import AppText from '../components/AppText';
import colors from '../config/colors';
import ListItem from '../components/ListItem';

function ListingDetailsScreen({image,title,subtitle}) {
    return (
        <View>
             <Image style={styles.image} source={image}></Image>
             <View style={styles.detailscontainer}>
             <AppText style={styles.title}>{title}</AppText>
             <AppText style={styles.subtitle}>{subtitle}</AppText>
             <View style={styles.itemcontainer}>
             <ListItem image={require('../assets/man.png')} title='Pinto Aaron' subtitle='8 tasks' />

             </View>
            

            </View>

        </View>
        
    );
}

export default ListingDetailsScreen;

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height:300,

    },
    detailscontainer:{
        padding: 12
    },
    title: {
        marginBottom:10
       
    },
    subtitle:{
        color:colors.secondary,
        fontWeight: 'bold',
        

    },

    itemcontainer: {
        marginVertical: 40
    },

    
})