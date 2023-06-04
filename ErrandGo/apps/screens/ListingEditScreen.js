import React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';


import Screen from './Screen';
import { AppForm, AppFormField, SubmitButton} from '../components/forms'
import AppFormPicker from '../components/forms/AppFormPicker';
import CategoryPickerItem from '../components/CategoryPickerItem';



const validationSchema = Yup.object().shape({
    title: Yup.string().required().label('Title'),
    description: Yup.string().required().label('Description'),
    category: Yup.object().required().nullable().label('Category'),
    price: Yup.number().required().min(10).max(100).label('Price'),
   
})


const categories = [
    {
        value: 1, label:"Pickup or Delivery", backgroundColor:"#ff5252" , icon: "truck-delivery"    
    },
    {
        value: 2, label:"Gas Filling", backgroundColor:"#4ecdc4" , icon: "gas-station" 
    },
    {
        value: 3, label:"Laundry",  backgroundColor:"orange" , icon: "washing-machine"    
    },
    {
        value: 4, label:"Cleaning ", backgroundColor:"#2596de" , icon: "broom" 
    },
    {
        value: 5, label:"Cooking", backgroundColor:"green" , icon: "food-fork-drink"   
    },
    {
        value: 6, label:"Others" ,   icon: "apps"   
    },
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
            fieldWidth="40%"
            name = "price"
            maxLength = {8}
            placeholder = "Price"
            keyboardType = "numeric" />

            <AppFormPicker
            PickerItemComponent={CategoryPickerItem}
            numberOfColumns={3}
            items={categories}
            fieldWidth="70%"
            name="category"
            placeholder = "Category" />


           <AppFormField
            name = "description"
            placeholder = "Description"
            maxLength = {255}
            multilines
            numberOfLines = {3} 
            />
          

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
