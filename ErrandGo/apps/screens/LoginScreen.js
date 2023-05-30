import React from 'react';
import { Formik } from 'formik'
import { StyleSheet,Image, View , Text} from 'react-native';
import * as Yup from 'yup';


import Screen from './Screen';
import AppTextInput from '../components/AppTextInput';
import AppButtons from '../components/AppButtons';
import defaultStyles from '../config/styles';
import AppText from '../components/AppText';
import ErrorMessage from '../components/ErrorMessage';


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
            

            <Formik 
            initialValues={{email:'', password:''}}
            onSubmit={values=> console.log(values)}  
            validationSchema={validationSchema} >

                {({handleChange,handleSubmit,errors})=>(
                <>
                <AppTextInput 
                icon='email'
                placeholder='Email'
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                textContentType='emailAddress'
                onChangeText = {handleChange("email")} 
                />
                <ErrorMessage error={errors.email}/>

                <AppTextInput 
                icon='lock'
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false}
                textContentType='password'
                secureTextEntry
                onChangeText = {handleChange("password")}
                />
                <ErrorMessage error={errors.password}/>

               <AppButtons title='Login' color='blue' onPress={handleSubmit}/>
                    
                </>

                
                )}
            </Formik>


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