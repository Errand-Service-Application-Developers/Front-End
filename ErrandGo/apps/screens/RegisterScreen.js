import React from 'react';
import { StyleSheet, View ,Image,Text, ScrollView} from 'react-native';
import * as Yup from 'yup';
import  { MaterialCommunityIcons } from '@expo/vector-icons'




import defaultStyles from '../config/styles';
import {AppForm,AppFormField,SubmitButton,} from '../components/forms'


const validationSchema = Yup.object().shape(
    {
        email: Yup.string().required().email().label('Email'),
        password: Yup.string().required().min(5).label('Password'),
        username: Yup.string().required().label('Username'),
        
     

    }
)

function RegisterScreen({navigation}) {
    return (

        <View style={styles.container}>
            <View style={styles.design}>

              <View style={{flexDirection:'row'}}>
               

                <Text style={{fontSize:18, paddingLeft:35,color:'white',paddingRight:5}}>
                Hello
                </Text>
                <MaterialCommunityIcons name='hand-wave' color='#f8ee39' size={20}/>
                <Text style={{fontSize:18,color:'white',}}>
                ,  Welcome To ErrandGo
                </Text>
              </View>

            </View>
            <View style={{paddingLeft:35, paddingTop:10}}>
                <Text style={{fontSize:20,fontWeight:'500',color:defaultStyles.colors.blue,marginBottom:10}}>Register</Text>
                <Text style={{fontSize:14,fontWeight:'300',color:defaultStyles.colors.grey,marginBottom:10}}>
                    Create your new account
                </Text>
            </View>


            <View style={styles.formContainer}>
            

            <AppForm
            initialValues={{ username:'',email:'', password:'',}}
            onSubmit={values=> console.log(values)}  
            validationSchema={validationSchema} >

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
    design:{
        width:'100%',
        height: '20%',
        backgroundColor: defaultStyles.colors.secondary,
        borderBottomLeftRadius: 55,
        justifyContent:'center',
        alignContent:'center',
        
    },
    Textinput:{
        borderWidth:1,
        borderColor: defaultStyles.colors.secondary

    }
   
   
    
})


export default RegisterScreen;