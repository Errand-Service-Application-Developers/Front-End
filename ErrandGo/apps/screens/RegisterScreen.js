import React, { useState } from 'react';
import { StyleSheet, View ,Image,Text,} from 'react-native';
import * as Yup from 'yup';
import  Constants  from 'expo-constants';
import  { MaterialCommunityIcons } from '@expo/vector-icons'




import defaultStyles from '../config/styles';
import {AppForm,AppFormField,SubmitButton,ErrorMessage} from '../components/forms';
import authApi from '../api/auth';
import auth from '../api/auth';
import useAuth from '../hooks/useAuth';


const validationSchema = Yup.object().shape(
    {
        email: Yup.string().required().email().label('Email'),
        password: Yup.string().required().min(5).label('Password'),
        username: Yup.string().required().label('Username'),
        phone: Yup.string().required(). min(10,"Incorrect phone number").max(10,"Incorrect phone number").label('Phone'),
        
     
    }
)

function RegisterScreen({navigation}) {
   
    const { login } = useAuth();
    const [registerError,setRegisterError] = useState();
    const [registerFailed,setRegisterFailed] = useState(false);


    const handleSubmit = async (registerInfo,actions) => {
        const result = await authApi.register(registerInfo);

        if (!result.ok){
            if(result.data) {
                setRegisterError((result.data.username ? result.data.username : result.data.email))
            }
            else {
                setRegisterError('An error occurred');
                console.log(result);
                
            }
            return setRegisterFailed(true);
            
        }
        
        setRegisterFailed(false);
        const {data: token } = await authApi.login(registerInfo.username, registerInfo.password);
        login(token['access']);
        

    actions.resetForm();
    }

    return (

        <View style={styles.container}>
           
            <View style={styles.design}>
            <View style={{flexDirection:'row'}}>
 

           <Text style={{fontSize:20,color:defaultStyles.colors.blue,paddingRight:5}}>
                Hello
            </Text>
            <MaterialCommunityIcons name='hand-wave' color='#f8ee39' size={20}/>
            <Text style={{fontSize:20,color:defaultStyles.colors.blue,}}>
            ,  Welcome To ErrandGo
            </Text>
            </View>
                <Text style={{fontSize:14,fontWeight:'300',color:defaultStyles.colors.grey,marginBottom:10,marginTop:10}}>
                    Create your new account
                </Text>
            </View>


            <View style={styles.formContainer}>
            

            <AppForm
            initialValues={{ username:'',email:'',phone:'',password:''}}
            onSubmit={handleSubmit}  
            validationSchema={validationSchema} >

            <ErrorMessage error={registerError} visible={registerFailed}/>

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
                name="email"
                icon='email'
                placeholder='Email'
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                textContentType='emailAddress'
                />

                
                <AppFormField
                style={styles.Textinput}
                name="phone"
                icon='phone'
                placeholder='Phone Number'
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='numeric'
                textContentType='telephoneNumber'
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

                <SubmitButton title="Sign up"/>

            </AppForm>

            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontStyle:'italic',color:defaultStyles.colors.grey,textAlign:'center'}}>Already have an account? </Text>
                <Text style={{ color:"#f8ee39",textAlign:'center'}} onPress={()=> navigation.navigate("Login")}>Login</Text>
            </View>
        
      </View>
 
       
    
    );
}



const styles = StyleSheet.create({

    container:{
        flex:1,
    },
    
    formContainer:{
        padding: 10,
        marginBottom:20,
    },
    Textinput:{
        borderWidth:1,
        borderColor: defaultStyles.colors.secondary

    },
    design:{
        paddingTop: Constants.statusBarHeight + Constants.statusBarHeight,
        paddingLeft: 25
    }
   
   
})


export default RegisterScreen;