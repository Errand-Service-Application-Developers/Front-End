import React, { useRef, useState, useEffect} from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import * as Yup from 'yup';



import Screen from './Screen';
import { AppForm, AppFormField, SubmitButton} from '../components/forms'
import AppFormPicker from '../components/forms/AppFormPicker';
import FormImagePicker from '../components/forms/FormImagePicker';
import CategoryPickerItem from '../components/CategoryPickerItem';
import useLocation from '../hooks/useLocation';
import listingsApi from '../api/listings';
import UploadScreen from '../components/UploadScreen';
import colors from '../config/colors';




const validationSchema = Yup.object().shape({
    title: Yup.string().required().label('Title'),
    description: Yup.string().required().label('Description'),
    category: Yup.object().required().nullable().label('Category'),
    price: Yup.number().required().min(1).label('Price'),
    images: Yup.array().min(1,"Please select at least one image").max(1,"You can't select more than 1 images")
   
})


function ListingEditScreen(props) {
    const [categories,setCategories] = useState([])
    const location = useLocation();
    const [uploadVisible,setUploadVisible] = useState(false);
    const [progress,setProgress] = useState(0);
    const scrollView = useRef();

    useEffect(() =>{
        loadcategories();
    
    },[])

    const loadcategories = async () =>{
       const result = await listingsApi.getCategories();

       if (!result.ok){
        console.log(result.problem)
        return;
       }
       setCategories(result.data)

    }



    const handleSubmit = async (listing, actions) => {
        setProgress(0);
        setUploadVisible(true);
        const result = await listingsApi.addListing({...listing,location},progress => setProgress(progress));
      

        if (!result.ok){
            setUploadVisible(false);

            return;
        }
        
        actions.resetForm();
    }


    return (
        
        <ScrollView  ref={scrollView} >


        <Screen style={styles.screen}>
            <UploadScreen onDone={()=> setUploadVisible(false)} progress={progress} visible = {uploadVisible}/>
            <Text style= {styles.hint}>
                Select an Image desciption of your errand
            </Text>

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
    </ScrollView>
       
    );
}


const styles = StyleSheet.create({
    screen: {
        padding: 10,
    },
    hint:{
        padding: 5,
        color: colors.grey,
        fontSize: 14
    }
})



export default ListingEditScreen;
