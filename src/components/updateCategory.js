import { Button, Form, Input, Modal } from 'antd';
import { useUpdateCategoryMutation } from '../services/category';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const UpdateCategory = ({ category, modalVisible, handleOk, handleCancel, refetch }) => {
    const [form] = Form.useForm();
    const [updateCategory, { isLoading, error, isError, isSuccess }] = useUpdateCategoryMutation();

    const onFinish = (values) => {
        updateCategory({ id: category._id, name: values.categoryName });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Category Updated")
            refetch();
            handleOk();
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message)
        }
    }, [isError])

    return (
        <Modal title={`Edit Category: ${category.name}`} visible={modalVisible} onOk={form.submit} onCancel={handleCancel} footer={[
            <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={form.submit} loading={isLoading}>Update</Button>,
        ]}>
            <Form form={form} onFinish={onFinish} initialValues={{ categoryName: category.name }}>
                <Form.Item label="Category Name" name="categoryName" rules={[{ required: true, message: 'Please enter category name!' }]}>
                    <Input placeholder="Category Name" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateCategory;
