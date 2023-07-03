import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet,View,FlatList } from 'react-native';
import  Constants from 'expo-constants';


import Screen from './Screen';
import ListItem from '../components/ListItem';
import colors from '../config/colors';
import ListItemSeparator from '../components/ListItemSeparator';
import Icon from '../components/Icon';
import route from '../navigation/route';
import AuthContext from '../auth/context';
import authStorage from '../auth/storage';
import useCurrentUser from '../hooks/useCurrentUser';


const menuItems = [
    {title:"My tasks",
     icon:{
        name: "format-list-bulleted",
        backgroundColor: colors.primary
     }},
     {title:"My Messages",
     icon:{
        name: "email",
        backgroundColor: colors.secondary
     },
    targetScreen:route.MESSAGES
    }

]

function AccountScreen({navigation}) {
   const {user,setUser} = useContext(AuthContext);
   const user_id = user.user_id;

   const currentUser = useCurrentUser(user_id);


    const handleLogOut = () => {
        setUser(null);
        authStorage.removeToken();
    }


    return (

        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem title={currentUser.username}  subtitle={currentUser.email} image={require('../assets/woman.jpg')} showChevrons/>
            </View>


                <View style={{marginVertical:20}}>
                    
                <FlatList  
                data={menuItems} 
                keyExtractor={menuItem => menuItem.title}
                renderItem={({item}) => <ListItem 
                title={item.title} 
                showChevrons
                IconComponent= { <Icon name={item.icon.name} size={45} backgroundColor={item.icon.backgroundColor} />}   
                onPress={()=> navigation.navigate(item.targetScreen)}/> }  
                ItemSeparatorComponent={ListItemSeparator}/>

                </View>

            


           

              <ListItem title='Log Out' 
              IconComponent={<Icon name='logout'
              backgroundColor='#ffe66d' size={45}/>}
              onPress={handleLogOut}/>

       
            


           





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

