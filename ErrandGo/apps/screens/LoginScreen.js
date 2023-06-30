import React, { useContext, useState } from 'react';
import { StyleSheet, View ,Image,Text} from 'react-native';
import jwtDecode from 'jwt-decode';
import * as Yup from 'yup';




import defaultStyles from '../config/styles';
import {AppForm,AppFormField,SubmitButton,ErrorMessage} from '../components/forms'
import colors from '../config/colors';
import authApi from '../api/auth';
import AuthContext from '../auth/context';


const validationSchema = Yup.object().shape(
    {
        username: Yup.string().required().min(5).label('Username'),
        password: Yup.string().required().min(5).label('Password'),

    }
)

function LoginScreen({navigation}) {

    const authContext = useContext(AuthContext);
    const [loginFailed,setLoginFailed] = useState(false);


    const handleSubmit = async (loginInfo,actions) => {
        const result = await authApi.login(loginInfo.username,loginInfo.password);

        if (!result.ok){
            return setLoginFailed(true);
        }
        
        setLoginFailed(false);
        access_token = result.data['access']
        const user = jwtDecode(access_token);
        authContext.setUser(user);
        

    actions.resetForm();
    }




    return (
        <View>

        
            <View style={styles.container}>
               
                 <Image style={styles.logo} source={require('../assets/logo.png')}/>
               
            </View>
            <View style={{flexDirection:'row', padding:20,marginBottom:10}}>
                <Text style={{fontStyle:'italic',color:colors.grey}}>Don't have an account? </Text>
                <Text style={{ color:colors.primary}} onPress={()=> navigation.navigate("Register")}>Sign Up </Text>
            </View>

            <View style={styles.formContainer}>
            

            <AppForm
            initialValues={{ username:"", password:""}}
            onSubmit={handleSubmit}  
            validationSchema={validationSchema} >

                <ErrorMessage error="Invalid username or password" visible={loginFailed}/>
                <AppFormField
                style={styles.Textinput}
                name="username"
                icon='account'
                placeholder='Username'
                autoCapitalize='none'
                autoCorrect={false}
                
                />

                <AppFormField
                style={styles.Textinput}
                name="password"
                icon='lock'
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false}
                textContentType='password'
                secureTextEntry
                />

                <SubmitButton title="Login"/>

            </AppForm>
                


            </View>
        
      </View>
 
       
    );
}



const styles = StyleSheet.create({

    container:{
        width: '100%',
        height: '35%',
        backgroundColor: defaultStyles.colors.secondary,
        marginBottom: 10,
        borderBottomLeftRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        
      

    },

    formContainer:{
        padding: 10

    },
    logo:{
        width:260,
        height: 120,
        alignSelf: 'center',

    },
    Textinput:{
        borderWidth:1,
        borderColor: defaultStyles.colors.secondary

    }

   
    
})


export default LoginScreen;