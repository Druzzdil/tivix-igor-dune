import { useMemo } from 'react';
import * as Yup from 'yup';

const useValidationSchema = () => {
    const schema = useMemo(() => {
        return Yup.object({
            name: Yup.string().required('Required'),
            surname: Yup.string().required('Required'),
            phoneNumber: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email format').required('Required'),
            dateOfBirth: Yup.date().required('Required'),
            address: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            zipCode: Yup.string().required('Required'),
        });
    }, []);

    return schema;
}

export default useValidationSchema;
