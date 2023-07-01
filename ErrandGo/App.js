import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'



import AuthNavigator from './apps/navigation/AuthNavigator';
import AppNavigator from './apps/navigation/AppNavigator';

import navigationTheme from './apps/navigation/navigationTheme';



import OfflineNotice from './apps/components/OfflineNotice';
import AuthContext from './apps/auth/context';
import authStorage from './apps/auth/storage';



export default function App() {

  console.log("App Executed")

  const [user,setUser] = useState();


  const restoreUser = async() => {
    const user = await authStorage.getUser();
    if (user) 
      setUser(user);
    
  }

  useEffect(()=>{
    restoreUser();

  },[]);

  

  return (

    <AuthContext.Provider value={{user, setUser}}>
    <OfflineNotice/>
    <NavigationContainer theme={navigationTheme}>
     {user? <AppNavigator/>: <AuthNavigator/>}
    </NavigationContainer>

    </AuthContext.Provider >
  );
  
}
 

