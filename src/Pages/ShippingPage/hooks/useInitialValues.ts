import { useFormik } from 'formik';
import * as Yup from 'yup';
import validationSchema from './useSchema'

const useShippingFormik = () => {
    return useFormik({
        initialValues: {
            name: '',
            surname: '',
            phoneNumber: '',
            email: '',
            dateOfBirth: '',
            address: '',
            city: '',
            state: '',
            zipCode: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });
}

export default useShippingFormik;
