import * as yup from 'yup';

// Signup validation schema
export const signupValidation = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
});

// Login validation schema
export const loginValidation = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});
