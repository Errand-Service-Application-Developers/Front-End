import React from 'react';
import { StyleSheet,View,Text } from 'react-native';
import { Image} from 'react-native-expo-image-cache'


import AppText from '../components/AppText';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import useCurrentUser from '../hooks/useCurrentUser';

function ListingDetailsScreen({ route }) {
    const listing = route.params
    const poster = useCurrentUser(listing.user_id);

    return (
        <View>
             <Image style={styles.image} uri={(listing.images[0]? "http://192.168.43.173:8000"+listing.images[0].url : "http://192.168.43.173:8000/media/help.jpg")}/>
             <View style={styles.detailscontainer}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                    <AppText style={styles.title}>{listing.title}</AppText>
                    </View>
                <AppText style={styles.price}>Ghc {listing.price}</AppText>
                </View>
                <Text style={styles.description}>{listing.description}</Text>
             <View style={styles.itemcontainer}>
             <ListItem image={require('../assets/mosh.jpg')} title={poster.username} subtitle={poster.post_count + " tasks"} showChevrons />

             </View>
            

            </View>

        </View>
        
    );
}

export default ListingDetailsScreen;

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height:'45%',

    },
    detailscontainer:{
        padding: 12,
        
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

    
})