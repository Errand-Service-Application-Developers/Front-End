import React from 'react';
import { StyleSheet,View,Text } from 'react-native';

import { Image } from 'react-native-expo-image-cache';

import AppText from '../components/AppText';
import colors from '../config/colors';


function UserHistoryItemDetails({ route }) {
    const listing = route.params
    
    
    return (
        <View>
             <Image style={styles.image} uri={ listing.image_url}/>
             <View style={styles.detailscontainer}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                    <AppText style={styles.title}>{listing.title}</AppText>
                    </View>
                <AppText style={styles.price}>Ghc {listing.price}</AppText>
                </View>
                <Text style={styles.description}>{listing.description}</Text>

            

            </View>

        </View>
        
    );
}

export default UserHistoryItemDetails;

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height:'70%',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
   

    },
    detailscontainer:{
        padding: 10
        
    },
    title: {
        marginBottom:15,
        color: colors.black,
        fontWeight: 'bold'
    },
    price:{
        color:colors.primary,
        fontWeight: 'bold',
    },
    description:{
        fontWeight: '300',
        color: colors.grey,
        textAlign:'left',

    },
    itemcontainer: {
        marginVertical: 40
    },
    contact:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        gap: 10
        
    },
    phone:{
        fontSize: 15,
        fontWeight: '500',
    
    }

    
})