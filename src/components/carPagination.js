import React from 'react';
import { Pagination } from 'antd';

const CarPagination = ({ total = 16, pageSize = 6, current = 1, onPageChange }) => {
    console.log(current)
    return (
        <Pagination
            total={total}
            pageSize={pageSize}
            current={current}
            onChange={onPageChange}
            showSizeChanger={false}
            style={{ marginTop: 16, textAlign: 'center', marginBottom: 16 }}
        />
    );
};

export default CarPagination;
