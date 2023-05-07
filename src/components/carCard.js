import React, { useEffect, useState } from 'react';
import { Card, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateCar from './updateCar';
import { useDeleteCarMutation } from '../services/car';
import { toast } from 'react-toastify';

const CarCard = ({ car = {}, onDelete, refetchCars }) => {
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [deleteCar, { isLoading, error, isError, isSuccess }] = useDeleteCarMutation()

    const { make, model, year, color, price } = car;

    const handleEditClick = () => {
        setIsUpdateModalVisible(true);
    };

    const handleUpdateCancel = () => {
        setIsUpdateModalVisible(false);
    };

    const handleDeleteClick = () => {
        deleteCar(car._id)
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Car Deleted");
            refetchCars()
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message)
        }
    }, [isError])

    return (
        <>
            <Card
                title={`${make} ${model}`}
                style={{ width: '300px', marginBottom: 16, height: '280px' }}
                actions={[
                    <Space>
                        <Button icon={<EditOutlined />} onClick={handleEditClick} />
                        <Button icon={<DeleteOutlined />} onClick={handleDeleteClick} />
                    </Space>,
                ]}
            >
                <p style={{ fontSize: '14px' }}>Year: {year}</p>
                <p style={{ fontSize: '14px' }}>Color: {color}</p>
                <p style={{ fontSize: '14px' }}>Price: {price}$</p>
            </Card>
            <UpdateCar visible={isUpdateModalVisible} refetchCars={refetchCars} onCancel={handleUpdateCancel} car={car} />
        </>
    );
};

export default CarCard;
