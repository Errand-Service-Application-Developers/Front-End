import React,{useState,useEffect} from 'react';
import { StyleSheet,View,} from 'react-native';
import  Constants from 'expo-constants';


import Screen from './Screen';
import ListItem from '../components/ListItem';
import colors from '../config/colors';
import ListItemSeparator from '../components/ListItemSeparator';
import Icon from '../components/Icon';
import screenRoute from '../navigation/route';
import useCurrentUser from '../hooks/useCurrentUser';
import useAuth from '../hooks/useAuth';
import listingsApi from '../api/listings';
import ListItemDeleteAction from '../components/ListItemDeleteAction';



function AccountScreen({navigation}) {
   const {user,logout} = useAuth();

   const currentUser = useCurrentUser(user.user_id);

   const [reviews,setReviews] = useState([]);

    useEffect(() =>{
     loadReviews();

    },[])


    const loadReviews = async () => {
        const response = await listingsApi.getUserReviews(user.user_id);
        setReviews(response.data);

    }

    return (

        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem title={currentUser.username}  subtitle={currentUser.email} image={require('../assets/profile.jpg')} />
            </View>


                <View style={{marginVertical:20}}>

                <ListItem
                title={"My tasks"} 
                IconComponent={<Icon name='format-list-bulleted' size={45} backgroundColor={colors.primary}/>}
                showChevrons
                onPress={()=> navigation.navigate(screenRoute.USER_HISTORY,currentUser)}
                />
                <ListItemSeparator/>
                <ListItem
                title={"My reviews"} 
                IconComponent={<Icon name='email' size={45} backgroundColor={colors.secondary}/>}
                showChevrons
                onPress={()=>navigation.navigate(screenRoute.MESSAGES,{'reviews': reviews})}
                />

                </View>
           

              <ListItem title='Log Out' 
              IconComponent={<Icon name='logout'
              backgroundColor='#ffe66d' size={45}/>}
              onPress={()=>logout()}/>

       
            


           





        </Screen>
        
    );
}



const styles = StyleSheet.create({
    container:{
    
        backgroundColor: colors.white,
        width: '100%',
        marginBottom: 20,
    },
    screen:{
        paddingTop: Constants.statusBarHeight ,
        backgroundColor: colors.light
    },
    
})

export default AccountScreen;

