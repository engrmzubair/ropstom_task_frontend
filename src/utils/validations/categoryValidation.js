import * as Yup from 'yup';

const categoryValidationSchema = Yup.object({
    name: Yup.string()
        .required('Category name is required')
        .min(2, 'Category name must be at least 2 characters')
        .max(100, 'Category name must be at most 100 characters'),
});

export default categoryValidationSchema;
