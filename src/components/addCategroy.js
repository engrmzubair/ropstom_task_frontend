import React, { useEffect, useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { useCreateCategoryMutation } from '../services/category';
import { toast } from 'react-toastify';



const AddCategory = ({ modalVisible, handleOk, handleCancel, refetch }) => {
    const [form] = Form.useForm();
    const [createCategory, { isLoading, isSuccess, error, isError }] = useCreateCategoryMutation();


    const onFinish = async (values) => {
        try {
            await createCategory(values);
            toast.success("Category Added")
            refetch();
            form.resetFields();
            handleOk();
        } catch (error) {
            console.error('Failed to create category:', error);
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message)
        }
    }, [isError])

    return (
        <Modal title="Add Category" visible={modalVisible} onOk={form.submit} onCancel={handleCancel} confirmLoading={isLoading}>
            <Form form={form} name="add-category-form" onFinish={onFinish}>
                <Form.Item name="name" label="Category Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddCategory;
