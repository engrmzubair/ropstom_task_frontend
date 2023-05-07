import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';
import { updateCarValidation } from '../utils/validations/carValidation';
import { useUpdateCarMutation } from '../services/car';
import { useGetCategoriesQuery } from '../services/category';
import { toast } from 'react-toastify';

const { Option } = Select;

const UpdateCar = ({ visible, onCancel, car, refetchCars }) => {
    const [form] = Form.useForm();
    const [updateCar, { isLoading, error, isError }] = useUpdateCarMutation();
    const { data: categories } = useGetCategoriesQuery();

    const onFinish = async (values) => {
        try {
            await updateCar({ id: car._id, data: values }).unwrap();
            toast.success("Car Updated")
            refetchCars()
            onCancel();
            form.resetFields();
        } catch (err) {
            console.error(err);
            toast.error("Something went Wrong")
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message)
        }
    }, [isError])

    const initialValues = {
        category: car.category?._id,
        make: car.make,
        model: car.model,
        year: car.year,
        color: car.color,
        price: car.price,
    };

    return (
        <Modal visible={visible} title="Update Car" okText="Update" cancelText="Cancel" onCancel={onCancel} onOk={() => form.submit()} confirmLoading={isLoading}>
            <Form form={form} layout="vertical" onFinish={onFinish} validateMessages={updateCarValidation.messages} initialValues={initialValues}>
                <Form.Item name="category" label="Category">
                    <Select placeholder="Select a category">
                        {categories?.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="make" label="Make" rules={[{ min: 2 }]}>
                    <Input placeholder="Enter make" />
                </Form.Item>
                <Form.Item name="model" label="Model" rules={[{ min: 2 }]}>
                    <Input placeholder="Enter model" />
                </Form.Item>
                <Form.Item name="year" label="Year" rules={[{ type: 'number', min: 1900, max: 2023 }]}>
                    <InputNumber type="number" placeholder="Enter year" />
                </Form.Item>
                <Form.Item name="color" label="Color" rules={[{ min: 2 }]}>
                    <Input placeholder="Enter color" />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ type: 'number', min: 0 }]}>
                    <InputNumber type="number" placeholder="Enter price" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateCar;
