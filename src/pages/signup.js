import React, { useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useFormik } from 'formik';
import { signupValidation } from '../utils/validations/userValidation';
import { useSignupMutation } from '../services/user';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';



const SignupPage = () => {
    const [createUser, { isLoading, error, isSuccess }] = useSignupMutation();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validationSchema: signupValidation,
        onSubmit: (values) => {
            createUser(values);
        },
    });

    console.log({ isSuccess })

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message)
        }
    }, [error])


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
            <Card title="Sign Up">
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
                        <span style={{ marginLeft: '10px' }}>
                            Or <Link to="/login">Login!</Link>
                        </span>
                    </Form.Item>
                </Form>
            </Card>
        </div>

    );

};

export default SignupPage;
