import * as Yup from 'yup';

// Validation schema for creating a new car
export const createCarValidation = Yup.object({
    category: Yup.string().required('Category is required'),
    make: Yup.string().required('Make is required').min(2, 'Make must be at least 2 characters'),
    model: Yup.string().required('Model is required').min(2, 'Model must be at least 2 characters'),
    year: Yup.number().required('Year is required').min(1900, 'Year must be after 1900'),
    color: Yup.string().required('Color is required').min(2, 'Color must be at least 2 characters'),
    price: Yup.number().required('Price is required').min(0, 'Price must be a positive number'),
});

// Validation schema for updating an existing car
export const updateCarValidation = Yup.object({
    category: Yup.string(),
    make: Yup.string().min(2, 'Make must be at least 2 characters'),
    model: Yup.string().min(2, 'Model must be at least 2 characters'),
    year: Yup.number().min(1900, 'Year must be after 1900'),
    color: Yup.string().min(2, 'Color must be at least 2 characters'),
    price: Yup.number().min(0, 'Price must be a positive number'),
}).test('at-least-one-required', 'At least one field is required', (values) => {
    return Object.values(values).some((value) => Boolean(value));
});
