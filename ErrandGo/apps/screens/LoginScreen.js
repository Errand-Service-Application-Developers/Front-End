import React from 'react';
import { StyleSheet, View ,Image,Text} from 'react-native';
import * as Yup from 'yup';




import defaultStyles from '../config/styles';
import {AppForm,AppFormField,SubmitButton,} from '../components/forms'
import colors from '../config/colors';


const validationSchema = Yup.object().shape(
    {
        email: Yup.string().required().email().label('Email'),
        password: Yup.string().required().min(5).label('Password'),

    }
)

function LoginScreen({navigation}) {
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
            initialValues={{email:'', password:''}}
            onSubmit={values=> console.log(values)}  
            validationSchema={validationSchema} >

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