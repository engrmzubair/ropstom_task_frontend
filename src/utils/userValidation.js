import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
    name: yup
        .string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required')
});

export default validationSchema;
