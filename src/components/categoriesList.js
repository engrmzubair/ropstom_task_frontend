import React, { useState } from 'react';
import { List, Button, Space, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AddCategory from './addCategroy';
import UpdateCategory from './updateCategory';
import { useGetCategoriesQuery, useDeleteCategoryMutation } from '../services/category';

const CategoriesList = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { data, isLoading, error, refetch } = useGetCategoriesQuery();
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setEditModalVisible(true);
    };

    const handleDelete = async (categoryId) => {
        try {
            await deleteCategory(categoryId).unwrap();
            refetch();
        } catch (error) {
            console.log('Failed to delete category', error);
        }
    };

    const handleAdd = () => {
        setModalVisible(true);
    };

    const handleOk = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleEditOk = () => {
        setEditModalVisible(false);
    };

    const handleEditCancel = () => {
        setSelectedCategory(null);
        setEditModalVisible(false);
    };

    return (
        <div style={{ margin: '0 auto', width: '60%' }}>
            <div style={{ backgroundColor: '#f0f2f5', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2>Categories</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add Category</Button>
            </div>

            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(category) => (
                    <List.Item
                        actions={[
                            <Space>
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={() => handleEdit(category)}
                                />
                                <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDelete(category._id)}
                                    loading={isDeleting} // show loading icon while deleting
                                />
                            </Space>
                        ]}
                    >
                        <List.Item.Meta title={category.name} />
                    </List.Item>
                )}
            />

            <AddCategory refetch={refetch} modalVisible={modalVisible} handleOk={handleOk} handleCancel={handleCancel} />
            {selectedCategory && (
                <UpdateCategory
                    category={selectedCategory}
                    refetch={refetch}
                    modalVisible={editModalVisible}
                    handleOk={handleEditOk}
                    handleCancel={handleEditCancel}
                />
            )}
        </div>
    );
};

export default CategoriesList;
