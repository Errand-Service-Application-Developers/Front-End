import React from 'react';
import { StyleSheet,View,Text } from 'react-native';
import { Image} from 'react-native-expo-image-cache';
import { MaterialCommunityIcons } from '@expo/vector-icons'


import AppText from '../components/AppText';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import useCurrentUser from '../hooks/useCurrentUser';
import screenRoute from '../navigation/route';
import ListItemSeparator from '../components/ListItemSeparator';

function ListingDetailsScreen({ navigation,route }) {
    const listing = route.params
    const poster = useCurrentUser(listing.user_id);

    return (
        <View style={styles.screen}>
             <Image style={styles.image} uri={(listing.images[0]? "http://192.168.43.173:8000"+listing.images[0].url : "http://192.168.43.173:8000/media/help.jpg")}/>
             <View style={styles.detailscontainer}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                    <AppText style={styles.title}>{listing.title}</AppText>
                    </View>
                <AppText style={styles.price}>Ghc {listing.price}</AppText>
                </View>
                <Text style={styles.description}>{listing.description}</Text>
            <View style={styles.reviews}>
                <Text style={{fontSize: 15,color:'#91B1BC'}}>Reviews </Text>
            </View>

            <View style={styles.contact}>
            <View>
                <MaterialCommunityIcons name='whatsapp' size={20} color = '#2AB318' />
            </View>
            <Text style={styles.phone}>{poster.phone}</Text>

            </View>
            </View>
            <ListItemSeparator style={styles.separator}/>
             <View style={styles.itemcontainer}>
             <ListItem image={require('../assets/profile.jpg')} title={poster.username}
             subtitle={poster.post_count + " tasks"} 
             showChevrons 
             onPress={()=>navigation.navigate(screenRoute.USER_HISTORY,poster)} />

             </View>
            


        </View>
        
    );
}

export default ListingDetailsScreen;

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height:'40%',

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
        marginVertical: 30
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
    
    },
    screen:{
        backgroundColor: colors.light,
        flex: 1
    },
    separator:{
        backgroundColor: '#91B1BC',  
        marginTop: 3
    },
    reviews:{
        width: '40%',
        justifyContent:'center',
        marginTop: 20,
       
    }

    
})