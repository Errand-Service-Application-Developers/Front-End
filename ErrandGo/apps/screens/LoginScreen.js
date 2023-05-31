import React from 'react';
import { StyleSheet, View , } from 'react-native';
import * as Yup from 'yup';




import defaultStyles from '../config/styles';
import {AppForm,AppFormField,SubmitButton,} from '../components/forms'


const validationSchema = Yup.object().shape(
    {
        email: Yup.string().required().email().label('Email'),
        password: Yup.string().required().min(5).label('Password'),

    }
)

function LoginScreen(props) {
    return (
        <View>

        
            <View style={styles.container}>

            </View>

            <View style={styles.formContainer}>
            

            <AppForm
            initialValues={{email:'', password:''}}
            onSubmit={values=> console.log(values)}  
            validationSchema={validationSchema} >

                <AppFormField
                name="email"
                icon='email'
                placeholder='Email'
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                textContentType='emailAddress'
                />

                <AppFormField
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
        height: '40%',
        backgroundColor: defaultStyles.colors.blue,
        marginBottom: 40,
        borderBottomLeftRadius: 75

    },

    formContainer:{
        padding: 10

    },

   
    
})


export default LoginScreen;