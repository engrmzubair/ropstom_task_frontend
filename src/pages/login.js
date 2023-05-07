import { Form, Input, Button, Card } from 'antd';
import { useFormik } from 'formik';
import { loginValidation } from '../utils/validations/userValidation';
import { useLoginMutation } from '../services/user';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [loginUser, { isLoading, error, isSuccess }] = useLoginMutation();
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginValidation,
        onSubmit: (values) => {
            loginUser(values);
        },
    });

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message)
        }
    }, [error])

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                navigate("/")
            }, 1000)
        }
    }, [isSuccess])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card title="Login" style={{ display: 'flex', flexDirection: 'column' }}>
                <Form onFinish={formik.handleSubmit}>
                    <Form.Item
                        label="Email"
                        name="email"
                        validateStatus={formik.errors.email ? 'error' : ''}
                        help={formik.errors.email ? formik.errors.email : null}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                    >
                        <Input name="email" value={formik.values.email} onChange={formik.handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        validateStatus={formik.errors.password ? 'error' : ''}
                        help={formik.errors.password ? formik.errors.password : null}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                    >
                        <Input.Password name="password" value={formik.values.password} onChange={formik.handleChange} />
                    </Form.Item>
                    <Form.Item style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Login
                        </Button>
                        <span style={{ marginLeft: '10px' }}>
                            Or <Link to="/signup">sign up now!</Link>
                        </span>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );


};

export default LoginPage;
