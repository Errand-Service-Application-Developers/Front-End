import React from 'react';
import { useFormikContext} from 'formik'


import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';
 
function AppFormField({name,fieldWidth,...otherProps}) {

    const { errors,handleChange,setFieldTouched,touched} = useFormikContext();
    return (
      <>
            <AppTextInput 
                size={fieldWidth}
                onChangeText = {handleChange(name)}
                onBlur = {()=> setFieldTouched(name)}
                {...otherProps}
        
            />
            
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
      </>
    );
}

export default AppFormField;