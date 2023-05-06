import React from 'react';
import { Form, Input, Button } from 'antd';
import { useFormik } from 'formik';
import { validationSchema } from '../utils/validations/userValidation';
import { useCreateUserMutation } from '../services/api';

const SignupPage = () => {
    const [createUser, { isLoading }] = useCreateUserMutation();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            createUser(values);
        },
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Form onFinish={formik.handleSubmit}>
                <Form.Item
                    label="Name"
                    name="name"
                    validateStatus={formik.errors.name ? 'error' : ''}
                    help={formik.errors.name ? formik.errors.name : null}
                >
                    <Input name="name" value={formik.values.name} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    validateStatus={formik.errors.email ? 'error' : ''}
                    help={formik.errors.email ? formik.errors.email : null}
                >
                    <Input name="email" value={formik.values.email} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignupPage;
