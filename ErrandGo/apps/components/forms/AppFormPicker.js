import React from 'react';
import { useFormikContext}  from 'formik'


import ErrorMessage from './ErrorMessage';
import AppPicker from '../AppPicker';

function AppFormPicker({items,name,placeholder}) {

    const { errors,setFieldValue,values,touched} = useFormikContext();
    return (
        <>
        

        <AppPicker
         items={items} 
         placeholder={placeholder}
         onSelectItem={(item)=>setFieldValue(name,item)}
         selectedItem={values[name]} >

        </AppPicker>
        
        <ErrorMessage error={errors[name]} visible={touched[name]}/>
       
        </>
    );
}

export default AppFormPicker;