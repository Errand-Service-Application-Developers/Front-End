import React from 'react';
import { useFormikContext } from 'formik'


import AppButtons from '../AppButtons';



function SubmitButton({title}) {

    const { handleSubmit } = useFormikContext();    

    return (
        <AppButtons title={title} color='secondary' onPress={handleSubmit}/>
    );
}

export default SubmitButton;