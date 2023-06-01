import React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';


import Screen from './Screen';
import { AppForm, AppFormField, SubmitButton} from '../components/forms'
import AppFormPicker from '../components/forms/AppFormPicker';



const validationSchema = Yup.object().shape({
    title: Yup.string().required().label('Title'),
    description: Yup.string().required().label('Description'),
    category: Yup.object().required().nullable().label('Category'),
    price: Yup.number().required().min(10).max(100).label('Price'),
   
})


const categories = [
    {
        value: 1, label:"Pickup or Delivery",     
    },
    {
        value: 2, label:"Laundry",   
    },
    {
        value: 3,label:"Cleaning ",
    },
    {
        value: 4,label:"Cooking",  
    }
  ]



function ListingEditScreen(props) {
    return (


        <Screen style={styles.screen}>

            <AppForm 
            
            initialValues={{ 
                title: "",
                description: "",
                category: null,
                price: "",
               
            }}
            onSubmit={values=> console.log(values)}
            validationSchema={validationSchema} >

            <AppFormField 
            name="title"
            placeholder="Title" 
            maxLength = {255}
            />

            <AppFormField
            name = "description"
            placeholder = "Description"
            maxLength = {255}
            multilines
            numberOfLines = {3} 
            />

            <AppFormPicker
            items={categories}
            name="category"
            placeholder = "Category" />
            
            <AppFormField
            name = "price"
            maxLength = {8}
            placeholder = "Price"
            keyboardType = "numeric" />

            <SubmitButton title="Post"/>


            </AppForm>




        </Screen>
       
    );
}


const styles = StyleSheet.create({
    screen: {
        padding: 10,
    }
})



export default ListingEditScreen;
