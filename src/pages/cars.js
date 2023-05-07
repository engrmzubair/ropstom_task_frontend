import React from 'react';
import { Layout, Row, Col } from 'antd';
import CustomHeader from '../components/customHeader';
import CarFilter from '../components/carFilter';
import CarCard from '../components/carCard';
import CarPagination from '../components/carPagination';
import useAuth from '../hooks/useAuth';

function Cars() {
    useAuth();
    return (
        <Layout className="layout">
            <CustomHeader />
            <Row gutter={[16, 16]} style={{ margin: '16px' }}>
                <Col span={5}>
                    <CarFilter />
                </Col>
                <Col span={19}>
                    <Row gutter={[16, 16]}>
                        {[...Array(6)].map((_, index) => (
                            <Col key={index} span={8}>
                                <CarCard />
                            </Col>
                        ))}
                    </Row>
                    <CarPagination />
                </Col>
            </Row>
        </Layout>
    );
}

export default Cars;
