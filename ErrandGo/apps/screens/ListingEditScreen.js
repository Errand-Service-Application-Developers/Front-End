import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';



import Screen from './Screen';
import { AppForm, AppFormField, SubmitButton} from '../components/forms'
import AppFormPicker from '../components/forms/AppFormPicker';
import CategoryPickerItem from '../components/CategoryPickerItem';
import FormImagePicker from '../components/forms/FormImagePicker';
import useLocation from '../hooks/useLocation';
import listingsApi from '../api/listings';
import UploadScreen from '../components/UploadScreen';




const validationSchema = Yup.object().shape({
    title: Yup.string().required().label('Title'),
    description: Yup.string().required().label('Description'),
    category: Yup.object().required().label('Category'),
    price: Yup.number().required().min(1).label('Price'),
    images: Yup.array().min(1,"Please selecy at least one image").max(3,"You can't select more than 3 images")
   
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
    const location = useLocation();
    const [uploadVisible,setUploadVisible] = useState(false);
    const [progress,setProgress] = useState(0);

    const handleSubmit = async (listing, actions) => {
        setProgress(0);
        setUploadVisible(true);
        const result = await listingsApi.addListing({...listing,location},progress => setProgress(progress));
      

        if (!result.ok){
            setUploadVisible(false);

            return console.log(result.problem,result.data);
        }
        
        actions.resetForm();
    }


    return (


        <Screen style={styles.screen}>
            <UploadScreen onDone={()=> setUploadVisible(false)} progress={progress} visible = {uploadVisible}/>

            <AppForm 
            
            initialValues={{ 
                title: "",
                description: "",
                category: null,
                price: "",
                images: []
               
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema} >
            
            <FormImagePicker name="images"/>

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
          

            <SubmitButton title="Post" />


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
