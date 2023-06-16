import React from 'react';
import { useFormikContext} from 'formik'


import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';
 
function AppFormField({name,fieldWidth,style,...otherProps}) {

    const { errors,handleChange,setFieldTouched,touched} = useFormikContext();
    return (
      <>
            <AppTextInput 
                size={fieldWidth}
                onChangeText = {handleChange(name)}
                onBlur = {()=> setFieldTouched(name)}
                {...otherProps}
                style={style}
        
            />
            
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
      </>
    );
}

export default AppFormField;