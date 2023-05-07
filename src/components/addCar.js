import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';
import { createCarValidation } from '../utils/validations/carValidation';
import { useCreateCarMutation } from '../services/car';
import { useGetCategoriesQuery } from '../services/category';
import { toast } from 'react-toastify';

const { Option } = Select;

const AddCar = ({ visible, onCancel, refetchCars }) => {
    const [form] = Form.useForm();
    const [createCar, { isLoading, error, isError }] = useCreateCarMutation();
    const { data: categories } = useGetCategoriesQuery();

    const onFinish = async (values) => {
        console.log("values => ", values)
        try {
            await createCar(values).unwrap();
            toast.success("Car Added")
            refetchCars()
            onCancel();
            form.resetFields();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message)
        }
    }, [isError])

    return (
        <Modal visible={visible} title="Add Car" okText="Add" cancelText="Cancel" onCancel={onCancel} onOk={() => form.submit()} confirmLoading={isLoading}>
            <Form form={form} layout="vertical" onFinish={onFinish} validateMessages={createCarValidation.messages}>
                <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                    <Select placeholder="Select a category">
                        {categories?.map(c => <Option value={c._id}>{c.name}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="make" label="Make" rules={[{ required: true }, { min: 2 }]}>
                    <Input placeholder="Enter make" />
                </Form.Item>
                <Form.Item name="model" label="Model" rules={[{ required: true }, { min: 2 }]}>
                    <Input placeholder="Enter model" />
                </Form.Item>
                <Form.Item name="year" label="Year" rules={[{ required: true }, { type: 'number', min: 1900, max: 2023 }]}>
                    <InputNumber type="number" placeholder="Enter year" />
                </Form.Item>
                <Form.Item name="color" label="Color" rules={[{ required: true }, { min: 2 }]}>
                    <Input placeholder="Enter color" />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true }, { type: 'number', min: 0 }]}>
                    <InputNumber type="number" placeholder="Enter price" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCar;
