import React from 'react';
import { Card, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CarCard = ({ car = {}, onEdit, onDelete }) => {
    const { make, model, year, color, price } = car;

    return (
        <Card
            title={`${make} ${model}`}
            style={{ width: '300px', marginBottom: 16 }}
            actions={[
                <Space>
                    <Button icon={<EditOutlined />} onClick={onEdit} />
                    <Button icon={<DeleteOutlined />} onClick={onDelete} />
                </Space>,
            ]}
        >
            <p style={{ fontSize: '14px' }}>Year: {year}</p>
            <p style={{ fontSize: '14px' }}>Color: {color}</p>
            <p style={{ fontSize: '14px' }}>Price: {price}</p>
        </Card>
    );
};

export default CarCard;
